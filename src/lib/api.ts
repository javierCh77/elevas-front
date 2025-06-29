import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://31.97.23.62:3010/api',
  baseURL: 'http://localhost:3010/api',
  withCredentials: true,
});



export default api;