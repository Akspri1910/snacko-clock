// Time-aware headline and a live analogue clock. Content is readable without JS.
(function () {
  var moods = [
    { from: 5,  word: 'Chai',   mr: 'चहाची वेळ!' },
    { from: 11, word: 'Chaat',  mr: 'चाटची वेळ!' },
    { from: 15, word: 'Snack',  mr: 'खाऊची वेळ!' },
    { from: 19, word: 'Maggi',  mr: 'मॅगीची वेळ!' },
    { from: 23, word: 'Craving', mr: 'भूक लागली?' }
  ];
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function mood(h) {
    var m = moods[moods.length - 1];
    if (h >= 5) for (var i = 0; i < moods.length; i++) if (h >= moods[i].from) m = moods[i];
    return m;
  }
  var ticks = document.getElementById('ticks');
  if (ticks) {
    var s = '';
    for (var i = 0; i < 60; i++) {
      var big = i % 5 === 0, a = i * 6 * Math.PI / 180;
      var r1 = big ? 232 : 244, r2 = 252;
      s += '<line x1="' + (300 + Math.sin(a) * r1).toFixed(1) + '" y1="' + (300 - Math.cos(a) * r1).toFixed(1) +
           '" x2="' + (300 + Math.sin(a) * r2).toFixed(1) + '" y2="' + (300 - Math.cos(a) * r2).toFixed(1) +
           '" stroke="#0f0e0b" stroke-width="' + (big ? 4 : 1.5) + '" stroke-linecap="round"/>';
    }
    ticks.innerHTML = s;
  }
  var hh = document.getElementById('hh'), mh = document.getElementById('mh'), sh = document.getElementById('sh');
  var chip = document.getElementById('chip'), w1 = document.getElementById('w1'), mr = document.getElementById('mr');
  var lastMin = -1;
  function rot(el, deg) { el.setAttribute('transform', 'rotate(' + deg.toFixed(2) + ' 300 300)'); }
  function tick() {
    var d = new Date(), ms = d.getMilliseconds(), sec = d.getSeconds() + (reduce ? 0 : ms / 1000);
    var min = d.getMinutes() + sec / 60, hr = (d.getHours() % 12) + min / 60;
    rot(sh, sec * 6); rot(mh, min * 6); rot(hh, hr * 30);
    if (d.getMinutes() !== lastMin) {
      lastMin = d.getMinutes();
      chip.textContent = 'On your clock · ' + d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
      var m = mood(d.getHours());
      if (w1.textContent !== m.word) { w1.textContent = m.word; mr.textContent = m.mr; }
    }
    if (reduce) setTimeout(tick, 1000); else requestAnimationFrame(tick);
  }
  if (hh && mh && sh) tick();
})();
(function () {
  var nav = document.querySelector('.nav');
  function s() { nav.classList.toggle('solid', window.scrollY > 40); }
  window.addEventListener('scroll', s, { passive: true }); s();
})();

// ---------- menu: side switch, rail highlight, hover preview ----------
(function () {
  var menu = document.getElementById('menu'); if (!menu) return;
  var tabs = [].slice.call(menu.querySelectorAll('[role=tab]')), panels = { veg: document.getElementById('panel-veg'), nonveg: document.getElementById('panel-nonveg') };
  function side(s, scroll) {
    menu.setAttribute('data-side', s);
    tabs.forEach(function (t) { var on = t.dataset.side === s; t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; });
    panels.veg.hidden = s !== 'veg'; panels.nonveg.hidden = s !== 'nonveg';
    watch(); if (scroll) menu.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { side(t.dataset.side, false); history.replaceState(null, '', '#menu-' + t.dataset.side); });
    t.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { var n = tabs[1 - i]; n.focus(); n.click(); } });
  });
  function fromHash() { var h = location.hash; if (h === '#menu-nonveg') side('nonveg', true); else if (h === '#menu-veg') side('veg', true); }
  window.addEventListener('hashchange', fromHash);
  document.querySelectorAll('a[href="#menu-veg"],a[href="#menu-nonveg"]').forEach(function (a) { a.addEventListener('click', function () { setTimeout(fromHash, 0); }); });
  var io;
  function watch() {
    if (io) io.disconnect(); if (!('IntersectionObserver' in window)) return;
    var p = menu.querySelector('.panel:not([hidden])'), links = [].slice.call(p.querySelectorAll('.rail a'));
    io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) links.forEach(function (l) { l.classList.toggle('on', l.dataset.cat === e.target.id); }); }); }, { rootMargin: '-25% 0px -65% 0px' });
    p.querySelectorAll('.cat').forEach(function (c) { io.observe(c); });
  }
  watch(); fromHash();
  var peek = menu.querySelector('.peek'), pimg = peek.querySelector('img');
  if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    menu.addEventListener('pointermove', function (e) {
      var c = e.target.closest && e.target.closest('.cat[data-img]');
      if (!c) { peek.classList.remove('on'); return; }
      var src = c.getAttribute('data-img'); if (pimg.getAttribute('src') !== src) pimg.src = src;
      peek.classList.add('on');
      peek.style.transform = 'translate3d(' + Math.min(e.clientX + 28, innerWidth - 230) + 'px,' + Math.max(12, e.clientY - 150) + 'px,0) scale(1) rotate(-4deg)';
    });
    menu.addEventListener('pointerleave', function () { peek.classList.remove('on'); });
  }
})();

// ---------- Maharashtra: the fort rises when it scrolls into view ----------
(function () {
  var s = document.getElementById('maharashtra');
  if (!s || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  s.classList.add('armed');
  new IntersectionObserver(function (es, o) {
    es.forEach(function (e) { if (e.isIntersecting) { s.classList.add('risen'); o.disconnect(); } });
  }, { threshold: 0.25 }).observe(s.querySelector('.m-art'));
})();
(function(){var y=document.getElementById('yr');if(y)y.textContent=new Date().getFullYear();})();
