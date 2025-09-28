@echo off
REM =========================================
REM Git Auto Push Script
REM Usage: push.bat "Your commit message"
REM =========================================

if "%~1"=="" (
    echo ERROR: Please provide a commit message.
    echo Example: push.bat "Fix tsconfig path issues"
    exit /b 1
)

echo.
echo === Cleaning cached files (node_modules, .next, .turbo) from Git ===
git rm -r --cached node_modules .next .turbo package-lock.json >nul 2>&1

echo.
echo === Adding changes ===
git add .

echo.
echo === Committing changes ===
git commit -m "%~1"

echo.
echo === Pushing to GitHub main branch ===
git branch -M main
git push -u origin main

echo.
echo === Push complete! ===
pause
