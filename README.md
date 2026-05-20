# Sahara & Pine — Tours & Car Rentals

A production-ready Tour & Car Rental business website built as a single React JSX artifact.

- React 18 + Vite
- Tailwind CSS (custom warm-sand / forest-green editorial palette)
- `lucide-react` icons
- Playfair Display + Lato via Google Fonts
- All state in `useState` / `useReducer` (no backend, no localStorage)

## Features

**Customer-facing**
- Hero with CSS-only scenic landscape gradient + "Explore Packages" CTA
- Tour Packages grid (3 seeded tours)
- Car Rental section (3 seeded cars, with Available / Booked badges)
- Custom Package Builder with **live price estimate** as you choose options
- Contact / About with validated message form

**Owner Admin Panel**
- Hidden "Admin Login" link in the footer
- Password-gated dashboard (default password: `admin123`)
- Add / delete tour packages
- Add / delete cars
- All changes appear instantly on the public site

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Build for production

```bash
npm run build
npm run preview
```

The static site is emitted to `dist/`.

## Deploy to Vercel

The repo is preconfigured for Vercel (`vercel.json` is in the root, framework is auto-detected as Vite).

### Option 1 — One-click import (recommended)

1. Go to <https://vercel.com/new>
2. Import the GitHub repo `vandan276/Car-Rental-Services`
3. Vercel auto-detects **Vite** — leave all defaults:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
4. Click **Deploy**.

That's it — your site will be live at `https://<project-name>.vercel.app` in about 60 seconds.

### Option 2 — From the CLI

```bash
npm i -g vercel
vercel        # first run: link the project
vercel --prod # deploy to production
```

## Project structure

```
.
├── index.html              # Entry HTML, loads Google Fonts
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json             # Vercel deployment config
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx            # React entry
    ├── index.css           # Tailwind directives + small custom CSS
    └── App.jsx             # The single-file artifact (everything is here)
```
