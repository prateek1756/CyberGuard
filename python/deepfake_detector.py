import cv2
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import os
import json
import pickle
from datetime import datetime

class DeepfakeDetector:
    def __init__(self, model_path="models/deepfake_detector.pkl"):
        self.model_path = model_path
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.training_data = []
        self.labels = []
        self.load_or_create_model()
    
    def load_or_create_model(self):
        """Load existing model or create new one"""
        if os.path.exists(self.model_path):
            try:
                with open(self.model_path, 'rb') as f:
                    self.model = pickle.load(f)
                print("Loaded existing model")
            except:
                print("Created new model")
        else:
            try:
                os.makedirs(os.path.dirname(self.model_path), exist_ok=True)
            except OSError:
                print("Warning: Could not create model directory (likely read-only filesystem). Running in ephemeral mode.")
            print("Created new model")
    
    def extract_features(self, image_path):
        """Extract image features for analysis"""
        image = cv2.imread(image_path)
        if image is None:
            return None
        
        # Resize to standard size
        image = cv2.resize(image, (128, 128))
        
        # Convert to different color spaces
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
        
        features = []
        
        # Basic statistics
        features.extend([
            np.mean(gray), np.std(gray), np.var(gray),
            np.mean(hsv[:,:,0]), np.mean(hsv[:,:,1]), np.mean(hsv[:,:,2])
        ])
        
        # Edge detection
        edges = cv2.Canny(gray, 50, 150)
        features.extend([np.sum(edges), np.mean(edges)])
        
        # Texture analysis using LBP-like features
        hist = cv2.calcHist([gray], [0], None, [256], [0, 256])
        features.extend(hist.flatten()[:50])  # First 50 histogram bins
        
        # Compression artifacts (DCT analysis)
        dct = cv2.dct(np.float32(gray))
        features.extend([
            np.sum(np.abs(dct[:32, :32])),  # Low frequency
            np.sum(np.abs(dct[32:, 32:]))   # High frequency
        ])
        
        return np.array(features)
    
    def analyze_compression_artifacts(self, image_path):
        """Analyze JPEG compression artifacts"""
        image = cv2.imread(image_path)
        if image is None:
            return 0.0
        
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        dct = cv2.dct(np.float32(gray))
        
        high_freq = np.sum(np.abs(dct[32:, 32:]))
        total_energy = np.sum(np.abs(dct))
        
        artifact_score = high_freq / (total_energy + 1e-8)
        return artifact_score
    
    def detect_deepfake(self, image_path):
        """Main detection function"""
        features = self.extract_features(image_path)
        if features is None:
            return {
                'is_deepfake': False,
                'confidence': 0.0,
                'error': 'Could not process image'
            }
        
        # Model prediction
        try:
            if len(self.training_data) > 0:
                prediction_proba = self.model.predict_proba([features])[0]
                prediction = prediction_proba[1] if len(prediction_proba) > 1 else 0.5
            else:
                prediction = 0.3  # Default for untrained model
        except:
            prediction = 0.3
        
        # Compression analysis
        compression_score = self.analyze_compression_artifacts(image_path)
        
        # File size heuristic
        file_size = os.path.getsize(image_path)
        size_factor = 0.1 if file_size < 50000 else 0.0
        
        # Combine scores
        final_score = (prediction * 0.7) + (compression_score * 0.2) + size_factor
        
        is_deepfake = final_score > 0.5
        confidence = abs(final_score - 0.5) * 2
        
        return {
            'is_deepfake': is_deepfake,
            'confidence': float(confidence),
            'raw_score': float(final_score),
            'compression_artifacts': float(compression_score),
            'model_prediction': float(prediction)
        }
    
    def add_training_sample(self, image_path, is_deepfake, retrain=False):
        """Add sample to training data and optionally retrain"""
        features = self.extract_features(image_path)
        if features is None:
            return False
        
        self.training_data.append(features)
        self.labels.append(1 if is_deepfake else 0)
        
        self.save_training_data()
        
        if retrain and len(self.training_data) >= 10:
            self.retrain_model()
        
        return True
    
    def retrain_model(self):
        """Retrain model with new data"""
        if len(self.training_data) < 10:
            return False
        
        X = np.array(self.training_data)
        y = np.array(self.labels)
        
        # Train model
        self.model.fit(X, y)
        
        # Save updated model
        with open(self.model_path, 'wb') as f:
            pickle.dump(self.model, f)
        
        print(f"Model retrained with {len(self.training_data)} samples")
        return True
    
    def save_training_data(self):
        """Save training data to disk"""
        data_path = "models/training_data.pkl"
        os.makedirs(os.path.dirname(data_path), exist_ok=True)
        
        with open(data_path, 'wb') as f:
            pickle.dump({
                'training_data': self.training_data,
                'labels': self.labels,
                'timestamp': datetime.now().isoformat()
            }, f)
    
    def load_training_data(self):
        """Load training data from disk"""
        data_path = "models/training_data.pkl"
        if os.path.exists(data_path):
            try:
                with open(data_path, 'rb') as f:
                    data = pickle.load(f)
                    self.training_data = data['training_data']
                    self.labels = data['labels']
                    print(f"Loaded {len(self.training_data)} training samples")
            except:
                print("Could not load training data")

if __name__ == "__main__":
    detector = DeepfakeDetector()
    detector.load_training_data()