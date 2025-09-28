@echo off
echo =========================================
echo Million Pixel Cube - Clean Install Script
echo =========================================

if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del /f /q package-lock.json
if exist .next rmdir /s /q .next
if exist .turbo rmdir /s /q .turbo

echo.
echo Installing dependencies fresh...
npm install

echo.
echo Done! You can now run "npm run dev"
