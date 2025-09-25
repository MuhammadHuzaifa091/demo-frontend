@echo off
echo Clearing build artifacts and rebuilding...

REM Remove dist folder
if exist dist rmdir /s /q dist

REM Remove node_modules/.vite cache
if exist node_modules\.vite rmdir /s /q node_modules\.vite

REM Clear npm cache
npm cache clean --force

echo Building for production...
npm run build

echo Done! Build artifacts cleared and rebuilt.
pause
