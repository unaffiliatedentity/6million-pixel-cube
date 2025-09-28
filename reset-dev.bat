@echo off
echo =========================================
echo Million Pixel Cube - Dev Helper Script
echo =========================================
echo.
echo Choose an option:
echo   1. Clean only (remove node_modules, .next, .turbo, package-lock.json)
echo   2. Clean + reinstall + run npm dev
echo   3. Run npm dev only (no cleaning/reinstall)
echo.

set /p choice="Enter choice (1, 2, or 3): "

if "%choice%"=="1" (
    if exist node_modules rmdir /s /q node_modules
    if exist package-lock.json del /f /q package-lock.json
    if exist .next rmdir /s /q .next
    if exist .turbo rmdir /s /q .turbo
    echo.
    echo Clean complete. Exiting.
    goto end
)

if "%choice%"=="2" (
    if exist node_modules rmdir /s /q node_modules
    if exist package-lock.json del /f /q package-lock.json
    if exist .next rmdir /s /q .next
    if exist .turbo rmdir /s /q .turbo
    echo.
    echo Installing dependencies...
    npm install
    echo.
    echo Starting dev server...
    npm run dev
    goto end
)

if "%choice%"=="3" (
    echo.
    echo Starting dev server without cleaning...
    npm run dev
    goto end
)

echo Invalid choice. Please run the script again and select 1, 2, or 3.

:end
