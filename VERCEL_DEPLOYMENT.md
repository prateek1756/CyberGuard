# Vercel Deployment Guide for CyberShakti

This project is now fully configured for easy deployment to Vercel.

## Quick Deploy

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to Git Repository**
   - Push your code to GitHub, GitLab, or Bitbucket
   - Make sure all changes are committed

2. **Import Project in Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your Git repository
   - Vercel will automatically detect the configuration from `vercel.json`

3. **Configure Environment Variables**
   - In Project Settings → Environment Variables, add:
     - `VIRUSTOTAL_API_KEY` (optional, for URL scanning)
     - `URLVOID_API_KEY` (optional, for URL scanning)
     - `GOOGLE_SAFE_BROWSING_API_KEY` (optional, for URL scanning)
     - `PING_MESSAGE` (optional, custom API message)

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically:
     - Install dependencies (`npm install`)
     - Build the frontend (`npm run build:client`)
     - Set up serverless functions for API routes

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# For production deployment
vercel --prod
```

## Project Structure

The project is configured as follows:

```
├── api/
│   ├── index.ts          # Node.js/Express API handler
│   ├── py_index.py       # Python/Flask API handler
│   └── requirements.txt  # Python dependencies
├── client/               # React frontend
├── server/               # Express server code
├── python/               # Python API code
├── vercel.json           # Vercel configuration
└── .vercelignore         # Files to exclude from deployment
```

## Configuration Details

### Build Settings (in vercel.json)
- **Build Command**: `npm run build:client`
- **Output Directory**: `dist/spa`
- **Framework**: Vite (auto-detected)

### API Routes

#### Node.js API (`/api/*`)
- Handles: `/api/ping`, `/api/demo`, `/api/scanner/*`
- Runtime: Node.js 18+
- Max Duration: 30 seconds
- Entry: `api/index.ts`

#### Python API (`/api/deepfake/*`)
- Handles: `/api/deepfake/analyze`, `/api/deepfake/feedback`, etc.
- Runtime: Python 3.11
- Max Duration: 60 seconds
- Entry: `api/py_index.py`
- Includes: `python/**` directory

### Frontend
- React SPA with React Router
- All routes except `/api/*` are served from `index.html`
- Static assets served from `dist/spa`

## Environment Variables

Add these in Vercel Dashboard → Project Settings → Environment Variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `VIRUSTOTAL_API_KEY` | VirusTotal API key for URL scanning | No |
| `URLVOID_API_KEY` | URLVoid API key for URL scanning | No |
| `GOOGLE_SAFE_BROWSING_API_KEY` | Google Safe Browsing API key | No |
| `PING_MESSAGE` | Custom message for `/api/ping` endpoint | No |

## Deployment Checklist

- [ ] Code pushed to Git repository
- [ ] Environment variables configured in Vercel
- [ ] Build command works locally (`npm run build:client`)
- [ ] All dependencies listed in `package.json` and `api/requirements.txt`
- [ ] Python models (if any) are committed to repository

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Verify `npm run build:client` works locally
- Ensure all dependencies are in `package.json`

### API Routes Return 404
- Verify `api/index.ts` and `api/py_index.py` exist
- Check `vercel.json` rewrites configuration
- Ensure routes match the rewrite patterns

### Python Function Errors
- Check Function Logs in Vercel dashboard
- Verify `api/requirements.txt` includes all dependencies
- Ensure Python code uses `/tmp` for file operations (not persistent storage)

### Frontend Routes Not Working
- Verify `vercel.json` has catch-all rewrite: `{ "source": "/(.*)", "destination": "/index.html" }`
- Check that React Router is configured correctly

## Limitations

1. **File System**: Serverless functions have read-only filesystem (except `/tmp`)
   - Uploads must use `/tmp` directory
   - Model training data will be lost between function invocations

2. **Execution Time**: 
   - Node.js functions: 30 seconds max
   - Python functions: 60 seconds max
   - Large file processing may timeout

3. **Cold Starts**: First request after inactivity may be slower

4. **Model Persistence**: Deepfake detection models cannot be persistently trained on Vercel. Pre-trained models must be committed to the repository.

## Post-Deployment

After successful deployment:

1. Test all API endpoints
2. Verify frontend routes work correctly
3. Check environment variables are loaded
4. Monitor function logs for any errors
5. Set up custom domain (optional)

## Support

For issues or questions:
- Check Vercel documentation: https://vercel.com/docs
- Review function logs in Vercel dashboard
- Check build logs for errors
