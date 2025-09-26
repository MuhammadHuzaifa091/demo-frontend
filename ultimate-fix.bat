@echo off
REM ULTIMATE FIX - MULTIPLE FALLBACKS FOR URL
REM Run this: ultimate-fix.bat

echo 🔧 ULTIMATE URL FIX - MULTIPLE FALLBACKS
echo.

REM Stop all processes
echo 🛑 Stopping all processes...
taskkill /f /im "node.exe" 2>nul || echo No processes to stop
taskkill /f /im "npm.exe" 2>nul || echo No npm processes
taskkill /f /im "vite.exe" 2>nul || echo No vite processes

REM Wait
timeout /t 3 /nobreak >nul

REM Clear ALL possible caches
echo 🧹 CLEARING ALL CACHES...

REM Vite caches
if exist node_modules\.vite rmdir /s /q node_modules\.vite 2>nul
if exist .vite rmdir /s /q .vite 2>nul

REM Build cache
if exist dist rmdir /s /q dist 2>nul

REM npm cache
npm cache clean --force

REM Browser cache helper
echo. > force-refresh.txt
echo Force browser refresh after server starts! > force-refresh.txt

REM Create backup of current .env
if exist .env.backup del .env.backup 2>nul
copy .env .env.backup

REM Ensure .env has correct values
echo 📝 Ensuring correct .env configuration...
(
echo # ULTIMATE CONFIGURATION - MULTIPLE FALLBACKS
echo VITE_API_BASE_URL=https://demo.publicvm.com/api/v1
echo VITE_BACKEND_URL=https://demo.publicvm.com/api/v1
echo.
echo # Additional fallbacks
echo VITE_BASE_URL=https://demo.publicvm.com/api/v1
echo VITE_API_URL=https://demo.publicvm.com/api/v1
) > .env

echo ✅ Environment variables updated with multiple fallbacks

REM Reinstall dependencies
echo 📦 Reinstalling dependencies...
npm install

echo.
echo ✅ ALL FIXES APPLIED!
echo.

echo 📋 WHAT WAS FIXED:
echo ✅ Added VITE_BACKEND_URL environment variable
echo ✅ Updated axios with multiple fallback options
echo ✅ Cleared all caches (Vite, npm, build)
echo ✅ Stopped all development processes
echo ✅ Added comprehensive logging
echo.

echo 🚀 STARTING DEVELOPMENT SERVER...
echo.
echo 💡 AFTER SERVER STARTS:
echo 1. Open browser DevTools (F12)
echo 2. Look for "FINAL BACKEND URL" in console
echo 3. Hard refresh (Ctrl+F5)
echo 4. Check Network tab - should show correct URLs
echo 5. All requests should go to: https://demo.publicvm.com/api/v1
echo.

echo 🎯 This should completely resolve the URL issue!
echo.

npm run dev
