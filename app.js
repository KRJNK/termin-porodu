// Termin porodu (Naegele + korekta cyklu) + aktualny tydzień. Orientacyjnie!
(function () {
  'use strict';
  function fmtDate(d) {
    return d.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' });
  }
  function render() {
    var lmV = document.getElementById('lm').value;
    var cykl = Math.max(21, Math.min(45, +document.getElementById('cykl').value || 28));
    var out = document.getElementById('out');
    var det = document.getElementById('detail');
    if (!lmV) { out.textContent = '—'; det.textContent = 'Wybierz datę powyżej.'; return; }
    var lm = new Date(lmV + 'T00:00:00');
    var termin = new Date(lm.getTime() + (280 + (cykl - 28)) * 86400000);
    var now = new Date(); now.setHours(0, 0, 0, 0);
    var tydz = Math.floor((now - lm) / 86400000 / 7);
    var dni = Math.floor((now - lm) / 86400000) % 7;
    out.textContent = fmtDate(termin);
    det.textContent = tydz < 0 ? 'Ta data jest w przyszłości.' :
      'Dziś: ' + tydz + ' tydzień + ' + dni + ' dni. Pamiętaj: to szacunek, USG jest dokładniejsze.';
  }
  ['lm', 'cykl'].forEach(function (id) {
    document.getElementById(id).addEventListener('input', render);
  });
  render();
})();
