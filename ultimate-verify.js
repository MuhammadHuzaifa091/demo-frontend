#!/usr/bin/env node

// Ultimate verification test
// Run this after ultimate-fix.bat: node ultimate-verify.js

const axios = require('axios');

const ultimateVerify = async () => {
  console.log('🔍 ULTIMATE VERIFICATION TEST\n');

  // Test multiple possible URLs
  const testURLs = [
    'https://demo.publicvm.com/api/v1/auth/test-roles',
    'https://demo.publicvm.com/auth/test-roles', // without /api/v1
    'https://demo.publicvm.com/api/v1/repair-requests/my-requests'
  ];

  console.log('📋 Testing Multiple URL Configurations:');

  for (const url of testURLs) {
    try {
      const response = await axios.get(url, { timeout: 5000 });
      console.log(`✅ ${url}: ${response.status} OK`);
    } catch (error) {
      console.log(`❌ ${url}: ${error.response?.status || error.message}`);
    }
  }

  console.log('\n📝 EXPECTED BEHAVIOR:');
  console.log('✅ Backend should be accessible at: https://demo.publicvm.com/api/v1');
  console.log('✅ Frontend should send ALL requests to correct URL');
  console.log('✅ No more wrong URL issues');

  console.log('\n💡 BROWSER VERIFICATION:');
  console.log('1. Check console for "FINAL BACKEND URL"');
  console.log('2. Check Network tab for request URLs');
  console.log('3. All API calls should go to https://demo.publicvm.com/api/v1');
  console.log('4. No requests should go to vercel.app domain');

  console.log('\n🎯 If still wrong:');
  console.log('- Try incognito/private browsing');
  console.log('- Check if there are service workers');
  console.log('- Clear ALL browser data');
};

ultimateVerify();
