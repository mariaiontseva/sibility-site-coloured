/* ============================================================
   Sibility — shared chrome (header + footer)
   Injected at runtime so the nav/footer live in one place.
   A page opts in with:
     <div id="site-header"></div> ... <div id="site-footer"></div>
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

  function navLinksHTML(cls, activeCls) {
    return NAV.map(function (n) {
      var active = n.id === page ? ' ' + activeCls : '';
      return '<a class="' + cls + active + '" href="' + n.href + '">' + n.label + '</a>';
    }).join('');
  }

  // On the Support page itself, the "Support us" CTA is omitted.
  var onSupport = page === 'support';

  function headerHTML() {
    var supportBtn = onSupport ? '' : '<a class="nav-support nav-desktop" href="support.html">Support us</a>';
    var mobileSupport = onSupport ? '' : '<a class="mobile-support" href="support.html">Support us</a>';
    return '' +
      '<a class="wordmark" href="index.html">sibility</a>' +
      '<div class="nav-right">' +
        '<nav class="nav-links nav-desktop">' + navLinksHTML('nav-link', 'is-active') + '</nav>' +
        supportBtn +
        '<div class="nav-burger-wrap"><div class="burger" aria-label="Menu" role="button" tabindex="0">☰</div></div>' +
      '</div>' +
      '<div class="mobile-panel">' +
        navLinksHTML('', 'is-active') +
        mobileSupport +
      '</div>';
  }

  function footerHTML() {
    return '' +
      '<div class="footer-line">' +
        '<div class="wordmark">sibility</div>' +
        '<div class="footer-copy">© 2026 Sibility Initiative</div>' +
      '</div>';
  }

  var header = document.getElementById('site-header');
  if (header) {
    header.className = 'site-header';
    header.innerHTML = headerHTML();

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
    // close the panel when a link inside it is tapped
    header.querySelectorAll('.mobile-panel a').forEach(function (a) {
      a.addEventListener('click', function () { header.classList.remove('nav-open'); if (burger) burger.textContent = '☰'; });
    });
    // reset menu state when crossing back to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 800 && header.classList.contains('nav-open')) {
        header.classList.remove('nav-open');
        if (burger) burger.textContent = '☰';
      }
    });
  }

  var footer = document.getElementById('site-footer');
  if (footer) {
    footer.className = 'site-footer';
    footer.innerHTML = footerHTML();
  }
})();
