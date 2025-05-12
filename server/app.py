
import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)
from pymongo import MongoClient
from bson.objectid import ObjectId
import bcrypt
from datetime import timedelta

# Load environment variables
load_dotenv()
MONGO_URI = os.getenv('MONGO_URI')
SECRET_KEY = os.getenv('JWT_SECRET')

# App setup
app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = SECRET_KEY
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)
CORS(app)
jwt = JWTManager(app)

# Database setup
client = MongoClient(MONGO_URI)
db = client['taskdb']
users = db['users']
tasks = db['tasks']

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    if users.find_one({'username': data['username']}):
        return jsonify(message='Username already exists'), 409
    hashed = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    users.insert_one({'username': data['username'], 'password': hashed})
    return jsonify(message='User registered successfully'), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = users.find_one({'username': data['username']})
    if user and bcrypt.checkpw(data['password'].encode('utf-8'), user['password']):
        token = create_access_token(identity=str(user['_id']))
        return jsonify(token=token)
    return jsonify(message='Invalid credentials'), 401

@app.route('/tasks', methods=['GET'])
@jwt_required()
def get_tasks():
    user_id = get_jwt_identity()
    user_tasks = list(tasks.find({'user_id': user_id}, {'_id': 0}))
    return jsonify(user_tasks), 200

@app.route('/tasks', methods=['POST'])
@jwt_required()
def create_task():
    data = request.json
    user_id = get_jwt_identity()
    if not data.get('title') or not data.get('description'):
        return jsonify(message='Title and description are required'), 400
    tasks.insert_one({
        'user_id': user_id,
        'title': data['title'],
        'description': data['description']
    })
    return jsonify(message='Task created'), 201

@app.route('/tasks/<title>', methods=['DELETE'])
@jwt_required()
def delete_task(title):
    user_id = get_jwt_identity()
    result = tasks.delete_one({'user_id': user_id, 'title': title})
    if result.deleted_count == 0:
        return jsonify(message='Task not found'), 404
    return jsonify(message='Task deleted'), 200

@app.route('/tasks/<title>', methods=['PUT'])
@jwt_required()
def update_task(title):
    user_id = get_jwt_identity()
    data = request.json
    result = tasks.update_one(
        {'user_id': user_id, 'title': title},
        {'$set': {'title': data['title'], 'description': data['description']}}
    )
    if result.matched_count == 0:
        return jsonify(message='Task not found'), 404
    return jsonify(message='Task updated'), 200

if __name__ == '__main__':
    import os

    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
