# Sibility — nonviolence foundation & education

Static marketing + application website for **Sibility**, an independent
initiative that strengthens the human capacity for nonviolence through four
centers — **Flow** (grants), **Delta** (research grants), **Source**
(education) and **Current** (involvement / instrument library + emergency
directories).

Editorial **colour** system — warm-white field (with a grey-blue alternate via
the BG switcher), ink structure and a muted orange accent. Square corners,
hairlines, generous type; no rounded corners, no drop shadows, no emoji.
Type is Albert Sans (display) + Barlow (body) from Google Fonts.

## Stack
Plain static HTML / CSS / vanilla JS. No build step. Deploys to GitHub Pages.

- `css/color.css` — colour design tokens + all shared and page components
  (header, footer, buttons, motifs, forms, directories, donation flow).
- `js/chrome.js` — injects the shared colour header/footer + BG switcher and
  runs the glass shrink-on-scroll header and full-screen mobile menu. Set the
  active nav item with `<body data-page="flow">`.
- `js/color.js` — the landing (`index.html`) has its header/footer inline and
  uses this for the same behaviours.
- One HTML file per route: `index` (landing), `flow`, `delta`, `source`,
  `current`, `hotlines`, `shelters`, `apply-flow`, `apply-delta`, `support` —
  every page is now on the colour system.
- `css/styles.css` — legacy black & white stylesheet, no longer referenced.
- `docs/design_handoff/` — the original Claude Design handoff (source of truth).

## Later
Donations (`support`) and application emails (`apply-*`) are currently in-page
success stubs. Wire real Stripe (Checkout / Payment Links) and Resend via a
small serverless function when keys are supplied — no markup changes needed.

Local preview: `python3 -m http.server 8801` then open http://localhost:8801/
