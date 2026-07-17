/* ============================================================
   Sibility — shared chrome (header + footer + BG switcher)
   COLOUR edition. Injects the editorial colour header/footer so
   every page shares the landing's chrome, and runs the landing
   behaviours (glass shrink-on-scroll header, full-screen mobile
   menu, warm/blue background switcher persisted in localStorage).

   A page opts in with:
     <header id="site-header"></header> ... <footer id="site-footer"></footer>
   and sets the active nav item via <body data-page="flow">.
   Nav order is intentionally Flow · Delta · Source · Current.
   ============================================================ */
(function () {
  var NAV = [
    { id: 'flow',    label: 'Flow',    href: 'flow.html' },
    { id: 'delta',   label: 'Delta',   href: 'delta.html' },
    { id: 'source',  label: 'Source',  href: 'source.html' },
    { id: 'current', label: 'Current', href: 'current.html' }
  ];

  var page = document.body.getAttribute('data-page') || '';
  // On the Support page itself, the "Support us" CTA is omitted.
  var onSupport = page === 'support';

  function navLinksHTML(cls) {
    var base = cls || '';
    return NAV.map(function (n) {
      var active = n.id === page ? ' is-active' : '';
      var klass = (base + active).trim();
      var attr = klass ? ' class="' + klass + '"' : '';
      return '<a' + attr + ' href="' + n.href + '">' + n.label + '</a>';
    }).join('');
  }

  function headerHTML() {
    var supportBtn = onSupport ? '' : '<a class="nav-support nav-desktop" href="support.html">Support us</a>';
    var mobileSupport = onSupport ? '' : '<a class="mobile-support" href="support.html">Support us</a>';
    return '' +
      '<a class="logo" href="index.html"><img src="assets/logo-full-black.svg" alt="Sibility" /><span class="reg">&reg;</span></a>' +
      '<nav class="nav-links nav-desktop">' + navLinksHTML('nav-link') + '</nav>' +
      supportBtn +
      '<div class="burger nav-mobile" aria-label="Menu" role="button" tabindex="0">&#9776;</div>' +
      '<div class="mobile-panel">' +
        navLinksHTML('') +
        mobileSupport +
      '</div>';
  }

  function footerHTML() {
    return '' +
      '<div class="footer-top">' +
        '<div class="footer-brief">' +
          '<div class="eyebrow">In brief</div>' +
          '<p>Sibility is an independent initiative that strengthens the human capacity for nonviolence — through grants, involvement, research and education.</p>' +
        '</div>' +
        '<div class="footer-social">' +
          '<a class="is-static">Instagram</a>' +
          '<a class="is-static">Telegram</a>' +
          '<a class="is-static">YouTube</a>' +
        '</div>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<a class="logo" href="index.html"><img src="assets/logo-full-black.svg" alt="Sibility" /></a>' +
        '<div class="footer-copy">© 2026 Sibility Initiative</div>' +
      '</div>';
  }

  function bgSwitchHTML() {
    return '' +
      '<span class="lbl">BG</span>' +
      '<div class="bg-swatch" data-field="#efece8" title="Warm white" style="background:#efece8;"></div>' +
      '<div class="bg-swatch" data-field="#e0e4ea" title="Grey-blue" style="background:#e0e4ea;"></div>';
  }

  /* ---------- inject header ---------- */
  var header = document.getElementById('site-header');
  if (header) {
    header.className = 'site-header';
    header.innerHTML = headerHTML();
  }

  /* ---------- inject footer ---------- */
  var footer = document.getElementById('site-footer');
  if (footer) {
    footer.className = 'site-footer';
    footer.innerHTML = footerHTML();
  }

  /* ---------- inject BG switcher ---------- */
  var bg = document.createElement('div');
  bg.className = 'bg-switch';
  bg.innerHTML = bgSwitchHTML();
  document.body.appendChild(bg);

  /* ---------- BG switcher behaviour (persisted) ---------- */
  var WARM = '#efece8';
  var BLUE = '#e0e4ea';
  var RGB = { '#efece8': '239, 236, 232', '#e0e4ea': '224, 228, 234' };
  var root = document.documentElement;

  function applyField(color) {
    if (color !== WARM && color !== BLUE) color = WARM;
    root.style.setProperty('--field', color);
    root.style.setProperty('--field-rgb', RGB[color]);
    document.querySelectorAll('.bg-swatch').forEach(function (s) {
      s.classList.toggle('is-active', s.getAttribute('data-field') === color);
    });
    try { localStorage.setItem('sibility-field', color); } catch (e) {}
  }
  var saved = null;
  try { saved = localStorage.getItem('sibility-field'); } catch (e) {}
  applyField(saved || WARM);
  document.querySelectorAll('.bg-swatch').forEach(function (s) {
    s.addEventListener('click', function () { applyField(s.getAttribute('data-field')); });
  });

  /* ---------- header shrink-on-scroll ---------- */
  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop || 0;
    if (header) header.classList.toggle('scrolled', y > 12);
  }
  window.addEventListener('scroll', onScroll, true);
  onScroll();

  /* ---------- full-screen mobile menu ---------- */
  if (header) {
    var burger = header.querySelector('.burger');
    function setOpen(open) {
      header.classList.toggle('nav-open', open);
      if (burger) burger.textContent = open ? '✕' : '☰';
    }
    if (burger) {
      burger.addEventListener('click', function () { setOpen(!header.classList.contains('nav-open')); });
      burger.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(!header.classList.contains('nav-open')); }
      });
    }
    header.querySelectorAll('.mobile-panel a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 820 && header.classList.contains('nav-open')) setOpen(false);
    });
  }
})();
