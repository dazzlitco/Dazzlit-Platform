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

## Content scaffolder

```bash
npm run scaffold -- --wave 1
```

`scripts/scaffold-from-csv.mjs` turns `../data/pages-by-wave/wave-N.csv` into
Markdown files under `src/content/` (front-matter from the CSV brief, body
is only the H2 headings from the outline). It fails on duplicate URLs,
missing H1/meta tags, meta tags over length, or internal links not in
`../data/sitemap.csv`. Body copy is written in Phase 2, one cluster at a time.

## Legal pages and analytics

- Legal and utility pages live in `src/pages/`: `privacy`, `terms`, `cookies`,
  `accessibility`, `404`, `thank-you`. Their copy is drafted from how the
  site actually works (proposal form → D1 → Resend, Turnstile, analytics
  below) and needs the owner's review before go-live — no company address or
  registration details are in them, because none were supplied.
- `src/components/CookieConsent.astro` — banner on every page, choice stored
  in the browser. Google Analytics 4 loads only after a visitor accepts
  cookies; Cloudflare Web Analytics is cookieless and its beacon loads when
  its token is set.
- Analytics and verification IDs are public environment variables, set at
  build time (see `.dev.vars.example`): `PUBLIC_GA4_ID`,
  `PUBLIC_CF_BEACON_TOKEN`, `PUBLIC_GOOGLE_SITE_VERIFICATION`,
  `PUBLIC_BING_SITE_VERIFICATION`. When one is not set, its tag is omitted.
  The plan's consent manager is Cloudflare Zaraz, which is set up in the
  Cloudflare dashboard and replaces this banner when the Pages project is
  created (F-04).

## Forms

The free-proposal form posts to a Cloudflare Pages Function:

```bash
npm run build
cp .dev.vars.example .dev.vars   # fill in real values, never commit .dev.vars
npx wrangler d1 migrations apply DB --local
npx wrangler pages dev dist      # serves the site + functions on :8788
```

- `functions/api/proposal.ts` — validates the submission (services, market,
  budget, name, email, website), verifies the Turnstile token, stores the
  lead in D1 (`leads` table, `migrations/0001_create_leads.sql`), then emails
  the owner and sends an auto-reply via Resend. If Resend is not configured,
  the D1 row is the record and no email is sent. If Turnstile is not
  configured, verification is skipped with a warning — local dev only,
  production must set it.
- `wrangler.toml` — D1 binding `DB` (`dazzlit-leads`). The `database_id`
  is filled in after the D1 database is created in the Cloudflare dashboard.
- Environment variables (Cloudflare dashboard, never in the repo):
  `PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`,
  `RESEND_FROM_EMAIL`, `LEAD_NOTIFICATION_EMAIL`.
- Still to do before the form goes live: create the Cloudflare Pages project
  (F-04), create the D1 database and apply the migration remotely, create
  Turnstile keys and a Resend key, set the variables above, and pick the CRM
  (D-10) so leads can be routed onward from D1.

## Checks (CI)

```bash
npm run build
npm run check          # link check + content check
npm run lighthouse:ci  # Lighthouse CI against the built site
```

- `scripts/check-links.mjs` — every internal link in the content
  front-matter and in the built HTML must be a URL in
  `../data/sitemap.csv`, a page built into `dist/`, a static asset, or a
  planned utility page (`/privacy/`, `/terms/`, `/cookies/`,
  `/accessibility/`, built in Phase 1, step 7).
- `scripts/check-content.mjs` — fails on bracketed template text
  (`[Client name]`, `[00]` …), lorem ipsum, TODO/FIXME, fake phone numbers
  and `Placeholder` labels, and on body text in content files before Phase 2
  writing starts. No `data-placeholder` markers are used (decision D-17).
- `.lighthouserc.json` — Lighthouse CI, all four categories must score
  ≥ 90. Locally it needs a Chrome binary:
  `CHROME_PATH=/path/to/chrome npm run lighthouse:ci`. The local working
  copy is not a git repo (pushes go through the GitHub API), so the upload
  step warns about `git rev-parse HEAD` locally; that does not apply on
  GitHub Actions, where the checkout is a git repo.
- `.github/workflows/build.yml` runs build, both checks and Lighthouse CI
  on every push to `main` / `develop` and every pull request. The workflow
  file is kept in the repo root; it cannot be pushed through the GitHub App
  API (403), so it is uploaded through the GitHub website instead.

## Status

This is the Phase 1 scaffold only. The homepage is built in Phase 2 from
`../design/homepage-mockup.html`, and Wave 1 pages from
`../data/pages-by-wave/wave-1.csv`. The temporary `src/pages/index.astro`
is replaced then.
