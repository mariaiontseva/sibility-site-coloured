/* ============================================================
   Sibility — application form (modal or standalone)
   Wires every .apply-form on the page: required fields marked
   [data-required] plus one [type=email] are validated, then the
   form swaps to the sibling .apply-done panel. If a .apply-overlay
   wraps it, [data-apply-open] opens it and the scrim / [data-apply-close]
   close it. No network call yet — the single wiring point for
   Resend later.
   ============================================================ */
(function () {
  function validEmail(v) { return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test((v || '').trim()); }

  /* ---- modal open/close (only if an overlay exists) ---- */
  var overlay = document.querySelector('.apply-overlay');
  if (overlay) {
    var oForm = overlay.querySelector('.apply-form');
    var oDone = overlay.querySelector('.apply-done');
    var oErr = overlay.querySelector('.apply-err');
    var oHint = overlay.querySelector('.apply-hint');
    function setOpen(open) {
      overlay.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) {
        if (oForm) oForm.style.display = '';
        if (oDone) oDone.style.display = 'none';
        if (oErr) oErr.style.display = 'none';
        if (oHint) oHint.style.display = '';
        var first = oForm && oForm.querySelector('input, textarea');
        if (first) setTimeout(function () { first.focus(); }, 60);
      }
    }
    document.querySelectorAll('[data-apply-open]').forEach(function (b) {
      b.addEventListener('click', function () { setOpen(true); });
    });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target.closest('[data-apply-close]')) setOpen(false);
    });
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('open')) setOpen(false);
    });
  }

  /* ---- validation + submit for every apply form ---- */
  document.querySelectorAll('.apply-form').forEach(function (form) {
    var scope = form.closest('.apply-card') || form.parentNode;
    var done = scope.querySelector('.apply-done');
    var errEl = form.querySelector('.apply-err');
    var hintEl = form.querySelector('.apply-hint');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var missing = false;
      form.querySelectorAll('[data-required]').forEach(function (f) { if (!(f.value || '').trim()) missing = true; });
      var email = form.querySelector('input[type=email]');
      function fail(msg) {
        if (errEl) { errEl.textContent = msg; errEl.style.display = ''; }
        if (hintEl) hintEl.style.display = 'none';
      }
      if (missing) { fail('Please fill in the required fields.'); return; }
      if (email && !validEmail(email.value)) { fail('Please enter a valid email.'); return; }
      // success — in production, POST the fields to a Resend endpoint here
      form.style.display = 'none';
      if (done) done.style.display = '';
    });
  });
})();
