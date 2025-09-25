// src/api/axios.js
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000", // Use environment variable or local fallback
    timeout: 10000,
    withCredentials: true, // if you need cookies / auth
});

export default api;
