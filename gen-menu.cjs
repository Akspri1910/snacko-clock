// Builds the menu section of dist/index.html from menu-data.json (the source of truth for dishes and prices).
const fs = require('node:fs');
const data = JSON.parse(fs.readFileSync('menu-data.json', 'utf8'));
const order = ['Chaat', 'Sandwich', 'Burger', 'Pizza', 'Pizza Sandwich', 'Fries', 'Potato Spring Roll', 'Maggi', 'Waffles', 'Shakes', 'Mojito', 'Cold Coffee', 'Combos'];
const label = { 'Cold Coffee': 'Coffee, tea &amp; extras' };
const img = { Chaat: 'menu-shevpuri.png.jpeg', Sandwich: 'menu-bombaysand.png.jpeg', Waffles: 'menu-chocolatewaffles.png.jpeg', 'Cold Coffee': 'menu-coldcoffee.png.jpeg', Fries: 'menu-peripericheesefries.png.jpeg', Maggi: 'menu-vegcheesemaggie.png.jpeg' };
const veg = order.map(n => data.veg.find(c => c.name === n)).filter(Boolean);
const slug = s => s.toLowerCase().replace(/&amp;/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const cat = (side, c, i) => {
  const id = `${side}-${slug(c.name)}`, ps = c.items.map(x => x[1]), lo = Math.min(...ps), hi = Math.max(...ps);
  const im = side === 'veg' && img[c.name] ? ` data-img="assets/${img[c.name]}"` : '';
  return `<section class="cat${c.name === 'Combos' ? ' one' : ''}" id="${id}"${im} aria-labelledby="${id}-h"><header><span class="num">${String(i + 1).padStart(2, '0')}</span><h3 id="${id}-h">${label[c.name] || c.name}</h3><span class="range">₹${lo}${hi > lo ? '–' + hi : ''}</span></header><ul>${c.items.map(([n, p]) => `<li class="row"><span class="n">${n}</span><span class="d" aria-hidden="true"></span><b class="p">₹${p}</b></li>`).join('')}</ul></section>`;
};
const panel = (side, list, note) => `<div class="panel" id="panel-${side}" role="tabpanel" aria-labelledby="tab-${side}"${side === 'nonveg' ? ' hidden' : ''}><div class="layout"><nav class="rail" aria-label="${side === 'veg' ? 'Veg' : 'Non-veg'} categories">${list.map(c => `<a href="#${side}-${slug(c.name)}" data-cat="${side}-${slug(c.name)}">${label[c.name] || c.name}</a>`).join('')}</nav><div class="cats">${note}${list.map((c, i) => cat(side, c, i)).join('')}</div></div></div>`;
const nvNote = '<figure class="band"><div class="arch sm"><img src="assets/chicken-tikka.jpg" alt="Plate of chicken tikka with onion and cucumber" loading="lazy" width="600" height="800"></div><figcaption><b>New: the non-veg side.</b> Chicken, egg and plenty of cheese. Illustrative photo, not our final plating.</figcaption></figure>';
const html = `<section class="menu" id="menu" data-side="veg" aria-labelledby="menu-h"><span class="anchor" id="menu-veg"></span><span class="anchor" id="menu-nonveg"></span>
<div class="menu-head"><div><p class="kicker">02 / What’s cooking</p><h2 id="menu-h">The menu.</h2><p class="mr" lang="mr">जे आवडेल ते खा.</p></div>
<div class="switch" role="tablist" aria-label="Choose a side"><button role="tab" id="tab-veg" aria-selected="true" aria-controls="panel-veg" data-side="veg"><span class="vm veg" aria-hidden="true"></span>Veg</button><button role="tab" id="tab-nonveg" aria-selected="false" aria-controls="panel-nonveg" data-side="nonveg" tabindex="-1"><span class="vm nonveg" aria-hidden="true"></span>Non-Veg</button><span class="knob" aria-hidden="true"></span></div></div>
${panel('veg', veg, '')}${panel('nonveg', data.nonveg, nvNote)}
<div class="menu-foot"><p>Prices in ₹. Egg dishes are non-veg. Veg prices follow our current online menu (checked 25 October 2026); availability and final prices are confirmed when you order.</p><a class="btn solid" href="https://thesnackoclock.inmyarea.in/" target="_blank" rel="noopener">Order online <span aria-hidden="true">↗</span></a></div>
<div class="peek" aria-hidden="true"><img alt="" width="240" height="300"></div></section>`;
const f = 'dist/index.html';
let p = fs.readFileSync(f, 'utf8');
const A = '<!--MENU:START-->', B = '<!--MENU:END-->';
if (!p.includes(A)) p = p.replace('</main>', `${A}${B}</main>`);
p = p.replace(new RegExp(A + '[\\s\\S]*?' + B), `${A}${html}${B}`);
fs.writeFileSync(f, p);
console.log('menu: veg', veg.length, 'cats /', veg.reduce((a, c) => a + c.items.length, 0), 'items; non-veg', data.nonveg.length, 'cats /', data.nonveg.reduce((a, c) => a + c.items.length, 0), 'items');
