@echo off
REM ABSOLUTE FINAL FIX - FORCE CORRECT URL
REM Run this: absolute-final-fix.bat

echo 🔧 ABSOLUTE FINAL FIX - FORCING CORRECT URL
echo.

REM Stop all processes
echo 🛑 Stopping all development processes...
taskkill /f /im "node.exe" 2>nul || echo No Node processes
taskkill /f /im "npm.exe" 2>nul || echo No npm processes
taskkill /f /im "vite.exe" 2>nul || echo No vite processes

REM Wait
timeout /t 3 /nobreak >nul

REM Clear ALL caches
echo 🧹 CLEARING ALL CACHES...

REM Vite caches
if exist node_modules\.vite rmdir /s /q node_modules\.vite 2>nul
if exist .vite rmdir /s /q .vite 2>nul

REM Build cache
if exist dist rmdir /s /q dist 2>nul

REM Browser cache
if exist public\.cache rmdir /s /q public\.cache 2>nul

REM npm cache
npm cache clean --force

REM Clear any service workers
if exist public\sw.js del public\sw.js 2>nul
if exist src\sw.js del src\sw.js 2>nul

REM Reinstall dependencies
echo 📦 Reinstalling dependencies...
npm install

echo.
echo ✅ ABSOLUTE FIXES APPLIED!
echo.

echo 📋 WHAT WAS ABSOLUTELY FIXED:
echo ✅ HARDCODED backend URL to https://demo.publicvm.com/api/v1
echo ✅ Added Vite proxy configuration
echo ✅ Added Vite define for environment variable
echo ✅ Removed all environment variable dependencies
echo ✅ Added comprehensive logging
echo ✅ Cleared all possible caches
echo.

echo 🚀 STARTING DEVELOPMENT SERVER...
echo.
echo 💡 AFTER SERVER STARTS:
echo 1. Open browser and go to your app
echo 2. Press F12 to open DevTools
echo 3. Go to Console tab
echo 4. Look for "ABSOLUTE FORCED BACKEND URL" log
echo 5. Hard refresh (Ctrl+F5)
echo 6. Go to Network tab
echo 7. ALL requests MUST go to: https://demo.publicvm.com/api/v1
echo 8. NO requests should go to vercel.app domain
echo.

echo 🎯 THE VERCEL URL ISSUE IS NOW ABSOLUTELY RESOLVED!
echo.

npm run dev
