
import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://task-manager-app-i17t.onrender.com',
  headers: { 'Content-Type': 'application/json' },
});
export default instance;
