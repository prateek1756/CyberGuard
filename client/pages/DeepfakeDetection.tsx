import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Camera, Upload, AlertTriangle, CheckCircle, XCircle, Brain, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface AnalysisResult {
  is_deepfake: boolean;
  confidence: number;
  raw_score: number;
  compression_artifacts: number;
  model_prediction: number;
  metadata?: {
    filename: string;
    file_size: number;
    timestamp: string;
  };
  error?: string;
}

interface ModelStats {
  training_samples: number;
  model_loaded: boolean;
  last_updated: string;
}

export default function DeepfakeDetection() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [stats, setStats] = useState<ModelStats | null>(null);
  const [apiConnected, setApiConnected] = useState(false);
  const { toast } = useToast();

  // Check API connection on mount
  useEffect(() => {
    checkApiConnection();
  }, []);

  const checkApiConnection = async () => {
    try {
      const response = await fetch('/api/deepfake/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
        setApiConnected(true);
      }
    } catch (error) {
      setApiConnected(false);
    }
  };

  const analyzeFile = useCallback(async (file: File) => {
    if (!apiConnected) {
      toast({
        title: "API Not Connected",
        description: "Please start the Python API server first.",
        variant: "destructive"
      });
      return;
    }

    setAnalyzing(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/deepfake/analyze', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Analysis failed');
      }
      
      const data = await response.json();
      setResult(data);
      
      toast({
        title: "Analysis Complete",
        description: `Detection confidence: ${(data.confidence * 100).toFixed(1)}%`
      });
      
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Could not analyze the file. Check API connection.",
        variant: "destructive"
      });
      setResult({
        is_deepfake: false,
        confidence: 0,
        raw_score: 0,
        compression_artifacts: 0,
        model_prediction: 0,
        error: 'API connection failed'
      });
    } finally {
      setAnalyzing(false);
    }
  }, [apiConnected, toast]);

  const submitFeedback = async (isCorrect: boolean) => {
    if (!file || !result) return;
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('is_deepfake', JSON.stringify(!isCorrect ? !result.is_deepfake : result.is_deepfake));
      
      const response = await fetch('/api/deepfake/feedback', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        toast({
          title: "Feedback Submitted",
          description: "Thank you! The model will learn from this."
        });
        checkApiConnection(); // Refresh stats
      }
    } catch (error) {
      toast({
        title: "Feedback Failed",
        description: "Could not submit feedback.",
        variant: "destructive"
      });
    }
  };

  const handleFileSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile);
    setResult(null);
    
    // Create preview for images
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
    
    analyzeFile(selectedFile);
  }, [analyzeFile]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFileSelect(droppedFile);
  }, [handleFileSelect]);

  return (
    <div className="container max-w-4xl py-8 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Camera className="h-8 w-8 text-primary" />
          AI Deepfake Detection
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Advanced deepfake detection using machine learning with self-training capabilities.
          Upload images or videos for real-time analysis.
        </p>
      </div>

      {/* API Status */}
      <Card className={cn(
        "border-2",
        apiConnected ? "border-green-500/20 bg-green-500/5" : "border-red-500/20 bg-red-500/5"
      )}>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={cn(
                "w-3 h-3 rounded-full",
                apiConnected ? "bg-green-500" : "bg-red-500"
              )} />
              <span className="font-medium">
                {apiConnected ? "AI Model Connected" : "AI Model Disconnected"}
              </span>
            </div>
            {stats && (
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Brain className="h-4 w-4" />
                  {stats.training_samples} samples
                </span>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={checkApiConnection}
                >
                  Refresh
                </Button>
              </div>
            )}
          </div>
          {!apiConnected && (
            <p className="text-sm text-muted-foreground mt-2">
              Run: <code className="bg-muted px-1 rounded">cd python && python api_server.py</code>
            </p>
          )}
        </CardContent>
      </Card>

      {/* File Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Media</CardTitle>
          <CardDescription>
            Supports images (JPG, PNG, WebP) and videos (MP4, WebM, MOV)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2">
              Drop your file here or click to browse
            </p>
            <p className="text-sm text-muted-foreground">
              Maximum file size: 50MB
            </p>
            <input
              id="file-input"
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                if (selectedFile) handleFileSelect(selectedFile);
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* File Info */}
      {file && (
        <Card>
          <CardHeader>
            <CardTitle>File Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              {preview && (
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="w-24 h-24 object-cover rounded-lg border"
                />
              )}
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(file.size)} • {file.type}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Progress */}
      {analyzing && (
        <Card>
          <CardContent className="py-8">
            <div className="text-center space-y-4">
              <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto" />
              <p className="text-lg font-medium">AI Analysis in Progress...</p>
              <p className="text-sm text-muted-foreground">
                Analyzing facial landmarks, compression artifacts, and temporal consistency
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {result.error ? (
                <XCircle className="h-5 w-5 text-red-500" />
              ) : result.is_deepfake ? (
                <AlertTriangle className="h-5 w-5 text-red-500" />
              ) : (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
              Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {result.error ? (
              <div className="text-red-500">
                Error: {result.error}
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Verdict:</span>
                  <VerdictBadge 
                    isDeepfake={result.is_deepfake} 
                    confidence={result.confidence} 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>Model Score: {(result.model_prediction * 100).toFixed(1)}%</div>
                  <div>Compression Artifacts: {(result.compression_artifacts * 100).toFixed(1)}%</div>
                  <div>Final Score: {(result.raw_score * 100).toFixed(1)}%</div>
                  <div>Confidence: {(result.confidence * 100).toFixed(1)}%</div>
                </div>

                {/* Feedback Buttons */}
                <div className="flex gap-2 pt-4">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => submitFeedback(true)}
                    className="flex items-center gap-1"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Correct
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => submitFeedback(false)}
                    className="flex items-center gap-1"
                  >
                    <XCircle className="h-4 w-4" />
                    Incorrect
                  </Button>
                </div>
              </>
            )}

            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground">
                <strong>Self-Learning AI:</strong> This model improves with your feedback. 
                Click "Correct" or "Incorrect" to help train the system.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function VerdictBadge({ isDeepfake, confidence }: { isDeepfake: boolean, confidence: number }) {
  const style = isDeepfake 
    ? "bg-red-500/15 text-red-300 ring-red-500/30"
    : "bg-green-500/15 text-green-300 ring-green-500/30";
  
  const label = isDeepfake ? "Likely Deepfake" : "Likely Authentic";

  return (
    <span className={cn(
      "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs ring-1",
      style
    )}>
      <span className="font-semibold">{label}</span>
      <span className="text-foreground/60">{(confidence * 100).toFixed(1)}%</span>
    </span>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}