/* ============================================================
   Sibility colour landing — BG switcher + mobile menu.
   The field colour is a CSS variable (--field) on <html>, so
   header / root / footer / mobile-panel all follow it live.
   ============================================================ */
(function () {
  var BLUE = '#e0e4ea';
  var BEIGE = '#efece8';
  var root = document.documentElement;

  function applyField(color) {
    root.style.setProperty('--field', color);
    document.querySelectorAll('.bg-swatch').forEach(function (s) {
      s.classList.toggle('is-active', s.getAttribute('data-field') === color);
    });
    try { localStorage.setItem('sibility-field', color); } catch (e) {}
  }

  // restore saved choice (default: blue)
  var saved = null;
  try { saved = localStorage.getItem('sibility-field'); } catch (e) {}
  applyField(saved === BEIGE || saved === BLUE ? saved : BLUE);

  document.querySelectorAll('.bg-swatch').forEach(function (s) {
    s.addEventListener('click', function () { applyField(s.getAttribute('data-field')); });
  });

  // mobile menu
  var header = document.querySelector('.site-header');
  if (header) {
    var burger = header.querySelector('.burger');
    function toggle() {
      var open = header.classList.toggle('nav-open');
      if (burger) burger.textContent = open ? '✕' : '☰';
    }
    if (burger) {
      burger.addEventListener('click', toggle);
      burger.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
      });
    }
    header.querySelectorAll('.mobile-panel a').forEach(function (a) {
      a.addEventListener('click', function () { header.classList.remove('nav-open'); if (burger) burger.textContent = '☰'; });
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 800 && header.classList.contains('nav-open')) {
        header.classList.remove('nav-open');
        if (burger) burger.textContent = '☰';
      }
    });
  }
})();
