# Dazzlit – Global Marketing Agency

Static website for dazzlit.com, built with Astro 5 + TypeScript and Tailwind CSS 4,
hosted on Cloudflare Pages. Source of truth for pages, keywords and briefs is
`data/` — see `AI_BUILD_INSTRUCTIONS.md` and `docs/WEBSITE_DEVELOPMENT_PLAN.md`.

## Structure

```
dazzlit-platform/
├── AI_BUILD_INSTRUCTIONS.md
├── STATUS.md
├── docs/            plan, record register, photo brief
├── data/            sitemap.csv, keywords.csv, pages by wave, free tools, locations
├── design/          approved design system, homepage mockup, logo set
└── site/            Astro project (Phase 1)
    ├── src/layouts/  BaseLayout
    ├── src/pages/    index (temporary scaffold page; homepage is built in Phase 2)
    ├── src/styles/   design tokens in global.css
    └── public/       favicon and logo files
```

## Run locally

```bash
cd site
npm install
npm run dev
```

## Build

```bash
cd site
npm run build
```

Output is in `site/dist/`.

## Cloudflare Pages

- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `site`
- DNS is not switched until go-live (plan section 10). Do not change DNS for this step.
