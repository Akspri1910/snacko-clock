// Builds the Maharashtra chapter of dist/index.html.
// Re-uses the drawn fort, pheta and stamp from dist/index.html.
const fs = require('node:fs');
const idx = fs.readFileSync('dist/index.html', 'utf8');
const svg = cls => {
  const m = idx.match(new RegExp('<svg class="' + cls + '"[\\s\\S]*?</svg>'));
  if (!m) throw new Error('missing svg ' + cls);
  return m[0];
};
const regions = [
  ['Pune', 'Misal pav, bakarwadi &amp; mastani', 'veg', 'Ghar. Home turf.'],
  ['Mumbai', 'Vada pav &amp; pav bhaji', 'veg', ''],
  ['Kolhapur', 'Tambda-pandhra rassa', 'nonveg', ''],
  ['Konkan · Malvan', 'Fish curry &amp; solkadhi', 'nonveg', ''],
  ['Nagpur · Vidarbha', 'Saoji, the spicy one', 'nonveg', ''],
  ['Khandesh', 'Jalgaon bharit &amp; shev bhaji', 'veg', '']
];
const rows = regions.map(([n, d, m, t], i) => `<li class="reg${t ? ' home' : ''}"><span class="rn">${String(i + 1).padStart(2, '0')}</span><span class="rname">${n}${t ? `<small>${t}</small>` : ''}</span><span class="rdish">${d}</span><i class="vm ${m}" role="img" aria-label="${m === 'veg' ? 'Veg' : 'Non-veg'}"></i></li>`).join('');
const html = `<section class="maha2" id="maharashtra" aria-labelledby="maha-h"><div class="pb" aria-hidden="true"></div>
<div class="m-top"><div class="m-copy"><p class="kicker">03 / Puneri at heart</p><p class="m-mr" lang="mr">आपला महाराष्ट्र</p><h2 id="maha-h">Maharashtra,<br>one plate at a time.</h2><p class="m-lede">Born in Pune, fed by all of Maharashtra. From the Konkan coast to Vidarbha, every corner has its own plate, veg and non-veg. We’re inspired by all of it.</p><a class="btn line" href="#menu-veg">See what we serve <span aria-hidden="true">↓</span></a></div>
<div class="m-art" aria-hidden="false"><div class="disc"></div>${svg('fort')}${svg('pheta')}${svg('stamp')}</div></div>
<ol class="regs" aria-label="Six corners of Maharashtra and a signature dish from each">${rows}</ol>
<div class="m-photos"><figure><div class="arch"><img src="assets/misal-pav.jpg" alt="Kolhapuri misal pav with buttermilk" loading="lazy" width="500" height="340"></div><figcaption>Misal pav</figcaption></figure><figure><div class="arch"><img src="assets/vada-pav.jpg" alt="Vada pav with green chilli" loading="lazy" width="500" height="340"></div><figcaption>Vada pav</figcaption></figure><p class="m-note">Maharashtra’s food culture is our inspiration. These regional dishes are not our menu. Photos: Kolhapuri misal pav by Ankushkr2020, vada pav by Rutvi Mistry, via Wikimedia Commons (CC BY-SA 4.0).</p></div>
<div class="pb" aria-hidden="true"></div></section>`;
const f = 'dist/index.html';
let p = fs.readFileSync(f, 'utf8');
const A = '<!--MAHA:START-->', B = '<!--MAHA:END-->';
if (!p.includes(A)) p = p.replace('<!--MENU:END-->', '<!--MENU:END-->' + A + B);
const a = p.indexOf(A), b = p.indexOf(B);
p = p.slice(0, a) + A + html + p.slice(b);
fs.writeFileSync(f, p);
console.log('maha chapter written,', html.length, 'chars');
