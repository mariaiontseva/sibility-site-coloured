/* ============================================================
   Sibility Current — instrument library
   Unified search + multi-axis chip filter (AND across axes,
   OR within an axis) + free-text search over a catalog of
   "act" projects. The search arrow / Enter hands the query to
   the AIGuide (aiguide.html). Renders into #cur-panel (search
   + filters) and #cur-catalog (count + cards).
   ============================================================ */
(function () {
  var panelEl = document.getElementById('cur-panel');
  var catalogEl = document.getElementById('cur-catalog');
  if (!panelEl || !catalogEl) return;

  var ITEMS = [
    { title: "A children's book about non-violence", desc: "A toy-book you can download, print, and put together with your child — and the conversation just happens while you play.", tags: ['one-time', '2–4 hours', 'free', 'family', 'remote'] },
    { title: 'Volunteer at a non-violence lecture series', desc: '“A Farewell to Arms” lecture hall needs a hand: greeting guests, running social media, filming events, helping with sound.', tags: ['weekly', '2–4 hours', 'free', 'in a team', 'in person'] },
    { title: 'Write to a detained activist', desc: 'A short letter tells someone in prison they are not forgotten. We give you the address, the guidelines, and a first line to borrow.', tags: ['one-time', 'a few minutes', 'free', 'remote'] },
    { title: 'Translate a nonviolence handbook', desc: 'Help bring a field guide for peaceful protest into another language. Work at your own pace, one chapter at a time.', tags: ['one-time', '2–4 hours', 'free', 'remote'] },
    { title: 'Host a neighbourhood dialogue circle', desc: 'Gather a few neighbours for a guided conversation about conflict on your street. We send the questions and the ground rules.', tags: ['weekly', '2–4 hours', 'free', 'in person', 'in a team'] },
    { title: 'Fundraise for a de-escalation hotline', desc: 'Run a small online drive for a hotline that talks people down from violence. A page, a goal, and a weekend is enough to start.', tags: ['one-time', '2–4 hours', 'free', 'remote', 'family'] }
  ];
  var PLACEHOLDERS = 2;
  var AXES = [
    { key: 'commitment', label: 'Commitment', tags: ['one-time', 'weekly'] },
    { key: 'time', label: 'Time', tags: ['a few minutes', '2–4 hours'] },
    { key: 'cost', label: 'Cost', tags: ['free'] },
    { key: 'format', label: 'Format', tags: ['remote', 'in person', 'in a team', 'family'] }
  ];

  var state = { query: '', selected: {} };

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function askGuide() {
    var q = (state.query || '').trim() || 'I want to talk to my kids about violence and non-violence';
    if (window.__sibilityAI && window.__sibilityAI.ask) { window.__sibilityAI.ask(q); return; }
    window.location.href = 'aiguide.html?q=' + encodeURIComponent(q);
  }

  /* ---------- build search + filter panel once (input persists) ---------- */
  var groupsHTML = AXES.map(function (a) {
    var chips = a.tags.map(function (t) {
      return '<div class="cur-chip" data-tag="' + esc(t) + '">' + esc(t) + '</div>';
    }).join('');
    return '<div class="cur-group"><div class="cur-group-lbl">' + esc(a.label) + '</div><div class="cur-chips">' + chips + '</div></div>';
  }).join('');

  panelEl.innerHTML =
    '<div class="cur-panel">' +
      '<div class="cur-srch">' +
        '<span class="cur-srch-lbl">Search</span>' +
        '<input type="text" id="cur-q" placeholder="I want to talk to my kids about non-violence…" />' +
        '<div class="cur-go" id="cur-go" title="Ask the Sibility guide">&rarr;</div>' +
      '</div>' +
      '<div class="cur-srch-rule"></div>' +
      '<div class="cur-groups">' + groupsHTML + '</div>' +
    '</div>';

  var input = document.getElementById('cur-q');
  input.addEventListener('input', function () { state.query = input.value; renderCatalog(); });
  input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); askGuide(); } });
  document.getElementById('cur-go').addEventListener('click', askGuide);

  panelEl.querySelectorAll('.cur-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      var t = chip.getAttribute('data-tag');
      state.selected[t] = !state.selected[t];
      chip.classList.toggle('on', !!state.selected[t]);
      renderCatalog();
    });
  });

  /* ---------- catalog ---------- */
  function passesChips(it) {
    return AXES.every(function (a) {
      var active = a.tags.filter(function (t) { return state.selected[t]; });
      if (!active.length) return true;
      return active.some(function (t) { return it.tags.indexOf(t) !== -1; });
    });
  }
  function passesText(it) {
    var q = (state.query || '').trim().toLowerCase();
    if (!q) return true;
    return (it.title + ' ' + it.desc + ' ' + it.tags.join(' ')).toLowerCase().indexOf(q) !== -1;
  }

  function cardHTML(it) {
    var tags = it.tags.map(function (t) { return '<span class="cur-tag">' + esc(t) + '</span>'; }).join('');
    return '<div class="cur-card"><h3>' + esc(it.title) + '</h3><p>' + esc(it.desc) + '</p><div class="cur-card-tags">' + tags + '</div></div>';
  }
  function placeholderHTML() {
    return '<div class="cur-card ph"><div class="cur-soon">Coming soon</div><h3>A new way to act</h3>' +
      '<p>We’re preparing another project for this library — check back soon.</p>' +
      '<div class="cur-card-tags"><span class="cur-tag">In the works</span></div></div>';
  }

  function renderCatalog() {
    var q = (state.query || '').trim();
    var anyActive = q.length > 0 || Object.keys(state.selected).some(function (k) { return state.selected[k]; });
    var matched = ITEMS.filter(function (it) { return passesChips(it) && passesText(it); });

    var countRow = '<div class="cur-count-row"><div class="cur-count-lbl">The catalog</div>' +
      (anyActive ? '<div class="cur-count-n">' + matched.length + ' of ' + ITEMS.length + ' projects</div>' +
        '<div class="cur-clear" id="cur-clear">clear filters</div>' : '') + '</div>';

    var body;
    if (anyActive && matched.length === 0) {
      body = '<div class="cur-empty"><p>Nothing matches this combination yet.</p>' +
        '<div class="cur-empty-btn" id="cur-ask">Ask the Sibility guide</div></div>';
    } else {
      var cards = matched.map(cardHTML);
      if (!anyActive) { for (var i = 0; i < PLACEHOLDERS; i++) cards.push(placeholderHTML()); }
      body = '<div class="cur-grid">' + cards.join('') + '</div>';
    }
    catalogEl.innerHTML = countRow + body;

    var clear = document.getElementById('cur-clear');
    if (clear) clear.addEventListener('click', function () {
      state.selected = {}; state.query = ''; input.value = '';
      panelEl.querySelectorAll('.cur-chip').forEach(function (c) { c.classList.remove('on'); });
      renderCatalog();
    });
    var ask = document.getElementById('cur-ask');
    if (ask) ask.addEventListener('click', askGuide);
  }

  renderCatalog();
})();
