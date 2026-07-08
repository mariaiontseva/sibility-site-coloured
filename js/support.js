/* ============================================================
   Sibility — donation flow (Support)
   Frequency / preset amount / custom amount / currency / method,
   with a live "You give" summary and a gated give button. Submit
   is a no-op state flip (in-page thank-you) — the single wiring
   point for a real PSP (Stripe Checkout / PayPal / crypto) later.
   ============================================================ */
(function () {
  var mount = document.getElementById('donate-mount');
  if (!mount) return;

  var SYMB = { EUR: '€', USD: '$', GBP: '£' };
  var PRESETS = { once: [25, 50, 100, 250], monthly: [10, 20, 40, 80] };
  var METHODS = [
    { key: 'card', label: 'Card', name: 'card' },
    { key: 'bank', label: 'Bank transfer / SEPA', name: 'bank transfer' },
    { key: 'paypal', label: 'PayPal', name: 'PayPal' },
    { key: 'crypto', label: 'Crypto', name: 'crypto' }
  ];

  var state = { freq: 'once', currency: 'EUR', amount: 50, custom: false, method: 'card', done: false };

  function sym() { return SYMB[state.currency]; }
  function amountValid() { return Number(state.amount) > 0; }
  function fmt(n) {
    var v = (Number(n) || 0).toLocaleString('en-US');
    return sym() + v + (state.freq === 'monthly' ? ' / mo' : '');
  }
  function methodName() {
    var m = METHODS.filter(function (x) { return x.key === state.method; })[0];
    return m ? m.name : '';
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  // live references used by updateDynamic() (avoids rebuilding while typing)
  var refs = {};

  function updateDynamic() {
    if (refs.presets) {
      refs.presets.forEach(function (p) {
        p.el.classList.toggle('on', !state.custom && Number(state.amount) === p.value);
      });
    }
    if (refs.customWrap) refs.customWrap.classList.toggle('custom', state.custom);
    if (refs.giveAmount) refs.giveAmount.textContent = fmt(state.amount);
    if (refs.giveBtn) {
      var ok = amountValid();
      refs.giveBtn.textContent = ok ? 'Give ' + fmt(state.amount) : 'Enter an amount';
      refs.giveBtn.className = 'give-btn ' + (ok ? 'enabled' : 'disabled');
    }
  }

  function renderForm() {
    refs = {};
    var grid = el('div', 'donate-grid');

    /* ---------- LEFT: amount ---------- */
    var left = el('div', 'donate-left');

    // frequency
    var freqBlock = el('div', 'donate-block');
    freqBlock.appendChild(el('div', 'field-label', 'Frequency'));
    var seg = el('div', 'seg');
    [['once', 'One-time'], ['monthly', 'Monthly']].forEach(function (f) {
      var b = el('div', 'seg-btn' + (state.freq === f[0] ? ' on' : ''), f[1]);
      b.addEventListener('click', function () {
        state.freq = f[0];
        state.custom = false;
        state.amount = PRESETS[f[0]][1];
        renderForm();
      });
      seg.appendChild(b);
    });
    freqBlock.appendChild(seg);
    left.appendChild(freqBlock);

    // amount
    var amountBlock = el('div', 'donate-block');
    amountBlock.appendChild(el('div', 'field-label', 'Amount, ' + sym()));
    var presetGrid = el('div', 'amount-grid');
    refs.presets = [];
    PRESETS[state.freq].forEach(function (v) {
      var on = !state.custom && Number(state.amount) === v;
      var p = el('div', 'preset' + (on ? ' on' : ''), sym() + v);
      p.addEventListener('click', function () {
        state.amount = v;
        state.custom = false;
        if (refs.customInput) refs.customInput.value = v;
        updateDynamic();
      });
      refs.presets.push({ el: p, value: v });
      presetGrid.appendChild(p);
    });
    amountBlock.appendChild(presetGrid);

    var customWrap = el('div', 'custom-amount' + (state.custom ? ' custom' : ''));
    customWrap.appendChild(el('span', 'sym', sym()));
    var input = el('input');
    input.type = 'number';
    input.min = '1';
    input.value = state.amount;
    input.placeholder = 'Other amount';
    input.addEventListener('input', function () {
      state.amount = input.value;
      state.custom = true;
      updateDynamic();
    });
    customWrap.appendChild(input);
    refs.customWrap = customWrap;
    refs.customInput = input;
    amountBlock.appendChild(customWrap);
    left.appendChild(amountBlock);

    // currency
    var curBlock = el('div', 'donate-block');
    curBlock.appendChild(el('div', 'field-label', 'Currency'));
    var curChips = el('div', 'cur-chips');
    Object.keys(SYMB).forEach(function (k) {
      var c = el('div', 'cur-chip' + (state.currency === k ? ' on' : ''), k);
      c.addEventListener('click', function () { state.currency = k; renderForm(); });
      curChips.appendChild(c);
    });
    curBlock.appendChild(curChips);
    left.appendChild(curBlock);

    grid.appendChild(left);

    /* ---------- RIGHT: method + summary ---------- */
    var panel = el('div', 'give-panel');

    var giveRow = el('div', 'give-row');
    giveRow.appendChild(el('div', 'field-label', 'You give'));
    var giveAmount = el('div', 'give-amount', fmt(state.amount));
    refs.giveAmount = giveAmount;
    giveRow.appendChild(giveAmount);
    panel.appendChild(giveRow);

    var payBlock = el('div', 'donate-block');
    payBlock.style.gap = '10px';
    payBlock.appendChild(el('div', 'field-label', 'Pay with'));
    var methods = el('div', 'methods');
    METHODS.forEach(function (x) {
      var on = state.method === x.key;
      var row = el('div', 'method-row' + (on ? ' on' : ''));
      row.appendChild(el('span', null, x.label));
      row.appendChild(el('span', 'mark', on ? '✓' : ''));
      row.addEventListener('click', function () { state.method = x.key; renderForm(); });
      methods.appendChild(row);
    });
    payBlock.appendChild(methods);
    panel.appendChild(payBlock);

    var ok = amountValid();
    var giveBtn = el('button', 'give-btn ' + (ok ? 'enabled' : 'disabled'), ok ? 'Give ' + fmt(state.amount) : 'Enter an amount');
    giveBtn.type = 'button';
    refs.giveBtn = giveBtn;
    giveBtn.addEventListener('click', function () {
      // Later: create a PSP checkout session here instead of flipping state.
      if (Number(state.amount) > 0) { state.done = true; render(); }
    });
    panel.appendChild(giveBtn);

    panel.appendChild(el('p', 'give-note', 'Secure and confidential. You can cancel a monthly gift at any time.'));

    grid.appendChild(panel);

    mount.innerHTML = '';
    mount.appendChild(grid);
  }

  function renderDone() {
    mount.innerHTML = '';
    var panel = el('div', 'done-panel');
    panel.appendChild(el('div', 'ink-square', null)).style.marginBottom = '24px';
    panel.appendChild(el('h2', null, 'Thank you for standing with us.'));

    var p = el('p');
    p.innerHTML = 'You chose to give <strong></strong> via <strong></strong>. ' +
      'This is a prototype — no payment was taken. Your support means you are now part of Sibility.';
    p.querySelectorAll('strong')[0].textContent = fmt(state.amount);
    p.querySelectorAll('strong')[1].textContent = methodName();
    panel.appendChild(p);

    var again = el('div', 'btn btn--outline btn--md', 'Give again');
    again.style.cursor = 'pointer';
    again.addEventListener('click', function () { state.done = false; render(); });
    panel.appendChild(again);

    mount.appendChild(panel);
  }

  function render() {
    if (state.done) renderDone();
    else renderForm();
  }

  render();
})();
