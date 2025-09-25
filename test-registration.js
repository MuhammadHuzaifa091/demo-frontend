#!/usr/bin/env node

// Test user registration and full authentication flow
// Run this from the frontend directory: node test-registration.js

const axios = require('axios');

const testRegistration = async () => {
  console.log('🧪 Testing User Registration Flow...\n');

  const baseURL = 'https://demo.publicvm.com/api/v1';

  // Test 1: Register a new user
  console.log('📝 Step 1: Registering a test user...');
  try {
    const registrationData = {
      email: 'test@example.com',
      password: 'test123',
      first_name: 'Test',
      last_name: 'User',
      role: 'user'
    };

    const response = await axios.post(`${baseURL}/auth/register-with-role`, registrationData, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ User registered successfully!');
    console.log('User ID:', response.data.id);
    console.log('Email:', response.data.email);
    console.log('Role:', response.data.role);

  } catch (error) {
    console.log('❌ Registration failed');
    console.log('Status:', error.response?.status);
    console.log('Error:', error.response?.data?.detail || error.message);

    if (error.response?.status === 400 && error.response?.data?.detail?.includes('already exists')) {
      console.log('💡 User already exists, trying to login instead...\n');
    } else {
      return;
    }
  }

  // Test 2: Login with the registered user
  console.log('🔑 Step 2: Logging in...');
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

    console.log('✅ Login successful!');
    console.log('Token received:', response.data.access_token ? 'Yes' : 'No');

    if (response.data.access_token) {
      const token = response.data.access_token;

      // Test 3: Get user info
      console.log('👤 Step 3: Getting user information...');
      try {
        const userResponse = await axios.get(`${baseURL}/users/me`, {
          timeout: 5000,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('✅ User info retrieved');
        console.log('Name:', userResponse.data.first_name, userResponse.data.last_name);
        console.log('Role:', userResponse.data.role);
        console.log('Email:', userResponse.data.email);

      } catch (userError) {
        console.log('❌ Failed to get user info');
        console.log('Error:', userError.response?.data?.detail || userError.message);
      }

      // Test 4: Try to create a repair request
      console.log('🔧 Step 4: Creating a repair request...');
      try {
        const formData = new FormData();
        formData.append('title', 'Test Repair Request');
        formData.append('description', 'This is a test repair request created via API');

        const repairResponse = await axios.post(`${baseURL}/repair-requests/`, formData, {
          timeout: 5000,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log('✅ Repair request created successfully!');
        console.log('Request ID:', repairResponse.data.id);
        console.log('Title:', repairResponse.data.title);
        console.log('Status:', repairResponse.data.status);

      } catch (repairError) {
        console.log('❌ Failed to create repair request');
        console.log('Status:', repairError.response?.status);
        console.log('Error:', repairError.response?.data?.detail || repairError.message);
      }

      // Test 5: Get user's repair requests
      console.log('📋 Step 5: Getting user repair requests...');
      try {
        const requestsResponse = await axios.get(`${baseURL}/repair-requests/my-requests`, {
          timeout: 5000,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('✅ Repair requests retrieved');
        console.log('Total requests:', requestsResponse.data.length);
        if (requestsResponse.data.length > 0) {
          console.log('Latest request:', requestsResponse.data[0].title);
        }

      } catch (requestsError) {
        console.log('❌ Failed to get repair requests');
        console.log('Error:', requestsError.response?.data?.detail || requestsError.message);
      }
    }

  } catch (loginError) {
    console.log('❌ Login failed');
    console.log('Status:', loginError.response?.status);
    console.log('Error:', loginError.response?.data?.detail || loginError.message);
  }

  console.log('\n🎉 Registration and authentication flow test completed!');
};

testRegistration();
