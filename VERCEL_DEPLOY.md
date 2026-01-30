# Deploying CyberGuard to Vercel

This project is configured for deployment on Vercel. It uses a hybrid approach:
- **Frontend**: React (Vite) deployed as a static site.
- **Backend (Node)**: Express server deployed as Serverless Functions.
- **Backend (Python)**: Flask server deployed as Serverless Functions.

## Prerequisites

1.  A [Vercel](https://vercel.com) account.
2.  Vercel CLI installed (optional, but recommended) or connected Git repository.

## Deployment Steps

### Option 1: Deploy via Git (Recommended)

1.  Push this code to a Git repository (GitHub, GitLab, Bitbucket).
2.  Import the project in Vercel.
3.  **Project Settings**:
    *   **Framework Preset**: Vercel should automatically detect "Vite".
    *   **Root Directory**: Leave as `./` (default).
    *   **Build Command**: `npm run build:client` (We only need to build the frontend assets. The API is built automatically by Vercel).
    *   **Output Directory**: `dist/spa` (IMPORTANT: Verify this matches `vite.config.ts`).
    *   **Install Command**: `npm install` (default).
4.  **Environment Variables**:
    *   Add any environment variables from `.env` (e.g., `PING_MESSAGE`).
    *   Note: Python dependencies are installed automatically from `api/requirements.txt`.
5.  Click **Deploy**.

### Option 2: Deploy via CLI

1.  Run `vercel` in the project root.
2.  Follow the prompts.
3.  When asked for settings, ensure:
    *   Output Directory: `dist/spa`

## Project Structure for Vercel

*   `vercel.json`: Configuration for rewrites and runtimes.
*   `api/`: Contains entry points for Serverless Functions.
    *   `index.ts`: Entry point for the Node.js Express API.
    *   `py_index.py`: Entry point for the Python Flask API.
    *   `requirements.txt`: Python dependencies for Vercel.

## Limitations on Vercel

*   **Filesystem**: The filesystem is read-only (except `/tmp`).
    *   Image uploads are handled in `/tmp`.
    *   **Model Training**: The Deepfake detection model cannot be persistently retrained on Vercel. Any training data added via the feedback API will be lost when the function shuts down.
    *   **Model Loading**: If you want to use a pre-trained model, ensure `models/deepfake_detector.pkl` is committed to the repository.
*   **Execution Time**: Serverless functions have a timeout (usually 10s-60s). Deepfake analysis of large files might time out.

## Troubleshooting

*   **404 on API**: Check `vercel.json` rewrites and ensure the `api` folder files are present.
*   **Python Errors**: Check the Function Logs in Vercel dashboard. Ensure `opencv-python-headless` is used (already configured in `api/requirements.txt`).
