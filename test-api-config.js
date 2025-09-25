#!/usr/bin/env node

// Simple test script to verify API configuration
// Run this from the frontend directory: node test-api-config.js

const axios = require('axios');

// Test the API configuration
const testAPIConfig = async () => {
  console.log('Testing API configuration...');

  // Get the base URL from environment variable
  const baseURL = process.env.VITE_API_BASE_URL || 'https://demo.publicvm.com/api/v1';
  console.log('Base URL:', baseURL);

  // Test a simple GET request to verify the endpoint is accessible
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
  }
};

testAPIConfig();
