// Small assert-based checks. Run: npm test
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync('dist/index.html', 'utf8');
const css = fs.readFileSync('dist/site.css', 'utf8');
const js = fs.readFileSync('dist/site.js', 'utf8');
const data = JSON.parse(fs.readFileSync('menu-data.json', 'utf8'));
const count = (re, s = html) => (s.match(re) || []).length;

// 1. Local files referenced by the page exist; exactly one local stylesheet and script.
for (const [, path] of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  if (!/^(https?:|tel:|mailto:)/.test(path)) assert.ok(fs.existsSync('dist/' + path.split('?')[0]), 'missing file: ' + path);
}
assert.equal(count(/<link rel="stylesheet" href="(?!https:)[^"]+">/g), 1);
assert.equal(count(/<script src="[^"]+"><\/script>/g), 1);
for (const [, path] of css.matchAll(/assets\/([\w.\-]+)/g)) assert.ok(fs.existsSync('dist/assets/' + path), path);
console.log('Passed: local files, one stylesheet, one script');

// 2. Menu: HTML matches menu-data.json; every in-page link has a target; ids are unique.
const vegItems = data.veg.reduce((n, c) => n + c.items.length, 0), nvItems = data.nonveg.reduce((n, c) => n + c.items.length, 0);
assert.equal(data.veg.length, 13); assert.equal(vegItems, 71);
assert.equal(data.nonveg.length, 8); assert.equal(nvItems, 33);
assert.equal(count(/<li class="row">/g), vegItems + nvItems);
assert.equal(count(/<section class="cat[ "]/g), data.veg.length + data.nonveg.length);
for (const c of [...data.veg, ...data.nonveg]) for (const [name, price] of c.items) {
  assert.ok(Number.isInteger(price) && price > 0, name);
  assert.ok(html.includes(`<span class="n">${name}</span><span class="d" aria-hidden="true"></span><b class="p">₹${price}</b>`), 'menu line missing: ' + name);
}
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
assert.equal(new Set(ids).size, ids.length, 'duplicate ids');
for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(id), 'broken in-page link: #' + id);
assert.ok(html.includes('Egg dishes are non-veg'));
console.log('Passed: 71 veg and 33 non-veg dishes match menu-data.json, links resolve, ids unique');

// 3. Business facts and boundaries.
assert.ok(html.includes('Fountain Road, near Ganga Platino') && html.includes('411014') && html.includes('tel:+918482839332'));
assert.ok(html.includes('https://thesnackoclock.inmyarea.in/'));
assert.equal(count(/<iframe\b[^>]*title="[^"]+"[^>]*loading="lazy"/g), 3);
assert.ok(html.includes('https://www.instagram.com/the_snacko_clock/embed/'));
assert.ok(html.includes('New location and opening details will be revealed soon.'));
const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
assert.equal(schema['@type'], 'Restaurant'); assert.equal(schema.openingHours, undefined);
assert.ok(html.includes('rel="canonical"') && html.includes('property="og:image"') && !html.includes('noindex'));
assert.ok(!/assets\/ai-/.test(html), 'AI food images are not used');
assert.ok(html.includes('CC BY-SA 4.0') && html.includes('Minaxibose1992') && html.includes('Ankushkr2020') && html.includes('Rutvi Mistry'), 'photo credits');
for (const word of ['separate kitchen', 'pure veg', '100% veg']) assert.ok(!html.toLowerCase().includes(word), 'unconfirmed claim: ' + word);
console.log('Passed: address, phone, embeds, no invented hours or claims, credits, SEO');

// 4. Motion is safe: content shows without JS and with reduced motion.
assert.ok(css.includes('prefers-reduced-motion'));
assert.ok(!/\.maha2 \.(disc|fort|pheta|stamp)\{[^}]*opacity:0/.test(css), 'chapter art must only hide when JS has armed it');
assert.ok(/\.maha2\.armed \.fort\{/.test(css));
console.log('Passed: reduced-motion rule and no-JS visibility');

// 5. Behaviour: the headline follows the visitor's hour (run site.js with a stub DOM).
function run(hour) {
  const els = {};
  const stub = () => new Proxy(function () {}, {
    get: (t, k) => (k === 'length' ? 0 : k === Symbol.toPrimitive ? () => '' : t[k] !== undefined ? t[k] : (t[k] = typeof k === 'string' && /^(textContent|innerHTML|id|className|hidden|tabIndex)$/.test(k) ? '' : stub())),
    set: (t, k, v) => ((t[k] = v), true), apply: () => stub()
  });
  const doc = { getElementById: id => els[id] || (els[id] = stub()), querySelector: () => stub(), querySelectorAll: () => ({ forEach() {} }) };
  class FakeDate extends Date { constructor() { super(2026, 9, 25, hour, 5, 7); } }
  const win = { matchMedia: () => ({ matches: true }), addEventListener() {}, scrollY: 0, innerWidth: 1280 };
  vm.runInNewContext(js, { window: win, document: doc, Date: FakeDate, history: { replaceState() {} }, location: { hash: '' }, setTimeout() {}, requestAnimationFrame() {}, innerWidth: 1280 });
  return [els.w1.textContent, els.mr.textContent];
}
const expect = { 6: 'Chai', 12: 'Chaat', 16: 'Snack', 20: 'Maggi', 2: 'Craving' };
for (const [h, word] of Object.entries(expect)) assert.equal(run(+h)[0], word, 'hour ' + h);
assert.equal(run(16)[1], 'खाऊची वेळ!');
console.log('Passed: time-aware headline for morning, midday, evening, night and late night');
