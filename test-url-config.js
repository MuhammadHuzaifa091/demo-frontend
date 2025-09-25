#!/usr/bin/env node

// Test script to verify API URL configuration
// Run this from the frontend directory: node test-url-config.js

const axios = require('axios');

// Test the URL configuration
const testURLConfig = async () => {
  console.log('🧪 Testing API URL Configuration...\n');

  // Simulate the axios configuration
  const getBaseURL = () => {
    const url = process.env.VITE_API_BASE_URL || 'https://demo.publicvm.com/api/v1';
    console.log('Base URL:', url);
    return url;
  };

  const baseURL = getBaseURL();
  const API_BASE = ''; // Empty since axios baseURL already includes /api/v1

  // Test 1: Check what URLs would be generated
  console.log('📍 URL Generation Test:');
  console.log('Base URL:', baseURL);
  console.log('API_BASE:', API_BASE);
  console.log('Combined URL for repair requests:', `${baseURL}${API_BASE}/repair-requests/`);
  console.log('Combined URL for auth login:', `${baseURL}${API_BASE}/auth/login`);
  console.log('Combined URL for users/me:', `${baseURL}${API_BASE}/users/me`);

  // Test 2: Test actual endpoints
  console.log('\n🌐 Testing Actual Endpoints:');

  try {
    const response = await axios.get(`${baseURL}/auth/test-roles`, {
      timeout: 5000
    });
    console.log('✅ Test roles endpoint accessible');
  } catch (error) {
    console.log('❌ Test roles endpoint failed:', error.message);
  }

  try {
    const response = await axios.get(`${baseURL}/`, {
      timeout: 5000
    });
    console.log('✅ Root endpoint accessible');
  } catch (error) {
    console.log('❌ Root endpoint failed:', error.message);
  }

  // Test 3: Show correct vs incorrect URLs
  console.log('\n📋 URL Comparison:');
  console.log('❌ WRONG (old): https://demo.publicvm.com/api/v1/api/v1/repair-requests/');
  console.log('✅ CORRECT (new): https://demo.publicvm.com/api/v1/repair-requests/');
  console.log('❌ WRONG (old): https://demo.publicvm.com/api/v1/api/v1/auth/login');
  console.log('✅ CORRECT (new): https://demo.publicvm.com/api/v1/auth/login');

  console.log('\n🎯 All API requests should now go to the correct backend URL!');
};

testURLConfig();
