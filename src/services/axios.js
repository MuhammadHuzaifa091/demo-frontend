// src/api/axios.js
import axios from 'axios';

// Debug environment variables
console.log('=== Axios Configuration Debug ===');
console.log('NODE_ENV:', import.meta.env.MODE);
console.log('PROD:', import.meta.env.PROD);
console.log('DEV:', import.meta.env.DEV);
console.log('VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
console.log('================================');

// FORCE the correct backend URL - no fallbacks
const BACKEND_URL = 'https://demo.publicvm.com/api/v1';
console.log('FORCED BACKEND URL:', BACKEND_URL);

const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: 10000,
    withCredentials: true, // if you need cookies / auth
});

// Add request interceptor for debugging
api.interceptors.request.use((config) => {
  console.log('API Request:', config.method?.toUpperCase(), config.url, 'Base URL:', config.baseURL);
  return config;
});

export default api;
