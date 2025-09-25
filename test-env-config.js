#!/usr/bin/env node

// Test environment variables and URL configuration
// Run this: node test-env-config.js

console.log('🔍 Testing Environment Configuration...\n');

// Simulate Vite environment variable loading
const simulateViteEnv = () => {
  // Simulate how Vite loads environment variables
  const env = {
    MODE: 'production',
    PROD: true,
    DEV: false,
    VITE_API_BASE_URL: 'https://demo.publicvm.com/api/v1'
  };

  console.log('Simulated Environment Variables:');
  console.log('NODE_ENV:', env.MODE);
  console.log('PROD:', env.PROD);
  console.log('DEV:', env.DEV);
  console.log('VITE_API_BASE_URL:', env.VITE_API_BASE_URL);

  // Simulate the getBaseURL function
  const getBaseURL = () => {
    const url = env.VITE_API_BASE_URL || 'https://demo.publicvm.com/api/v1';
    console.log('Using baseURL:', url);
    return url;
  };

  const baseURL = getBaseURL();
  const API_BASE = '';

  console.log('\n📍 URL Configuration:');
  console.log('Base URL:', baseURL);
  console.log('API_BASE:', API_BASE);
  console.log('Combined URL:', `${baseURL}${API_BASE}/repair-requests/`);

  return baseURL;
};

simulateViteEnv();

console.log('\n💡 If the URL is still wrong in your browser:');
console.log('1. Check browser console for debug logs');
console.log('2. Try hard refresh (Ctrl+F5)');
console.log('3. Clear browser cache');
console.log('4. Check if there are any service workers caching old URLs');
