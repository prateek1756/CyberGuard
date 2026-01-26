@echo off
echo Setting up CyberGuard Deepfake Detection...

echo Creating Python virtual environment...
python -m venv venv

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing dependencies...
pip install -r requirements.txt

echo Creating necessary directories...
mkdir models 2>nul
mkdir uploads 2>nul

echo Setup complete!
echo.
echo To start the deepfake detection API:
echo 1. cd python
echo 2. venv\Scripts\activate.bat
echo 3. python api_server.py
echo.
echo The API will run on http://localhost:5001
pause