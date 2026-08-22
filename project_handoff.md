# Global CGPA — Project Handoff Document

> **Purpose:** Paste this into a fresh Antigravity IDE session so the new AI assistant knows exactly what this project is and what has already been built and deployed.

---

## 1. What This Project Is

**Global CGPA** is a live, publicly accessible CGPA calculator website for Indian university students.

- **Live URL:** https://globalcgpa.in
- **GitHub repo:** https://github.com/7Winx09/global-cgpa (branch: `main`)
- **Hosting:** Cloudflare Pages — auto-deploys from `main` branch on push
- **Local path:** `d:\Projects\Project type 1\CGPA\`

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | **Astro v7** (static site generator) |
| Styling | **Tailwind CSS v4** (via `@tailwindcss/vite` plugin) + Vanilla CSS inside components |
| Language | HTML / vanilla JavaScript (no React/Vue) |
| Build | `npm run build` → outputs to `dist/` |
| Deploy | `npm run deploy` → `npx wrangler pages deploy ./dist` (Cloudflare Pages) |
| Dev server | `astro dev --background` (per project AGENTS.md rule) |
| Node requirement | >= 22.12.0 |

**Key config file:** `astro.config.mjs` — Tailwind v4 registered as a Vite plugin.

**Important rule from `AGENTS.md`:** Always start the dev server with `astro dev --background`.

---

## 3. Project File Structure

```
d:\Projects\Project type 1\CGPA\
├── src/
│   ├── components/
│   │   ├── Calculator.astro      ← Main calculator (43 KB) — most complex file
│   │   ├── Faq.astro             ← FAQ accordion section
│   │   ├── Footer.astro
│   │   ├── Hero.astro            ← Landing hero section
│   │   ├── HowItWorks.astro
│   │   ├── Nav.astro             ← Navigation with dark/light mode toggle
│   │   ├── SeoArticle.astro      ← Long-form SEO content section
│   │   ├── UniversityTable.astro ← Static comparison table
│   │   ├── UseCases.astro
│   │   └── Welcome.astro
│   ├── layouts/
│   │   └── Layout.astro          ← Base HTML layout, dark-mode anti-FOUC script
│   ├── pages/
│   │   ├── index.astro           ← Home page (57 KB) — assembles all components
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── privacy-policy.astro
│   │   ├── terms.astro
│   │   ├── 404.astro
│   │   └── 500.astro
│   └── styles/
│       └── global.css            ← Global CSS variables, dark/light tokens
├── public/
│   └── ads.txt                   ← Google AdSense verification
├── AGENTS.md                     ← Rules for AI agents (dev server rule lives here)
├── DESIGN.md                     ← Detailed design system documentation
├── astro.config.mjs
├── package.json
├── wrangler.toml                 ← Cloudflare Pages config
└── tsconfig.json
```

---

## 4. What Was Built / Changed (Chronological)

### Commit 1 — `6b05aa4` Initial commit
The original codebase was committed. At this point it was a basic Astro + Tailwind site with a simple CGPA calculator.

### Commit 2 — `381f7f6` Add AdSense + ads.txt
- Added Google AdSense `<script>` tag to the Layout
- Created `public/ads.txt` with the AdSense publisher ID for ad monetisation

### Commit 3 — `cf5afa7` Fix structured data JSON-LD + frontmatter
- Fixed broken JSON-LD structured data (Schema.org) in the `<head>`
- Fixed a stray character `D` in a frontmatter block

### Commit 4 — `ab1b200` Fix advanced converters + 8-semester SGPA modal
First attempt at the major calculator overhaul:
- Added 8 pre-loaded semesters to the SGPA → CGPA modal
- Added spacing improvements and a breakdown table
- But these changes didn't make it to the live site due to a script tag issue (see below)

### Commit 5 — `3c58b8a` Fix calculator
An intermediate fix attempt.

### Commit 6 — `e052b6a` Fix: `is:inline` script tag
**Critical fix.** The `<script>` tag in `Calculator.astro` was a plain `<script>` which Astro bundles as an ES module — this caused the `oninput` HTML attribute handlers (like `oninput="calcMarks()"`) to fail silently because the functions were in module scope, not the global `window` scope.

**Fix:** Changed `<script>` → `<script is:inline>` so Astro outputs the JS verbatim and the functions are truly global.

### Commit 7 — `caa878d` Fix 8-semester SGPA in index.astro modals
- Made the SGPA → Cumulative CGPA modal pre-load **all 8 semesters** (S1–S8) for a standard 4-year degree
- Added spacious layout with per-row semester badges (S1, S2 … S8)
- Added a **live breakdown table** showing each semester's weighted contribution
- Added +/− Add/Remove row buttons

### Commit 8 — `c797ac1` Dark / Light mode toggle
Added a full dark/light theme system:
- **Toggle button** in the `Nav.astro` (moon/sun icon)
- **Theme persistence** via `localStorage` key `"theme"`
- **Anti-FOUC script** in `Layout.astro` `<head>` — reads localStorage before page renders to avoid flash of wrong theme
- CSS custom properties (`--bg`, `--text-ink`, `--border`, etc.) defined in `global.css` with `[data-theme="dark"]` overrides
- The `<html>` element gets `data-theme="dark"` or `data-theme="light"` attribute

### Commit 9 — `13f197c` Formula accuracy pass ← **Most recent**
Full audit and correction of all CGPA → Percentage university formulas in `Calculator.astro`:

| University | Was (WRONG) | Now (CORRECT) | Source |
|---|---|---|---|
| **VTU** | `CGPA × 10` | `(CGPA − 0.75) × 10` | VTU official — 2015/2017/2018 schemes |
| **Anna University** | `(CGPA × 10) − 7.5` | `CGPA × 10` | Anna Univ R-2015/R-2017/R-2019 official |
| **GTU** | `(CGPA × 10) − 7.5` | `(CGPA − 0.5) × 10` | GTU official notification |
| **SPPU/Pune** | `(CGPA × 10) − 7.5` | `CGPA × 10` (labelled approx) | SPPU uses grade-range system, no single formula |
| **Mumbai** | `7.1 × CGPA + 11` | ✅ unchanged | Mumbai Univ 2019 circular |
| **CBSE/AKTU** | `CGPA × 9.5` | ✅ unchanged | Standard |

Additional changes in this commit:
- Each university entry in the `UNIS` object now has a `note` field with the official source/scheme name
- The formula result line now appends the note (e.g. `"VTU 2015 / 2017 / 2018 schemes (official)"`)
- Dropdown option labels updated to show correct formulas at a glance
- **Conversion Chart** expanded from 3 columns (CBSE, old-SPPU, VTU) to **5 columns** (CBSE, VTU, Anna, GTU, Mumbai) — all with correct formulas
- All `fn()` calls now clamp at 100 with `Math.min(..., 100)`

---

## 5. Calculator.astro — Internal Architecture

The `Calculator.astro` file (the most complex file) is structured as:

### HTML Sections
1. **Main calc card** — four mode tabs (CGPA→%, %→CGPA, CGPA→GPA, GPA→CGPA) + result box
2. **Sub-calculator cards** — three clickable cards that open modals:
   - 📋 **Marks → CGPA** (enter per-subject marks)
   - 📈 **SGPA → CGPA** (8 pre-loaded semester rows)
   - 📊 **Conversion Chart** (full reference table)
3. **Three modal overlays** (`modal-marks`, `modal-sgpa`, `modal-chart`)

### JavaScript (`<script is:inline>`)
- `UNIS` object — all university formula definitions (fn, inv, formula, note)
- `MODE_CONFIG` object — tab configuration per mode
- `compute()` — main calculation runner
- `calcMarks()` / `calcSgpa()` — modal calculators
- `buildChart()` — generates the conversion chart table rows
- `openModal()` / `closeModal()` — modal show/hide
- Event listeners for tabs, inputs, close buttons, Escape key, backdrop clicks

### CSS (scoped `<style>`)
- All component styles are scoped inside the `<style>` block
- Uses CSS custom properties (`var(--bg-card)`, `var(--text-ink)`, etc.) from `global.css`
- Responsive breakpoints at `max-width: 640px`

---

## 6. Deployment Workflow

```powershell
# 1. Make changes to source files
# 2. Build
npm run build

# 3. Push to GitHub (Cloudflare auto-deploys from main)
git add .
git commit -m "your message"
git push

# OR manually deploy to Cloudflare
npm run deploy
```

**Note for PowerShell:** Use semicolons (`;`) to chain commands, NOT `&&` (which is invalid in PowerShell).

---

## 7. Known Issues / Things to Be Aware Of

1. **Cloudflare caching:** After a push, it can take 1–3 minutes for the live site to update. If you see an old version, wait and hard-refresh (Ctrl+Shift+R).
2. **Build cache corruption:** If you see a `Cannot find module ... dist\.prerender\chunks\*.mjs` error during build, clean with:
   ```powershell
   Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue
   Remove-Item -Recurse -Force node_modules/.vite -ErrorAction SilentlyContinue
   Remove-Item -Recurse -Force .astro -ErrorAction SilentlyContinue
   npm run build
   ```
3. **`<script is:inline>` is intentional** — Do NOT remove the `is:inline` attribute from the script tag in `Calculator.astro`. Without it, the inline `oninput="calcMarks()"` HTML attribute handlers break silently.
4. **Tailwind v4 syntax** — This project uses Tailwind CSS v4 (not v3). Utility names and config syntax differ from v3. If adding Tailwind classes, check the `tailwind-4-docs` skill.
5. **SPPU formula** — SPPU/Pune University does not publish an official linear CGPA-to-% formula. The current implementation uses `CGPA × 10` as a best approximation and is clearly labelled as approximate. Do not try to use `CGPA × 10 − 7.5` for SPPU — that formula is incorrect for SPPU.

---

## 8. Features Suggested But NOT Yet Implemented

These were discussed with the user but not built:

1. **Percentage → Grade card** — Reverse lookup: enter percentage, get CGPA + grade for all universities at once
2. **PDF export** — "Download as PDF" for result/grade card to share with placement portals
3. **University-specific SGPA weighting** — Some universities (e.g., final year has 2× weight); toggle for that
4. **Shareable result URL** — Deep-link with CGPA pre-filled (e.g., `?cgpa=8.5&uni=vtu`)
5. **Compare mode** — Side-by-side result for multiple universities simultaneously

---

## 9. Quick Start After Reinstall

Tell the new AI:

> "This is the Global CGPA project — a live CGPA calculator website at **globalcgpa.in**.
> Local path: `d:\Projects\Project type 1\CGPA\`
> GitHub: `https://github.com/7Winx09/global-cgpa` (auto-deploys to Cloudflare Pages on push to main).
> Tech stack: Astro v7 + Tailwind CSS v4. The most important file is `src/components/Calculator.astro` (~43KB).
> The dev server must be started with `astro dev --background` (see AGENTS.md rule).
> For PowerShell, chain commands with `;` not `&&`."
