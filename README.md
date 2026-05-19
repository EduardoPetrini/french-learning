# French TCF Canada — Study Companion

A 16-week French study plan app for TCF Canada (NCLC 5 target), built for Portuguese/English speakers starting from zero.

All content lives in the repository. Progress is saved in the browser's localStorage. No backend, no account required.

---

## What it does

- Presents all 112 study days across 16 weeks in a navigable interface
- Shows daily tasks with type labels: Video (YouTube embed), Podcast, Anki, Writing, Exercise, External link
- Tracks task and day completion — persisted across sessions
- Works offline after first load (PWA)
- Installable on Android via Chrome

---

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS v3
- React Router v6
- `vite-plugin-pwa` — service worker + web manifest

---

## Setup

**Requirements:** Node.js 18+

```bash
npm install
```

---

## Development

```bash
npm run dev
```

Opens at `http://localhost:5173`.

---

## Production build

```bash
npm run build
```

Output goes to `dist/`. Preview the production build locally:

```bash
npm run preview
```

---

## Deploy

The `dist/` folder is a fully static site — deploy to any static host:

- **Vercel:** `vercel --prod` from the project root
- **Netlify:** drag and drop `dist/` in the Netlify dashboard
- **GitHub Pages:** push `dist/` to a `gh-pages` branch

A public HTTPS URL is required for the Android APK step below.

---

## Android APK

The app is a Progressive Web App. The easiest way to produce an installable `.apk` / `.aab` is **PWABuilder**, which wraps it in a [Trusted Web Activity](https://developer.chrome.com/docs/android/trusted-web-activity) — no native code required.

### Option 1 — PWABuilder (no tooling needed)

1. Deploy the app to a public HTTPS URL.
2. Go to [pwabuilder.com](https://www.pwabuilder.com) and enter your URL.
3. Click **Package for Stores → Android**.
4. Fill in the form — package ID (e.g. `com.yourname.frenchtcf`), app version, and signing key (generate a new one if you do not have one).
5. Download the `.zip`. It contains:
   - `app-release-signed.apk` — sideloadable on any Android device
   - `app-release-bundle.aab` — for Google Play Store submission
6. Install on a device:
   ```bash
   adb install app-release-signed.apk
   ```
   Or copy the APK to the device and open it from the Files app (enable "Install from unknown sources" in Settings).

### Option 2 — Bubblewrap CLI

For more control, use Google's [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap):

```bash
npm install -g @bubblewrap/cli

bubblewrap init --manifest https://your-deployed-url/manifest.webmanifest
bubblewrap build
```

Produces `app-release-signed.apk` and `app-release-bundle.aab` in the project directory.

> **Requirements:** Java JDK 8+ and Android SDK. Bubblewrap will prompt to download and configure them on first run.

---

## Project structure

```
src/
├── data/
│   ├── types.ts          # Task and StudyDay type definitions
│   └── studyPlan.ts      # All 16 weeks of content (112 days)
├── hooks/
│   └── useProgress.ts    # localStorage read/write
├── components/
│   ├── layout/           # AppShell — header and bottom nav
│   ├── home/             # WeekGrid — 16-week entry point
│   ├── week/             # WeekView + DayTile
│   ├── day/              # DayView + TaskCard
│   └── ui/               # ProgressRing, YoutubeEmbed
└── pages/                # HomePage, WeekPage, DayPage
```

Content is encoded in `src/data/studyPlan.ts`. To update or extend the plan, edit that file — no other changes required.
