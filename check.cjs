const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const buttons = ['all','street','cheesy','sweet'].map(filter => ({dataset:{filter},setAttribute(k,v){this[k]=v},addEventListener(_,fn){this.click=fn}}));
const dishes = ['street','cheesy','cheesy','cheesy','sweet','sweet'].map(category => ({dataset:{category},hidden:false}));
const nodes = {'#menu-status':{},'#year':{}};
vm.runInNewContext(fs.readFileSync('dist/app.js','utf8'),{document:{querySelectorAll:s=>s==='[data-filter]'?buttons:dishes,querySelector:s=>nodes[s]},Date});
for(const [index,count] of [[1,1],[2,3],[3,2],[0,6]]){buttons[index].click();assert.equal(dishes.filter(d=>!d.hidden).length,count);assert.equal(buttons[index]['aria-pressed'],'true')}
const html=fs.readFileSync('dist/index.html','utf8');
for(const [,path] of html.matchAll(/(?:src|href)="([^"#]+)"/g)){if(!/^(https?:|tel:)/.test(path))assert.ok(fs.existsSync('dist/'+path),path)}
console.log('Passed: all four menu filters and local asset links');
const motion=fs.readFileSync('dist/motion.js','utf8');
vm.runInNewContext(motion,{window:{}});
let mediaQuery;
const gsap={registerPlugin(){},matchMedia:()=>({add(query){mediaQuery=query}})};
vm.runInNewContext(motion,{window:{gsap,ScrollTrigger:{}},gsap,ScrollTrigger:{},document:{querySelectorAll:()=>[]}});
assert.equal(mediaQuery,'(prefers-reduced-motion: no-preference)');
assert.ok(fs.readFileSync('dist/tailwind.css','utf8').includes('grid-cols-2'));
console.log('Passed: animation fallback, reduced-motion gate and compiled Tailwind');
