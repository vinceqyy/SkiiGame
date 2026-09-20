@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not on PATH. Run server.mjs using your Node.js installation.
  pause
  exit /b 1
)
echo Open http://127.0.0.1:5173 in your browser.
node server.mjs
pause
