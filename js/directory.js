/* ============================================================
   Sibility — emergency directory (Hotlines / Shelters)
   Two-axis country/city filter: pick countries first, the city
   chips derive from the country-filtered set. Multi-select
   within each axis, cross-axis narrowing, live count, clear-all.
   Config comes from window.SIB_DIRECTORY set inline per page:
     { noun, data: [...], metaKeys: ['country','city',...] }
   ============================================================ */
(function () {
  var cfg = window.SIB_DIRECTORY;
  if (!cfg) return;
  var DATA = cfg.data;
  var noun = cfg.noun;              // 'hotlines' | 'shelters'
  var metaKeys = cfg.metaKeys;

  var selCountry = {};
  var selCity = {};

  var filtersEl = document.getElementById('dir-filters');
  var countEl = document.getElementById('dir-count');
  var listEl = document.getElementById('dir-list');
  if (!filtersEl || !countEl || !listEl) return;

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function uniq(arr) { return arr.filter(function (v, i) { return arr.indexOf(v) === i; }); }

  function compute() {
    var anyCountry = Object.keys(selCountry).some(function (k) { return selCountry[k]; });
    var visible = DATA.filter(function (d) { return !anyCountry || selCountry[d.country]; });
    var cityList = uniq(visible.map(function (d) { return d.city; }));
    var activeCitySel = cityList.filter(function (c) { return selCity[c]; });
    var items = visible.filter(function (d) { return !activeCitySel.length || selCity[d.city]; });
    var countries = uniq(DATA.map(function (d) { return d.country; }));
    var anySelected = anyCountry || Object.keys(selCity).some(function (k) { return selCity[k]; });
    return { items: items, cityList: cityList, countries: countries, anySelected: anySelected };
  }

  function chip(name, on, onToggle) {
    var c = el('div', 'chip' + (on ? ' on' : ''), name);
    c.addEventListener('click', onToggle);
    return c;
  }

  function renderFilters(state) {
    filtersEl.innerHTML = '';

    var gCountry = el('div', 'filter-group');
    gCountry.appendChild(el('div', 'filter-label', 'Country'));
    var cChips = el('div', 'chips');
    cChips.style.maxWidth = '500px';
    state.countries.forEach(function (name) {
      cChips.appendChild(chip(name, !!selCountry[name], function () {
        selCountry[name] = !selCountry[name];
        render();
      }));
    });
    gCountry.appendChild(cChips);
    filtersEl.appendChild(gCountry);

    var gCity = el('div', 'filter-group');
    gCity.appendChild(el('div', 'filter-label', 'City'));
    var cityChips = el('div', 'chips');
    cityChips.style.maxWidth = '500px';
    state.cityList.forEach(function (name) {
      cityChips.appendChild(chip(name, !!selCity[name], function () {
        selCity[name] = !selCity[name];
        render();
      }));
    });
    gCity.appendChild(cityChips);
    filtersEl.appendChild(gCity);
  }

  function renderCount(state) {
    countEl.innerHTML = '';
    countEl.appendChild(el('div', 'count', state.items.length + ' of ' + DATA.length + ' ' + noun));
    if (state.anySelected) {
      var clear = el('div', 'clear', 'clear filters');
      clear.addEventListener('click', function () { selCountry = {}; selCity = {}; render(); });
      countEl.appendChild(clear);
    }
  }

  function renderList(state) {
    listEl.innerHTML = '';
    if (!state.items.length) {
      var empty = el('div', 'empty');
      empty.appendChild(el('p', null, 'nothing matches — remove a filter'));
      listEl.appendChild(empty);
      return;
    }
    state.items.forEach(function (d) {
      var row = el('div', 'dir-row');
      var head = el('div', 'dir-row-head');
      head.appendChild(el('h3', 'dir-name', d.name));
      head.appendChild(el('div', 'dir-phone', d.phone));
      row.appendChild(head);
      row.appendChild(el('p', 'dir-desc', d.desc));
      var meta = metaKeys.map(function (k) { return d[k]; }).join(' · ');
      row.appendChild(el('div', 'dir-meta', meta));
      listEl.appendChild(row);
    });
  }

  function render() {
    var state = compute();
    renderFilters(state);
    renderCount(state);
    renderList(state);
  }

  render();
})();
