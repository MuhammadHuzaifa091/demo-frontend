#!/usr/bin/env node

// Quick test to verify current database state
// Run this: node check-current-state.js

const axios = require('axios');

const checkCurrentState = async () => {
  console.log('🔍 Checking Current Application State...\n');

  const baseURL = 'https://demo.publicvm.com/api/v1';

  try {
    // Check if backend is running
    const response = await axios.get(`${baseURL}/auth/test-roles`, { timeout: 5000 });
    console.log('✅ Backend is running');
    console.log('Available roles:', response.data.roles);

    // Try to get current user count from database
    console.log('\n📊 Database Status:');
    console.log('💡 To check database contents, run: python check_database.py');

    // Test registration endpoint
    console.log('\n🔐 Authentication Test:');
    console.log('💡 To test full auth flow, run: node debug-repair-request.js');

    // Show the steps user needs to take
    console.log('\n📋 Required Steps for Repair Request Creation:');
    console.log('1. ✅ Backend is running');
    console.log('2. 🔄 Register a user account');
    console.log('3. 🔄 Login with that account');
    console.log('4. 🔄 Create repair request while logged in');

    console.log('\n🎯 If you\'re still having issues:');
    console.log('1. Make sure you\'re logged in first');
    console.log('2. Check browser console for specific errors');
    console.log('3. Try the registration/login flow again');

  } catch (error) {
    console.log('❌ Backend not accessible:', error.message);
  }
};

checkCurrentState();
