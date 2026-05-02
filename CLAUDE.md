# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev          # Start dev server with Vite HMR (via tsx server.ts)

# Production
npm run build        # Vite frontend build + esbuild server bundle
npm start            # Serve production build (node dist/server.js)

# Type checking (no separate test suite)
npm run lint         # tsc --noEmit — use this to catch type errors

# Clean
npm run clean        # Remove dist/
```

## Architecture

**Coshare** is a bilingual (EN/AR) marketing/informational SPA for a cosharing platform. Stack: React 19, React Router 7, Vite 6, Tailwind CSS 4, Motion (animations), Express (server).

### Server model
`server.ts` is the single entrypoint for both dev and prod. In development it injects Vite middleware for HMR; in production it serves the compiled `dist/` static files. The `build-server.ts` script bundles `server.ts` to `dist/server.js` via esbuild. The only backend endpoint is `GET /api/health`. Client-side routing is handled by a catch-all that serves `index.html`.

### Routing
React Router with a root `<Layout>` outlet:
- `/` → `Home.tsx`
- `/how-it-works` → `HowItWorks.tsx`
- `/faq` → `FAQ.tsx`
- `/list-asset` → `ListAsset.tsx`

### Language / i18n
All user-facing strings live in a `translations` object (EN/Arabic pairs) keyed by page. The `LanguageProvider` in `src/store/language.tsx` exposes a `useLanguage()` hook. Switching to Arabic also sets `document.documentElement.dir = 'rtl'`. Language preference is persisted to `localStorage`.

### Styling conventions
- Tailwind CSS 4 (configured via `@tailwindcss/vite` plugin — no `tailwind.config.js`).
- Brand colors are CSS variables: `--color-primary` (`#0b1b34`), `--color-accent` (`#05A7E8`).
- Class merging utility: `src/utils/cn.ts` (`clsx` + `tailwind-merge`).
- Animations use the `motion` package (Framer Motion API).

### Path alias
`@/` maps to `src/` (configured in both `vite.config.ts` and `tsconfig.json`).

### Environment variables
See `.env.example`. Variables prefixed `VITE_` are exposed to the client bundle; others are server-only.

```
GEMINI_API_KEY                  # Google Gemini AI (server-only)
APP_URL                         # Deployment URL
STRIPE_SECRET_KEY               # Stripe server key
VITE_STRIPE_PUBLISHABLE_KEY     # Stripe client key
```

### Deployment
Vercel — `vercel.json` rewrites all routes to `index.html` for SPA routing. Google Analytics GA-4 tag is loaded in `index.html`.
