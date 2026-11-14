const fs = require('fs');

const douglusHtml = fs.readFileSync('design-reference/douglus-full.html', 'utf8');
const daffedHtml = fs.readFileSync('design-reference/daffed-full.html', 'utf8');

console.log('=== DOUGLUS HERO & MENU & TOGGLE ===');
const heroMatch = douglusHtml.match(/<section class="home-hero"[\s\S]*?<\/section>/i);
if (heroMatch) {
  console.log('--- DOUGLUS HERO ---');
  console.log(heroMatch[0]);
}

const menuMatch = douglusHtml.match(/<aside class="menu-overlay[\s\S]*?<\/aside>/i);
if (menuMatch) {
  console.log('--- DOUGLUS MENU OVERLAY ---');
  console.log(menuMatch[0]);
}

const headerMatch = douglusHtml.match(/<header class="site-header"[\s\S]*?<\/header>/i);
if (headerMatch) {
  console.log('--- DOUGLUS HEADER (TOGGLE) ---');
  console.log(headerMatch[0]);
}

console.log('\n=== DAFFED CV & WORK SECTIONS ===');
const cvDrawer = daffedHtml.match(/<dialog class="cvd"[\s\S]*?<\/dialog>/i);
if (cvDrawer) {
  console.log('--- DAFFED CV DRAWER ---');
  console.log(cvDrawer[0]);
}

const cvTab = daffedHtml.match(/<button class="cvtab"[\s\S]*?<\/button>/i);
if (cvTab) {
  console.log('--- DAFFED CV TAB ---');
  console.log(cvTab[0]);
}

const floater = daffedHtml.match(/<button class="floater"[\s\S]*?<\/button>/i);
if (floater) {
  console.log('--- DAFFED FLOATER ---');
  console.log(floater[0]);
}

