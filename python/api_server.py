from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import tempfile
from deepfake_detector import DeepfakeDetector
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Initialize detector
detector = DeepfakeDetector()
detector.load_training_data()

# Ensure upload directory exists
import tempfile
UPLOAD_DIR = os.path.join(tempfile.gettempdir(), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.route('/api/deepfake/analyze', methods=['POST'])
def analyze_deepfake():
    """Analyze uploaded image/video for deepfake detection"""
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Save uploaded file temporarily
        temp_path = os.path.join(UPLOAD_DIR, f"temp_{datetime.now().timestamp()}_{file.filename}")
        file.save(temp_path)
        
        try:
            # Analyze the file
            result = detector.detect_deepfake(temp_path)
            
            # Add metadata
            file_stats = os.stat(temp_path)
            result['metadata'] = {
                'filename': file.filename,
                'file_size': file_stats.st_size,
                'timestamp': datetime.now().isoformat()
            }
            
            return jsonify(result)
        
        finally:
            # Clean up temp file
            if os.path.exists(temp_path):
                os.remove(temp_path)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/deepfake/feedback', methods=['POST'])
def submit_feedback():
    """Submit feedback for model training"""
    try:
        data = request.get_json()
        
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400
        
        file = request.files['file']
        is_deepfake = data.get('is_deepfake', False)
        
        # Save file for training
        training_path = os.path.join(UPLOAD_DIR, f"training_{datetime.now().timestamp()}_{file.filename}")
        file.save(training_path)
        
        # Add to training data
        success = detector.add_training_sample(training_path, is_deepfake, retrain=True)
        
        if success:
            return jsonify({'message': 'Feedback submitted successfully'})
        else:
            return jsonify({'error': 'Could not process feedback'}), 400
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/deepfake/stats', methods=['GET'])
def get_stats():
    """Get model statistics"""
    try:
        stats = {
            'training_samples': len(detector.training_data),
            'model_loaded': detector.model is not None,
            'last_updated': datetime.now().isoformat()
        }
        return jsonify(stats)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/deepfake/retrain', methods=['POST'])
def retrain_model():
    """Manually trigger model retraining"""
    try:
        success = detector.retrain_model()
        if success:
            return jsonify({'message': 'Model retrained successfully'})
        else:
            return jsonify({'error': 'Not enough training data (minimum 10 samples)'}), 400
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("Starting Deepfake Detection API...")
    print("Make sure to install dependencies: pip install -r requirements.txt")
    app.run(host='0.0.0.0', port=5001, debug=True)