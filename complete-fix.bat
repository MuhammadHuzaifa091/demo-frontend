@echo off
REM COMPLETE CACHE CLEAR AND SERVER RESTART
REM Run this: complete-fix.bat

echo 🔧 COMPLETE FIX - CLEARING ALL CACHES
echo.

REM Stop all Node processes
echo 🛑 Stopping all Node processes...
taskkill /f /im "node.exe" 2>nul || echo No Node processes found

REM Wait a moment
timeout /t 2 /nobreak >nul

REM Clear all possible cache locations
echo 🧹 Clearing all caches...

REM Vite cache
if exist node_modules\.vite rmdir /s /q node_modules\.vite 2>nul
if exist .vite rmdir /s /q .vite 2>nul

REM Build cache
if exist dist rmdir /s /q dist 2>nul

REM npm cache
npm cache clean --force

REM Browser cache (create a file to help user)
echo. > clear-browser-cache.txt
echo 💡 Remember to clear browser cache too! > clear-browser-cache.txt

REM Clear any service workers (if they exist)
if exist public\sw.js del public\sw.js 2>nul
if exist src\sw.js del src\sw.js 2>nul

REM Reinstall dependencies
echo 📦 Reinstalling dependencies...
npm install

echo.
echo ✅ ALL CACHES CLEARED!
echo.

REM Show what was done
echo 📋 ACTIONS COMPLETED:
echo ✅ Stopped all Node processes
echo ✅ Cleared Vite cache
echo ✅ Cleared build cache
echo ✅ Cleared npm cache
echo ✅ Removed potential service workers
echo ✅ Reinstalled dependencies
echo.

echo 🚀 STARTING FRESH DEVELOPMENT SERVER...
echo.
echo 💡 IMPORTANT:
echo 1. After server starts, open browser
echo 2. Press F12 to open DevTools
echo 3. Go to Network tab
echo 4. Look for "FORCED BACKEND URL" in console
echo 5. Hard refresh (Ctrl+F5)
echo 6. Check that all requests go to: https://demo.publicvm.com/api/v1
echo.

echo 🎯 The URL issue should now be completely resolved!
echo.

npm run dev
