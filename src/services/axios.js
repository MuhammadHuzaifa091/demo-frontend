// src/api/axios.js
import axios from 'axios';

// Debug environment variables
console.log('=== Axios Configuration Debug ===');
console.log('NODE_ENV:', import.meta.env.MODE);
console.log('PROD:', import.meta.env.PROD);
console.log('DEV:', import.meta.env.DEV);
console.log('VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
console.log('VITE_BACKEND_URL:', import.meta.env.VITE_BACKEND_URL);
console.log('================================');

// ABSOLUTE FORCE - No environment variables, only hardcoded URL
const ABSOLUTE_BACKEND_URL = 'https://demo.publicvm.com/api/v1';
console.log('ABSOLUTE FORCED BACKEND URL:', ABSOLUTE_BACKEND_URL);

const api = axios.create({
    baseURL: ABSOLUTE_BACKEND_URL,
    timeout: 10000,
    withCredentials: true, // if you need cookies / auth
});

// Add request interceptor for debugging
api.interceptors.request.use((config) => {
  console.log('API Request:', config.method?.toUpperCase(), config.url, 'Base URL:', config.baseURL);
  console.log('Full URL will be:', config.baseURL + config.url);
  return config;
});

export default api;
