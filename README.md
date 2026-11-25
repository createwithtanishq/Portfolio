# Tanishq Aryan, portfolio

The site recruiters and clients see: esports and creator operations, case studies, services with open samples, and a résumé that prints to PDF.

## What's in it

- **Home**: who I am, a hand-built 3D tournament bracket, proof numbers, services, case studies, experience and contact.
- **Case studies** (`/project/:id`): Hackabury 2026, a Tekken 8 tournament system, T-MCU Nexus, an MA dissertation on esports pathways, and research and game work.
- **Services** (`/services`): ten services, each with samples you can open.
- **Résumé** (`/resume`): one page, print-ready.

## Stack

React 19, Vite 8, Tailwind CSS 4, React Three Fiber for the 3D scenes. Type is Barlow and Barlow Condensed, self-hosted through Fontsource. Hosted on Netlify.

Case-study content lives in `src/data/portfolioData.js`; the short labels, filters and 3D stations for each case study live in `workMeta` in `src/data/profile.js`. A build step (`scripts/static-heads.js`) writes a real HTML head for every route so links preview properly when shared.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
```

## Security

`public/_headers` sends a strict Content Security Policy (scripts from this site only, no inline script), HSTS, `X-Frame-Options: DENY`, `nosniff`, a referrer policy and a permissions policy. The motion bootstrap that used to sit inline in `index.html` lives in `public/boot.js` so the policy can stay strict.
