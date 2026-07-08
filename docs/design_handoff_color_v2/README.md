# Handoff — Sibility (colour v2 landing)

## What this is
Design reference (HTML) for the **colour** version of the Sibility landing page — an independent initiative for nonviolence (grants, involvement, research, education). Recreate it in a real codebase (recommended: Next.js + TypeScript, static). These `.dc.html` files run on a small prototype runtime (`support.js`) — **do not** ship that runtime or its `{{ }}` / `<sc-for>` / `<sc-if>` syntax; read structure/values and rebuild idiomatically.

There is a separate, more complete **black-and-white** version with all subpages (Flow, Delta, Source, Current, Hotlines, Shelters, Apply-Flow, Apply-Delta, Support) — see the other handoff (`design_handoff_sibility/`). This colour handoff currently contains the **landing only**; the colour system still needs to be rolled onto the subpages (reuse the B&W subpage structure + this palette/type).

## Palette (final)
| Token | Value | Use |
|---|---|---|
| Field bg | `#f2f4f7` | page background (cool grey-blue) — has an on-page switcher to beige `#efece8` |
| Beige (alt field) | `#efece8` | switcher's second option |
| Ink | `#180908` | text, borders (1.5px), filled buttons, logo — brand "dark", NOT pure black |
| Ink hover | `#333331` | filled-button hover |
| Body text | `#4a3f3d` | paragraphs |
| Muted | `#6b7280` / `rgba(24,9,8,0.55)` | captions, IPA line (tint of ink) |
| Accent orange | `#DB8236` | eyebrows, buttons, section icons, hero keyword "capacity." |
| Card surface | `rgba(255,255,255,0.5)` | centre cards; word-card is transparent (shows field) |
| Hairline in dark | `#43302b` | dividers inside ink blocks |

No border-radius, no shadows (strict/editorial). Orange is the only chroma; it's the complement of the cool blue field, kept muted so it isn't neon.

## Type
- **Albert Sans** — headings, wordmark, eyebrows (700, uppercase, ~0.1em tracking), buttons.
- **Barlow** — body/paragraphs.
- Google Fonts: `Albert+Sans:wght@500;600;700;800` + `Barlow:wght@400;500;600`.

## Layout notes
- Sticky header (76–78px): black logo (`assets/logo-full-black.svg`) + nav Flow/Delta/Source/Current + filled "Support us". Mobile <800px = animated hamburger dropdown.
- Hero: 2-col (`1.35fr 1fr`). Left: eyebrow, H1 "Nonviolence is a **capacity.** We fund it, teach it, study it." (word "capacity." in orange), sub, one "Learn more" filled button. Right: the "word" dictionary card — 1.5px ink border, 45°-hatched top strip with a bordered "THE WORD" tag, then `sibility` (Albert 800), IPA `/sɪˈbɪl.ɪ.ti/ · noun` (tint of ink), definition, bottom-bordered footnote. Card bg transparent.
- "How we work" — 3 commitments in a 1.5px ink frame (Resilience / Flexibility / Professionalism), each with a small orange square (rotated 0/22/45°).
- "What we do" — 4 centre cards in a hairline 2×2 grid (grid bg ink, 1.5px gap, cells `rgba(255,255,255,0.5)`): Flow / Current / Delta / Source. Each: orange section icon (see icon SVGs; viewBoxes tightened to glyph bounds so they left-align), title, one-line description, action buttons. Second action is a ghost (outline) button. Icon SVGs: flow=two rings, current=folded ribbon, source=double arch, delta=thin triangle Δ (drawn to match weight, stroke ~60).
- Vision band: full-width ink `#180908` block; the orange swirl image (`assets/hero-swirl.avif`, a watermarked Unsplash+ comp — replace with licensed art) is `object-fit:cover` behind, with a left→right dark gradient overlay so text sits on solid dark and the image blends on all edges; heading + text + orange "Join us" button on the left.
- Footer: "In brief" + social links + black logo + © line.
- Crisis band exists in markup but is hidden (`showCrisisBand` default false).
- **BG switcher**: fixed bottom-right control toggles field between grey-blue `#f2f4f7` and beige `#efece8` (drives header/root/footer/mobile-panel bg). This is a prototype affordance — in production expose as a theme setting or just pick one.

## Assets in this bundle
- `Sibility Color — Landing.dc.html` — the page.
- `support.js` — prototype runtime only; do NOT port.
- `assets/logo-full-black.svg` — brand lockup (wave mark + "sibility" wordmark) in ink, text already outlined. `logo-full.svg` = same in brand orange `#F7A414`.
- `assets/icon-flow.svg`, `icon-current.svg`, `icon-source.svg` — section marks (recolour via `fill`/`currentColor`; delta has no file — it's an inline stroked triangle in the page).
- `assets/hero-swirl.avif` — vision-band image (watermarked comp; replace).

## Still to do (not in this bundle)
Apply this palette + type to the subpages, reusing the B&W subpage structure from `design_handoff_sibility/`: Flow, Delta, Source, Current (instrument library w/ country/city-style multi-filter), Hotlines & Shelters directories, Apply-Flow, Apply-Delta, Support (donation flow).
