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

// FORCE the correct backend URL - multiple fallbacks to ensure it works
const getBackendURL = () => {
  // Try the new explicit variable first
  if (import.meta.env.VITE_BACKEND_URL) {
    console.log('Using VITE_BACKEND_URL:', import.meta.env.VITE_BACKEND_URL);
    return import.meta.env.VITE_BACKEND_URL;
  }

  // Fallback to the original variable
  if (import.meta.env.VITE_API_BASE_URL) {
    console.log('Using VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
    return import.meta.env.VITE_API_BASE_URL;
  }

  // Final hardcoded fallback
  const HARDCODED_URL = 'https://demo.publicvm.com/api/v1';
  console.log('Using HARDCODED fallback:', HARDCODED_URL);
  return HARDCODED_URL;
};

const BACKEND_URL = getBackendURL();
console.log('FINAL BACKEND URL:', BACKEND_URL);

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
