// src/api/axios.js
import axios from 'axios';

const api = axios.create({
    baseURL: "http://demo.publicvm.com/", // comes from Vercel env in production
    timeout: 3000,
    withCredentials: true, // if you need cookies / auth
});

export default api;
