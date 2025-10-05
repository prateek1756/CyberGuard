# CyberGuard

A modern, production-ready web app to help users stay safe online. CyberGuard brings real-time protection concepts like scam call blocking, phishing link scanning, fraud message detection, fake profile verification, deepfake detection UI, daily safety tips, and location-based scam alerts.

Live preview (dev server): https://0db186e11da441b88a741dcc9064b1a9-d34958168a3544b0b313bd18e.projects.builder.codes

## Features

- Scam call blocking (concept UI)
- Phishing link scanner (heuristic risk scoring)
- Fraud message detector (text heuristics)
- Fake profile verification (concept)
- Deepfake detection (upload UI preview)
- Daily cyber safety tips
- Location-based scam alerts (browser geolocation)
- Beautiful dark theme, responsive layout, tasteful animations (framer‑motion + Tailwind keyframes)

> Important: The scanners are heuristic demos for educational purposes and are NOT a substitute for professional security tools.

## Tech Stack

- React 18 + TypeScript + Vite 7
- React Router 6 (SPA)
- TailwindCSS 3 + shadcn/ui primitives + Lucide icons
- Framer Motion for animations
- Express (integrated for API when needed)
- Vitest for tests

## Project Structure

```
client/        # React SPA
  pages/       # Routes (Index = home, plus below)
    Index.tsx  # Animated hero + feature highlights
    Features.tsx
    Scanner.tsx
    Tips.tsx
    Alerts.tsx
  components/  # UI primitives & layout (SiteHeader, SiteFooter)
server/        # Express server (optional APIs)
shared/        # Types shared between client/server
```

## Getting Started

Prereqs: Node 18+ and pnpm.

1. Install deps

```
pnpm install
```

If your environment enforces frozen lockfiles and install fails, run:

```
pnpm install --no-frozen-lockfile
```

2. Start dev server

```
pnpm dev
```

The app runs at http://localhost:8080

3. Build for production

```
pnpm build
```

4. Run production build locally

```
pnpm start
```

5. Tests and typechecks

```
pnpm test
pnpm typecheck
```

## Routes

- `/` — Homepage (animated hero, highlights)
- `/features` — All features grid
- `/scanner` — Phishing URL scanner + fraud message detector
- `/tips` — Daily safety tips
- `/alerts` — Location-based scam alerts (uses browser geolocation)

## Theming

Tailwind uses HSL CSS variables defined in `client/global.css`. Colors are tuned for a cyber theme (teal/emerald primary, aqua accents). Update variables there to change the brand.

## Deployment

You can deploy to:

- Netlify
- Vercel

Typical steps:

```
pnpm install
pnpm build
```

Deploy the `dist/` output using your provider. Both providers can detect a Vite + SPA build automatically.

## Troubleshooting

- Lockfile mismatch in CI: `pnpm install --no-frozen-lockfile`
- Port conflicts: update dev server port in Vite config or run with a different port env
- Geolocation blocked: ensure site is served over HTTPS or allow permission in the browser

## Security Note

CyberGuard is an educational demo. Do not rely on its heuristics for critical decisions. Always verify links, messages, and files with trusted sources and tools.
