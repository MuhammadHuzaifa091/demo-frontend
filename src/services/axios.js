// src/api/axios.js
import axios from 'axios';

// Debug environment variables
console.log('=== Axios Configuration Debug ===');
console.log('NODE_ENV:', import.meta.env.MODE);
console.log('PROD:', import.meta.env.PROD);
console.log('DEV:', import.meta.env.DEV);
console.log('VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
console.log('================================');

// Get the base URL from environment variable
const getBaseURL = () => {
  // Always use the production URL as specified by the user
  const url = import.meta.env.VITE_API_BASE_URL || 'https://demo.publicvm.com/api/v1';
  console.log('Using baseURL:', url);
  return url;
};

const api = axios.create({
    baseURL: getBaseURL(),
    timeout: 10000,
    withCredentials: true, // if you need cookies / auth
});

// Add request interceptor for debugging
api.interceptors.request.use((config) => {
  console.log('API Request:', config.method?.toUpperCase(), config.url, 'Base URL:', config.baseURL);
  return config;
});

export default api;
