/* ============================================================
   Sibility Current — instrument library
   Multi-axis chip filter (AND across axes, OR within an axis)
   + expandable rows. Data recreated from the handoff.
   ============================================================ */
(function () {
  var AXES = [
    { key: 'situation', label: 'Situation',    tags: ['experiencing violence', 'someone close to me', 'witnessing', 'I might be harming', 'prevention'] },
    { key: 'role',      label: 'Who you are',  tags: ['parent', 'partner', 'teacher', 'doctor', 'neighbour', 'colleague', 'friend'] },
    { key: 'action',    label: 'Type of action', tags: ['safety', 'conversation', 'legal', 'psychological', 'educational', 'organizational'] }
  ];

  var DATA = [
    { id: 1, title: 'Personal safety plan', detail: 'A step-by-step plan for the moment things become dangerous: where to go, what to take, who to call. Prepared in advance, when you can still think calmly.', situation: ['experiencing violence'], role: ['partner', 'parent', 'friend'], action: ['safety'] },
    { id: 2, title: 'Emergency contacts card', detail: 'A small card, or a note in your phone, with hotline numbers, one trusted contact and the nearest shelter — reachable in under a minute.', situation: ['experiencing violence', 'someone close to me'], role: ['partner', 'parent', 'friend'], action: ['safety'] },
    { id: 3, title: 'Code word agreement', detail: 'Agree a harmless word with people you trust that means "call for help now" — usable in a call or text that an abuser may see.', situation: ['experiencing violence'], role: ['friend', 'neighbour', 'partner'], action: ['safety', 'conversation'] },
    { id: 4, title: 'Incident documentation', detail: 'A dated record of what happened: notes, photos, screenshots, medical visits. It is what makes legal steps possible later.', situation: ['experiencing violence'], role: ['partner', 'parent'], action: ['legal'] },
    { id: 5, title: 'Protective orders, explained', detail: 'What a protective order can and cannot do, what evidence helps, and where the process starts.', situation: ['experiencing violence', 'someone close to me'], role: ['partner', 'parent'], action: ['legal'] },
    { id: 6, title: 'Medical documentation of injuries', detail: 'What to ask a doctor to record after an injury — wording, dates, follow-ups — so the document holds up later.', situation: ['experiencing violence'], role: ['doctor', 'partner'], action: ['legal'] },
    { id: 7, title: 'Digital safety check', detail: 'Going through your phone, accounts and location sharing to make sure an abuser cannot track or read them.', situation: ['experiencing violence'], role: ['partner', 'friend'], action: ['safety'] },
    { id: 8, title: 'Responding to disclosure', detail: 'What to say — and not say — when someone tells you about violence. Believing, not interrogating, not taking over their decisions.', situation: ['someone close to me', 'witnessing'], role: ['friend', 'teacher', 'doctor', 'parent'], action: ['conversation'] },
    { id: 9, title: 'Bystander intervention', detail: 'Safe ways to interrupt violence you witness — from distraction to calling in others — without escalating it.', situation: ['witnessing'], role: ['neighbour', 'colleague', 'friend'], action: ['safety', 'conversation'] },
    { id: 10, title: 'De-escalation in the moment', detail: 'Lowering the temperature of a conflict that is heating up: voice, distance, timing, exits.', situation: ['witnessing', 'I might be harming'], role: ['partner', 'parent', 'teacher'], action: ['conversation'] },
    { id: 11, title: 'Nonviolent communication basics', detail: 'A practical framework for saying hard things without attack: observations, feelings, needs, requests.', situation: ['prevention', 'I might be harming'], role: ['parent', 'partner', 'teacher'], action: ['conversation', 'educational'] },
    { id: 12, title: 'Talking to children about boundaries', detail: 'Age-appropriate ways to talk about body, consent and secrets — so children can recognize harm and tell about it.', situation: ['prevention'], role: ['parent', 'teacher'], action: ['educational', 'conversation'] },
    { id: 13, title: 'Recognizing signs in children', detail: 'Behavioral and physical markers that a child may be experiencing violence — and what to do next.', situation: ['someone close to me', 'witnessing'], role: ['parent', 'teacher', 'doctor'], action: ['educational'] },
    { id: 14, title: 'Self-check: am I harming?', detail: 'An honest questionnaire about your own behavior at home — and the first steps if the answers worry you.', situation: ['I might be harming'], role: ['partner', 'parent'], action: ['psychological'] },
    { id: 15, title: 'Anger pause protocol', detail: 'A pre-agreed time-out: how to leave the room before you harm, where to go, and how to come back.', situation: ['I might be harming'], role: ['partner', 'parent'], action: ['psychological'] },
    { id: 16, title: 'Finding the right therapist', detail: 'How to look for violence-informed psychological help: what to ask in the first session, and the red flags.', situation: ['experiencing violence', 'I might be harming', 'someone close to me'], role: ['partner', 'parent', 'friend'], action: ['psychological'] },
    { id: 17, title: 'Support circle mapping', detail: 'Mapping who around you can help with what — housing, money, listening — and how to ask each of them concretely.', situation: ['experiencing violence', 'someone close to me'], role: ['friend', 'parent', 'partner'], action: ['psychological', 'organizational'] },
    { id: 18, title: 'Workplace response route', detail: 'What a colleague or a manager can do when someone at work is experiencing violence at home.', situation: ['witnessing', 'someone close to me'], role: ['colleague'], action: ['organizational'] },
    { id: 19, title: 'School disclosure protocol', detail: 'A step-by-step for teachers when a student discloses violence: obligations, wording, escalation.', situation: ['witnessing', 'someone close to me'], role: ['teacher'], action: ['organizational'] },
    { id: 20, title: 'Neighbourhood agreement', detail: 'Neighbours agree in advance how to react to sounds of violence: who knocks, who calls, what to say.', situation: ['witnessing', 'prevention'], role: ['neighbour'], action: ['organizational'] }
  ];

  var selected = {};       // key 'axis:tag' -> true
  var expandedId = null;

  var filtersEl = document.getElementById('lib-filters');
  var countEl = document.getElementById('lib-count');
  var listEl = document.getElementById('lib-list');
  if (!filtersEl || !countEl || !listEl) return;

  function passes(item) {
    return AXES.every(function (a) {
      var active = a.tags.filter(function (t) { return selected[a.key + ':' + t]; });
      if (!active.length) return true;
      return active.some(function (t) { return item[a.key].indexOf(t) !== -1; });
    });
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function renderFilters() {
    filtersEl.innerHTML = '';
    AXES.forEach(function (a) {
      var group = el('div', 'filter-group');
      group.appendChild(el('div', 'filter-label', a.label));
      var chips = el('div', 'chips');
      a.tags.forEach(function (t) {
        var on = !!selected[a.key + ':' + t];
        var chip = el('div', 'chip' + (on ? ' on' : ''), t);
        chip.addEventListener('click', function () {
          selected[a.key + ':' + t] = !selected[a.key + ':' + t];
          render();
        });
        chips.appendChild(chip);
      });
      group.appendChild(chips);
      filtersEl.appendChild(group);
    });
  }

  function renderCount(shown) {
    countEl.innerHTML = '';
    countEl.appendChild(el('div', 'count', shown + ' of ' + DATA.length + ' instruments — the library is growing toward 40+'));
    if (Object.keys(selected).some(function (k) { return selected[k]; })) {
      var clear = el('div', 'clear', 'clear filters');
      clear.addEventListener('click', function () { selected = {}; render(); });
      countEl.appendChild(clear);
    }
  }

  function renderList(items) {
    listEl.innerHTML = '';
    if (!items.length) {
      var empty = el('div', 'empty');
      empty.appendChild(el('p', null, 'nothing matches this combination — remove a filter'));
      listEl.appendChild(empty);
      return;
    }
    items.forEach(function (it) {
      var expanded = expandedId === it.id;
      var row = el('div', 'inst');

      var head = el('div', 'inst-head');
      head.appendChild(el('h3', 'inst-title', it.title));
      head.appendChild(el('div', 'inst-glyph', expanded ? '−' : '+'));
      head.addEventListener('click', function () {
        expandedId = expanded ? null : it.id;
        render();
      });
      row.appendChild(head);

      if (expanded) {
        var body = el('div', 'inst-body');
        body.appendChild(el('p', 'inst-detail', it.detail));
        var tags = it.situation.concat(it.role, it.action).join(' · ');
        body.appendChild(el('div', 'inst-tags', tags));
        row.appendChild(body);
      }
      listEl.appendChild(row);
    });
  }

  function render() {
    var shown = DATA.filter(passes);
    renderFilters();
    renderCount(shown.length);
    renderList(shown);
  }

  render();
})();
