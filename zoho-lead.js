/* Zoho CRM lead forms: builds the Description field from extra form inputs
   (business type, volume, how-heard, message, source page) before submit.
   Forms opt in with data-zoho-lead. Fields to include carry data-zlabel. */
(function () {
  function stamp() { document.querySelectorAll('input[name="zts"]').forEach(function (i) { if (!i.value) i.value = Date.now(); }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', stamp); else stamp();
  function val(el) {
    if (el.tagName === 'SELECT' && el.multiple) {
      return Array.prototype.map.call(el.selectedOptions, function (o) { return o.value; }).join(', ');
    }
    return (el.value || '').trim();
  }
  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (!f || !f.hasAttribute || !f.hasAttribute('data-zoho-lead')) return;
    var lines = [];
    var src = f.getAttribute('data-zsrc');
    if (src) lines.push('Form: ' + src);
    lines.push('Page: ' + location.pathname);
    f.querySelectorAll('[data-zlabel]').forEach(function (el) {
      var v = val(el);
      if (v) lines.push(el.getAttribute('data-zlabel') + ': ' + v);
    });
    var d = f.querySelector('textarea.zdesc');
    if (d) d.value = lines.join('\n');
    var co = f.querySelector('[name="Company"]');
    if (co && !co.value.trim()) {
      var fn = f.querySelector('[name="First Name"]'), ln = f.querySelector('[name="Last Name"]');
      co.value = ((fn ? fn.value : '') + ' ' + (ln ? ln.value : '')).trim() || 'Not provided';
    }
  }, true);
})();
