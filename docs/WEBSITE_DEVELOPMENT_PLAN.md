# Dazzlit – Website Development Plan

**Project:** Dazzlit – Internet Marketing Agency (global agency platform)
**Domain:** dazzlit.com
**Plan version:** 3.2 (16 Nov 2026). Includes the owner decisions D-07 to D-16: platform confirmed, APIs deferred, design approved, homepage approved. This replaces the Sep 2026 WordPress/Elementor plan.
**Source data:** the Semrush research in `content-plan/Dazzlit_Keyword_Research_Content_Plan.xlsx`. The same data is exported to `data/` as CSV.

---

## 1. What we are building

Dazzlit is a global digital marketing agency website. It is built to rank for the services we sell and to earn topical authority through guides, templates, free tools and research pages. It also needs to turn visitors into proposal requests.

| Page type | Pages | What's in it |
|---|---:|---|
| Core | 91 | Home, 19 service hubs, 17 industry pages, 1 pricing page, 8 site pages, 6 country pages, 39 city pages |
| Service | 167 | 80 services, 40 industry services (e.g. SEO for Law Firms), 35 audience pages (small business, enterprise, B2B), 12 pricing pages |
| Resource | 465 | 236 guides, 65 templates, **63 free tools**, 41 examples and case studies, 26 checklists, 25 statistics pages, 9 glossaries |
| Blog | 342 | 179 informational (including 21 trends posts), 120 how-to/question posts, 37 "best tools" comparisons, 6 listicles |
| **Total** | **1,065** | |

**How the data was validated**
- **Keywords:** 2,800 keywords, each with measured Semrush demand and each assigned to exactly one page. About 28.8M searches a month across all pages.
- **Google results check:** the head terms of 280 pages were compared against Google's actual top results.
- **Pages without measured demand:** 72 pages have no measured volume. 8 are site pages (about, contact and so on). The rest are gap-fill pages kept so every service area covers every expected topic.
- **Excluded keywords:** 1,506 keywords were excluded, each with a reason.
- **Locations:** all 45 location pages were measured in their own country's Semrush data.

### Not in the keyword plan, but needed for launch
These utility pages are required before go-live. They aren't SEO targets: Privacy Policy, Terms of Service, Cookie Policy, Accessibility Statement, 404, Thank-you page (after a form), HTML sitemap, Author pages (E-E-A-T).

---

## 2. Platform and architecture

**Decision D-07 (confirmed by the owner, 4 Nov 2026):** Dazzlit is a static, hand-coded site (HTML, CSS and JavaScript generated with **Astro**). The code lives on **GitHub** and the site is hosted on **Cloudflare**. This replaces the earlier WordPress + Elementor build on Hostinger.

**Decision D-15:** the owner provides the GitHub repository when development starts.

| Layer | Choice | Why |
|---|---|---|
| Site framework | **Astro 5** + TypeScript | Static HTML by default, so pages are fast and Core Web Vitals are easy to pass. It renders Markdown and MDX at scale, so 1,000+ pages are generated from content files. Interactive "islands" handle the free tools. |
| Styling | Tailwind CSS 4 + a small design-token file | Consistent design system, small CSS. |
| Content | Markdown/MDX content collections (`src/content/`). One file per page, scaffolded from `data/pages.csv`. | The briefs become front-matter (meta, schema, links), so the keyword plan drives the build. |
| Editing (optional) | Keystatic or Decap CMS (git-based) | Lets non-developers edit content. Every save is a commit. |
| Hosting | **Cloudflare Pages**, linked to the GitHub repo | Global CDN. A preview URL for every pull request. Free SSL. |
| Server logic | Cloudflare Pages Functions / Workers | Forms, gated downloads and API-backed free tools. |
| Data | Cloudflare D1 (leads, tool results), KV (rate limits, caching), R2 (template downloads, images) | Everything stays on one platform. |
| Anti-spam | Cloudflare Turnstile | On every form and every tool that calls an API. |
| Email | Resend (transactional) plus the CRM (HubSpot free tier, or a webhook to Google Sheets) | Lead routing and download delivery. |
| Search | Pagefind (static search index) | No server needed. |
| Analytics | GA4 + Google Search Console + Bing Webmaster Tools + Cloudflare Web Analytics; Semrush Position Tracking | Traffic, rankings and conversions. |
| Consent | Cloudflare Zaraz consent manager (GDPR/UK/CCPA) | Needed for UK, EU, CA and AU visitors. |

### Repository layout (after the build starts)
```
dazzlit-platform/
├─ README.md · STATUS.md
├─ docs/            plan, record register, specs
├─ data/            pages.csv, keywords.csv, free-tools.csv, locations.csv  (source of truth for the build)
├─ content-plan/    the Excel workbooks
├─ research/        scripts + raw Semrush exports
└─ site/            Astro project (Phase 1)
   ├─ src/content/  services/ industries/ locations/ resources/ blog/
   ├─ src/layouts/  one layout per page template (section 4)
   ├─ src/components/  header, mega-menu, CTA, FAQ, schema, tool shells
   ├─ src/tools/    free-tool islands
   ├─ functions/    Cloudflare Pages Functions (forms, tool APIs)
   └─ scripts/      scaffold-from-csv, link-checker, redirects
```

### Environments
| Env | URL | Trigger |
|---|---|---|
| Preview | `<branch>.dazzlit.pages.dev` | Every pull request |
| Staging | `staging.dazzlit.com` (password-protected with Cloudflare Access) | Merge to `develop` |
| Production | `dazzlit.com` | Merge to `main` |

---

## 2a. Approved design system (D-09, 4 Nov 2026)

| Element | Decision | Where |
|---|---|---|
| Colours | Navy `#10162B`, Violet `#7047EB`, Orange `#FF7849`, Ivory `#FAFAFD`; shades: Violet 600 `#5B34D6` (hover), Violet 300 `#A48BF5` (violet text on navy) | `design/design-system-v1.html` |
| Button rule | Primary buttons are violet with white text (5.5 : 1). White text on orange fails (2.6 : 1), so orange is for accents, numbers, icons and the ribbon; orange buttons (free tools) use navy text | same |
| Type | Headlines: Plus Jakarta Sans 700/800 (D-11). Body: DM Sans 400/500/700 | same |
| Logo | Owner's own D-chevron logo (D-12), vectorised in exact brand colours: 13 SVGs, favicon.svg/.ico, iPhone and Android icons, PNG exports | `design/logo/` |
| Homepage (D-16, approved 7 Nov 2026) | NP Digital's flow and global positioning plus every approved section, 16 sections in this order:<br>1. Hero<br>2. Value strip<br>3. Partner badges<br>4. Solutions<br>5. Case studies<br>6. Process<br>7. Industries<br>8. Markets<br>9. Stats<br>10. Comparison table<br>11. Team<br>12. Testimonials<br>13. "Let's talk" band with the proposal form<br>14. RFP<br>15. FAQs<br>16. Insights roundup<br><br>Free tools live on their own pages. The approved mockup is also the reference for shared components: header, mega menu, footer, CTA band, form, FAQ, comparison table, case-study cards. | `design/homepage-mockup.html` |
| Photography | AI-generated skyline and architecture images in violet-orange dusk light (D-13) | `docs/PHOTO_BRIEF.md` |
| Proof | Client logos, case studies, reviews, badges, phone, address and bios are built as marked placeholders and never invented. Claude asks for the assets at the start of each build session (D-14) | README working rule 5 |

---

## 3. Site structure and URLs

| Section | URL pattern | Parent |
|---|---|---|
| Home | `/` | – |
| Service hubs (19) | `/services/<pillar>/` | `/services/` |
| Services (167) | `/services/<pillar>/<service>/` | Service hub |
| Industries (17) | `/industries/<industry>/` | `/industries/` |
| Pricing | `/pricing/` | `/` |
| Guides | `/resources/guides/<slug>/` | `/resources/` |
| Templates | `/resources/templates/<slug>/` | `/resources/` |
| Free tools | `/resources/tools/<slug>/` | `/resources/` |
| Checklists | `/resources/checklists/<slug>/` | `/resources/` |
| Statistics | `/resources/statistics/<slug>/` | `/resources/` |
| Examples | `/resources/examples/<slug>/` | `/resources/` |
| Glossaries | `/resources/glossary/<slug>/` | `/resources/` |
| Blog | `/blog/<slug>/` | `/blog/` |
| Locations (Wave 6) | `/locations/<country>/` and `/locations/<country>/<city>/` | `/locations/` |
| Company | `/about/`, `/case-studies/`, `/contact/` | `/` |

**Main navigation (mega-menu)**
- **Services**, grouped by area:
  - Search: SEO, Local SEO, Link Building, App Store Optimization
  - Paid Media: PPC, Social Media Advertising
  - Social & Content: Social Media Marketing, Content Marketing, Video & Media Production, Digital PR
  - Web & Conversion: Web Design & Development, CRO, Marketing Automation
  - Commerce: eCommerce Management, eCommerce Marketing, Amazon & Marketplaces
  - Reputation: Online Reputation Management, Review Generation
  - AI: AI Marketing & Automation
- **Industries**
- **Resources:** Guides, Free Tools, Templates, Checklists, Statistics, Examples, Glossary
- **Blog**
- **Pricing**
- **About**
- **Contact / Free Proposal** (button)
- **Locations:** added to the menu and footer only when Wave 6 goes live.

**Internal linking rule:** blog/resource → topic service page → pillar hub → home, plus sibling and cross-pillar links. The exact links for each page are in the `Internal Links Out` column of `data/pages.csv`. A link checker in CI fails the build on any broken internal link.

---

## 4. Page templates to design and build

| # | Template | Used by | Key blocks |
|---|---|---|---|
| T1 | Home | 1 | Hero + proposal CTA, trust badges, service grid (by group), results/case studies, industries, process, testimonials, resources, FAQ, final CTA |
| T2 | Service hub | 19 | Hero, sub-service grid, process, results, pricing teaser, industries, FAQ, related resources |
| T3 | Service / industry service / audience | 155 | Problem → solution, deliverables, process, proof, pricing, FAQ, CTA |
| T4 | Pricing | 13 | Package table, what's included, FAQ, CTA |
| T5 | Industry | 17 | Industry pains, services for this industry, case study, FAQ |
| T6 | Location (country/city) | 45 | Local proof, services, local case studies, FAQ. **Each page needs real local proof; no templated copy.** |
| T7 | Guide | 236 | Definition snippet, table of contents, long-form body, FAQ, related links, CTA |
| T8 | Template / checklist download | 91 | Preview, download (optional email gate), how to use, example |
| T9 | Free tool | 63 | Tool above the fold, how it works, results explainer, CTA to the matching service |
| T10 | Statistics | 25 | Key stats cards, tables/charts, sources, "cite this" box, refreshed every January |
| T11 | Examples | 41 | Example cards (context → action → result → takeaway) |
| T12 | Glossary | 9 | A–Z index, term anchors linked to guides |
| T13 | Blog post | 342 | Article layout, author box, TOC, FAQ, related posts |
| T14 | Tools roundup | 37 | Comparison table, reviews, how to choose |
| T15 | Company / utility | ~14 | About, case studies, contact, legal, 404, thank-you |

---

## 5. Technical SEO specification

- **Meta tags:** title (60 characters or fewer) and description (160 or fewer) from the plan. Every page has a canonical tag (self-referencing). OG/Twitter cards use auto-generated OG images.
- **Schema (JSON-LD):** set per template from the `Schema Markup` column. Organization and WebSite schema run site-wide. Every page except home gets BreadcrumbList.
- **XML sitemaps:** split by section (services, resources, blog, locations), with `<lastmod>` taken from git history. robots.txt points to the sitemap index.
- **hreflang:** for `en-US`, `en-GB` and `en-AU` versions of the main pages, added in Phase 5 (UK and Australia next).
- **Performance budget:**
  - Core Web Vitals: LCP under 2.0 s, CLS under 0.05, INP under 200 ms.
  - Page weight under 150 KB of JavaScript on content pages. Images in AVIF/WebP with set width and height.
- **Indexing:** submit sitemaps in Search Console and Bing, and use IndexNow on deploy. Preview and staging environments send `noindex`.
- **Redirects:** managed in `site/public/_redirects` (Cloudflare). If the current WordPress site has indexed URLs, they are mapped before cutover (step F-12).
- **Accessibility:** WCAG 2.2 AA. Use semantic HTML, focus states, contrast ratios and alt text.
- **AI search:** `llms.txt`; clear definitions at the top of guides; consistent organization schema.

---

## 6. Free tools: engineering plan (63 tools)

| Build type | Tools | How |
|---|---:|---|
| Client-side JavaScript (calculators, generators, builders) | 34 | Astro island. No server and no running cost. Results can be shared through a URL. |
| AI-powered (caption, hashtag, title, description, name generators, readiness assessment …) | 14 | Cloudflare Worker calls an LLM API, with Turnstile, rate limits (KV) and a monthly cost cap |
| API-backed (SEO audit, website grader, rank/backlink/DA checkers, spam checker …) | 15 | Worker plus a data source. 7 of these need a **paid SEO data API** (DataForSEO, Semrush API or Moz); 1 queries the LLMs directly |

The full list, with wave, priority and data source for each tool, is in `data/free-tools.csv`.

- **Build order:** shared tool shell first (layout, Turnstile, rate limit, "email me the results" lead capture), then tools by wave and priority.
- **Wave 3 tools (10):** UTM Builder, SEO Audit, Keyword Rank Checker, Conversion Rate Calculator, CPM Calculator, Instagram Caption Generator, Backlink Checker, Domain Authority Checker, eBay Fee Calculator, NPS Calculator.
- **Decision D-08 (4 Nov 2026):** all APIs are set up **after development is finished**. This covers the paid SEO data, LLM, PageSpeed and email checks. Until then:
  - Every API-backed and AI tool is built with its full interface plus a "request a free report" fallback form.
  - The 34 client-side tools work fully from day one.
  - The provider for the 7 paid-data tools is chosen at that point: DataForSEO pay-as-you-go, or Dazzlit's Semrush API units.

---

## 7. Content production

- **Briefs:** every page has a brief in `data/pages.csv`: H1, meta tags, H2 outline, FAQs, entities to cover, internal links, schema, CTA and target words.
- **Workflow (one pull request per cluster):**
  1. Brief.
  2. Draft (AI-assisted).
  3. Human edit: facts, voice, examples.
  4. SEO QA: keyword coverage, links, schema, meta lengths.
  5. Publish.
  6. 60–90-day ranking review.
- **Publish by cluster, not by date:** a service page goes live with its definition guide and 2–3 blog posts in the same week, so the internal links are live from day one.
- **E-E-A-T:**
  - Real author and reviewer pages with credentials.
  - Case studies with numbers.
  - Clients named only with their permission.
  - Statistics pages cite primary sources.
- **Refresh cadence:**
  - Every January: trends, statistics and "Best … in 2026" posts.
  - Every 6 months: tool comparison posts.
  - Monthly: pricing pages.
- **Before writing:** pages marked "Not checked" in the SERP column get a quick Google check first.

---

## 8. Lead capture and conversion

- **Primary CTA:** a "Free proposal" form (name, email, website, service, budget, message), on every service page and in a sticky header button.
- **Secondary CTAs:** template and checklist downloads, "email me my tool results", newsletter, and booking a call (Cal.com or a HubSpot meetings link).
- **Routing:** form → Pages Function → Turnstile check → D1 (backup) → CRM plus an email alert → auto-reply.
- **Conversion tracking:** GA4 events for form_submit, download, tool_run, call_booked and phone_click. Weekly lead report.

---

## 9. Phases and timeline

| Phase | What ships | Pages | Target |
|---|---|---:|---|
| 0. Research and plan | Keyword research, topical map, content plan, location research, resource expansion | – | ✅ Done (Sep–Nov 2026) |
| 1. Foundations | Design tokens from the approved design system, logo and favicons, Astro scaffold, GitHub repo, CI (build, link check, Lighthouse), Cloudflare Pages project, staging, templates T1–T15, CSV → content scaffolder, forms, analytics, consent | – | Weeks 1–3 |
| 2. **Wave 1 and go-live** | Home, 19 hubs, pricing, 7 site pages (the Locations hub waits for Wave 6), 41 P1 service pages, plus legal/utility pages; DNS cutover | 69 + utility | Weeks 4–6 → **Go-live** |
| 3. Wave 2 | Remaining services, 17 industry pages, pricing pages | 138 | Month 2–3 |
| 4. Wave 3 | P1 guides, resources, 10 free tools, blogs (cluster by cluster) | 158 | Months 3–5 |
| 5. Wave 4 | P2 supporting content, templates and tools | 304 | Months 6–9 |
| 6. Wave 5 | P3 long tail, gap-fill pages, remaining tools | 350 | Months 10–14 |
| 7. Wave 6: locations | Locations hub, 6 country pages, 39 city pages in tiers L1 → L3; hreflang for UK/AU | 46 | When ready (can run alongside Waves 3–5) |

---

## 10. Go-live checklist (Phase 2)

1. Production build passes CI with 0 broken links, Lighthouse ≥ 90 on all four scores, and all schema valid.
2. Legal pages and the cookie consent banner are live. Forms are tested end to end, with leads reaching the CRM.
3. GA4, Search Console (domain property) and Bing are verified. Sitemaps are submitted.
4. Redirect map from the current WordPress URLs is in `_redirects` (F-12).
5. DNS: the dazzlit.com zone is on Cloudflare with the Pages custom domain attached, SSL set to Full (strict), www → apex redirect in place, and old Hostinger records cleaned up. Email MX records are kept.
6. After cutover: crawl the live site (Screaming Frog or Sitebulb), check the index status after 48 hours, and start the Semrush Position Tracking project on the P1 keywords.
7. The WordPress site stays reachable on a backup subdomain for 30 days, then is retired.

---

## 11. Risks and open decisions

| ID | Item | Impact | Next action |
|---|---|---|---|
| D-08 | API providers (paid SEO data for 7 tools, LLM for 14 AI tools) | Running cost; those tools show a fallback form until set up | Decide after development is finished |
| D-10 | CRM (HubSpot free or another) and email provider | Lead routing | Owner picks before forms go live (Phase 1) |
| F-02b | Wave 1 photography not generated yet | Placeholders on launch pages | Owner generates the images from `docs/PHOTO_BRIEF.md` |
| F-02c | Proof assets arrive session by session | Placeholders could ship by mistake | CI check fails the production build if any placeholder marker is left on a page going live |
| R-1 | 75 gap-fill pages have little or no measured demand | Thin-content risk | Keep them short and strongly linked; review after 6 months |
| R-2 | City pages without local proof can look like doorway pages | Ranking risk | Publish a city page only once it has local clients, reviews or a case study |
| R-3 | Free tools with KD ≥ 70 (backlink checker, website grader …) compete with Ahrefs, Semrush and Google | Low ranking odds | Build them for lead capture and links, not traffic |
| R-4 | Dated titles ("2026") go stale | CTR loss | Refresh every January (section 7) |
| R-5 | The current dazzlit.com WordPress install has content and URLs not yet audited | Redirect gaps | Crawl and map the URLs before cutover (F-12) |
