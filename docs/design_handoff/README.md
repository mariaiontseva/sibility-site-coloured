# Handoff: Sibility — nonviolence foundation & education website

## Overview
Sibility is an independent initiative that strengthens the human capacity for **nonviolence** through four "centers": **Flow** (grants), **Delta** (research grants), **Source** (education/classes) and **Current** (an instrument library + emergency directories). This bundle contains a complete, multi-page marketing + application website plus a donation flow.

"Sibility" is an invented word (not in any dictionary) — treat it as a proper brand name; never expand or "correct" it, and never surface the phrase "non-violence" as a hyphenated negative in headline copy — the brand deliberately frames the concept positively.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing the intended look, copy, and behavior. They are **not** production code to ship directly. They are authored as "Design Components" (`.dc.html`) that run against a small proprietary runtime (`support.js`) — this runtime is a **prototyping tool only** and must NOT be carried into production.

The task is to **recreate these designs in a real codebase**. There is no existing app yet, so choose an appropriate modern stack — the natural fit is **Next.js (React) + TypeScript**, styling via CSS Modules or Tailwind, deployed statically since all content is currently static and client-side. Recreate the layouts and interactions faithfully using idiomatic components; do not attempt to reuse `support.js` or the `<sc-for>` / `<sc-if>` / `{{ }}` template syntax you'll see in the source — those are prototype-runtime constructs. Read them only to extract structure, styling values, copy, and logic.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, copy, and interactions are all specified and should be recreated closely. This is a deliberately strict, editorial **black-and-white** system — no accent colors, no gradients, no rounded corners, no emoji, no drop shadows. Fidelity to that restraint matters as much as pixel spacing.

## How the `.dc.html` sources map to real components
Each file is one page. Inside you will see:
- `{{ someName }}` — a value computed in the `class Component` logic block at the bottom of the file. Find it there to learn the real value/behavior.
- `<sc-for list="{{ items }}" as="it">…</sc-for>` — a list map (`items.map(it => …)`).
- `<sc-if value="{{ flag }}">…</sc-if>` — conditional render.
- `style="{{ someStyle }}"` — a style object built in the logic (usually responsive: it branches on `m`, which is `window.innerWidth < 800`). **This is the responsive breakpoint: 800px.**
- Inline `style="…"` strings — literal CSS; copy the values directly.

---

## Design Tokens

### Color
| Token | Hex | Use |
|---|---|---|
| Paper (background) | `#FBFBFA` | page background, "reverse" text on ink |
| Ink (foreground) | `#111110` | all primary text, borders, filled buttons, dark bands |
| Ink hover | `#333331` | hover for filled ink buttons |
| Body text | `#444442` | paragraph / secondary text on paper |
| Muted text | `#6b6b68` | mono labels, captions, meta |
| Muted-2 | `#8f8f8b` | disabled text, muted-on-ink |
| Panel grey | `#EDEDEA` | accent cards / soft blocks (used sparingly — the ONLY fill besides paper & ink) |
| Panel grey alt | `#EFEFEC` | giant "ghost word" watermark text |
| Hairline on paper | `#E4E4E0` | 1px dividers inside light menus |
| Chip border (off) | `#C9C9C4` | unselected filter chips / disabled button bg |
| Reverse body on ink | `#d6d6d2` | paragraph text on ink bands |

There are **no other colors**. Do not introduce any.

### Typography
- **Primary family:** `'Helvetica Neue', Helvetica, Arial, sans-serif` — all headings and body.
- **Mono family:** `ui-monospace, 'SF Mono', Menlo, Consolas, monospace` — used ONLY for small overline labels, eyebrows, captions, meta rows, counts, and filter chips.
- **Wordmark:** the string `sibility`, lowercase, `font-weight: 800`, `letter-spacing: -0.045em`. Header wordmark `font-size: 26px`; footer `22px`.
- **Overline/eyebrow label:** mono, `font-size: 12px`, `letter-spacing: 0.14em`, `text-transform: uppercase`, color `#6b6b68`.
- **H1 (page hero):** weight 800, `letter-spacing: -0.035em`, `line-height: 1.0`, `font-size: clamp(40px, 5.5vw, 64px)`. Landing hero H1 is weight 700, `letter-spacing: -0.03em`, `clamp(44px, 5.5vw, 72px)`.
- **H2 (section):** weight 700, `letter-spacing: -0.02em`, `line-height: 1.1`, `clamp(30px, 3.5vw, 44px)`.
- **H3 (card/center title):** weight 800, `letter-spacing: -0.03em`, sizes 24–32px depending on context.
- **Body:** 15–17px, `line-height: 1.6`, color `#444442`.
- **Nav links:** mono-cased sans, `font-size: 12px`, weight 500, `letter-spacing: 0.14em`, uppercase; hover = underline with `text-underline-offset: 5px`.

### Spacing & layout
- **Content max width:** `1240px`, centered (`margin: 0 auto`).
- **Page horizontal padding:** `clamp(20px, 5vw, 48px)` (responsive gutter). Header uses the same.
- **Header height:** `76px`, `position: sticky; top: 0; z-index: 50`, background paper. No bottom border.
- **Section vertical rhythm:** hero top `clamp(40px, 7vw, 72px)`; section bottoms `clamp(56px, 9vw, 96px)`.
- **Responsive breakpoint:** **800px** — below it, multi-column grids collapse to one column and the desktop nav is replaced by a hamburger.

### Borders & shape
- Structural frames and cells use **`1.5px solid #111110`**. Filter/method chips use **`1px solid`**.
- **No border-radius anywhere. No box-shadow anywhere.** Everything is hard-edged.

### Motifs (important, reused)
1. **Ghost word watermark** — a giant lowercase word (the page name) absolutely positioned bottom-right of the hero, `color: #EFEFEC`, `font-weight: 800`, `letter-spacing: -0.05em`, `font-size: clamp(100px, 22vw, 200px)`, behind the hero text (`overflow: hidden` on the hero section clips it). Present on Flow, Delta, Source, Current, Hotlines, Shelters, Support.
2. **Small ink square** — a `12px × 12px` solid `#111110` square used as a bullet/mark above a heading. On the landing "How we work" cards it **rotates progressively 0° / 22° / 45°** across the three commitments (`transform: rotate(...)`). Reused as a "done" mark on the Support thank-you and Apply success screens.
3. **Bordered cell grid** — descriptive content laid out inside a single `1.5px` frame subdivided by internal `border-left` (desktop) / `border-top` (mobile) between cells.
4. **Ink band** — a full-width `#111110` block with reverse text used for the closing CTA on each center page and the landing vision block.

---

## Global Chrome (every page)

### Header / Nav
- Left: `sibility` wordmark → links to `Sibility Landing v2.dc.html` (the home page).
- Right (desktop ≥800px): nav links **Flow · Delta · Source · Current**, then a filled ink **Support us** button (`padding: 12px 22px`, mono uppercase 12px). On the current page, that page's nav link may carry a `border-bottom: 1.5px solid` active state (see Current).
- Right (mobile <800px): a hamburger glyph `☰` (`font-size: 24px`). Tapping toggles a full-width dropdown panel that animates open: `max-height 0→400px`, `opacity 0→1`, `translateY(-10px)→0`, `transition: max-height .35s ease, opacity .25s ease, transform .35s ease`; the glyph rotates 90° and swaps to `✕` (`transform .3s ease`). Panel lists all sections (current one highlighted with `background:#EDEDEA`) plus a full-width ink **Support us** row.
- **Nav order is Flow, Delta, Source, Current** — Current is intentionally last.

### Footer
- Wordmark left, `© 2026 Sibility Initiative` (mono 12px, `#6b6b68`) right; `space-between`, wraps on mobile. Landing footer additionally has a two-block row above it (see Landing).

---

## Screens / Views

### 1. Landing — `Sibility Landing v2.dc.html` (home)
- **Hero:** two-column grid (`1.5fr 1fr`, gap 72px; single column on mobile). Left: eyebrow "An independent initiative for nonviolence", H1 "Nonviolence is a capacity. We fund it, teach it, study it.", supporting paragraph, single filled **Learn more** button that scrolls to `#centers`. Right: **the dictionary card** — an unfilled block with a `1.5px` ink border, a top strip with a 45°-hatched background (`repeating-linear-gradient(45deg, #111110 0 1px, transparent 1px 7px)`) holding a small bordered `THE WORD` label chip on paper; body shows `sibility` at 56px/800, the IPA line `/sɪˈbɪl.ɪ.ti/ · noun` (mono, `#6b6b68`), and the definition "The capacity of a person — or a community — to live, act and resolve conflict without violence."; a top-bordered footnote "Not yet in the dictionary — that is why we are here."
- **How we work (`#initiative`):** eyebrow + H2 "Three commitments hold everything we do." Then a single `1.5px` frame divided into 3 cells (Resilience / Flexibility / Professionalism), each with the rotating ink square (0/22/45°), an H3, and a paragraph. (A 4th commitment, "Due diligence — on us", exists in the copy history but was intentionally cut to three.)
- **Four centers (`#centers`):** eyebrow + H2 "One initiative, four ways in." A 2×2 grid (single column on mobile) of `#EDEDEA` cards, each min-height ~`clamp(300px,55vw,420px)`, `display:flex; flex-direction:column`:
  - **Flow** (eyebrow "Support Center") → whole card links to `Flow.dc.html`; body copy about grants for independent nonviolence initiatives; buttons **Apply for a grant** (`Apply-Flow.dc.html`) + text link **Cases**.
  - **Current** (eyebrow "Involvement Center") → `Current.dc.html`.
  - **Delta** (eyebrow "Research Center") → `Delta.dc.html`; **Apply with a proposal** (`Apply-Delta.dc.html`).
  - **Source** (eyebrow "Education Center") → `Source.dc.html`; **Classes & enrollment**.
  - CTA button labels come from `flowCta`/`deltaCta` in logic: when `applicationsOpen` is true they read "Apply for a grant" / "Apply with a proposal", else "Applications open soon".
- **Vision band:** full-width ink block, two columns (`1.2fr 1fr`): left large H2 "We believe nonviolence can be learned, supported and studied — like any human capacity."; right a paragraph + filled reverse **Join us** button → `Support.dc.html`.
- **Crisis band (conditional `showCrisisBand`):** an `#EDEDEA` strip — "**Experiencing violence right now?** Sibility is not an emergency service. Hotlines and shelters can help immediately." + outline button **Where to get help** → `Hotlines.dc.html`.
- **Footer block:** two-column row — left `#EDEDEA` "In brief" card (short mission paragraph + Instagram/Telegram/YouTube text links, currently `#` placeholders), right nothing special; then the global footer line.
- **Tweak props:** `applicationsOpen` (boolean, default true) and `showCrisisBand` (boolean, default true).

### 2. Flow — `Flow.dc.html` (Support Center / grants)
- Hero with ghost word "flow", eyebrow "Support Center", H1, intro.
- "Who it's for" section: two-column intro grid; a bordered 2-cell frame contrasting eligible vs not (independent, self-governing, registered initiatives vs sub-projects of larger funds / unregistered). Each cell leads with the ink square.
- A 3-up row of cases/examples (`repeat(auto-fit, minmax(260px, 1fr))`).
- Closing ink band with **Apply for a grant** CTA → `Apply-Flow.dc.html`.
- Important domain rule reflected in copy: **Flow funds only already-existing projects that really help people; it does NOT fund research** (research lives in Delta).

### 3. Delta — `Delta.dc.html` (Research Center)
- Same page skeleton as Flow (ghost word "delta"): hero, a bordered **3-cell** frame, a 3-up cases row, closing ink band with **Apply with a proposal** → `Apply-Delta.dc.html`. Content is about research into nonviolence, guided by a scientific council.

### 4. Source — `Source.dc.html` (Education Center)
- Ghost word "source". Hero, bordered 2-cell frame, a 3-up row of class formats/tracks, closing ink band with **Classes & enrollment** CTA. Copy distinguishes two audiences: people who come **as a parent/neighbour** vs **as a professional**.

### 5. Current — `Current.dc.html` (Involvement Center / instrument library)
- This is the most interactive page. Directly under the hero it presents an **instrument library**: a Notion-like list of ~20 "instruments" (ways people can act on nonviolence / help themselves in relation to violence), with a **tag filter bar across the top** supporting **multi-axis filtering** (e.g. audience = children / parents / professionals, plus other axes). Instruments render as rectangular blocks that **expand to reveal detail** (`expandedId` state; clicking a row toggles it).
- State: `selected` (map of active tag filters), `expandedId`. Selecting tags across multiple axes narrows the list (AND across axes, OR within an axis — mirror the Hotlines logic pattern).
- Below/within the page are entry points to the two emergency directories: **Hotlines** (`Hotlines.dc.html`) and **Shelters** (`Shelters.dc.html`) — the Shelters button is an outline-on-ink button whose hover only dims the border/text (`border-color:#8f8f8b; color:#d6d6d2`) — do **not** invert to a white fill (that earlier looked wrong).
- Current is the **last** item in the nav and carries the active `border-bottom` state in its own header.

### 6. Hotlines — `Hotlines.dc.html`  &  7. Shelters — `Shelters.dc.html` (directories)
These two are structurally identical; only data and a few labels differ.
- **Hero** with ghost word ("hotlines" / "shelters"), eyebrow "Get help now", H1, one-line intro. Shelters intro notes addresses are never published.
- **Emergency strip:** a max-860px ink block — "**In immediate danger?** Call your local emergency number first — 112 across Europe." (Shelters also links to a hotline.)
- **Two filter axes as chip rows:** **Country** and **City**. City chips are derived from the currently country-filtered set. Multi-select within each axis. Logic (recreate exactly):
  - If any country selected → keep rows whose country is selected; else all.
  - City list = distinct cities of that visible set; if any city selected → further filter to those cities.
  - Chip style: mono 11px, `padding: 5px 10px`; off = `1px solid #C9C9C4` transparent `#444442`; on = solid `#111110` filled, text `#FBFBFA`.
- **Count line + clear:** mono "N of M hotlines/shelters"; when any filter active show an underlined **clear filters** action.
- **Result rows:** `1.5px` bordered blocks — top row is name (17px/700) left + phone (mono 15px/700) right (`space-between`, wraps); then a description paragraph; then a mono meta line joining `country · city · hours · langs` (Hotlines) or `country · city · note` (Shelters).
- **Empty state:** `#EDEDEA` panel, centered mono "nothing matches — remove a filter".
- Footnote: "sample directory — numbers are placeholders until the verified list is published". **All phone numbers are placeholders** (`+49 800 000 0000` etc.) — real data to be supplied later.
- Sample data covers Germany, France, UK, Poland, Georgia, Armenia with nationwide + city entries. See the `static DATA = [...]` array in each file for the exact records to seed.

### 8. Apply — Flow — `Apply-Flow.dc.html`
- Simple application form on its own page (decided: **page, not modal**). Eyebrow + H1, an `#EDEDEA` form card.
- Fields: applicant **Name**, **Email**, **Location**, **Organization / initiative name**, **Website**, **social links**, **Description** (textarea). There is a **grant-type toggle** (`grantType` state, default `'work'`) — but note the domain rule: **Flow has no research grants** (those are Delta), so any toggle here is between work/operational funding variants, not research. If in doubt, ship a single straightforward "what the grant is for" description field rather than reintroducing a research option.
- On submit → success state (`submitted`): confirmation panel with the ink-square mark, thank-you copy, no real network call.

### 9. Apply — Delta — `Apply-Delta.dc.html`
- Same form pattern for **research** proposals (this is where research funding lives). Fields for the researcher/proposal + description/methodology; submit → success state.

### 10. Support — `Support.dc.html` (donation flow)
- Purpose: a money-intake page — the visitor chooses an amount and gives by whatever method suits them. Framed as "become part of Sibility", not a running-costs plea.
- **Layout:** two-column form grid (`1.2fr 0.9fr`, gap 56px; single column on mobile). Ghost word "support".
- **Left column:**
  - **Frequency** segmented control — One-time / Monthly (`freq` state). Segment style: mono 12px, `padding: 11px 22px`, active = ink fill/reverse text, inside a `1.5px` frame. Switching frequency resets to that frequency's preset set.
  - **Amount** — preset grid (`repeat(auto-fit, minmax(96px,1fr))`, gap 10px): once = `[25,50,100,250]`, monthly = `[10,20,40,80]`; each a `1.5px`-bordered tile, active = ink fill. Below, a bordered custom-amount input with the currency symbol prefix and placeholder "Other amount" (typing sets `custom=true`, white bg `#FFFFFF`).
  - **Currency** chips — EUR / USD / GBP (`SYMB = {EUR:'€', USD:'$', GBP:'£'}`); symbol propagates everywhere.
- **Right column** (a `1.5px` frame, `align-self:start`):
  - **You give** summary — mono label + big amount `clamp(30px,5vw,40px)/800`; monthly appends " / mo".
  - **Pay with** — four selectable rows: **Card**, **Bank transfer / SEPA**, **PayPal**, **Crypto** (`method` state; selected row = ink fill, `✓` mark at right; off = `1px solid #C9C9C4`).
  - **Give €N** button — full width; **disabled** (bg `#C9C9C4`, text `#8f8f8b`, `cursor:not-allowed`, label "Enter an amount") until amount > 0, else ink filled with live label "Give €50" / "Give €50 / mo". Below it a mono reassurance line about security + monthly cancellation.
- **Success state** (`done`): a `1.5px` framed panel with the ink-square mark, "Thank you for standing with us.", a line echoing the chosen amount + method, note that this is a prototype and no payment was taken, and a **Give again** outline button (`reset`).
- **Real implementation:** wire the method choices to an actual PSP (e.g. Stripe for card/SEPA, PayPal SDK, a crypto provider). The current submit is a no-op state flip.

---

## Interactions & Behavior (summary)
- **Navigation:** every page is a standalone route; wordmark → home; nav → the four center routes; Support us / Donate / Join us / Contribute / "Where to get help" → `Support.dc.html` or the relevant page. Recreate as real routes (`/`, `/flow`, `/delta`, `/source`, `/current`, `/hotlines`, `/shelters`, `/apply/flow`, `/apply/delta`, `/support`).
- **Responsive:** single breakpoint at **800px** (JS width check in prototype → use CSS media queries / container queries in production). Below it: nav → animated hamburger dropdown; all multi-column grids → one column; bordered cell dividers switch from `border-left` to `border-top`; paddings shrink via `clamp()`.
- **Mobile menu animation:** see Global Chrome — reproduce the open/close easing and the glyph rotation/swap.
- **Filters (Hotlines/Shelters/Current):** client-side, multi-select, cross-axis narrowing, live count, clear-all; empty state.
- **Forms (Apply, Support):** local state, client validation (amount > 0 gates the Support button), submit → in-page success panel; no backend yet.
- **Animations elsewhere:** the landing squares can optionally animate (a slow-rotation and a "breathe" variant were explored via `@keyframes sib-spin`/`sib-breathe`); the shipped landing uses the **static progressive-rotation** treatment. Keep motion minimal and optional.

## State Management
Per-page local state only (no global store needed initially):
- Landing/all: `w` (viewport width) + `navOpen` for the mobile menu; landing also reads `applicationsOpen`, `showCrisisBand` props.
- Current: `selected` (tag filter map), `expandedId`.
- Hotlines/Shelters: `countries` map, `cities` map.
- Apply-Flow: `submitted`, `grantType`. Apply-Delta: `submitted`.
- Support: `freq`, `currency`, `amount`, `custom`, `method`, `done`.

## Assets
- **None external.** No image files, no icon fonts, no SVG illustrations — the design is purely typographic + CSS shapes (squares, hatched gradient, borders). Fonts are system Helvetica/Arial + system monospace (no web-font downloads). If you later want the exact Helvetica Neue rendering on non-Apple platforms, license it or pick a close grotesque; otherwise the system stack is intentional.
- The user intends to supply **real data** later for: Hotlines & Shelters directories (verified numbers), Current instrument library (final ~20–40 instruments and their tag axes), and the payment provider credentials for Support.

## Files (in this bundle)
- `Sibility Landing v2.dc.html` — home page (use this, NOT `Sibility Landing.dc.html`, which is the superseded v1 and is not included).
- `Flow.dc.html`, `Delta.dc.html`, `Source.dc.html`, `Current.dc.html` — the four center pages.
- `Hotlines.dc.html`, `Shelters.dc.html` — emergency directories with country/city filters.
- `Apply-Flow.dc.html`, `Apply-Delta.dc.html` — application forms.
- `Support.dc.html` — donation flow.
- `support.js` — the **prototype runtime only**. Do not port it. It is included solely so the `.dc.html` files open and render while you reference them.

To preview a file as intended, open it in a browser (it will pull in `support.js` from the same folder). Read the `class Component { … }` block at the bottom of each file for the exact data arrays, computed labels, and responsive style objects.
