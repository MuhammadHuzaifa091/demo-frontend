#!/usr/bin/env node

// Test script to verify authentication and repair request creation
// Run this from the frontend directory: node test-auth-flow.js

const axios = require('axios');

// Test the authentication flow
const testAuthFlow = async () => {
  console.log('Testing authentication flow...');

  const baseURL = 'https://demo.publicvm.com/api/v1';

  // Test 1: Check if backend is accessible
  try {
    const response = await axios.get(`${baseURL}/auth/test-roles`, {
      timeout: 5000
    });
    console.log('✅ Backend is accessible');
    console.log('Available roles:', response.data.roles);
  } catch (error) {
    console.log('❌ Backend not accessible:', error.message);
    return;
  }

  // Test 2: Try to create a repair request without authentication
  try {
    const formData = new FormData();
    formData.append('title', 'Test Request');
    formData.append('description', 'This is a test');

    const response = await axios.post(`${baseURL}/repair-requests/`, formData, {
      timeout: 5000,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log('✅ Repair request created without auth (unexpected)');
  } catch (error) {
    console.log('❌ Repair request failed (expected if not authenticated)');
    console.log('Status:', error.response?.status);
    console.log('Error:', error.response?.data?.detail || error.message);

    if (error.response?.status === 401) {
      console.log('🔐 Authentication required - user needs to log in first');
    }
  }

  // Test 3: Try login
  try {
    const loginData = new URLSearchParams();
    loginData.append('username', 'test@example.com');
    loginData.append('password', 'test123');

    const response = await axios.post(`${baseURL}/auth/jwt/login`, loginData, {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    console.log('✅ Login successful');
    console.log('Token received:', response.data.access_token ? 'Yes' : 'No');

    if (response.data.access_token) {
      const token = response.data.access_token;

      // Test 4: Try to create repair request with token
      try {
        const formData = new FormData();
        formData.append('title', 'Test Request with Auth');
        formData.append('description', 'This is a test with authentication');

        const repairResponse = await axios.post(`${baseURL}/repair-requests/`, formData, {
          timeout: 5000,
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('✅ Repair request created with authentication!');
        console.log('Response:', repairResponse.data);
      } catch (repairError) {
        console.log('❌ Repair request failed even with auth');
        console.log('Status:', repairError.response?.status);
        console.log('Error:', repairError.response?.data?.detail || repairError.message);
      }
    }
  } catch (loginError) {
    console.log('❌ Login failed');
    console.log('Status:', loginError.response?.status);
    console.log('Error:', loginError.response?.data?.detail || loginError.message);

    if (loginError.response?.status === 400) {
      console.log('💡 Try registering a user first or check if user exists');
    }
  }
};

testAuthFlow();
