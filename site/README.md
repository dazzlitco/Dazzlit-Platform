# Dazzlit site — Astro project

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output is in `dist/`. This is a static site (`output: 'static'` in
`astro.config.mjs`), for Cloudflare Pages.

## Brand

Design tokens are in `src/styles/global.css`, from the approved design
system in `../design/design-system-v1.html`. Colours, fonts and logo files
must not be changed without the owner's approval.

Fonts are self-hosted via `@fontsource/plus-jakarta-sans` and
`@fontsource/dm-sans` — no Google Fonts request at runtime.

## Status

This is the Phase 1 scaffold only. The homepage is built in Phase 2 from
`../design/homepage-mockup.html`, and Wave 1 pages from
`../data/pages-by-wave/wave-1.csv`. The temporary `src/pages/index.astro`
is replaced then.
