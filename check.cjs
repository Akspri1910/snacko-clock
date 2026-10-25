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
let mediaQuery, pauseHandler, reverted=0, pausedClass;
const toggle={getAttribute(key){return this[key]},setAttribute(key,value){this[key]=value},addEventListener(_,handler){pauseHandler=handler}};
const gsap={registerPlugin(){},matchMedia:()=>({add(query){mediaQuery=query},revert(){reverted++}})};
vm.runInNewContext(motion,{window:{gsap,ScrollTrigger:{}},gsap,ScrollTrigger:{},document:{querySelectorAll:()=>[],querySelector:()=>toggle,body:{classList:{add(){},toggle(_,value){pausedClass=value}}}}});
assert.equal(mediaQuery,'(prefers-reduced-motion: no-preference)');
pauseHandler({currentTarget:toggle});
assert.equal(toggle['aria-label'],'Play animations');
assert.equal(pausedClass,true);
assert.equal(reverted,1);
pauseHandler({currentTarget:toggle});
assert.equal(toggle['aria-label'],'Pause animations');
assert.equal(pausedClass,false);
assert.ok(fs.readFileSync('dist/styles.css','utf8').includes('grid-cols-2'));
console.log('Passed: animation fallback, reduced-motion gate and compiled Tailwind');
const embeds=[...html.matchAll(/<iframe\b[^>]*>/g)].map(match=>match[0]);
assert.equal(embeds.length,3);
assert.ok(embeds.every(frame=>frame.includes('title=')&&frame.includes('loading="lazy"')&&frame.includes('https://www.instagram.com/')));
assert.ok(html.includes('https://www.instagram.com/the_snacko_clock/embed/'));
assert.ok(html.includes('CURRENT LOCATION / FOUNTAIN ROAD'));
assert.ok(html.includes('New location and opening details will be revealed soon.'));
assert.ok(html.includes('Food images are AI-generated previews.'));
console.log('Passed: Instagram profile and reel embeds, current-location labels and AI disclosure');
// Withhold every scroll trigger: no initial tween may hide content on fast scroll.
const tweens=[];
const chain={from(target,vars){tweens.push(vars);return chain}};
const element={querySelector(){return {}}};
const activeGsap={registerPlugin(){},matchMedia:()=>({add(_,callback){callback()},revert(){}}),timeline:()=>chain,from(target,vars){tweens.push(vars)},to(){},fromTo(){},utils:{toArray:()=>[element]}};
vm.runInNewContext(motion,{window:{gsap:activeGsap,ScrollTrigger:{}},gsap:activeGsap,ScrollTrigger:{},document:{querySelector:()=>toggle,querySelectorAll:()=>[],body:{classList:{add(){}}}}});
assert.ok(tweens.length>0);
for(const tween of tweens){assert.equal(tween.opacity,undefined);assert.equal(tween.autoAlpha,undefined);assert.equal(tween.clipPath,undefined);if(tween.scrollTrigger)assert.equal(tween.immediateRender,false)}
assert.equal([...html.matchAll(/<link rel="stylesheet" href="(?!https:)[^"]+">/g)].length,1);
assert.ok(html.includes('assets/shop.webp')&&html.includes('assets/night.webp'));
assert.ok(html.includes('rel="canonical"')&&html.includes('property="og:image"'));
const schema=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
assert.equal(schema['@type'],'Restaurant');
assert.equal(schema.openingHours,undefined);
console.log('Passed: visible content without scroll triggers, single local stylesheet and SEO metadata');

assert.equal([...html.matchAll(/class="menu-line"/g)].length,60);
assert.equal([...html.matchAll(/class="menu-category"/g)].length,11);
assert.ok(html.includes("assets/original-sign-logo.png")&&!html.includes("assets/brand-logo.png"));
assert.ok(html.includes("<span>Pani Puri</span><strong>₹40</strong>")&&html.includes("<span>Cold Coffee</span><strong>₹90</strong>"));
assert.ok(!html.includes("openingHours"));
console.log("Passed: full board menu, original sign photo logo, and no unconfirmed hours");
