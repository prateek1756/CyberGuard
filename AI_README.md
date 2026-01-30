# CyberShakti AI Deepfake Detection

## Quick Setup

1. **Setup AI Backend:**
   ```bash
   pnpm run setup:ai
   ```

2. **Start Full Application:**
   ```bash
   pnpm run start:full
   ```

## Manual Setup

### Python Environment Setup
```bash
cd python
python -m venv venv
venv\Scripts\activate.bat
pip install -r requirements.txt
```

### Start Services
```bash
# Terminal 1 - AI Backend
cd python
venv\Scripts\activate.bat
python api_server.py

# Terminal 2 - Frontend
pnpm dev
```

## Features

- **Real-time AI Detection**: Uses TensorFlow CNN model
- **Self-Training**: Model improves with user feedback
- **Facial Analysis**: MediaPipe facial landmark detection
- **Compression Analysis**: JPEG artifact detection
- **Feedback Loop**: Users can correct predictions to improve accuracy

## API Endpoints

- `POST /api/deepfake/analyze` - Analyze uploaded media
- `POST /api/deepfake/feedback` - Submit training feedback
- `GET /api/deepfake/stats` - Get model statistics
- `POST /api/deepfake/retrain` - Trigger model retraining

## Model Architecture

- CNN with 3 convolutional layers
- Facial landmark feature extraction (300 features)
- Compression artifact analysis
- Combined scoring system
- Continuous learning from feedback

## Usage

1. Upload image/video file
2. AI analyzes for deepfake indicators
3. Review results and confidence score
4. Provide feedback to improve model
5. Model automatically retrains with new data

The system learns and improves accuracy over time through user feedback.