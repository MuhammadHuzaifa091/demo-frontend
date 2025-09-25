// Debug environment variables
console.log('=== Environment Debug ===');
console.log('NODE_ENV:', import.meta.env.MODE);
console.log('PROD:', import.meta.env.PROD);
console.log('DEV:', import.meta.env.DEV);
console.log('VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
console.log('All env vars:', import.meta.env);
console.log('========================');

export const debugEnv = () => {
  const baseURL = import.meta.env.PROD 
    ? (import.meta.env.VITE_API_BASE_URL || 'https://your-backend-url.com')
    : '';
  
  console.log('Computed baseURL:', baseURL);
  return baseURL;
};
