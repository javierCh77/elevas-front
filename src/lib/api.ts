import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://10.27.63.174:3005/api',
  baseURL: 'http://localhost:3005/api',
  withCredentials: true,
});



export default api;