# Design System — GlobalCGPA

Derived from the existing codebase (`src/styles/global.css`, component styles).  
Use this as the single source of truth for all new pages and components.  
Do not invent new values; reuse tokens and patterns below.

---

## 1. Color Tokens (CSS Custom Properties)

All colors defined in `:root` (dark default) and `.light-theme` / `[data-theme="light"]` override.

| Token | Dark | Light | Usage |
|-------|------|-------|-------|
| `--bg` | `#111827` | `#F8FAFC` | Page background |
| `--bg-card` | `#1F2937` | `#FFFFFF` | Card / calculator shell background |
| `--bg-soft` | `#1F2937` | `#F1F5F9` | Input backgrounds, formula blocks, table alt rows |
| `--text-ink` | `#F3F4F6` | `#0F172A` | Primary text (headings, labels) |
| `--text-body` | `#9CA3AF` | `#475569` | Body copy, secondary text |
| `--text-mute` | `#9CA3AF` | `#64748B` | Muted labels, placeholders, breadcrumbs |
| `--border` | `#374151` | `#E2E8F0` | Borders, dividers, input borders |
| `--primary` | `#10B981` | `#059669` | Accent (CTAs, links, focus rings, output values) |
| `--primary-dark` | `#059669` | `#047857` | Hover states for primary buttons |

**Rules:**
- Never hardcode hex colors outside these tokens.
- No new accent colors (no blue, orange, red, purple).
- No gradient backgrounds.
- Use `var(--token)` everywhere.

---

## 2. Type Scale (exact sizes in use)

| Role | Size | Weight | Line-height | Token/Class |
|------|------|--------|-------------|-------------|
| Page H1 | `2.25rem` (36px) / `2.75rem` (44px) sm | 800 | 1.15 | `text-3xl sm:text-4xl font-extrabold tracking-tight` |
| Section H2 | `1.45rem` (23px) | 800 | 1.3 | `.prose h2` |
| Section H3 | `1.08rem` (17px) | 700 | — | `.prose h3` |
| Body | `0.96rem` (15px) | 400 | 1.8 | `.prose p` |
| Small body / FAQ answer | `0.89rem` (14px) | 400 | 1.75 | `.faq-row .faq-body` |
| Label (uppercase) | `0.74rem` (12px) | 700 | — | `.calc-label`, `.formula-block .f-label`, `.crumbs` |
| Input / Select | `1rem` (16px) | 500 | — | `.calc-input`, `.calc-select` |
| Output value | `2.3rem` (37px) | 800 | 1.15 | `.calc-out-val` |
| Output label | `0.72rem` (11px) | 700 | — | `.calc-out-lbl` |
| Table header | `0.74rem` (12px) | 700 | — | `.prose thead th` |
| Table cell | `0.88rem` (14px) | 400 | — | `.prose tbody td` |
| Button (tab) | `0.84rem` (13px) | 600 | — | `.calc-tab` |
| Footer link | `0.81rem` (13px) | 400 | — | `.footer-links a` |

**Rules:**
- No arbitrary `text-[size]` values. Use the scale above.
- All uppercase labels: `font-weight: 700`, `letter-spacing: 0.05–0.1em`, `text-transform: uppercase`.

---

## 3. Spacing Scale

All padding, margin, gap derived from 4px base unit.

| Step | Value | Example Usage |
|------|-------|---------------|
| 1 | `4px` | `gap-1`, small icon gaps |
| 2 | `8px` | `gap-2`, `p-2`, `mb-2` |
| 3 | `12px` | `gap-3`, `p-3` |
| 4 | `16px` | `gap-4`, `p-4`, `mb-4` |
| 5 | `20px` | `p-5` |
| 6 | `24px` | `gap-6`, `p-6`, `mb-6` |
| 7 | `28px` | `gap-7` |
| 8 | `32px` | `p-8`, `mb-8` |
| 10 | `40px` | `p-10` |
| 12 | `48px` | `py-12` |
| 14 | `56px` | `py-14` |
| 16 | `64px` | `p-16` |

**Rules:**
- Only use Tailwind spacing utilities (`p-4`, `gap-6`, `mb-8`, etc.).
- No arbitrary `padding: 13px` or `margin: 22px` in custom CSS.
- Component internal spacing defined in component-scoped `<style>` blocks using the same scale.

---

## 4. Component Patterns (reuse, don't reinvent)

### 4.1 Calculator Card (`.calc-shell`)
- Background: `var(--bg-card)`
- Border: `1px solid var(--border)`
- Radius: `20px` (`rounded-2xl`)
- Padding: `26px` (`p-6.5` ≈ `p-6` + `p-0.5`)
- Shadow: `0 18px 40px rgba(0,0,0,0.18)`
- Inner elements: `.calc-label`, `.calc-input`, `.calc-select`, `.calc-output`, `.calc-tab`, `.formula-block`

### 4.2 Formula Block (`.formula-block`)
- Background: `var(--bg-soft)`
- Border: `1px solid var(--border)`
- Left accent border: `3px solid var(--primary)`
- Radius: `12px`
- Padding: `16px 20px`
- Parts: `.f-label` (uppercase, primary color), `.f-text` (monospace, bold), `.f-example` (muted)

### 4.3 FAQ Accordion (`.faq-wrap` > `.faq-row` > `details` > `summary` + `.faq-body`)
- Border-top on wrap, border-bottom on each row
- Summary: cursor pointer, flex with `::after` "+" icon (22px circle, border `var(--border)`)
- Open state: icon rotates 45deg, becomes primary background
- Body: `0.89rem`, `line-height: 1.75`, `var(--text-body)`

### 4.4 Guide/Article Layout (`.prose`)
- Max-width: `760px`, centered
- H2/H3/P/UL/OL/Blockquote/Code/Table/HR styles defined
- Tables: responsive wrapper `.table-scroll` with horizontal scroll

### 4.5 University Table (`.prose table`)
- Header: `var(--bg-soft)`, uppercase, `0.74rem`, `var(--text-mute)`
- Body: alternating `var(--bg-card)` rows
- First column: bold, `var(--text-ink)`
- Borders: `var(--border)`

### 4.6 Breadcrumbs (`.crumbs`)
- Flex, wrap, gap `6px`
- Font: `0.78rem`, `var(--text-mute)`
- Separator: opacity `0.5`
- Current: `var(--text-body)`, weight `600`

### 4.7 Footer (`.site-footer`)
- Grid: `1.3fr 1fr 1fr 1fr 1fr 0.9fr` desktop, responsive collapse
- Brand column with logo SVG + tagline
- Link columns: uppercase titles (`0.62rem`, `var(--text-mute)`), links `0.81rem`, `var(--text-body)`, hover `var(--primary)`
- Bottom bar: copyright + links, flex wrap

---

## 5. Accessibility Floor (non-negotiable)

- **Contrast**: Minimum 4.5:1 for text in both themes (verify with `--text-body` on `--bg-card`, `--text-mute` on `--bg`).
- **Focus rings**: Visible on all interactive elements. Use `focus:outline-none focus:border-emerald-500` or `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500`.
- **Keyboard**: All interactive elements reachable and operable via keyboard (native `<button>`, `<a>`, `<input>`, `<select>`, `<details>/<summary>`).
- **ARIA**: `aria-live="polite"` for dynamic status messages; `aria-label` on icon-only buttons; `role="dialog"` on modals.
- **Reduced motion**: Respect `prefers-reduced-motion` for animations (slide-up, fade-in).

---

## 6. Explicit "Do Not" List

- ❌ No new fonts (only Inter + system-ui fallback)
- ❌ No gradient backgrounds
- ❌ No hardcoded hex colors outside the 10 tokens above
- ❌ No new accent colors (only `--primary` / `--primary-dark`)
- ❌ No arbitrary `text-[size]`, `p-[value]`, `gap-[value]` — use the scales
- ❌ No `box-shadow` except the one defined for `.calc-shell`
- ❌ No `border-radius` other than `6px` (small), `10px` (buttons/tabs), `12px` (inputs/formula), `14px` (output), `20px` (calc-shell)
- ❌ No new animation keyframes beyond `slideUp`, `fadeIn` (cookie banner)
- ❌ No inline styles except for the theme-initialization script and `style="flex:1"` on main

---

## 7. Audit of Existing Pages (violations to fix later)

| Page / Component | Violation | Severity |
|------------------|-----------|----------|
| `Layout.astro` theme script | Inline script with hardcoded `#10B981` in SVG (logo) | Low (logo only) |
| `Footer.astro` | Hardcoded `#10B981` in logo SVG fill | Low |
| `Footer.astro` | Grid template columns use raw fractions not in spacing scale | Medium |
| `CookieConsent.astro` | Custom `@keyframes slideUp` / `fadeIn` (allowed exception) | — |
| `CookieConsent.astro` | `box-shadow: 0 -4px 24px rgba(0,0,0,0.12)` not using token | Medium |
| Various pages | `style="flex:1"` on main (allowed exception) | — |
| `global.css` | `::selection` hardcoded colors | Low |
| `global.css` | Scrollbar styling hardcoded | Low |
| University pages | Some inline `style` attributes for width/height on SVGs | Low |

**Note:** Do not fix these in this pass. Document only.

---

## 8. Adding New Country Sections

When adding `/ko/`, `/id/`, `/es/`, etc.:

1. Create `src/pages/[lang]/` folder structure mirroring English
2. Use **same component classes** (`.calc-shell`, `.prose`, `.faq-wrap`, etc.)
3. All UI copy in target language — no English terms
4. Data sourced from `src/data/universities-global.ts` (to be created)
5. Each university entry must have: `source`, `sourceUrl` (resolvable), `note` if source unverifiable
6. hreflang tags reciprocal with English pages
7. Sitemap entries auto-generated via Astro build
8. No new CSS files — extend `global.css` only if absolutely necessary (new tokens only)

---

## 9. Data Schema for Global Universities

```ts
export interface GlobalUniversity {
  key: string;                    // e.g., "ko-snu", "id-ui", "de-tum"
  country: string;                // ISO 3166-1 alpha-2: "KR", "ID", "ES", "DE", "PT", "FR", "TR", "VN", "AR", "IN"
  name: string;                   // Local name
  nameEn: string;                 // English name
  slug: string;                   // URL slug (local language preferred)
  system: "4.0" | "4.3" | "4.5" | "5.0" | "10.0" | "20.0" | "1-6";  // grading system
  gradeMapping: Record<string, number>;  // letter -> grade point
  percentageMapping?: Record<string, [number, number]>; // letter -> [min%, max%]
  formulaText: string;            // Human-readable formula
  formulaLabel: string;           // Short label for UI tabs
  source: string;                 // Citation text
  sourceUrl: string;              // Resolvable URL to official regulation
  note?: string;                  // Caveats, "source in Korean only", etc.
  languages: string[];            // ["ko", "en"] — which language pages exist
}
```

All 10 countries will populate this single file. Country pages filter by `country` code.

---

## 10. Korean Section Specifics (/ko/)

- **Pages**: `/ko/` (메인 계산기), `/ko/대학-학점계산기` (대학별), `/ko/평점계산기` (과목별 평점)
- **Keywords**: 학점계산기, 학점 계산기, 평점 계산기, 성적 계산기, GPA 계산기
- **Universities** (verified sources):
  1. 서울대학교 (SNU) — 4.3 scale — `https://oga.snu.ac.kr/credit-grade`
  2. KAIST — 4.3 scale — `https://www.kaist.ac.kr/en/html/edu/03100308.html`
  3. 연세대학교 (Yonsei) — 4.3 scale — `https://uic.yonsei.ac.kr/main/academic.php?mid=m03_02_05`
  4. 고려대학교 (Korea Univ) — 4.5 scale — `https://registrar.korea.edu/eduinfo_en/info/grade_overview.do`
  5. 이화여자대학교 (Ewha) — 4.3 scale — `https://ewha.ac.kr/ewhaen/bachelor/grades05.do`
  6. 성균관대학교 (SKKU) — 4.5 scale — `https://www.skku.edu/eng/International/StudySKKU/BulletinBoard.do?articleNo=8128&attachNo=6472&mode=download`
  7. 건국대학교 (Konkuk) — 4.5/4.3 dual — `https://old.konkuk.ac.kr/eng/jsp/Academics/academics_2_7_2.jsp`
- **Main calculator**: Toggle 4.3 / 4.5 scale, input grades + credits, output GPA
- **University pages**: Pre-filled with that university's mapping, same calculator UI
- **Guides**: Korean equivalents of Indian guides (e.g., "학점 4.3 만점 기준", "절대평가 vs 상대평가", "편입생 학점 인정")

---

*End of design-system.md*