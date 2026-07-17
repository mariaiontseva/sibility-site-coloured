/* ============================================================
   Sibility — emergency directories (Hotlines / Shelters)
   Country + city chip filters (multi-select, AND across axes;
   city list derives from the country-filtered set). Live count,
   clear-all, empty state. Dataset chosen by <body data-page>.
   All phone numbers are placeholders until the verified list
   is published.
   ============================================================ */
(function () {
  var mount = document.getElementById('directory');
  if (!mount) return;
  var kind = (document.body.getAttribute('data-page') || '').toLowerCase();

  var HOTLINES = [
    { country: 'Germany', city: 'nationwide', name: 'Support line for women affected by violence', desc: 'Anonymous counselling for women in any violent situation — and for relatives and professionals who want to help.', phone: '+49 800 000 0000', hours: '24/7', langs: 'DE · EN · FR · RU' },
    { country: 'Germany', city: 'nationwide', name: 'Crisis line for men under domestic violence', desc: 'Confidential counselling for men experiencing violence at home.', phone: '+49 800 000 0001', hours: 'Mon–Fri 9:00–18:00', langs: 'DE · EN' },
    { country: 'Germany', city: 'Berlin', name: 'Berlin city crisis service', desc: 'Immediate psychological help and referral to shelters in Berlin.', phone: '+49 30 000 0000', hours: '24/7', langs: 'DE · EN' },
    { country: 'Germany', city: 'Munich', name: 'Munich family counselling line', desc: 'Support for families in escalating conflict — before and after violence.', phone: '+49 89 000 0000', hours: 'Mon–Sat 10:00–20:00', langs: 'DE' },
    { country: 'France', city: 'nationwide', name: 'National domestic violence line', desc: 'Listening, information and referral for anyone affected by domestic violence.', phone: '+33 800 000 000', hours: '24/7', langs: 'FR · EN' },
    { country: 'France', city: 'Paris', name: 'Paris psychological emergency line', desc: 'Crisis counselling and orientation to local services in the Paris region.', phone: '+33 1 00 00 00 00', hours: 'daily 9:00–21:00', langs: 'FR' },
    { country: 'United Kingdom', city: 'nationwide', name: 'National abuse helpline', desc: 'Confidential support for anyone experiencing abuse, and for those worried about someone.', phone: '+44 800 000 0000', hours: '24/7', langs: 'EN' },
    { country: 'United Kingdom', city: 'London', name: 'London refuge referral line', desc: 'Direct referral to safe accommodation across Greater London.', phone: '+44 20 0000 0000', hours: '24/7', langs: 'EN' },
    { country: 'Poland', city: 'nationwide', name: 'Helpline for victims of domestic violence', desc: 'Support, safety planning and legal information for adults and children.', phone: '+48 800 000 000', hours: '24/7', langs: 'PL · EN · UA' },
    { country: 'Poland', city: 'Warsaw', name: 'Warsaw youth crisis line', desc: 'For teenagers facing violence at home or at school.', phone: '+48 22 000 00 00', hours: 'daily 12:00–22:00', langs: 'PL · UA' },
    { country: 'Georgia', city: 'Tbilisi', name: 'Tbilisi women’s support hotline', desc: 'Counselling and shelter referral for women and children.', phone: '+995 32 000 000', hours: 'Mon–Fri 10:00–19:00', langs: 'KA · EN · RU' },
    { country: 'Armenia', city: 'Yerevan', name: 'Yerevan family crisis line', desc: 'Psychological first aid and orientation to local services.', phone: '+374 10 000 000', hours: 'daily 9:00–21:00', langs: 'HY · RU' }
  ];

  var SHELTERS = [
    { country: 'Germany', city: 'Berlin', name: 'Women’s shelter — Berlin', desc: 'For women, with or without children. Admission around the clock via the city crisis service.', phone: '+49 30 000 0001', note: 'admission 24/7 · via referral or direct call' },
    { country: 'Germany', city: 'Berlin', name: 'Family crisis apartment — Berlin', desc: 'Short-term safe housing for parents with children while a longer solution is found.', phone: '+49 30 000 0002', note: 'admission by phone · stays up to 4 weeks' },
    { country: 'Germany', city: 'Munich', name: 'Women’s shelter — Munich', desc: 'Safe accommodation and counselling; place for pets can be arranged.', phone: '+49 89 000 0001', note: 'admission 24/7 · direct call' },
    { country: 'France', city: 'Paris', name: 'Emergency shelter — Paris', desc: 'For anyone fleeing domestic violence; interpreters available.', phone: '+33 1 00 00 00 01', note: 'admission via national line · 24/7' },
    { country: 'France', city: 'Lyon', name: 'Women’s refuge — Lyon', desc: 'Accommodation for women and children, with legal support on site.', phone: '+33 4 00 00 00 01', note: 'admission Mon–Sun 8:00–22:00' },
    { country: 'United Kingdom', city: 'London', name: 'Refuge — Greater London', desc: 'Network of safe houses across the city; placement by referral line.', phone: '+44 20 0000 0001', note: 'admission 24/7 · via referral line' },
    { country: 'United Kingdom', city: 'Manchester', name: 'Safe house — Manchester', desc: 'For women and children; men are referred to partner accommodation.', phone: '+44 161 000 0001', note: 'admission 24/7' },
    { country: 'Poland', city: 'Warsaw', name: 'Crisis intervention centre — Warsaw', desc: 'Shelter, psychological and legal help under one roof.', phone: '+48 22 000 00 01', note: 'admission 24/7 · direct call' },
    { country: 'Poland', city: 'Kraków', name: 'Mother and child shelter — Kraków', desc: 'For mothers with children; long-term stays possible.', phone: '+48 12 000 00 01', note: 'admission by phone 8:00–20:00' },
    { country: 'Georgia', city: 'Tbilisi', name: 'State shelter — Tbilisi', desc: 'For women and children affected by violence; admission via the support hotline.', phone: '+995 32 000 001', note: 'admission via hotline' },
    { country: 'Armenia', city: 'Yerevan', name: 'Women’s support centre shelter — Yerevan', desc: 'Safe housing with counselling and reintegration support.', phone: '+374 10 000 001', note: 'admission via crisis line' }
  ];

  var isShelters = kind === 'shelters';
  var DATA = isShelters ? SHELTERS : HOTLINES;
  var NOUN = isShelters ? 'shelters' : 'hotlines';
  function meta(d) {
    return isShelters ? [d.country, d.city, d.note].join(' · ') : [d.country, d.city, d.hours, d.langs].join(' · ');
  }

  var selCountry = {}, selCity = {};
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function uniq(a) { var seen = {}, out = []; a.forEach(function (x) { if (!seen[x]) { seen[x] = 1; out.push(x); } }); return out; }

  var countries = uniq(DATA.map(function (d) { return d.country; }));

  function compute() {
    var anyCountry = Object.keys(selCountry).some(function (k) { return selCountry[k]; });
    var visible = DATA.filter(function (d) { return !anyCountry || selCountry[d.country]; });
    var cityList = uniq(visible.map(function (d) { return d.city; }));
    var activeCity = cityList.filter(function (c) { return selCity[c]; });
    var items = visible.filter(function (d) { return !activeCity.length || selCity[d.city]; });
    var anySelected = anyCountry || Object.keys(selCity).some(function (k) { return selCity[k]; });
    return { items: items, cityList: cityList, anySelected: anySelected };
  }

  function chip(name, on, axis) {
    return '<div class="dir-chip' + (on ? ' on' : '') + '" data-axis="' + axis + '" data-val="' + esc(name) + '">' + esc(name) + '</div>';
  }

  function render() {
    var r = compute();
    var countryChips = countries.map(function (c) { return chip(c, !!selCountry[c], 'country'); }).join('');
    var cityChips = r.cityList.map(function (c) { return chip(c, !!selCity[c], 'city'); }).join('');
    var rows = r.items.map(function (d) {
      return '<div class="dir-item">' +
        '<div class="dir-item-head"><h3 class="dir-name">' + esc(d.name) + '</h3><div class="dir-phone">' + esc(d.phone) + '</div></div>' +
        '<p class="dir-desc">' + esc(d.desc) + '</p>' +
        '<div class="dir-meta">' + esc(meta(d)) + '</div>' +
      '</div>';
    }).join('');
    var list = r.items.length ? rows : '<div class="dir-empty"><p>nothing matches — remove a filter</p></div>';

    mount.innerHTML =
      '<div class="dir-inner">' +
        '<div class="dir-filters">' +
          '<div class="dir-axis"><div class="dir-axis-lbl">Country</div><div class="dir-chips">' + countryChips + '</div></div>' +
          '<div class="dir-axis"><div class="dir-axis-lbl">City</div><div class="dir-chips">' + cityChips + '</div></div>' +
        '</div>' +
        '<div class="dir-count">' +
          '<div class="dir-count-line">' + r.items.length + ' of ' + DATA.length + ' ' + NOUN + '</div>' +
          (r.anySelected ? '<div class="dir-clear" id="dir-clear">clear filters</div>' : '') +
        '</div>' +
        '<div class="dir-list">' + list + '</div>' +
        '<p class="dir-foot">sample directory — numbers are placeholders until the verified list is published</p>' +
      '</div>';

    mount.querySelectorAll('.dir-chip').forEach(function (el) {
      el.addEventListener('click', function () {
        var axis = el.getAttribute('data-axis');
        var val = el.getAttribute('data-val');
        var store = axis === 'country' ? selCountry : selCity;
        store[val] = !store[val];
        render();
      });
    });
    var clear = document.getElementById('dir-clear');
    if (clear) clear.addEventListener('click', function () { selCountry = {}; selCity = {}; render(); });
  }

  render();
})();
