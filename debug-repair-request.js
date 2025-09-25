#!/usr/bin/env node

// Comprehensive test to identify the exact issue
// Run this from the frontend directory: node debug-repair-request.js

const axios = require('axios');

const debugRepairRequest = async () => {
  console.log('🔍 Comprehensive Repair Request Debug...\n');

  const baseURL = 'https://demo.publicvm.com/api/v1';

  // Test 1: Check backend accessibility
  console.log('1️⃣ Testing Backend Accessibility...');
  try {
    const response = await axios.get(`${baseURL}/auth/test-roles`, { timeout: 5000 });
    console.log('✅ Backend accessible');
  } catch (error) {
    console.log('❌ Backend not accessible:', error.message);
    return;
  }

  // Test 2: Try to register a user
  console.log('\n2️⃣ Testing User Registration...');
  try {
    const registrationData = {
      email: 'debug@example.com',
      password: 'debug123',
      first_name: 'Debug',
      last_name: 'User',
      role: 'user'
    };

    const response = await axios.post(`${baseURL}/auth/register-with-role`, registrationData, {
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' }
    });

    console.log('✅ User registered successfully');
    const userId = response.data.id;
    console.log('User ID:', userId);

    // Test 3: Login with the user
    console.log('\n3️⃣ Testing User Login...');
    try {
      const loginData = new URLSearchParams();
      loginData.append('username', 'debug@example.com');
      loginData.append('password', 'debug123');

      const loginResponse = await axios.post(`${baseURL}/auth/jwt/login`, loginData, {
        timeout: 5000,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      console.log('✅ Login successful');
      const token = loginResponse.data.access_token;
      console.log('Token received:', !!token);

      // Test 4: Get user info
      console.log('\n4️⃣ Testing User Info Retrieval...');
      try {
        const userResponse = await axios.get(`${baseURL}/users/me`, {
          timeout: 5000,
          headers: { 'Authorization': `Bearer ${token}` }
        });

        console.log('✅ User info retrieved');
        console.log('User role:', userResponse.data.role);

        // Test 5: Try to create repair request
        console.log('\n5️⃣ Testing Repair Request Creation...');
        try {
          const formData = new FormData();
          formData.append('title', 'Debug Repair Request');
          formData.append('description', 'This is a debug repair request');

          const repairResponse = await axios.post(`${baseURL}/repair-requests/`, formData, {
            timeout: 5000,
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          });

          console.log('✅ Repair request created successfully!');
          console.log('Request ID:', repairResponse.data.id);

        } catch (repairError) {
          console.log('❌ Repair request creation failed');
          console.log('Status:', repairError.response?.status);
          console.log('Error:', repairError.response?.data?.detail || repairError.message);
          console.log('Full error:', repairError.response?.data);
        }

      } catch (userError) {
        console.log('❌ User info retrieval failed');
        console.log('Status:', userError.response?.status);
        console.log('Error:', userError.response?.data?.detail || userError.message);
      }

    } catch (loginError) {
      console.log('❌ Login failed');
      console.log('Status:', loginError.response?.status);
      console.log('Error:', loginError.response?.data?.detail || loginError.message);
    }

  } catch (regError) {
    console.log('❌ Registration failed');
    console.log('Status:', regError.response?.status);
    console.log('Error:', regError.response?.data?.detail || regError.message);
    console.log('Full error:', regError.response?.data);
  }

  console.log('\n🎯 Debug completed!');
};

debugRepairRequest();
