# Sibility — nonviolence foundation & education

Static marketing + application website for **Sibility**, an independent
initiative that strengthens the human capacity for nonviolence through four
centers — **Flow** (grants), **Delta** (research grants), **Source**
(education) and **Current** (involvement / instrument library + emergency
directories).

Strict editorial **black & white** system — no accent colours, no gradients,
no rounded corners, no drop shadows, no emoji.

## Stack
Plain static HTML / CSS / vanilla JS. No build step. Deploys to GitHub Pages.

- `css/styles.css` — design tokens + shared components (header, footer, buttons, motifs).
- `js/chrome.js` — injects the shared header/footer and runs the mobile menu.
- One HTML file per route: `index` (landing), `flow`, `delta`, `source`,
  `current`, `hotlines`, `shelters`, `apply-flow`, `apply-delta`, `support`.
- `docs/design_handoff/` — the original Claude Design handoff (source of truth).

## Later
Donations (`support`) and application emails (`apply-*`) are currently in-page
success stubs. Wire real Stripe (Checkout / Payment Links) and Resend via a
small serverless function when keys are supplied — no markup changes needed.

Local preview: `python3 -m http.server 8801` then open http://localhost:8801/
