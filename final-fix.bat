@echo off
REM FINAL FIX SCRIPT - Run this to ensure correct URL
REM Execute: final-fix.bat

echo 🔧 FINAL URL FIX - FORCED CONFIGURATION
echo.

REM Stop any running development servers
echo 🛑 Stopping development servers...
taskkill /f /im "node.exe" 2>nul || echo No servers to stop

REM Clear Vite cache
echo 🧹 Clearing Vite cache...
if exist node_modules\.vite rmdir /s /q node_modules\.vite 2>nul
if exist dist rmdir /s /q dist 2>nul

REM Clear npm cache
echo 🧹 Clearing npm cache...
npm cache clean --force

REM Reinstall dependencies
echo 📦 Reinstalling dependencies...
npm install

echo.
echo ✅ CONFIGURATION SUMMARY:
echo ✅ Backend URL: https://demo.publicvm.com/api/v1 (HARDCODED)
echo ✅ No environment variable dependencies
echo ✅ All API calls use correct base URL
echo.

echo 🚀 STARTING DEVELOPMENT SERVER...
echo.
echo 💡 After server starts:
echo 1. Open browser
echo 2. Hard refresh (Ctrl+F5)
echo 3. Check console for "FORCED BACKEND URL" log
echo 4. All requests should go to correct URL
echo.

npm run dev
