#!/usr/bin/env node

// Test registration with different emails
// Run this: node test-registration-issue.js

const axios = require('axios');

const testRegistrationIssue = async () => {
  console.log('🔍 Testing Registration Issue...\n');

  const baseURL = 'https://demo.publicvm.com/api/v1';

  // Test with multiple different emails
  const testEmails = [
    'uniqueadmin1@example.com',
    'uniqueadmin2@test.com',
    'brandnewadmin@gmail.com',
    'freshuser@outlook.com',
    'newemail' + Date.now() + '@example.com' // Timestamp-based unique email
  ];

  console.log('📋 Testing registration with different emails:');

  for (const email of testEmails) {
    try {
      const registrationData = {
        email: email,
        password: 'admin123',
        first_name: 'Test',
        last_name: 'Admin',
        role: 'admin'
      };

      console.log(`\n🧪 Testing email: ${email}`);
      
      const response = await axios.post(`${baseURL}/auth/register-with-role`, registrationData, {
        timeout: 10000,
        headers: { 'Content-Type': 'application/json' }
      });

      console.log(`✅ Registration successful for ${email}`);
      console.log('Response:', response.data);
      break; // If one succeeds, we found the issue

    } catch (error) {
      console.log(`❌ Registration failed for ${email}`);
      console.log('Error:', error.response?.data?.detail || error.message);
    }
  }

  console.log('\n🔍 Checking current database state...');
  
  // Check if there are any users in the database
  try {
    const testResponse = await axios.get(`${baseURL}/auth/test-roles`, { timeout: 5000 });
    console.log('✅ Backend is accessible');
  } catch (error) {
    console.log('❌ Backend not accessible:', error.message);
  }

  console.log('\n💡 POSSIBLE CAUSES:');
  console.log('1. Database has cached/existing users');
  console.log('2. Email validation is too strict');
  console.log('3. Backend registration logic has issues');
  console.log('4. Database constraints are preventing registration');

  console.log('\n🔧 SOLUTIONS TO TRY:');
  console.log('1. Clear the database: python check_database.py clear');
  console.log('2. Check backend logs for detailed error messages');
  console.log('3. Try registration with completely unique emails');
  console.log('4. Check if there are database constraints causing issues');
};

testRegistrationIssue();
