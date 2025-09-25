@echo off
REM Fix URL Configuration Script for Windows
REM Run this: fix-url.bat

echo 🔧 Fixing URL Configuration...

REM Stop any running dev servers
echo 🛑 Stopping development servers...
taskkill /f /im "node.exe" 2>nul || echo No dev servers running

REM Clear Vite cache
echo 🧹 Clearing Vite cache...
if exist node_modules\.vite rmdir /s /q node_modules\.vite
if exist dist rmdir /s /q dist

REM Reinstall dependencies to ensure clean state
echo 📦 Reinstalling dependencies...
npm install

echo ✅ Configuration fixed!
echo.
echo 🚀 Next steps:
echo 1. Start the development server: npm run dev
echo 2. Open browser and hard refresh (Ctrl+F5)
echo 3. Check browser console for debug logs
echo 4. The correct URL should be: https://demo.publicvm.com/api/v1
echo.
pause
