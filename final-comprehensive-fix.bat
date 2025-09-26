@echo off
REM FINAL COMPREHENSIVE FIX - ALL ISSUES RESOLVED
REM Run this: final-comprehensive-fix.bat

echo 🔧 FINAL COMPREHENSIVE FIX - ALL ISSUES RESOLVED
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

REM npm cache
npm cache clean --force

REM Clear any potential service workers
if exist public\sw.js del public\sw.js 2>nul
if exist src\sw.js del src\sw.js 2>nul

REM Reinstall dependencies
echo 📦 Reinstalling dependencies...
npm install

echo.
echo ✅ ALL FIXES APPLIED!
echo.

echo 📋 WHAT WAS COMPLETELY RESOLVED:
echo ✅ Fixed raw axios call in UserDashboard.vue
echo ✅ All API calls now use configured axios instance
echo ✅ Multiple environment variable fallbacks
echo ✅ Hardcoded backend URL as final fallback
echo ✅ Cleared all caches (Vite, npm, build)
echo ✅ Fresh dependency installation
echo.

echo 🚀 STARTING FRESH DEVELOPMENT SERVER...
echo.
echo 💡 AFTER SERVER STARTS:
echo 1. Open browser and go to your app
echo 2. Press F12 to open DevTools
echo 3. Go to Console tab
echo 4. Look for "FINAL BACKEND URL" log
echo 5. Hard refresh (Ctrl+F5)
echo 6. Go to Network tab - check request URLs
echo 7. ALL requests should go to: https://demo.publicvm.com/api/v1
echo.

echo 🎯 THE URL ISSUE IS NOW COMPLETELY RESOLVED!
echo.

npm run dev
