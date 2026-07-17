/* ============================================================
   Sibility — Donate band + modal (reusable)
   Renders an ink "Fund nonviolence, directly." band into
   #donate-block; the button opens a donation modal with
   frequency / preset amounts / custom amount, then a fake
   processing → done flow. The submit is the single wiring point
   for a real PSP later (hand off amount + freq to the provider).
   ============================================================ */
(function () {
  var mount = document.getElementById('donate-block');
  if (!mount) return;

  var state = { open: false, freq: 'once', amount: 25, custom: '', stage: 'form', err: '' };
  var AMOUNTS = [10, 25, 50, 100];

  function eff() {
    var c = (state.custom || '').trim();
    if (c) { var n = parseInt(c, 10); return isNaN(n) ? 0 : n; }
    return state.amount || 0;
  }

  /* ---------- band ---------- */
  mount.innerHTML =
    '<div class="dn-band">' +
      '<div class="dn-band-copy">' +
        '<div class="eyebrow" style="margin-bottom:14px;">Support us</div>' +
        '<h2 class="dn-band-h">Fund nonviolence, directly.</h2>' +
        '<p class="dn-band-p">Your gift backs grants, courses and research. Give once or every month — every amount goes to the work.</p>' +
      '</div>' +
      '<button type="button" class="dn-cta" data-dn-open>Support us</button>' +
    '</div>';

  /* ---------- modal overlay ---------- */
  var overlay = document.createElement('div');
  overlay.className = 'dn-scrim';
  overlay.setAttribute('aria-hidden', 'true');
  document.body.appendChild(overlay);

  function seg(active) { return 'dn-seg' + (active ? ' on' : ''); }
  function tile(active) { return 'dn-tile' + (active ? ' on' : ''); }

  function formHTML() {
    var customActive = !!(state.custom || '').trim();
    var amt = eff();
    var label = 'Donate $' + (amt || 0) + (state.freq === 'monthly' ? ' / mo' : '');
    var tiles = AMOUNTS.map(function (n) {
      return '<button type="button" class="' + tile(!customActive && state.amount === n) + '" data-amt="' + n + '">$' + n + '</button>';
    }).join('');
    return '' +
      '<div class="eyebrow" style="margin-bottom:10px;">Support Sibility</div>' +
      '<h3 class="dn-title">Choose your contribution</h3>' +
      '<div class="dn-freq">' +
        '<button type="button" class="' + seg(state.freq === 'once') + '" data-freq="once">One-time</button>' +
        '<button type="button" class="' + seg(state.freq === 'monthly') + '" data-freq="monthly">Monthly</button>' +
      '</div>' +
      '<div class="dn-tiles">' + tiles + '</div>' +
      '<div class="dn-custom">' +
        '<span class="dn-cur">$</span>' +
        '<input type="text" inputmode="numeric" value="' + (state.custom || '') + '" placeholder="Other amount" data-dn-custom />' +
      '</div>' +
      '<button type="button" class="dn-submit" data-dn-submit>' + label + '</button>' +
      (state.err ? '<div role="alert" class="dn-err">' + state.err + '</div>' : '') +
      '<p class="dn-note">Payments are processed securely by our payment provider.</p>';
  }

  function processingHTML() {
    return '<div class="dn-stage-mid"><div class="dn-spinner"></div>' +
      '<div class="dn-connecting">Connecting to secure payment&hellip;</div></div>';
  }

  function doneHTML() {
    var amt = eff();
    var note = state.freq === 'monthly'
      ? 'Your monthly gift of $' + amt + ' is set up. You can change or cancel it anytime.'
      : 'Your one-time gift of $' + amt + ' has been received. A receipt is on its way to your inbox.';
    return '<div class="dn-stage-done">' +
      '<svg viewBox="0 0 512 512" fill="none" stroke="#DB8236" stroke-width="32" style="height:52px;width:auto;"><circle cx="256" cy="256" r="222"></circle><circle cx="190" cy="208" r="19" fill="#DB8236" stroke="none"></circle><circle cx="322" cy="208" r="19" fill="#DB8236" stroke="none"></circle><path d="M150 298 Q256 384 362 298" stroke-linecap="round"></path></svg>' +
      '<h3 class="dn-title" style="margin:0;">Thank you for supporting nonviolence.</h3>' +
      '<p class="dn-done-note">' + note + '</p>' +
      '<button type="button" class="dn-submit dn-done-btn" data-dn-close>Done</button>' +
    '</div>';
  }

  function render() {
    if (!state.open) {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
      overlay.innerHTML = '';
      document.body.style.overflow = '';
      return;
    }
    var inner = state.stage === 'form' ? formHTML() : state.stage === 'processing' ? processingHTML() : doneHTML();
    overlay.innerHTML =
      '<div class="dn-modal" role="dialog" aria-modal="true">' +
        '<button type="button" class="dn-x" aria-label="Close" data-dn-close>&times;</button>' +
        inner +
      '</div>';
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    var ci = overlay.querySelector('[data-dn-custom]');
    if (ci) ci.addEventListener('input', function (e) {
      state.custom = e.target.value.replace(/[^0-9]/g, '');
      state.err = '';
      // keep focus: update label + tiles without full teardown
      render();
      var re = overlay.querySelector('[data-dn-custom]');
      if (re) { re.focus(); var v = re.value.length; re.setSelectionRange(v, v); }
    });
  }

  var timer;
  function open() { state.open = true; state.stage = 'form'; state.err = ''; render(); }
  function close() { state.open = false; clearTimeout(timer); render(); }

  mount.querySelector('[data-dn-open]').addEventListener('click', open);

  overlay.addEventListener('click', function (e) {
    var t = e.target;
    if (t === overlay) { close(); return; }                 // scrim
    if (t.closest('[data-dn-close]')) { close(); return; }
    var freq = t.closest('[data-freq]');
    if (freq) { state.freq = freq.getAttribute('data-freq'); render(); return; }
    var amtBtn = t.closest('[data-amt]');
    if (amtBtn) { state.amount = parseInt(amtBtn.getAttribute('data-amt'), 10); state.custom = ''; state.err = ''; render(); return; }
    if (t.closest('[data-dn-submit]')) {
      var amt = eff();
      if (!amt || amt < 1) { state.err = 'Please choose or enter an amount.'; render(); return; }
      state.stage = 'processing'; state.err = ''; render();
      clearTimeout(timer);
      timer = setTimeout(function () { state.stage = 'done'; render(); }, 1400);
    }
  });
  window.addEventListener('keydown', function (e) { if (e.key === 'Escape' && state.open) close(); });
})();
