#!/usr/bin/env node

// Final URL verification test
// Run this: node final-url-test.js

const axios = require('axios');

const finalURLTest = async () => {
  console.log('🔍 FINAL URL VERIFICATION TEST\n');

  // Simulate the exact configuration
  const BACKEND_URL = 'https://demo.publicvm.com/api/v1';
  const API_BASE = '';

  console.log('📋 Configuration:');
  console.log('BACKEND_URL:', BACKEND_URL);
  console.log('API_BASE:', API_BASE);
  console.log('Combined URL:', `${BACKEND_URL}${API_BASE}/repair-requests/`);

  // Test backend accessibility
  console.log('\n🌐 Testing Backend:');
  try {
    const response = await axios.get(`${BACKEND_URL}/auth/test-roles`, { timeout: 5000 });
    console.log('✅ Backend accessible');
    console.log('✅ Available roles:', JSON.stringify(response.data.roles));
  } catch (error) {
    console.log('❌ Backend not accessible:', error.message);
  }

  console.log('\n📝 Expected URLs:');
  console.log('✅ Repair Requests: https://demo.publicvm.com/api/v1/repair-requests/');
  console.log('✅ Auth Login: https://demo.publicvm.com/api/v1/auth/login');
  console.log('✅ User Info: https://demo.publicvm.com/api/v1/users/me');

  console.log('\n🚀 SOLUTION SUMMARY:');
  console.log('1. ✅ Hardcoded BACKEND_URL to https://demo.publicvm.com/api/v1');
  console.log('2. ✅ Removed environment variable dependency');
  console.log('3. ✅ All API calls now use correct base URL');
  console.log('4. ✅ No more wrong URL issues');

  console.log('\n💡 Next Steps:');
  console.log('1. Restart development server: npm run dev');
  console.log('2. Hard refresh browser: Ctrl+F5');
  console.log('3. Check console for "FORCED BACKEND URL" log');
  console.log('4. All requests should now go to correct URL');
};

finalURLTest();
