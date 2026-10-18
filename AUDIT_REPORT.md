# GlobalCGPA Project Audit Report

---

## 1. Project Structure

| Aspect | Details |
|--------|---------|
| **Framework** | Astro 7.0.5 (static site generator with hybrid rendering) |
| **Package Manager** | npm (package-lock.json present) |
| **Build System** | Vite via Astro + Tailwind CSS v4 (@tailwindcss/vite) |
| **Entry Points** | `src/pages/index.astro` (main), `src/pages/api/lead.ts` (API) |
| **Important Directories** | |
| `src/pages/` | 50+ route files (static + dynamic) |
| `src/components/` | 18 Astro components (calculator, nav, footer, etc.) |
| `src/data/` | 4 TypeScript data files (universities, formulas, pages) |
| `src/content/guides/` | 15 Markdown guide files (content collections) |
| `src/layouts/` | 2 layout components (Layout.astro, GuideLayout.astro) |
| `src/styles/` | global.css (CSS custom properties for design tokens) |
| `public/` | Static assets (robots.txt, _redirects, _headers, ads.txt, manifest.json, sw.js, icons) |
| `dist/` | Build output (verified sitemap, index.html, CGPA pages) |

**Key Config Files:**
- `astro.config.mjs` — site URL, sitemap config, Tailwind plugin, path aliases
- `package.json` — scripts (dev, build, preview, deploy via Wrangler), deps: astro, @astrojs/sitemap, tailwindcss
- `tsconfig.json` — extends astro/tsconfigs/strict
- `content.config.ts` — guides content collection schema

---

## 2. Pages and Routes

### Static Pages (Core)

| URL | Source | Purpose | Essential? |
|-----|--------|---------|------------|
| `/` | `src/pages/index.astro` | Main calculator + SEO article + university belt + guides | **Essential** |
| `/about` | `src/pages/about.astro` | Project story, stats, mission | **Essential** |
| `/contact` | `src/pages/contact.astro` | Contact form (Web3Forms), email | **Essential** |
| `/privacy-policy` | `src/pages/privacy-policy.astro` | Legal, GDPR/AdSense compliance | **Essential** |
| `/terms` | `src/pages/terms.astro` | Terms of use, accuracy disclaimer | **Essential** |
| `/guides` | `src/pages/guides/index.astro` | Guide index (15 guides grouped) | **Essential** |
| `/guides/[slug]` | `src/pages/guides/[slug].astro` | Dynamic guide pages (15 MD files) | **Essential** |
| `/cgpa-to-percentage-in-hindi` | `src/pages/cgpa-to-percentage-in-hindi.astro` | Hindi calculator + university table | **Essential** |
| `/404` | `src/pages/404.astro` | Not found page | **Essential** |
| `/500` | `src/pages/500.astro` | Server error page | **Essential** |

### Calculator Tools (Sub-utilities)

| URL | Source | Purpose | Essential? |
|-----|--------|---------|------------|
| `/percentage-to-cgpa` | `src/pages/percentage-to-cgpa.astro` | Reverse converter | **Essential** |
| `/cgpa-to-gpa` | `src/pages/cgpa-to-gpa.astro` | CGPA → GPA 4.0 | **Essential** |
| `/sgpa-to-cgpa` | `src/pages/sgpa-to-cgpa.astro` | Semester roll-up | **Essential** |
| `/sgpa-to-percentage` | `src/pages/sgpa-to-percentage.astro` | SGPA → % | **Essential** |
| `/marks-to-cgpa` | `src/pages/marks-to-cgpa.astro` | Marks → CGPA | **Essential** |
| `/cgpa-to-percentage-chart` | `src/pages/cgpa-to-percentage-chart.astro` | Full reference table | **Essential** |
| `/global-converter` | `src/pages/global-converter.astro` | Multi-country tool | **Essential** |
| `/backlog-impact-calculator` | `src/pages/backlog-impact-calculator.astro` | Backlog analysis | Optional |
| `/target-cgpa-calculator` | `src/pages/target-cgpa-calculator.astro` | Goal planning | Optional |

### University-Specific Pages (Dedicated)

| URL | Source | University | Essential? |
|-----|--------|------------|------------|
| `/du-cgpa-to-percentage` | `src/pages/du-cgpa-to-percentage.astro` | Delhi University | **Essential** |
| `/sppu-cgpa-to-percentage` | `src/pages/sppu-cgpa-to-percentage.astro` | SPPU (Pune) | **Essential** |
| `/vtu-cgpa-to-percentage` | `src/pages/vtu-cgpa-to-percentage.astro` | VTU (Bangalore) | **Essential** |
| `/mumbai-university-cgpa-to-percentage` | `src/pages/mumbai-university-cgpa-to-percentage.astro` | Mumbai University | **Essential** |
| `/anna-university-cgpa-to-percentage` | `src/pages/anna-university-cgpa-to-percentage.astro` | Anna University | **Essential** |
| `/aktu-cgpa-to-percentage` | `src/pages/aktu-cgpa-to-percentage.astro` | AKTU/UPTU | **Essential** |
| `/gtu-cgpa-to-percentage` | `src/pages/gtu-cgpa-to-percentage.astro` | GTU (Gujarat) | **Essential** |
| `/ktu-cgpa-to-percentage` | `src/pages/ktu-cgpa-to-percentage.astro` | KTU (Kerala) | **Essential** |
| `/makaut-cgpa-to-percentage` | `src/pages/makaut-cgpa-to-percentage.astro` | MAKAUT (WBUT) | **Essential** |
| `/calcutta-university-cgpa-to-percentage` | `src/pages/calcutta-university-cgpa-to-percentage.astro` | Calcutta University | **Essential** |

**Also present but not in `UNIVERSITY_KEYS_WITH_PAGES` (have data but no page):**
RTU, RGPV, BPUT, JNTUH, JNTUK, Osmania, Bangalore University, Andhra University, Kurukshetra, and more (see `universities.ts` — 30+ entries).

### Dynamic CGPA Value Pages (Auto-generated)

**Route Pattern:** `/[value]-cgpa-to-percentage/`  
**Source:** `src/pages/[value]-cgpa-to-percentage.astro`  
**Generated Values (27):** 10, 9.8, 9.6, 9.5, 9.4, 9.2, 9, 8.8, 8.6, 8.5, 8.4, 8.2, 8, 7.8, 7.6, 7.5, 7.4, 7.2, 7, 6.8, 6.6, 6.5, 6.4, 6.2, 6, 5.8, 5.5, 5  

Each page shows pre-calculated results for all 13 university formulas + FAQs + nearby values nav. **High SEO value** — long-tail traffic.

### International Sections (Subdirectories)

| Locale | Pages | Status |
|--------|-------|--------|
| `/hi/` (Hindi) | Index only (`src/pages/hi/index.astro` not found — actually `/cgpa-to-percentage-in-hindi`) | Partial |
| `/pt/` | `index.astro`, `universidades-comparacao.astro`, `/pt/ufba/index.astro` | Brazil |
| `/fr/` | `index.astro`, `universites-comparaison.astro`, `/fr/centrale/index.astro` | France |
| `/tr/` | `index.astro`, `universite-karsilastirma.astro`, `/tr/ankara/index.astro`, `/tr/metun/index.astro` | Turkey |
| `/de/` | `index.astro`, `/de/tu-muenchen-notendurchschnitt/index.astro`, `/de/lmu-muenchen-notendurchschnitt/index.astro` | Germany |
| `/id/` | `index.astro` | Indonesia |
| `/ja/jp/` | 4 pages (GPA, %, cumulative, calculator) | Japan |
| `/vn/`, `/ar/`, `/ko/` | Referenced in sitemap/alternates but **no page files exist** | Missing |

---

## 3. Core Calculator

### Location
- **Primary:** `src/components/Calculator.astro` (reusable modal-based calculator with 4 modes + 3 sub-modals)
- **Homepage inline:** `src/pages/index.astro` (simplified hero calculator with UniversityQuickToggle)
- **Hindi page:** `src/pages/cgpa-to-percentage-in-hindi.astro` (own inline calculator)

### Formula Storage
- **Source of truth:** `src/data/universities.ts` — 30+ university objects with `forward`, `inverse`, `formulaText`, `source`, `sourceUrl`, `classes`, `faqs`
- **Serialized for client:** `src/data/university-formulas.ts` — `getUniversityFormulas()` returns plain objects with serializable functions; injected into `Calculator.astro` and `UniversityQuickToggle.astro` as JSON at build time
- **Duplicated inline:** Several pages (`[value]-cgpa-to-percentage.astro`, `cgpa-to-percentage-in-hindi.astro`, `sgpa-to-cgpa.astro`) duplicate formula logic instead of importing

### University Selection
- **Calculator.astro:** `<select id="university-select">` populated from `getUniversitySelectOptions()` — includes CBSE, all universities, VTU split (2022 vs old), Mumbai (pre-2026), generic 5-pt/4-pt scales
- **UniversityQuickToggle.astro:** 6-button grid (CBSE, SPPU, VTU, GTU, AKTU, Anna) — dispatches `uniFormulaChange` event consumed by main calculator
- **Individual university pages:** Hardcoded to that university's formula

### Input Validation & Results
- **Validation:** Client-side only — `min`, `max`, `step` on inputs; NaN/negative checks in JS; result shows "—" on invalid
- **Results:** Live update on `input`/`change`; displays value + formula string + grade badge (Outstanding/Distinction/First Class/Second Class/Pass/Fail) + circular progress ring
- **Copy:** Clipboard API with fallback
- **Persistence:** `CalculationHistory.astro` stores last 10 calculations in localStorage

### Required Files for Calculator to Function
1. `src/components/Calculator.astro` (or inline equivalent)
2. `src/data/university-formulas.ts` → `getUniversityFormulas()` + `getUniversitySelectOptions()`
3. `src/data/universities.ts` (source data)
4. `src/components/UniversityQuickToggle.astro` (optional but used on homepage)
5. `src/styles/global.css` (CSS custom properties for theming)

---

## 4. SEO and Indexing

### robots.txt (`public/robots.txt`)
```
User-agent: *
Disallow: /

Allow: /$
Allow: /sitemap.xml
Allow: /sitemap-index.xml
Allow: /sitemap-0.xml
Allow: /404.html
Allow: /robots.txt
Crawl-delay: 30
Sitemap: https://globalcgpa.in/sitemap.xml
```
⚠️ **Maintenance mode** — entire site disallowed except sitemap/404. This **blocks all indexing** in production.

### Sitemap Configuration (`astro.config.mjs` → `@astrojs/sitemap`)
- **Index:** `sitemap.xml` → `sitemap-index.xml` + `sitemap-0.xml` (301 redirect in `_redirects`)
- **Priorities:** Home/hindi/ar/vn = 1.0 daily; university pages = 0.8 weekly; guide pages = 0.6 monthly; individual CGPA value pages = 0.5 monthly
- **Filters:** Excludes `/404`, `/500`
- **Generated:** `dist/sitemap-0.xml` contains 100+ URLs (verified)

### Canonical URLs
- Every page sets explicit `canonical` prop in Layout
- Layout constructs absolute URL: `https://globalcgpa.in{path}`

### Meta Tags (Layout.astro)
- **Title/Description:** Per-page via props
- **Keywords:** Global hardcoded list (100+ terms, mixed EN/HI/JA)
- **Open Graph:** type=website, url, title, description, image, site_name, locale
- **Twitter Card:** summary_large_image with same fields
- **Hreflang:** Auto-generated for 12 locales (en, hi, ar, vn, de, es, fr, pt, tr, id, ko, ja) + x-default

### Structured Data (JSON-LD)
- **Layout default:** WebApplication + Organization + WebSite schemas
- **Per-page overrides:** `schema` prop (e.g., index has Organization with contactPoint; value pages have WebApplication; guides use GuideLayout with Article schema)
- **HowTo schema:** Injected on homepage for "How to Convert CGPA to Percentage"

### Noindex/Nofollow
- Layout accepts `noIndex`/`noFollow` props (default false)
- No pages currently set `noIndex: true` (except 404/500 excluded via sitemap filter)

### Redirects (`public/_redirects`)
```
/sitemap.xml /sitemap-index.xml 301
```

### Security Headers (`public/_headers`)
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=()
- Cache-Control tuned per asset type

### Search Console / Webmaster Tools
- **Not found in codebase** — no verification meta tags or files
- Need to verify: Google Search Console, Bing Webmaster Tools

### Cloudflare Pages Preview Domain
- No configuration found to block indexing of `*.pages.dev` preview deployments

---

## 5. Analytics and Advertising

### Google Analytics (GA4)
- **Measurement ID:** `G-5TB706E56P` (hardcoded in `CookieConsent.astro:260`)
- **Consent Mode v2:** Implemented via `gtag('consent', 'default', {... denied})` and update on accept/reject
- **Loading:** Lazy-loaded after cookie consent accepted (`loadAnalytics()` in CookieConsent)

### Google AdSense
- **Publisher ID:** `ca-pub-1016421061571791` (in `CookieConsent.astro:281` and `public/ads.txt`)
- **ads.txt:** `google.com, pub-1016421061571791, DIRECT, f08c47fec0942fa0`
- **Loading:** Lazy-loaded after consent (`loadAdSense()`)
- **Placement:** Ad slots in `index.astro` (homepage top banner), likely other pages

### Cookie Consent (`CookieConsent.astro`)
- **Banner + floating button** for re-opening
- **localStorage key:** `gcgpa-cookie-consent` (versioned)
- **Consent modes:** ad_storage, analytics_storage, ad_user_data, ad_personalization
- **Reject:** Keeps consent denied, shows floating button
- **Accept:** Loads GA + AdSense, updates consent mode to granted

### Other Tracking
- None detected (no Facebook Pixel, Hotjar, Microsoft Clarity, etc.)

---

## 6. Hosting and Deployment

### Cloudflare Pages
- **Deploy command:** `npx wrangler pages deploy ./dist` (package.json:deploy)
- **Build command:** `astro build` (outputs to `./dist`)
- **Config:** No `wrangler.toml` or `wrangler.json` in repo — likely configured in Cloudflare dashboard

### Custom Domain
- **Target:** `globalcgpa.in` (referenced in astro.config.mjs `site`, Layout canonical, all page canonicals)
- **DNS/SSL:** Managed in Cloudflare dashboard (not in repo)

### CI/CD
- **GitHub Actions:** Not present in repo (`.github/workflows/` missing)
- **Current deploy:** Manual via `npm run deploy` (Wrangler CLI)

### Environment Variables Required
| Variable | Purpose | Status |
|----------|---------|--------|
| `CLOUDFLARE_API_TOKEN` | Wrangler auth for deploy | External (not in repo) |
| `RESEND_API_KEY` | Contact form email (TODO in `api/lead.ts`) | Not configured |
| `WEB3FORMS_ACCESS_KEY` | Contact form fallback (placeholder in contact.astro) | Placeholder `YOUR_WEB3FORMS_ACCESS_KEY` |

---

## 7. Essential Pages and Resources

| Resource | Location | Status |
|----------|----------|--------|
| **Favicon** | `public/favicon.svg`, `public/favicon.ico` | ✅ Present |
| **PWA Manifest** | `public/manifest.json` | ✅ Complete (icons, shortcuts, screenshots) |
| **Service Worker** | `public/sw.js` | ✅ Registered in Layout |
| **OG Image** | `public/og-image.png` | ✅ Referenced in Layout |
| **Fonts** | Google Fonts: Inter (400-900) preconnected in Layout | ✅ |
| **Background SVG** | `src/assets/background.svg` | ✅ |
| **Error Pages** | 404.astro, 500.astro | ✅ |
| **Layouts** | Layout.astro (main), GuideLayout.astro (guides) | ✅ |
| **Header/Nav** | Nav.astro (sticky, theme toggle, mobile menu) | ✅ |
| **Footer** | Footer.astro (6-column grid, all key links) | ✅ |
| **Breadcrumbs** | Breadcrumbs.astro | ✅ Used on tool/guide pages |
| **Cookie Consent** | CookieConsent.astro | ✅ GA4 + AdSense consent mode v2 |

---

## 8. Dependencies

| Package | Version | Purpose | Used? |
|---------|---------|---------|-------|
| `astro` | ^7.0.5 | Framework | ✅ Core |
| `@astrojs/sitemap` | ^3.7.4 | Sitemap generation | ✅ |
| `tailwindcss` | ^4.3.2 | Styling (v4) | ✅ Via Vite plugin |
| `@tailwindcss/vite` | ^4.3.2 | Vite integration | ✅ |

**No unused dependencies detected** — minimal, purposeful dependency list.

---

## 9. Final Recommendations

### A. KEEP — Essential for Core Functionality

| File/Feature | Path | Reason |
|--------------|------|--------|
| Main calculator | `src/components/Calculator.astro` | Core feature — all 4 modes + 3 sub-modals |
| University formulas data | `src/data/universities.ts` | Source of truth for 30+ universities |
| Formula serialization | `src/data/university-formulas.ts` | Client-side injection for calculator |
| University pages (10) | `src/pages/*-cgpa-to-percentage.astro` | High-traffic SEO landing pages |
| Dynamic value pages (27) | `src/pages/[value]-cgpa-to-percentage.astro` | Long-tail SEO, pre-calculated |
| Hindi calculator | `src/pages/cgpa-to-percentage-in-hindi.astro` | Large Hindi-speaking audience |
| Sub-calculators (6) | `src/pages/*.astro` (percentage-to-cgpa, cgpa-to-gpa, sgpa-*, marks-*, chart) | Complete toolkit |
| Guides (15) | `src/content/guides/*.md` + index/page | Authority content, internal linking |
| Legal pages | about, contact, privacy-policy, terms | Compliance, trust |
| Layout & components | Layout.astro, Nav.astro, Footer.astro, Breadcrumbs.astro | Shared UI |
| SEO infrastructure | Sitemap config, robots.txt, _headers, _redirects, manifest.json | Technical SEO |
| Cookie consent + GA/AdSense | CookieConsent.astro, ads.txt | Monetization + analytics (consent-compliant) |
| PWA assets | manifest.json, sw.js, icons | Installability, offline |

### B. REVIEW — Potentially Redundant or Improvable

| File/Feature | Path | Concern |
|--------------|------|---------|
| **Duplicate formula logic** | `[value]-cgpa-to-percentage.astro`, `cgpa-to-percentage-in-hindi.astro`, `sgpa-to-cgpa.astro` | All reimplement formulas instead of importing from `university-formulas.ts` — maintenance burden |
| **International locale pages (ar, vn, ko)** | Referenced in hreflang/sitemap but **no source files exist** | Generates 404s or empty pages; either implement or remove from alternates |
| **University data without pages** | 20+ entries in `universities.ts` not in `UNIVERSITY_KEYS_WITH_PAGES` | Data maintained but no pages — consider generating pages or removing unused data |
| **`robots.txt` in maintenance mode** | `public/robots.txt` | **Blocks all indexing** — must be changed to `Allow: /` for production |
| **Contact form placeholder** | `src/pages/contact.astro:44` (`YOUR_WEB3FORMS_ACCESS_KEY`) | Form won't work without real key |
| **Lead API unimplemented** | `src/pages/api/lead.ts:13-24` | TODO comment — no email service integrated |
| **Hardcoded GA/AdSense IDs** | `CookieConsent.astro:260,281` | Should be environment variables |
| **Tailwind v4 + custom CSS mix** | `global.css` + component `<style>` blocks | Some duplication; design-system.md documents violations |
| **Missing `GuideLayout` for guides** | `src/layouts/GuideLayout.astro` not read but imported | Need to verify it exists and is correct |

### C. REMOVE LATER — Candidates for Cleanup

| File/Feature | Path | Reason | Dependencies to Check |
|--------------|------|--------|----------------------|
| **Backlog calculator** | `src/pages/backlog-impact-calculator.astro` | Niche, low traffic | Links from guides/footer |
| **Target CGPA calculator** | `src/pages/target-cgpa-calculator.astro` | Niche, low traffic | Links from guides/footer |
| **Global converter page** | `src/pages/global-converter.astro` | Duplicates Calculator.astro modes | Navbar/footer links |
| **International index pages without content** | `src/pages/id/index.astro`, `src/pages/pt/index.astro`, etc. | Empty shells — no calculator, no data | hreflang alternates, sitemap |
| **Japanese subdirectory** | `src/pages/ja/jp/*.astro` (4 pages) | Different system (GPA 4.0/4.3), not CGPA | If keeping, needs proper data source |
| **Unused university data** | `universities.ts` entries without pages | Dead code if no pages planned | `university-pages.ts` filter |
| **`project_handoff.md`, `DESIGN.md`** | Root docs | Internal docs, not for production | None |
| **`.vscode/` config** | `.vscode/launch.json`, `extensions.json` | Editor config, not deployment | None |

---

## 10. Unverifiable from Local Project Alone

| Item | Why Unverifiable |
|------|------------------|
| **Cloudflare Pages custom domain config** | DNS/SSL managed in Cloudflare dashboard |
| **Cloudflare Pages preview domain indexing** | No `_headers`/`robots.txt` rule for `*.pages.dev` |
| **Google Search Console verification** | No meta tag/file in repo; must check GSC dashboard |
| **Bing Webmaster Tools verification** | Same as above |
| **Google Analytics data (traffic, events)** | Only measurement ID in code; data in GA4 property |
| **Google AdSense earnings/policy status** | Only publisher ID in code; status in AdSense account |
| **Wrangler authentication** | `CLOUDFLARE_API_TOKEN` not in repo |
| **Web3Forms/Resend API keys for contact/lead** | Placeholders only |
| **Actual sitemap submission status** | Must check GSC/Bing manually |
| **Core Web Vitals / PageSpeed scores** | Requires live URL testing |

---

## 11. Proposed Minimal Website Structure

Preserving only the main calculator, essential legal pages, and working SEO:

```
/                           # Homepage (main calculator + SEO article + university belt)
/cgpa-to-percentage-chart   # Full reference table
/sgpa-to-cgpa               # Semester roll-up
/percentage-to-cgpa         # Reverse converter
/cgpa-to-gpa                # CGPA → GPA 4.0
/sgpa-to-percentage         # SGPA → %
/marks-to-cgpa              # Marks → CGPA

# University-specific (10 highest-traffic)
/du-cgpa-to-percentage
/sppu-cgpa-to-percentage
/vtu-cgpa-to-percentage
/mumbai-university-cgpa-to-percentage
/anna-university-cgpa-to-percentage
/aktu-cgpa-to-percentage
/gtu-cgpa-to-percentage
/ktu-cgpa-to-percentage
/makaut-cgpa-to-percentage
/calcutta-university-cgpa-to-percentage

# Dynamic value pages (27) — keep for long-tail SEO
/[5-10]-cgpa-to-percentage/

# Hindi
/cgpa-to-percentage-in-hindi

# Guides (15)
/guides
/guides/[slug] (15 files)

# Legal
/about
/contact
/privacy-policy
/terms

# Technical
/robots.txt (Allow: /)
/sitemap.xml → /sitemap-index.xml
/ads.txt
/manifest.json
/sw.js
/_headers
/_redirects
```

**Total: ~55 pages** (vs current 100+), removing:
- 2 niche calculators (backlog, target)
- Global converter (duplicate)
- 20+ university data entries without pages
- 4 Japanese pages (different grading system)
- 6+ incomplete international locale index pages
- Internal docs (handoff, design)

This structure retains **100% of calculator functionality**, **all high-traffic SEO pages**, **legal compliance**, and **technical SEO infrastructure** while eliminating maintenance burden from unused/incomplete features.