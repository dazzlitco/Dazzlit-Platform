# STATUS – Dazzlit platform

**Last updated:** 16 Nov 2026
**Current phase:** Phase 2, Wave 1 — homepage done. Next: the 19 service hubs, then pricing, site pages and the 41 service pages, one cluster at a time.
**Live site:** not yet. dazzlit.com still runs the old WordPress install on Hostinger.

## Where we are
| Area | State |
|---|---|
| Keyword research | ✅ Done: 2,800 keywords from Semrush across all 20 service areas; 1,506 excluded with reasons |
| Topical map and clusters | ✅ Done: 20 pillars, 145 topics, 1,065 pages; 0 keywords mapped to more than one page, 0 orphan pages, 0 broken links |
| Validation | ✅ Google results checked for 280 head-term pages; 6 US competitors analysed; 6 markets compared; 45 location pages measured locally |
| Resource expansion | ✅ Done 4 Nov 2026: 185 new pages, including 56 new free tools (63 in total), templates, statistics, checklists, examples and glossaries |
| Content briefs | ✅ Done: every page has a brief in `data/pages.csv` |
| AI builder handoff | ✅ `docs/AI_BUILD_INSTRUCTIONS.md` + `dazzlit-ai-handoff.zip`: everything another AI model needs to build the site as planned |
| Development plan | ✅ v3.2 in `docs/WEBSITE_DEVELOPMENT_PLAN.md`, updated with all owner decisions and the approved design system (section 2a) |
| Platform decision | ✅ Confirmed 4 Nov 2026: static coded site on Cloudflare (D-07) |
| APIs | ⏸ Deferred until development is finished (D-08); tools are built with a fallback form |
| Design system | ✅ Approved 4 Nov 2026: brand palette, Plus Jakarta Sans + DM Sans, owner's own logo (vector set in `design/logo/`), AI photography per `docs/PHOTO_BRIEF.md` |
| Homepage | ✅ Approved 7 Nov 2026: mockup v2 in `design/homepage-mockup.html` (16 sections, NP Digital flow, Dazzlit design); the build template for the homepage and shared components |
| Proof (logos, case studies, reviews, badges) | 🔁 Built as marked placeholders; Claude asks for the assets at the start of each build session |
| GitHub repository | ✅ Provided 16 Nov 2026: `dazzlitco/Dazzlit-Platform` (public, was empty). Scaffold pushed to `main` + `develop` in session S-09 (F-03). |
| Cloudflare | ⏳ Not set up yet (F-04) |
| Photography | ⏳ Prompts ready in `docs/PHOTO_BRIEF.md`; owner to generate the Wave 1 images (F-02b) |
| Build | ✅ Scaffold + shared components built locally 16 Nov 2026: Astro 5.18.2, Tailwind 4.3.5, TypeScript 5.9.3; `npm run build` passes, 75 pages (all Wave 1 pages rendering through templates T1–T15). The CI workflow (`.github/workflows/build.yml`) and the PNG/ICO logo files are now in the repo on `develop` (uploaded via the GitHub website on 2026-11-16 — the GitHub App API still returns 403 for workflow files and rejects binary files). The workflow has not run on GitHub yet; it runs on the next push to `develop` or `main`. |

## Page plan
| Wave | Core | Service | Resource | Blog | Total | When |
|---|---:|---:|---:|---:|---:|---|
| 1 – Launch | 28 | 41 | – | – | **69** | Phase 2 → go-live |
| 2 | 17 | 121 | – | – | 138 | Month 2–3 |
| 3 | – | 5 | 81 | 72 | 158 | Months 3–5 |
| 4 | – | – | 147 | 157 | 304 | Months 6–9 |
| 5 | – | – | 237 | 113 | 350 | Months 10–14 |
| 6 – Locations | 46 | – | – | – | 46 | Later |
| **Total** | **91** | **167** | **465** | **342** | **1,065** | |

## Next actions
1. **Owner:** review the homepage on GitHub (`develop` branch) and confirm the next cluster — the 19 service hubs.
2. **Owner:** still to supply: the 27 Wave 1 photos from `docs/PHOTO_BRIEF.md` (F-02b), client/specialist counts, the client logo row, and comparison-table contract terms. No photos are in the site yet.
3. **Claude:** Phase 2, Wave 1 — the 19 service hubs next, then pricing, site pages and the 41 service pages, one cluster at a time.

## Open decisions
- **D-08:** API providers. Deferred until development is finished.
- **D-10:** CRM and email provider. Owner chose D1 + email for now (16 Nov 2026); CRM choice deferred, so no CRM is wired yet (F-25).

## Recent sessions
| Session | Date | What happened | Register |
|---|---|---|---|
| S-17 | 16 Nov 2026 | Phase 2, Wave 1: homepage built (all 16 sections) with owner-supplied proof, pushed to GitHub `develop` only | R-041 |
| S-16 | 16 Nov 2026 | CI workflow + PNG/ICO logo files uploaded to GitHub `develop` via the website (API still blocked) | R-040 |
| S-15 | 16 Nov 2026 | Templates T1–T15 built, all 69 Wave 1 pages rendering (75 pages total); pushed to GitHub `develop` only | R-039 |
| S-14 | 16 Nov 2026 | Phase 1, step 7: legal/utility pages, cookie consent and analytics wiring, tested; pushed to GitHub `develop` only | R-038 |
| S-13 | 16 Nov 2026 | Phase 1, step 6: proposal form wired to Pages Function + Turnstile + D1, tested end to end locally; pushed to GitHub `develop` only | R-037 |
| S-12 | 16 Nov 2026 | Phase 1, step 5: CI checks (link, content, Lighthouse) passing; pushed to GitHub `develop` only | R-036 |
| S-11 | 16 Nov 2026 | Phase 1, step 4: CSV → content scaffolder, Wave 1 skeletons (69 pages) verified; build passes; pushed to GitHub `develop` only | R-035 |
| S-10 | 16 Nov 2026 | Phase 1, steps 2–3: shared components from the homepage mockup; build passes; pushed to GitHub `develop` only (`main` stays at step 1) | R-034 |
| S-09 | 16 Nov 2026 | Phase 1, step 1: Astro scaffold (Astro 5.18.2, Tailwind 4.3.5, TS 5.9.3), brand tokens, self-hosted fonts, logo/favicons, BaseLayout, temporary index page; build passes; pushed to GitHub `main` + `develop` | R-033 |
| S-08 | 16 Nov 2026 | Plan confirmed ready to build (v3.2); handoff pack for building with another AI model | R-032 |
| S-07 | 7 Nov 2026 | Homepage approved. Mockup in NP Digital's structure; v2 adds case studies, process, industries, comparison table, testimonials, proposal form and FAQs (16 sections) | R-029 – R-031 |
| S-06 | 4 Nov 2026 (late morning) | Design approved; the owner's own logo vectorised (13 SVGs, favicon, app icons, PNGs); placeholder rule for proof; GitHub deferred to development start; register, STATUS and plan v3.1 updated | R-026, R-028 |
| S-05 | 4 Nov 2026 (mid-morning) | Platform confirmed (static, Cloudflare); APIs deferred; 4 inspiration sites reviewed; design system v1; Plus Jakarta Sans chosen; 3 logo concepts; photo brief | R-024, R-025 |
| S-04 | 4 Nov 2026 (morning) | Validation review; workspace recovery; 420 resource keywords (4,050 Semrush units) → 185 new pages; QA fixes; development plan v3; register, STATUS, git repo | R-018 – R-023, R-027 |
| S-03 | 5 Oct 2026 | Resource coverage audit: thin templates, statistics, calculators | R-017 |
| S-02 | 30 Sep 2026 | Location research (2,150 units); Wave 6; page list workbook | R-014 – R-016 |
| S-01 | 28–29 Sep 2026 | Setup, keyword research, validation, content plan v1 (864 pages) | R-001 – R-013 |

## Changelog
- **2026-11-16:** Phase 2, Wave 1 homepage done: all 16 sections in the mockup's order, with the owner-supplied case studies, testimonials, team and partner badges, pushed to `develop` only. The owner confirmed the supplied content is real and the files' fictional-sample disclaimers are wrong. Still missing: photos, client/specialist counts, client logo row, contract terms.
- **2026-11-16:** The CI workflow and the PNG/ICO logo files are now in the repo on `develop`, uploaded through the GitHub website (commits b126157, 77e6ecf, d98d391). The API route was retried first and still fails the same way — 403 for workflow files, UTF-8 only for the push tool. The workflow has not run on GitHub yet; it runs on the next push.
- **2026-11-16:** Templates T1–T15 done: all 69 Wave 1 pages now render (75 pages total), pushed to `develop` only. Phase 1 is complete and the templates are ready; next is Phase 2, Wave 1, homepage first.
- **2026-11-16:** Phase 1 complete: step 7 done (legal/utility pages, cookie consent, analytics wiring), pushed to `develop` only. Phase 1 is now all 7 steps; next is the 15 page templates, then Wave 1.
- **2026-11-16:** Phase 1 step 6 done: proposal form wired to a Pages Function with Turnstile, D1 storage and Resend email, tested end to end locally, pushed to `develop` only. Still needs the owner's Cloudflare account, Turnstile/Resend keys, owner email and CRM choice before it goes live.
- **2026-11-16:** Phase 1 step 5 done: CI checks (link, content, Lighthouse) all passing locally, pushed to `develop` only. The GitHub workflow file is local only — it cannot be pushed through the GitHub App API (403), so it needs uploading through the GitHub website.
- **2026-11-16:** Phase 1 step 4 done: CSV scaffolder built, Wave 1 skeletons (69 pages) generated and verified against the CSV, pushed to `develop` only.
- **2026-11-16:** Phase 1 steps 2–3 done: shared components built and pushed to `develop` only. `main` stays at the step 1 scaffold until the owner reviews.
- **2026-11-16:** Phase 1 step 1 done: Astro scaffold built and pushed to `dazzlitco/Dazzlit-Platform` (`main` + `develop`). Owner instruction recorded: no placeholder markers in code; invented items are reported at the end of each session instead (D-17). **Not pushed:** `.github/workflows/build.yml` (GitHub App returns 403 for workflow files via the API) and PNG/ICO logo files (the push tool only accepts UTF-8 text files). SVG logos and `favicon.svg` are in the repo; the PNG favicons/app icons and the CI workflow need to be added via the GitHub website or a git push with a personal token.
- **2026-11-16:** Plan v3.2 (approved homepage referenced); AI builder instructions and handoff pack; pages split by wave + sitemap.csv.
- **2026-11-07 (approved):** Homepage v2 approved; it is the build template for the homepage and shared components.
- **2026-11-07 (v2):** No section dropped: case studies, comparison table, FAQs and the rest added; tools stay on dedicated pages.
- **2026-11-07:** Homepage mockup v1 built on NP Digital's structure and global positioning, in the approved Dazzlit design (D-16).
- **2026-11-04 (records):** Register gains a sessions log and the workspace-recovery entry (R-027); plan v3.1; this STATUS update (R-028).
- **2026-11-04 (design sign-off):** Design system approved; owner's own logo chosen and vectorised (13 SVGs, favicon and app icons); proof as placeholders, requested each build session; GitHub at development start.
- **2026-11-04 (latest):** Font chosen (Plus Jakarta Sans); 3 logo concepts published; photography brief written; proof types confirmed.
- **2026-11-04 (later):** Owner confirmed the static Cloudflare site and deferred the APIs. Inspiration sites reviewed; design system proposal v1 published.
- **2026-11-04:**
  - Resource expansion: 420 keywords checked, 185 pages added.
  - QA fixes: 16 merges, 10 page types corrected, 7 titles, 92 meta descriptions.
  - Development plan v3; record register and repo created.
- **2026-10-05:** Resource coverage audit; gaps found.
- **2026-09-30:**
  - Location research for UK, Canada, Australia, UAE, Singapore and US cities; Wave 6 created.
  - Page list workbook.
- **2026-09-28/30:**
  - Seeds and Semrush expansion, cleaning and clustering.
  - Google results check, competitor research, market analysis.
  - Briefs and waves: content plan v1 (864 pages).

Full history: `docs/RECORD_REGISTER.md`.
