# Sibility — nonviolence foundation & education

Static marketing + application website for **Sibility**, an independent
initiative that strengthens the human capacity for nonviolence through four
centers — **Flow** (grants for NGOs), **Delta** (research grants), **Source**
(courses) and **Current** (an instrument library of ways to act) — plus the
**#ThisWasViolence** campaign, emergency directories, and an About/Contact set.

Editorial **colour** system — warm beige field (`#efece8`), ink structure
(`#180908`) and a single muted orange accent (`#DB8236`). Square corners,
hairlines, generous type; no rounded corners (except the guide chat bubbles),
no drop shadows beyond the modal lift. Type is **Albert Sans** (display) +
**Barlow** (body) from Google Fonts.

## Stack
Plain static HTML / CSS / vanilla JS. No build step. Deploys to GitHub Pages.

- `css/site.css` — the whole design system: tokens, shared chrome
  (header/footer/mobile menu), buttons, motifs, forms, the directory and
  Current filters, the donation band + modal, the newsletter band, and the
  AIGuide chat widget.
- `js/chrome.js` — injects the shared header + footer into every page (from
  `<header id="site-header">` / `<footer id="site-footer">`), runs the More
  dropdown, the shrink-on-scroll header and the full-screen mobile menu, and
  loads the AIGuide widget site-wide. Set the active nav item with
  `<body data-page="flow">`.
- `js/aiguide.js` — the floating "Sibility guide" chat. Uses
  `window.claude.complete` when a real LLM runtime is present, else a light
  scripted fallback. Exposes `window.__sibilityAI = { open, ask }`.
- `js/donate.js` — the ink "Fund nonviolence, directly." band + giving modal
  (frequency / amount / custom → processing → done). Mount: `#donate-block`.
- `js/newsletter.js` — the newsletter band + toast. Mount: `#newsletter-block`.
- `js/current.js` — Current's search + multi-axis chip filter + catalog.
- `js/directory.js` — Hotlines/Shelters country→city filters (dataset chosen by
  `<body data-page>`).
- `js/apply.js` — the Flow/Delta application form (modal on the center pages,
  inline on `apply-flow` / `apply-delta`) with validation → success.
- One HTML file per route: `index` (landing), `flow`, `delta`, `source`,
  `current`, `hotlines`, `shelters`, `contact`, `team` (About us),
  `thiswasviolence`, `donate`, `newsletter`, `apply-flow`, `apply-delta`,
  `aiguide`. `support.html` redirects to `donate.html`.
- `assets/` — brand logos (`logo-full-black`/`-cream`), section-icon SVGs, and
  the hero imagery (`hero-swirl`, `hero-molecule`).

## Later (wiring points)
All success states are in-page stubs. Each names its single wiring point in a
comment: the giving modal (`donate.js`) → a PSP (Stripe / PayPal / crypto);
the application + contact forms → a Resend endpoint; the newsletter → its list
endpoint; the AIGuide → `window.claude.complete` (or your own LLM proxy).

Local preview: `python3 -m http.server 8802` then open http://localhost:8802/
