# Itzfizz Scroll-Driven Hero

A single-screen scroll-controlled hero recreation built with React, TypeScript, GSAP ScrollTrigger, Tailwind CSS, and Vite.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Build

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

1. Create a GitHub repository named `itzfizz-scroll-hero` (or update `base` in `vite.config.ts` to match your repository name).
2. Push this folder to the repository.
3. Run:

```bash
npm run deploy
```

4. In GitHub, open **Settings → Pages** and choose the `gh-pages` branch if it is not already selected.

## Animation notes

- Scroll starts the animation immediately at the top of the hero.
- The hero stays pinned while the scroll-linked timeline progresses.
- Car travel, green trail, headline letter reveals, and metric cards share one scrubbed timeline, so they reverse naturally on scroll-up.
- There is no additional page section after the hero.
- The car image currently loads from the original public reference demo. For a fully self-contained deployment, save that image into `public/` and change the `src` in `src/App.tsx` to `/car.png`.

## Stack

- React + TypeScript
- GSAP + ScrollTrigger
- Tailwind CSS
- Vite
# itzfizz-scroll-hero
# itzfizz-scroll-hero
# itzfizz-scroll-hero
