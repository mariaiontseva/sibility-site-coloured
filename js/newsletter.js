/* ============================================================
   Sibility — Newsletter band + toast (reusable)
   Renders the "Subscribe to our newsletter" band into
   #newsletter-block. Client-side email validation, then a
   toast. Success is the wiring point for a real endpoint later.
   ============================================================ */
(function () {
  var mount = document.getElementById('newsletter-block');
  if (!mount) return;

  mount.innerHTML =
    '<div class="nl-band">' +
      '<div class="nl-copy">' +
        '<div class="eyebrow" style="margin-bottom:16px;">Subscribe to our newsletter</div>' +
        '<h2 class="nl-h">One email every two weeks with new grants, a weird course, and research worth your time.</h2>' +
      '</div>' +
      '<div class="nl-formwrap">' +
        '<form class="nl-form" novalidate>' +
          '<input type="email" class="nl-input" aria-label="Email address" placeholder="you@email.com" />' +
          '<button type="submit" class="nl-sub">Subscribe <span class="nl-arrow">&rarr;</span></button>' +
        '</form>' +
      '</div>' +
    '</div>';

  var form = mount.querySelector('.nl-form');
  var input = mount.querySelector('.nl-input');
  var toast, timer;

  function valid(v) { return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test((v || '').trim()); }

  function showToast(type, msg) {
    if (toast) toast.remove();
    clearTimeout(timer);
    toast = document.createElement('div');
    toast.className = 'nl-toast';
    toast.setAttribute('role', 'status');
    var icon = type === 'success'
      ? '<svg viewBox="0 0 512 512" fill="none" stroke="#DB8236" stroke-width="34" class="nl-toast-ic"><circle cx="256" cy="256" r="220"></circle><circle cx="190" cy="210" r="20" fill="#DB8236" stroke="none"></circle><circle cx="322" cy="210" r="20" fill="#DB8236" stroke="none"></circle><path d="M152 300 Q256 384 360 300" stroke-linecap="round"></path></svg>'
      : '<svg viewBox="0 0 512 512" fill="none" stroke="#DB8236" stroke-width="34" class="nl-toast-ic"><circle cx="256" cy="256" r="220"></circle><path d="M256 150 V286" stroke-linecap="round"></path><circle cx="256" cy="356" r="4" fill="#DB8236" stroke="#DB8236" stroke-width="20"></circle></svg>';
    toast.innerHTML = icon + '<span class="nl-toast-msg">' + msg + '</span>';
    toast.addEventListener('click', function () { clearTimeout(timer); toast.remove(); toast = null; });
    document.body.appendChild(toast);
    timer = setTimeout(function () { if (toast) { toast.remove(); toast = null; } }, 4600);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = (input.value || '').trim();
    form.classList.remove('nl-err');
    if (!v) { form.classList.add('nl-err'); showToast('error', 'Please enter your email to subscribe.'); return; }
    if (!valid(v)) { form.classList.add('nl-err'); showToast('error', 'Hmm, that doesn’t look like a valid email.'); return; }
    // success — in production, POST v to the newsletter endpoint here
    showToast('success', 'You’re in. See you in two weeks!');
    input.value = '';
  });
})();
