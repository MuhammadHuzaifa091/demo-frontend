#!/usr/bin/env node

// Test script to verify API endpoints are working
// Run this from the frontend directory: node test-api-endpoints.js

const axios = require('axios');

// Test the API endpoints
const testAPIEndpoints = async () => {
  console.log('Testing API endpoints...');

  const baseURL = 'https://demo.publicvm.com/api/v1';

  // Test basic connectivity
  try {
    const response = await axios.get(`${baseURL}/`, {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ API endpoint is accessible');
    console.log('Response:', response.data);
  } catch (error) {
    console.log('❌ API endpoint is not accessible');
    console.log('Error:', error.message);
    return;
  }

  // Test repair requests endpoint
  try {
    const repairResponse = await axios.get(`${baseURL}/repair-requests/my-requests`, {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Repair requests endpoint is accessible');
    console.log('Repair requests:', repairResponse.data);
  } catch (error) {
    console.log('❌ Repair requests endpoint issue');
    console.log('Error:', error.response?.data || error.message);
  }

  // Test registration endpoint with debug
  try {
    const debugResponse = await axios.post(`${baseURL}/auth/debug-registration`, {
      email: 'test@example.com',
      password: 'test123',
      first_name: 'Test',
      last_name: 'User',
      role: 'user'
    }, {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Registration debug endpoint is accessible');
    console.log('Debug response:', debugResponse.data);
  } catch (error) {
    console.log('❌ Registration debug endpoint issue');
    console.log('Error:', error.response?.data || error.message);
  }
};

testAPIEndpoints();
