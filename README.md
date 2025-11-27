# [My Online CV](https://cv-vladyslav-spivakovs-projects.vercel.app/)

Welcome! This repo contains my single-page resume site. 

If you just want to see it, head to the live version: [link](https://cv-vladyslav-spivakovs-projects.vercel.app/)

## What this is
- A fast static page built with React + Vite.
- Language switcher (English, Czech, Ukrainian) and a Light/Dark theme toggle.
- Contact links, skills, experience, education, and course grids defined in TypeScript.
- Pure CSS styling.

## Run locally
```bash
npm install
npm run dev         # start dev server
npm run build       # type-check + production build
npm run preview     # preview the build
```

## Repo map
- src/main.tsx -- layout, theme/language toggles, and section composition.
- src/services.ts -- profile data and translations (contacts, skills, experience, education, courses).
- src/style.css -- visual system, grids, and component styling.
- public/profile.jpg -- avatar image used on the page.

## Deployments
Live on Vercel: https://cv-vladyslav-spivakovs-projects.vercel.app/

