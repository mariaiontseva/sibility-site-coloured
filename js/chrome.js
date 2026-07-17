/* ============================================================
   Sibility — shared chrome (header + footer + AIGuide FAB)
   Injected at runtime so nav/footer live in one place. A page
   opts in with <header id="site-header"></header>,
   <footer id="site-footer"></footer> and sets the current route
   via <body data-page="flow">. Active nav state is matched on
   the page's own href. Handles the More dropdown, the mobile
   full-screen panel, and the shrink-on-scroll header.
   ============================================================ */
(function () {
  var SMILEY =
    '<svg viewBox="0 0 512 512" fill="none" stroke="currentColor" stroke-width="32" class="hd-smiley">' +
    '<circle cx="256" cy="256" r="222"></circle>' +
    '<circle cx="190" cy="208" r="19" fill="currentColor" stroke="none"></circle>' +
    '<circle cx="322" cy="208" r="19" fill="currentColor" stroke="none"></circle>' +
    '<path d="M150 298 Q256 384 362 298" stroke-linecap="round"></path></svg>';

  // main nav (Flow · Source · Delta · Current) + More group
  var NAV = [
    { id: 'flow',    href: 'flow.html',    label: 'Grants for NGOs!' },
    { id: 'source',  href: 'source.html',  label: 'Weird courses ' + SMILEY },
    { id: 'delta',   href: 'delta.html',   label: 'Research grants' },
    { id: 'current', href: 'current.html', label: 'I Want to Act!' }
  ];
  var MORE = [
    { id: 'thiswasviolence', href: 'thiswasviolence.html', label: '#ThisWasViolence' },
    { id: 'team',            href: 'team.html',            label: 'About us' },
    { id: 'contact',         href: 'contact.html',         label: 'Contact us' }
  ];

  var page = (document.body.getAttribute('data-page') || '').toLowerCase();

  function active(id) { return id === page ? ' hd-active' : ''; }

  function headerHTML() {
    var links = NAV.map(function (n) {
      return '<a href="' + n.href + '" class="hd-link' + active(n.id) + '">' + n.label + '</a>';
    }).join('');
    var moreLinks = MORE.map(function (n) {
      return '<a href="' + n.href + '" class="hd-link' + active(n.id) + '" data-drop="1">' + n.label + '</a>';
    }).join('');

    var panelLinks = NAV.map(function (n) {
      return '<a href="' + n.href + '" class="hd-link">' + n.label + '</a>';
    }).join('');
    var panelMore = MORE.map(function (n) {
      return '<a href="' + n.href + '" class="hd-link hd-panel-sub">' + n.label + '</a>';
    }).join('');

    return '' +
      '<a class="hd-brand" href="index.html">' +
        '<img class="hd-logo" src="assets/logo-full-black.svg" alt="Sibility" />' +
        '<span class="hd-reg">&reg;</span>' +
      '</a>' +
      '<nav class="hd-nav">' +
        links +
        '<div class="hd-more">' +
          '<div class="hd-more-btn" role="button" tabindex="0">More<span class="hd-more-arrow">&#9662;</span></div>' +
          '<div class="hd-more-menu">' + moreLinks + '</div>' +
        '</div>' +
      '</nav>' +
      '<button class="hd-burger" aria-label="Menu" aria-expanded="false">&#9776;</button>' +
      '<div class="hd-panel">' +
        panelLinks +
        '<div class="hd-panel-rule"></div>' +
        panelMore +
      '</div>';
  }

  function footerHTML() {
    return '' +
      '<div class="container">' +
        '<div class="ft-top">' +
          '<div style="max-width:460px;">' +
            '<a href="index.html" style="display:inline-block;"><img class="ft-logo" src="assets/logo-full-cream.svg" alt="Sibility" /></a>' +
            '<div class="ft-tagline">Nonviolence is a capacity.<br><span>Let&rsquo;s build it together.</span></div>' +
          '</div>' +
          '<div class="ft-cols">' +
            '<div>' +
              '<div class="ft-lbl">Reach us</div>' +
              '<div class="ft-links">' +
                '<a href="mailto:hello@sibility.org" class="ftl">hello@sibility.org</a>' +
                '<a href="#" class="ftl">Instagram</a>' +
                '<a href="#" class="ftl">Telegram</a>' +
                '<a href="#" class="ftl">YouTube</a>' +
              '</div>' +
            '</div>' +
            '<div>' +
              '<div class="ft-lbl">Legal</div>' +
              '<div class="ft-links">' +
                '<a href="#" class="ftl">Privacy Policy</a>' +
                '<a href="#" class="ftl">Terms of Use</a>' +
                '<a href="#" class="ftl">Annual report</a>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="ft-bottom">' +
          '<p class="ft-legal">Sibility Initiative, Inc. is a 501(c)(3) nonprofit registered in Delaware, USA &nbsp;&middot;&nbsp; EIN 92&#8209;3847156 &nbsp;&middot;&nbsp; 2093 Philadelphia Pike #4821, Claymont, DE 19703. Contributions are tax&#8209;deductible where permitted by law.</p>' +
          '<div class="ft-copy">&copy; 2026 Sibility Initiative</div>' +
        '</div>' +
      '</div>';
  }

  /* ---------- mount header ---------- */
  var header = document.getElementById('site-header');
  if (header) {
    header.className = 'site-header';
    header.innerHTML = headerHTML();

    // shrink-on-scroll
    var onScroll = function () {
      var y = window.pageYOffset || document.documentElement.scrollTop || 0;
      header.classList.toggle('scrolled', y > 12);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // More dropdown (hover on desktop, click/keyboard everywhere)
    var more = header.querySelector('.hd-more');
    if (more) {
      var moreBtn = more.querySelector('.hd-more-btn');
      more.addEventListener('mouseenter', function () { more.classList.add('open'); });
      more.addEventListener('mouseleave', function () { more.classList.remove('open'); });
      moreBtn.addEventListener('click', function (e) { e.stopPropagation(); more.classList.toggle('open'); });
      moreBtn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); more.classList.toggle('open'); }
      });
      document.addEventListener('click', function (e) { if (!more.contains(e.target)) more.classList.remove('open'); });
    }

    // mobile panel
    var burger = header.querySelector('.hd-burger');
    function setNav(open) {
      header.classList.toggle('nav-open', open);
      document.body.classList.toggle('nav-lock', open);
      if (burger) {
        burger.innerHTML = open ? '&#10005;' : '&#9776;';
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      }
      document.body.style.overflow = open ? 'hidden' : '';
    }
    if (burger) {
      burger.addEventListener('click', function () { setNav(!header.classList.contains('nav-open')); });
    }
    header.querySelectorAll('.hd-panel a').forEach(function (a) {
      a.addEventListener('click', function () { setNav(false); });
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 900 && header.classList.contains('nav-open')) setNav(false);
    });
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.classList.contains('nav-open')) setNav(false);
    });
  }

  /* ---------- mount footer ---------- */
  var footer = document.getElementById('site-footer');
  if (footer) {
    footer.className = 'site-footer';
    footer.innerHTML = footerHTML();
  }

  /* ---------- AIGuide floating chat widget (site-wide) ---------- */
  if (!window.__sibilityAI && !document.querySelector('script[data-aig]')) {
    var s = document.createElement('script');
    s.src = 'js/aiguide.js';
    s.setAttribute('data-aig', '1');
    document.body.appendChild(s);
  }
})();
