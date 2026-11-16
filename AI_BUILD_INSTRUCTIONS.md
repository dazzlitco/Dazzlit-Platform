# Dazzlit – build instructions for an AI developer

Give this file to the AI model **first**, together with the files listed in section 1. It contains everything decided in the planning phase (Sep–Nov 2026). The AI should follow it exactly and ask the owner when something isn't covered.

---

## 0. Master prompt (paste this into the AI)

> You are the lead developer and SEO-focused front-end engineer for **Dazzlit – Global Marketing Agency** (dazzlit.com). You are building a static, hand-coded website with **Astro**, stored on **GitHub** and hosted on **Cloudflare Pages**. All planning is finished and approved. Your job is to build exactly what the plan says, not to redesign or re-plan it.
>
> Before writing any code, read these attached files in this order:
> 1. `AI_BUILD_INSTRUCTIONS.md` (this file): rules, brand, tech stack, build order, definition of done.
> 2. `docs/WEBSITE_DEVELOPMENT_PLAN.md`: the full development plan.
> 3. `STATUS.md`: where the project stands now.
> 4. `design/design-system-v1.html` and `design/homepage-mockup.html`: the approved visual design and homepage. Open them in a browser; they are the visual source of truth.
> 5. `data/sitemap.csv`: every planned page (1,065), with URL, title, type and wave.
> 6. `data/pages-by-wave/wave-N.csv`: the full brief for each page in the wave you're building.
>
> Rules you must follow:
> - **Do not invent** page URLs, titles, keywords or meta tags. Take them from the CSV files.
> - **Do not invent** client names, logos, results, reviews, awards, team members, phone numbers, addresses or prices. Build them as clearly marked placeholders and ask the owner for the real ones.
> - **Do not change** the brand colours, fonts, logo or the approved homepage section order.
> - Work in small steps, one topic cluster or template at a time, and show the result before moving on.
> - At the **start** of every session, read `STATUS.md` and list the placeholders on the pages you're about to build, then ask the owner for those assets.
> - At the **end** of every session, update `STATUS.md` and `docs/RECORD_REGISTER.md` with what you did, then commit and push to GitHub.
> - When something isn't covered by these files, ask. Don't guess.
>
> Start with Phase 1 (section 7 of this file). Before writing code, confirm you've read the files and give me a short build plan for this session.

---

## 1. Files to give the AI

Upload them from the **dazzlit-ai-handoff** pack, or from the project folder.

| File | Why it's needed | Required? |
|---|---|---|
| `AI_BUILD_INSTRUCTIONS.md` (this file) | Rules, brand, stack, build order | **Yes** |
| `docs/WEBSITE_DEVELOPMENT_PLAN.md` | The full plan (v3.2) | **Yes** |
| `STATUS.md` | Current state and next actions | **Yes** |
| `design/homepage-mockup.html` | Approved homepage: layout, copy, components | **Yes** |
| `design/design-system-v1.html` | Approved colours, type, buttons, contrast rules | **Yes** |
| `design/logo/svg/` and `design/logo/png/` | Logo set, favicons, app icons | **Yes** |
| `data/sitemap.csv` | All 1,065 pages in one compact list (URL, H1, type, wave, parent) | **Yes** |
| `data/pages-by-wave/wave-1.csv` … `wave-6.csv` | Full brief per page. Give only the wave being built. | Yes, one at a time |
| `data/keywords.csv` | 2,800 keywords mapped to pages, to check no two pages compete | Recommended |
| `data/free-tools.csv` | 63 tools with build type and data source | When building tools |
| `data/locations.csv` | Country and city research for Wave 6 | Wave 6 only |
| `docs/PHOTO_BRIEF.md` | Image slots and AI image prompts | When placing images |
| `docs/RECORD_REGISTER.md` | Full history and decisions | Recommended |
| `content-plan/*.xlsx` | Original workbooks (same data as the CSVs) | Optional; the CSVs are easier for AI |

**Tip:** many AI chats can't read very large files. Never upload the full `data/pages.csv` (1.7 MB). Use `sitemap.csv` plus one `wave-N.csv` at a time.

---

## 2. Project facts

- **Brand:** Dazzlit – Global Marketing Agency. Tagline: "Ideas that travel. Brands that grow." Hero line: "Reach your next market."
- **Domain:** dazzlit.com. It currently runs an old WordPress site on Hostinger. **Do not touch DNS** until go-live (plan section 10).
- **Markets:** USA (main), UK, Australia, Canada, UAE, Singapore.
- **Services (20 areas, 19 hub pages):**
  - SEO, Local SEO, Link Building, App Store Optimization, AI Marketing & Automation.
  - PPC, Social Media Advertising.
  - Social Media Marketing, Content Marketing, Video & Media Production, Digital PR.
  - Web Design & Development, Conversion Rate Optimization, Marketing Automation.
  - eCommerce Management, eCommerce Marketing, Amazon & Marketplaces.
  - Online Reputation Management, Review Generation.
- **Pages:** 1,065 in 6 waves.
  - Core: 91.
  - Service: 167.
  - Resource: 465 (guides, templates, 63 free tools, checklists, statistics, examples, glossaries).
  - Blog: 342.

| Wave | Pages | Contents |
|---|---:|---|
| 1 – Launch | 69 | Home, 19 hubs, pricing, site pages, 41 top services |
| 2 | 138 | Remaining services, 17 industries |
| 3 | 158 | Top guides, resources, 10 tools, blogs |
| 4 | 304 | Second-priority content and tools |
| 5 | 350 | Long tail, remaining tools |
| 6 | 46 | Locations: build later, country pages first |

---

## 3. Brand – non-negotiable

### Colours
| Token | Hex | Use |
|---|---|---|
| Navy | `#10162B` | Text, dark sections, footer |
| Violet | `#7047EB` | Primary buttons, links, highlighted headline words |
| Violet 600 | `#5B34D6` | Button hover, link text on light backgrounds |
| Violet 300 | `#A48BF5` | Violet text on navy (accessible) |
| Violet 50 | `#F1EDFE` | Tints, chips |
| Orange | `#FF7849` | Ribbon graphic, numbers, icons, accents, free-tool buttons |
| Orange 50 | `#FFF1EB` | Tints |
| Ivory | `#FAFAFD` | Page background |
| Slate | `#4A5168` | Body text |
| Line | `#E4E5EE` | Borders |

**Contrast rules (WCAG AA):**
- Primary buttons are **violet with white text** (5.5 : 1).
- **Never put white text on orange** (2.6 : 1 fails). Orange buttons always use **navy text** (6.9 : 1).
- On navy backgrounds, use Violet 300 for violet text smaller than 24px.

### Typography
- Headlines: **Plus Jakarta Sans**, 700/800, tight letter-spacing (−0.02 to −0.035em). Self-host the font files.
- Body: **DM Sans**, 400/500/700, 17px base, 1.6 line height, about 65 characters per line.
- Two-tone headlines: the first part in navy, the key phrase in violet ("Reach your **next market.**").

### Logo
- Use only the files in `design/logo/svg/`. Never redraw, recolour or stretch the logo.
- Header: `dazzlit-logo.svg`.
- Footer and dark backgrounds: `dazzlit-logo-white.svg` or `dazzlit-logo-tagline-white.svg`.
- Favicons: `favicon.svg` plus the `png/` set (`favicon.ico`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`).

### Graphic motif
The orange chevron ribbon, as used in the hero, CTA band and footer accents.

### Photography
AI-generated skyline and architecture images at dusk, graded violet to orange (see `docs/PHOTO_BRIEF.md`). Until the owner supplies them, use the gradient-and-ribbon placeholders from the homepage mockup.

---

## 4. Approved homepage – 16 sections, in this order

Build these exactly as in `design/homepage-mockup.html`:

1. **Utility bar:** markets list, "Submit an RFP", Careers, region selector.
2. **Header:** logo; nav: Solutions (mega menu) · Markets · Industries · Resources · Pricing · About; phone (placeholder); **"Get a free proposal"** button.
3. **Hero:** "Reach your next market." with two buttons (Get a free proposal / Submit an RFP) and a "Where we get you found" row (Google, ChatGPT, Gemini, Perplexity, YouTube, Instagram, TikTok, LinkedIn, Amazon, App Store).
4. **Value strip:** Clear strategy · Distinctive creativity · Measurable progress.
5. **Partner badges** (placeholder).
6. **Solutions:** 8 cards. The 7 service groups link to the 19 hubs; plus Industries and Free Tools (link to the tool pages only, no live calculator on the homepage).
7. **Case studies:** 3 cards that each lead with one result number, plus a client logo row (placeholders).
8. **Process:** Discover → Create → Grow.
9. **Industries:** all 17, linked.
10. **Markets:** 6 market cards with key cities and live local time.
11. **Stats:** 6 markets · 20 services · clients (placeholder) · specialists (placeholder).
12. **Why Dazzlit** comparison table: Dazzlit vs typical agency vs freelancers. Contract terms are a placeholder.
13. **Team / culture:** 3 working principles.
14. **Testimonials** (placeholders).
15. **"Let's talk" band** with a 3-step proposal form: services → market and budget → contact.
16. **RFP section**, then **FAQs** (6, with FAQPage schema), then the **Insights roundup** (3 latest posts), then the **footer**.

---

## 5. Tech stack and structure

- **Astro 5** + TypeScript; Tailwind CSS 4 with the tokens above; content collections in Markdown/MDX; Pagefind for search.
- **Cloudflare Pages:**
  - Preview deploy on every pull request.
  - Staging on `develop`; production on `main`.
  - Pages Functions for forms; Turnstile on every form; D1/KV/R2 when needed.
- **URL patterns:** use exactly the URLs in `sitemap.csv`.

| Section | Pattern |
|---|---|
| Service hubs | `/services/<pillar>/` |
| Services | `/services/<pillar>/<service>/` |
| Industries | `/industries/<slug>/` |
| Resources | `/resources/guides/`, `/templates/`, `/tools/`, `/checklists/`, `/statistics/`, `/examples/`, `/glossary/` |
| Blog | `/blog/<slug>/` |
| Locations (Wave 6) | `/locations/<country>/<city>/` |

- **Content scaffolder:** write a script that turns each row of a `wave-N.csv` into a Markdown file. Front-matter comes from the brief columns: `Page ID`, `URL`, `H1`, `Meta Title`, `Meta Description`, `Primary Keyword`, `Secondary Keywords`, `Schema Markup`, `Parent Page`, `Internal Links Out`, `FAQs to Answer`, `CTA`, `Wave`, `Status`. The body comes from `H2 Outline`.
- **15 page templates** (plan section 4):
  - Home; service hub; service, industry-service and audience pages; pricing; industry; location.
  - Guide; template/checklist download; free tool; statistics; examples; glossary.
  - Blog post; tools roundup; company and utility pages.

---

## 6. SEO and quality rules

- **Meta tags:** title ≤ 60 and description ≤ 160 characters, exactly as in the CSV. Every page also gets a self-referencing canonical and OG/Twitter tags.
- **Schema:** JSON-LD from the `Schema Markup` column, plus Organization and WebSite schema site-wide and BreadcrumbList on every page except the homepage.
- **Internal links:** build them from the `Internal Links Out` column, with the anchor text given. The build must fail on any broken internal link.
- **One page per keyword:** never create a page that isn't in `sitemap.csv`. Never target a keyword that `keywords.csv` maps to another page.
- **Sitemaps** split by section; robots.txt; IndexNow on deploy; `noindex` on preview and staging.
- **Performance:**
  - LCP < 2.0 s, CLS < 0.05, INP < 200 ms.
  - Under 150 KB of JavaScript on content pages.
  - Images in AVIF/WebP with set width and height.
  - Lighthouse ≥ 90 on all four scores.
- **Accessibility:** WCAG 2.2 AA, semantic HTML, visible focus states, alt text on every image.
- **Placeholders:**
  - Mark every placeholder with `data-placeholder="<what is needed>"` and a visible orange "Placeholder" label on staging.
  - A CI check must **fail the production build** if any page set to publish still contains `data-placeholder`.
- **Copy:**
  - Plain, confident, specific. Write from the client's side.
  - No invented statistics or claims.
  - Statistics pages cite primary sources.
  - Use US English, except UK/AU location pages, which use UK spelling.

---

## 7. Build order

### Phase 1 – Foundations
1. Create the Astro project in `site/` and push to the owner's GitHub repo (`main` + `develop`). Connect Cloudflare Pages.
2. Design tokens, self-hosted fonts, logo and favicons.
3. Shared components from the homepage mockup:
   - Utility bar, header with mega menu, footer.
   - Buttons, CTA band, proposal form, FAQ accordion, comparison table, case-study card, stat strip, breadcrumbs, schema component.
4. The CSV → content scaffolder.
5. CI: build, internal link check, placeholder check, Lighthouse.
6. Forms: Pages Function + Turnstile. Email/CRM is decided by the owner (open decision D-10). Until then, store submissions in D1 and send email to the owner.
7. Legal and utility pages: Privacy, Terms, Cookies, Accessibility, 404, Thank-you; plus GA4, Search Console and Cloudflare Web Analytics, with cookie consent.

### Phase 2 – Wave 1 and go-live
8. Build the homepage first and match it to the approved mockup.
9. Build the 19 service hubs, pricing, site pages and 41 Wave 1 service pages, one topic cluster at a time.
10. Staging review by the owner. Then go-live per the plan's section 10 checklist, including a redirect map from the old WordPress URLs. **The owner switches DNS.**

### Phase 3 onward
Waves 2 → 5 in order, then Wave 6 (locations) when the owner says so. **Free tools:**
- Client-side calculators and generators: build them fully.
- AI and API-backed tools: build the full interface with a "request a free report" fallback form. **APIs are configured after development is finished** (owner decision D-08).
- Never put API keys in the code.

---

## 8. Definition of done (every page)

- [ ] URL, H1, meta title and description match the CSV.
- [ ] Every H2 from the outline is covered; the FAQs from the brief are answered.
- [ ] Schema validates; breadcrumbs present; canonical set.
- [ ] All internal links from the brief are present and working.
- [ ] Mobile layout checked at 375px; no horizontal scroll.
- [ ] Lighthouse ≥ 90; images optimised with alt text.
- [ ] No invented facts; placeholders marked; the owner has been asked for missing assets.
- [ ] `STATUS.md` and `RECORD_REGISTER.md` updated; changes committed and pushed.

---

## 9. Never do this

- Redesign the brand, change colours or fonts, or edit the logo.
- Copy text, code, images or layouts from other agencies' websites (the homepage follows NP Digital's *structure* only).
- Invent clients, results, reviews, awards, prices, team members or contact details.
- Add pages, URLs or keywords that aren't in the plan, or merge or rename planned pages without the owner's approval.
- Change DNS, delete the old WordPress site, or push to `main` without the owner's approval.
- Store secrets or API keys in the repository.

---

## 10. Session prompts you can reuse

**Start of a build session**
> Read `STATUS.md`. We're building **[Wave N / template / cluster]** today. List the pages, the template each uses, and every placeholder they'll need. Ask me for the assets before you start.

**Build a cluster**
> Using `data/pages-by-wave/wave-[N].csv`, build the pages for the **[pillar or cluster]** cluster: the service page, its guide and its linked posts. Follow the brief for each page exactly and show me the staging preview links when done.

**Quality check**
> Check every page built this session against the definition of done in `AI_BUILD_INSTRUCTIONS.md` section 8. List anything that fails and fix it.

**End of session**
> Update `STATUS.md` (state, next actions, changelog) and add the steps to `docs/RECORD_REGISTER.md`. Then commit with a clear message and push to `develop`.
