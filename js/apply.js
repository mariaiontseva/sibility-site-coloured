/* ============================================================
   Sibility — application forms (Flow / Delta)
   Grant-type chips are single-select; submit swaps the form for
   an in-page success panel. No network call yet — the submit is
   the single wiring point for Resend later.
   ============================================================ */
(function () {
  // single-select chip groups
  document.querySelectorAll('.grant-chips').forEach(function (group) {
    var chips = group.querySelectorAll('.grant-chip');
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('on'); });
        chip.classList.add('on');
      });
    });
  });

  var form = document.getElementById('apply-form');
  var success = document.getElementById('apply-success');
  var send = document.getElementById('send-btn');
  if (send && form && success) {
    send.addEventListener('click', function () {
      // Later: collect fields and POST to a serverless Resend endpoint here.
      form.style.display = 'none';
      success.style.display = 'block';
    });
  }
})();
