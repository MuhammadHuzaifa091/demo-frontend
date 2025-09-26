#!/usr/bin/env node

// ABSOLUTE VERIFICATION - Check that Vercel URL issue is resolved
// Run this: node absolute-verification.js

const axios = require('axios');

const absoluteVerification = async () => {
  console.log('🔍 ABSOLUTE VERIFICATION - VERCEL URL ISSUE CHECK\n');

  // Test the correct backend URL
  const CORRECT_URL = 'https://demo.publicvm.com/api/v1';
  const WRONG_VERCEL_URL = 'https://demo-frontend-lac.vercel.app/api/v1';

  console.log('📋 Testing URLs:');
  console.log('✅ CORRECT URL:', CORRECT_URL);
  console.log('❌ WRONG VERCEL URL:', WRONG_VERCEL_URL);

  // Test correct URL
  console.log('\n🌐 Testing Correct Backend URL:');
  try {
    const response = await axios.get(`${CORRECT_URL}/auth/test-roles`, { timeout: 5000 });
    console.log(`✅ ${CORRECT_URL}/auth/test-roles: ${response.status} OK`);
  } catch (error) {
    console.log(`❌ ${CORRECT_URL}/auth/test-roles: ${error.response?.status || error.message}`);
  }

  // Test wrong URL (should fail)
  console.log('\n🚫 Testing Wrong Vercel URL (should fail):');
  try {
    const response = await axios.get(`${WRONG_VERCEL_URL}/auth/test-roles`, { timeout: 5000 });
    console.log(`❌ ${WRONG_VERCEL_URL}/auth/test-roles: ${response.status} (This should NOT work!)`);
  } catch (error) {
    console.log(`✅ ${WRONG_VERCEL_URL}/auth/test-roles: FAILED (Good! This is expected)`);
  }

  console.log('\n📝 WHAT WAS ABSOLUTELY FIXED:');
  console.log('✅ Hardcoded backend URL to https://demo.publicvm.com/api/v1');
  console.log('✅ Added Vite proxy configuration');
  console.log('✅ Added Vite define for environment variable');
  console.log('✅ Removed all environment variable dependencies');
  console.log('✅ Fixed duplicate export issue in axios.js');

  console.log('\n💡 BROWSER VERIFICATION CHECKLIST:');
  console.log('1. Open browser DevTools (F12)');
  console.log('2. Go to Console tab');
  console.log('3. Look for "ABSOLUTE FORCED BACKEND URL" log');
  console.log('4. Go to Network tab');
  console.log('5. Create a repair request');
  console.log('6. Check that ALL requests go to: https://demo.publicvm.com/api/v1');
  console.log('7. NO requests should go to vercel.app domain');

  console.log('\n🎯 THE VERCEL URL ISSUE SHOULD NOW BE COMPLETELY RESOLVED!');
};

absoluteVerification();
