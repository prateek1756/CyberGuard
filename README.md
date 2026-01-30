# CyberShakti

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7+-646cff.svg)](https://vitejs.dev/)

A modern, production-ready web application designed to help users stay safe online. CyberShakti provides comprehensive cybersecurity tools including real-time scam detection, AI-powered deepfake analysis, phishing protection, and educational safety tips.

## 🚀 Features

### Core Security Tools
- **Phishing Link Scanner**: Advanced heuristic risk scoring with URL analysis
- **Fraud Message Detector**: Text-based scam detection using AI and pattern matching
- **Fake Profile Verification**: Social media profile authenticity checking
- **Deepfake Detection**: AI-powered media analysis with TensorFlow CNN models
- **Scam Call Blocking**: Concept UI for call protection (mobile app planned)
- **Location-based Scam Alerts**: Real-time geolocation-based warnings
- **Daily Cyber Safety Tips**: Educational content and best practices

### AI & Machine Learning
- **Real-time AI Detection**: TensorFlow-based deepfake analysis
- **Self-Training Models**: Continuous improvement through user feedback
- **Facial Analysis**: MediaPipe landmark detection (300+ features)
- **Compression Analysis**: JPEG artifact detection for manipulation clues
- **Feedback Loop**: User corrections improve model accuracy over time

### User Experience
- **Beautiful Dark Theme**: Cyber-themed UI with teal/emerald accents
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Smooth Animations**: Framer Motion for engaging interactions
- **Progressive Web App**: Installable on mobile devices
- **Offline Support**: Core features work without internet

> ⚠️ **Important**: CyberShakti's scanners are heuristic demos for educational purposes and are NOT substitutes for professional security tools. Always verify with trusted sources.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 7
- **Routing**: React Router 6 (SPA)
- **Styling**: TailwindCSS 3 + shadcn/ui components
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **State Management**: TanStack Query + Zustand
- **3D Graphics**: Three.js + React Three Fiber

### Backend & APIs
- **Runtime**: Node.js 18+
- **Server**: Express.js 5
- **API**: RESTful with Zod schemas
- **AI Backend**: Python Flask/FastAPI
- **ML Framework**: TensorFlow + PyTorch
- **Database**: PostgreSQL (planned) + Redis cache
- **File Storage**: AWS S3 / Cloudinary

### Development & Testing
- **Package Manager**: pnpm
- **Testing**: Vitest + React Testing Library
- **Type Checking**: TypeScript
- **Linting**: ESLint + Prettier
- **CI/CD**: GitHub Actions (planned)

## 📁 Project Structure

```
cyberguard/
├── client/                    # React SPA
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # shadcn/ui primitives
│   │   ├── layout/          # SiteHeader, SiteFooter
│   │   └── motion/          # Animation components
│   ├── pages/               # Route components
│   │   ├── Index.tsx        # Homepage with hero
│   │   ├── Features.tsx     # Feature overview
│   │   ├── Scanner.tsx      # Security scanners
│   │   ├── DeepfakeDetection.tsx
│   │   ├── Tips.tsx         # Safety tips
│   │   └── Alerts.tsx       # Location alerts
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities and helpers
│   └── global.css           # Global styles
├── server/                   # Express server
│   ├── routes/              # API route handlers
│   └── index.ts             # Server entry point
├── python/                   # AI/ML backend
│   ├── api_server.py       # Flask API for AI models
│   ├── deepfake_detector.py # Deepfake detection logic
│   ├── models/              # ML model files
│   └── requirements.txt     # Python dependencies
├── shared/                   # Shared types/interfaces
├── public/                   # Static assets
├── netlify/                  # Serverless functions
└── dist/                     # Build output
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and pnpm
- Python 3.8+ (for AI features)
- Git

### Quick Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/prateek1756/CyberGuard.git
   cd cyberguard
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

   If lockfile issues occur:
   ```bash
   pnpm install --no-frozen-lockfile
   ```

3. **Setup AI Backend (Optional)**
   ```bash
   pnpm run setup:ai
   ```

4. **Start development server**
   ```bash
   pnpm dev
   ```

   The app will be available at `http://localhost:8080`

### Full Stack Development

For complete development with AI features:

```bash
# Terminal 1: AI Backend
cd python
python -m venv venv
venv\Scripts\activate.bat  # Windows
# or source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
python api_server.py

# Terminal 2: Frontend
pnpm dev
```

### Production Build

```bash
# Build for production
pnpm build

# Run production build locally
pnpm start

# Start full stack (frontend + AI backend)
pnpm run start:full
```

## 🧪 Testing & Quality

```bash
# Run tests
pnpm test

# Type checking
pnpm typecheck

# Format code
pnpm format.fix
```

## 🌐 API Endpoints

### AI Deepfake Detection API
- `POST /api/deepfake/analyze` - Analyze uploaded media for deepfakes
- `POST /api/deepfake/feedback` - Submit user feedback for model training
- `GET /api/deepfake/stats` - Get model performance statistics
- `POST /api/deepfake/retrain` - Trigger model retraining

### Security Scanner APIs
- `POST /api/scanner/phishing` - Scan URL for phishing risks
- `POST /api/scanner/fraud` - Analyze message for fraud patterns
- `GET /api/alerts/location` - Get location-based scam alerts

## 🎨 Customization

### Theming
Colors are defined as CSS variables in `client/global.css`. The cyber theme uses:
- Primary: Teal/Emerald (#0d9488)
- Accent: Aqua/Cyan (#06b6d4)
- Background: Dark slate (#0f172a)

### Adding New Features
1. Create components in `client/components/`
2. Add routes in `client/App.tsx`
3. Implement API endpoints in `server/routes/`
4. Update navigation in `client/components/layout/SiteHeader.tsx`

## 🚀 Deployment

### Netlify (Recommended)
```bash
pnpm build
# Deploy dist/ folder to Netlify
```

### Vercel
```bash
pnpm build
# Deploy dist/ folder to Vercel
```

### Docker (Future)
```bash
docker build -t cyberguard .
docker run -p 8080:8080 cyberguard
```

## 🗺️ Implementation Roadmap

### Phase 1: Core Features ✅
- Enhanced phishing scanner
- Improved fraud detection
- Dynamic safety tips
- Basic location alerts

### Phase 2: Advanced Features 🔄
- Fake profile verification
- Enhanced location system
- User authentication
- Admin dashboard

### Phase 3: AI & Mobile 📱
- Mobile app development
- Advanced deepfake detection
- Call blocking system
- Real-time analytics

### Phase 4: Scale & Polish 🚀
- Performance optimization
- Security hardening
- Compliance features
- Production deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Use TypeScript for all new code
- Follow React best practices
- Write tests for new features
- Update documentation
- Use conventional commits

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Security Disclaimer

CyberShakti is an educational demonstration project. The security tools provided are for learning purposes only and should not be relied upon for critical security decisions. Always consult professional security services and verify information with trusted sources.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [TailwindCSS](https://tailwindcss.com/) for utility-first styling
- [Framer Motion](https://www.framer.com/motion/) for animations
- [TensorFlow](https://www.tensorflow.org/) for machine learning
- [MediaPipe](https://mediapipe.dev/) for facial analysis

## 📞 Support

For questions or support:
- Open an issue on GitHub
- Check the [documentation](docs/) folder
- Join our [Discord community](https://discord.gg/cyberguard)

---

**Stay safe online! 🛡️**
#   C y b e r S h a k t i  
 