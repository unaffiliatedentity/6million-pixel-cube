@echo off
echo === Cleaning node_modules and package-lock.json ===

REM Remove node_modules folder
if exist node_modules (
  rmdir /s /q node_modules
  echo Deleted node_modules
)

REM Remove package-lock.json
if exist package-lock.json (
  del /f /q package-lock.json
  echo Deleted package-lock.json
)

echo === Reinstalling packages ===
npm install

echo === Done! ===
pause
