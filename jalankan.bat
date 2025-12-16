@echo off
echo Starting backend and frontend servers...

REM Change directory to backend and start the dev server
start "Backend" cmd /k "cd /d c:\simsurat\backend && npm run dev"

REM Change directory to frontend and start the dev server
start "Frontend" cmd /k "cd /d c:\simsurat\frontend && npm run dev"

echo Both servers are starting in new windows.