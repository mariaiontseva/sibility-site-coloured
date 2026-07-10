/* ============================================================
   Sibility editorial landing — behaviour
   - BG switcher (warm white <-> grey-blue), persisted
   - header glass shrink-on-scroll (>12px)
   - full-screen mobile menu (<820px)
   ============================================================ */
(function () {
  var WARM = '#efece8';
  var BLUE = '#e0e4ea';
  var RGB = { '#efece8': '239, 236, 232', '#e0e4ea': '224, 228, 234' };
  var root = document.documentElement;

  /* ---------- BG switcher ---------- */
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

  var header = document.querySelector('.site-header');

  /* ---------- header shrink-on-scroll ---------- */
  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop || 0;
    if (header) header.classList.toggle('scrolled', y > 12);
  }
  window.addEventListener('scroll', onScroll, true);
  onScroll();

  /* ---------- mobile menu ---------- */
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
