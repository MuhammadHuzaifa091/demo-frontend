#!/usr/bin/env node

// Test registration after backend debugging enhancement
// Run this: node test-registration-debug.js

const axios = require('axios');

const testRegistrationDebug = async () => {
  console.log('🔍 Testing Registration with Enhanced Backend Debugging...\n');

  const baseURL = 'https://demo.publicvm.com/api/v1';

  // Test with a completely unique email
  const uniqueEmail = `testuser${Date.now()}@example.com`;
  
  console.log(`📧 Testing with unique email: ${uniqueEmail}`);

  try {
    const registrationData = {
      email: uniqueEmail,
      password: 'admin123',
      first_name: 'Test',
      last_name: 'User',
      role: 'admin'
    };

    console.log('📤 Sending registration request...');
    
    const response = await axios.post(`${baseURL}/auth/register-with-role`, registrationData, {
      timeout: 15000,
      headers: { 'Content-Type': 'application/json' }
    });

    console.log('✅ Registration successful!');
    console.log('Response:', response.data);

  } catch (error) {
    console.log('❌ Registration failed');
    console.log('Status:', error.response?.status);
    console.log('Error:', error.response?.data?.detail || error.message);
    console.log('Full error response:', error.response?.data);

    // Additional debugging
    if (error.response?.status === 400) {
      console.log('\n🔍 This is a 400 Bad Request error');
      console.log('💡 Check backend logs for detailed debugging information');
    }
  }

  // Test debug endpoint
  console.log('\n🧪 Testing debug registration endpoint...');
  try {
    const debugData = {
      email: `debug${Date.now()}@example.com`,
      password: 'debug123',
      first_name: 'Debug',
      last_name: 'User',
      role: 'user'
    };

    const debugResponse = await axios.post(`${baseURL}/auth/debug-registration`, debugData, {
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' }
    });

    console.log('✅ Debug endpoint response:', debugResponse.data);

  } catch (debugError) {
    console.log('❌ Debug endpoint failed:', debugError.response?.data || debugError.message);
  }

  console.log('\n💡 NEXT STEPS:');
  console.log('1. Check backend server logs for detailed debugging output');
  console.log('2. The enhanced UserManager should show exactly what\'s happening');
  console.log('3. Look for print statements in the backend console');
};

testRegistrationDebug();
