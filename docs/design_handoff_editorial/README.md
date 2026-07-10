# Handoff: Sibility Editorial Landing Page

## Overview
Marketing landing page for **Sibility** — an independent initiative that strengthens the human capacity for nonviolence through four centers (grants, education, research, involvement). The page introduces the brand, defines the coined word "sibility," states the working principles, presents the four centers, and closes with a vision statement + "Join us" call-to-action.

## About the Design Files
The files in this bundle are **design references authored in HTML** — a prototype showing intended look, layout, and behavior. They are **not production code to ship directly**. The task is to **recreate this design in the target codebase's existing environment** (React/Next, Vue, Astro, etc.) using its established components, routing, and conventions. If no front-end environment exists yet, pick the most appropriate framework for a marketing site (e.g. Next.js or Astro) and implement there.

Note on source markup: the prototype was built in a small component runtime. You'll see `{{ ... }}` template holes, `<sc-if>` tags, `style-hover="..."` attributes, and a `<script data-dc-script>` logic class at the bottom. These are prototype-runtime constructs — **translate them to your framework's idioms** (props/state, conditional rendering, CSS `:hover`). All the visual values you need are inline in the markup.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, and interactions. Recreate pixel-accurately using the codebase's libraries and patterns. Values below are exact.

## Layout System
- **Single-column vertical page**, max content width governed by section horizontal padding rather than a fixed container: every section uses horizontal padding `clamp(20px, 5vw, 56px)`.
- **Two-column editorial grid** used repeatedly: a narrow left "label" column (`flex: 1 1 240px; max-width: 340px`) and a wide right "content" column (`flex: 3 1 480px`), separated by `gap: clamp(28px, 5vw, 80px)`, wrapping to stacked on narrow screens.
- **Responsive breakpoint:** `820px`. Below it, the header nav collapses to a hamburger; above it, the full nav + "Support us" button show. All columns use `flex-wrap: wrap` so they stack naturally on mobile.
- All measurements use `clamp(min, vw, max)` for fluid scaling — preserve these exactly.

## Screens / Views

### Single view: Editorial Landing (top → bottom)

**1. Header (sticky, glass, shrink-on-scroll)**
- `position: sticky; top: 0; z-index: 100`. Flex row, space-between.
- **Glass effect:** translucent background `rgba(<page-bg-rgb>, 0.6)` at top / `0.8` once scrolled, plus `backdrop-filter: saturate(140%) blur(16px)`. Page-bg RGB is `239,236,232` (warm) or `224,228,234` (blue).
- **Shrink on scroll:** a `scrolled` flag flips true once scroll offset > 12px. Padding animates from `clamp(22px,3vw,34px) …` (top) to `clamp(11px,1.4vw,15px) …` (scrolled); logo height animates `22px → 18px`; a hairline bottom border `rgba(24,9,8,0.1)` fades in. Transition `0.4s cubic-bezier(0.4,0,0.2,1)` on padding, `0.4s ease` on background/border, and `0.4s` on the logo height.
- Left: logo SVG (`logo-full-black.svg`) + superscript `®` (Albert Sans, 11px, 600).
- Center nav (desktop ≥820px): FLOW, DELTA, SOURCE, CURRENT. Albert Sans, 12px, weight 600, `letter-spacing: 0.12em`, `text-transform: uppercase`, color `#180908`, hover `#DB8236`. Gap `clamp(20px,3vw,40px)`.
- Right: "Support us" button — Albert Sans 12px/700, `letter-spacing:0.1em`, uppercase, text `#efece8` on `#180908`, padding `11px 22px`, hover background `#DB8236`.
- **Mobile (<820px): full-screen menu.** Hamburger glyph (`☰` / `✕`, 26px, `z-index:110`, rotates 90° when open) toggles a `position: fixed` overlay sized `100vw × 100vh` (`z-index:90`), solid page-bg background, links vertically centered and left-aligned. Links are large display type — Albert Sans `clamp(30px,9vw,46px)`, weight 700 (Flow/Delta/Source/Current) — followed by a dark "Support us" button (15px uppercase). Opens with `opacity` + `translateY(-8px→0)` transition (`0.32s`/`0.4s cubic-bezier`); `pointer-events` gated on open.

**2. Hero**
- Padding `clamp(60px,9vw,150px) … clamp(56px,7vw,100px)`. Two columns, `align-items: stretch`.
- Left column (tagline, `flex:3 1 480px`):
  - Eyebrow "(An independent initiative)" — Albert Sans 14px/600, `letter-spacing:0.04em`, color `#DB8236`, margin-bottom 18px.
  - H1 "Nonviolence is a capacity. We fund it, teach it, and study it." — Albert Sans, `font-size: clamp(40px,5.6vw,78px)`, weight 700, `letter-spacing:-0.028em`, `line-height:1.02`.
  - Intro paragraph — Barlow, `clamp(18px,1.7vw,22px)`, `line-height:1.55`, color `#4a3f3d`, `max-width:640px`, margin-top 38px.
  - "Learn more →" link — Albert Sans 15px/600, `#180908`, `border-bottom:1.5px solid #180908`, hover `#DB8236`. Anchors to `#centers`.
- Right column (word card, `flex:1 1 240px; max-width:340px`), vertically centered (`display:flex; align-items:center`):
  - Card: `border:1px solid #180908`, padding `30px 28px 32px`.
  - Label "The word" — Albert Sans 12px/700, uppercase, `letter-spacing:0.12em`, `#DB8236`.
  - Word "sibility" — Albert Sans `clamp(34px,3.6vw,52px)`, weight 800, `letter-spacing:-0.035em`, `line-height:0.95`.
  - Transcription "/sɪˈbɪl.ɪ.ti/ · noun" — Barlow 14px/500, color `#8a807c`.
  - Hairline `1px #cfc8bf`, then definition paragraph — Barlow `clamp(15px,1.4vw,17px)`, `#4a3f3d`.

**3. How we work (full-width band)**
- Background = current page background color (see BG switcher). Padding `clamp(56px,7vw,96px) clamp(20px,5vw,56px)`, `margin-top: clamp(20px,3vw,40px)`.
- Two columns. Left: eyebrow "How we work" (`#DB8236`, uppercase 12px/700) + H2 "Three commitments hold everything we do." (Albert Sans `clamp(26px,2.7vw,36px)`/700, `letter-spacing:-0.02em`).
- Right: three numbered rows. Each row = flex, `gap:28px`, `padding:24px 0`. Number `01/02/03` (Albert Sans 14px/700, `#DB8236`, `min-width:24px`) + title (Albert Sans 22px/700) + paragraph (16px, `#4a3f3d`, `max-width:460px`).
- **Dividers only between rows:** row 2 and row 3 have `border-top:1px solid #cfc8bf`; row 1 has no top border and row 3 has no bottom border.
  - Resilience — "We build for the long term — steady support that initiatives can plan around."
  - Flexibility — "Grantees keep their freedom — including the freedom to choose other grantors."
  - Professionalism — "Clear conditions, clear process, decisions explained. Professionals with professionals."

**4. Four Centers** (`id="centers"`)
- Section padding `clamp(24px,3vw,40px) clamp(20px,5vw,56px) clamp(20px,3vw,40px)`.
- **Section header — dark contrast block** (knockout): `background:#180908`, `color:#efece8`, padding `clamp(40px,5vw,68px) clamp(28px,4vw,56px)`, `margin-bottom: clamp(56px,7vw,96px)`. Flex row, `align-items:center`, space-between.
  - Background image `hero-swirl.avif`, `object-position:right center`, `opacity:0.5`, `mix-blend-mode:screen`; plus a left→right dark gradient overlay `linear-gradient(90deg, #180908 0%, rgba(24,9,8,0.9) 40%, rgba(24,9,8,0.25) 100%)` so left-side text stays legible.
  - Left: eyebrow "What we do" (`#DB8236`) + H2 "One initiative, four ways in." (Albert Sans `clamp(30px,3.8vw,54px)`/700).
  - Right: 2×2 grid of the four center icon SVGs (`repeat(2,1fr)`, gap `clamp(20px,2vw,34px)`), each icon height `clamp(38px,3.4vw,52px)`, color `#efece8`.
- **Four center rows**, each the two-column grid. Left column: number + category eyebrow (`01 SUPPORT`, `02 EDUCATION`, `03 RESEARCH`, `04 INVOLVEMENT` — number `#DB8236`, category `#8a807c` uppercase 11px/700) above a 52px black icon SVG. Right column: H3 title (Albert Sans `clamp(38px,4.2vw,58px)`/700, `line-height:1.0`), body paragraph (`clamp(18px,1.75vw,22px)`, `#4a3f3d`, `max-width:640px`), and a "Learn more →" link.
  - Rows 2–4 have `border-top:1px solid #cfc8bf`; each row padding `clamp(72px,9.75vw,135px) 0`. Row 1 (Flow) has top padding 0, bottom `clamp(72px,9.75vw,135px)`.
  - **01 Sibility Flow** (Support): "Grants for independent nonviolence initiatives — funding for the work itself, or a tuition grant to study at Sibility Source. We back projects that reduce violence in families, schools and communities, and we commit for the long term rather than a single cycle, so teams can plan real work. Applications are open on a rolling basis." → `Flow.dc.html`
  - **02 Sibility Source** (Education): "Classes on nonviolence — for those who come as a parent or a neighbour, and for those who come as a professional. Courses run from short introductions to in-depth programmes, taught by practitioners and researchers who work in the field every day. A number of places are covered by Sibility Flow tuition grants." → `Source.dc.html`
  - **03 Sibility Delta** (Research): "Research in nonviolence: what shapes it, and which factors help it hold. Guided by a scientific council, we fund studies, publish findings openly, and turn evidence into tools that practitioners can actually use. Proposals from independent researchers are welcome." → `Delta.dc.html`
  - **04 Sibility Current** (Involvement): "Ways to take part. A map of the actors who can enter the field — and an instrument library of the concrete actions available to each of them. Whether you arrive as an individual, an organisation or an institution, there is a first step you can take today. Explore the library to find yours." → `Current.dc.html`

**5. Crisis band (conditional, default OFF)**
- Controlled by a `showCrisisBand` flag; currently **hidden by default**. When on: a flex row with bold "Experiencing violence right now?" + note that Sibility is not an emergency service, plus a "Where to get help →" link (→ `Hotlines.dc.html`).

**6. Vision band (closing CTA)**
- Section padding `0 clamp(20px,5vw,56px) clamp(48px,6vw,80px)`. Solid dark block — **no image** (`background:#180908`, `color:#efece8`).
- Content max-width 820px, padding `clamp(44px,5vw,76px) clamp(28px,5vw,68px)`, `gap: clamp(18px,2.4vw,28px)`:
  - H2 "Nonviolence can be **learned, supported and studied** — like any human capacity." — Albert Sans `clamp(26px,3.2vw,46px)`/700, `letter-spacing:-0.025em`, `line-height:1.06`. The phrase "learned, supported and studied" is wrapped in the accent orange `#DB8236`; the rest is `#efece8`.
  - Paragraph "If you see the world the same way, there is a place for you here." — 15–17px, color `#d8cec9`.
  - "Join us" button — Albert Sans 16px/700, `letter-spacing:0.04em`, text `#180908` on `#DB8236`, padding `16px 34px`, hover background `#efece8`. → `Support.dc.html`.

**7. Footer**
- `border-top:1px solid #180908`, padding-top 40px. Left: "In brief" eyebrow + summary paragraph. Right: social links (Instagram, Telegram, YouTube — 15px, hover `#DB8236`).
- Bottom row: logo (20px) + "© 2026 Sibility Initiative" (Barlow 13px, `#8a807c`).

## Interactions & Behavior
- **BG switcher** (fixed, bottom-right): two 24px swatches toggle the whole-page background between warm white `#efece8` and grey-blue `#e0e4ea`. The active swatch has a `2.5px solid #180908` border; inactive `1px solid #b3ada6`. The "How we work" band background follows the page background. *This is a prototype affordance — in production, decide whether the site ships one fixed background (recommend warm white `#efece8`) or keeps a theme toggle.*
- **Header on scroll**: a `scrolled` flag (scroll offset > 12px) drives the glass opacity bump, padding/logo shrink, and hairline border — see Header above. Listen for `scroll` (use capture so an inner scroll container is also caught).
- **Mobile menu**: hamburger toggles a full-screen `position:fixed` overlay (`100vw×100vh`); icon rotates 90° open. Overlay transitions `opacity 0.32s`, `transform 0.4s cubic-bezier(0.4,0,0.2,1)`.
- **Hover states**: nav links, "Learn more" links, and social links shift text to `#DB8236`. "Support us" button shifts background to `#DB8236`; "Join us" button shifts background to `#efece8`.
- **Smooth scroll**: `html { scroll-behavior: smooth }`; "Learn more →" in hero anchors to `#centers`.
- **Text selection**: `::selection { background:#DB8236; color:#fff }`.

## State Management
- `background` theme: one of `#efece8` (default) / `#e0e4ea`.
- `navOpen`: boolean, full-screen mobile menu.
- `scrolled`: boolean, true once scroll offset > 12px — drives header glass/shrink.
- `showCrisisBand`: boolean, default **false**.
- `isMobile`: derived from viewport width `< 820px` (listen to resize).

## Design Tokens

**Colors**
- Ink / primary text: `#180908`
- Body text (muted): `#4a3f3d`
- Secondary / captions: `#8a807c`
- Accent (orange): `#DB8236`
- Page background (warm white): `#efece8`
- Alt background (grey-blue): `#e0e4ea`
- Hairline / divider: `#cfc8bf`
- Mobile menu divider: `#d8d3cd`
- On-dark muted text: `#d8cec9`

**Typography**
- Display / UI / headings: **Albert Sans** (weights 400/500/600/700/800), via Google Fonts.
- Body / captions: **Barlow** (400/500/600), via Google Fonts.
- Eyebrows/labels: Albert Sans, uppercase, `letter-spacing: 0.10–0.12em`, 11–14px, weight 700.
- Headline tracking: negative (`-0.02em` to `-0.04em`) at large sizes.

**Spacing / layout**
- Section horizontal padding: `clamp(20px, 5vw, 56px)`.
- Two-column gap: `clamp(28px, 5vw, 80px)`.
- Center-row vertical padding: `clamp(72px, 9.75vw, 135px)`.
- Left label column: `flex: 1 1 240px; max-width: 340px`. Right content column: `flex: 3 1 480px`.
- Responsive breakpoint: `820px`.

**Borders**
- Hairlines: `1px solid #cfc8bf`. Word card / footer top rule: `1px solid #180908`. No border radius anywhere (square corners are intentional).

## Assets
Located in `assets/` in this bundle:
- `logo-full-black.svg` — Sibility wordmark (used in header + footer).
- `hero-swirl.avif` — orange swirl, used faded in the "What we do" dark header block.
- `hero-molecule.avif` — orange molecule render. *(No longer used on this page — the vision band is now a solid dark block. Kept for reference / alternate treatments.)*
- Center icon SVGs are **inline** in the markup (Flow = interlocking circles, Source = double-arch "n", Delta = triangle, Current = double-U). Extract them from `Sibility Editorial - Landing.dc.html` if you want standalone files. Other logo variants (`logo-full-orange.svg`, etc.) live in the main project `assets/` if needed.

Fonts load from Google Fonts:
`https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600;700;800&family=Barlow:wght@400;500;600&display=swap`

## Files
- `Sibility Editorial - Landing.dc.html` — the full annotated prototype (all markup + the logic class at the bottom). This is the single source of truth for exact values.
- `assets/` — logo + the two background images used by this page.

### Linked pages (referenced, not in this bundle)
The nav and CTAs link to sibling pages that exist in the main project but are out of scope here: `Flow`, `Delta`, `Source`, `Current`, `Support`, `Hotlines`. Wire these to your real routes.
