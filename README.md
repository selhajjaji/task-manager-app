# 📝 Smart Task Manager App

A full-stack task management application built with **React**, **Flask**, **MongoDB**, and **JWT Authentication**. Users can register, login, and manage their personal tasks securely with a modern Material-UI interface.

---

## 🚀 Features

### 🔐 Authentication
- Secure registration and login with **hashed passwords**
- JWT-based authentication with 24h token expiration

### ✅ Task Management
- Add, view, edit, and delete tasks
- Each user sees **only their own tasks**
- Success/error feedback with Material-UI **Snackbar**

### 🎨 Modern UI
- Responsive layout built with **Material-UI**
- Light theme with styled components and clean navigation
- Conditional routing and protected pages using **PrivateRoute**

---

## 📂 Tech Stack

### Frontend
- React 18
- React Router DOM
- Material-UI (MUI)
- Axios

### Backend
- Flask
- Flask-JWT-Extended
- Flask-CORS
- MongoDB (via `pymongo`)
- bcrypt (password hashing)

---

## 🔧 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/selhajjaji/task-manager-app.git
cd task-manager-app



2. Install Frontend

cd client
npm install
npm start


3. Create .env in server/

MONGO_URI=mongodb+srv://your_user:your_password@your_cluster.mongodb.net/taskdb
JWT_SECRET=your_secret_key

4. Run Backend

python app.py
