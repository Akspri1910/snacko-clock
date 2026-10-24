const fs = require('node:fs');
const { execFileSync } = require('node:child_process');
const cli = JSON.parse(fs.readFileSync('node_modules/@tailwindcss/cli/package.json','utf8')).bin.tailwindcss;
execFileSync(process.execPath, [`node_modules/@tailwindcss/cli/${cli}`, '-i', 'tailwind.css', '-o', 'dist/styles.css', '--minify'], {stdio:'inherit'});
fs.mkdirSync('dist/vendor', {recursive:true});
for (const file of ['gsap.min.js','ScrollTrigger.min.js']) fs.copyFileSync(require.resolve(`gsap/dist/${file}`), `dist/vendor/${file}`);
