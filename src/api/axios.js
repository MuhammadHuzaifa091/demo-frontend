// src/api/axios.js
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // comes from Vercel env in production
    withCredentials: true, // if you need cookies / auth
});

export default api;
