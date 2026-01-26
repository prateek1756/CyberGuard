@echo off
echo Starting CyberGuard with AI Deepfake Detection...

echo.
echo Starting Python AI Backend...
start "AI Backend" cmd /k "cd python && venv\Scripts\activate.bat && python api_server.py"

echo.
echo Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo.
echo Starting Frontend...
start "Frontend" cmd /k "pnpm dev"

echo.
echo CyberGuard is starting up...
echo Frontend: http://localhost:8080
echo AI Backend: http://localhost:5001
echo.
echo Press any key to close this window...
pause > nul