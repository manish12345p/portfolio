const fs = require('fs');

const html1 = fs.readFileSync('design-reference/douglus-full.html', 'utf8');
const html2 = fs.readFileSync('design-reference/daffed-full.html', 'utf8');

function extractInfo(html, name) {
  console.log(`\n=== ${name} ===`);
  const css = [...html.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi)].map(m => {
    const href = m[0].match(/href=["']([^"']+)["']/i);
    return href ? href[1] : null;
  }).filter(Boolean);
  console.log('CSS files:', css);

  // Check fonts
  const fontLinks = [...html.matchAll(/fonts\.(googleapis|adobe|typekit|cdn)\.[^"']+/gi)].map(m => m[0]);
  console.log('Font links:', fontLinks);

  // Check script tags
  const scripts = [...html.matchAll(/<script[^>]+src=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
  console.log('Scripts:', scripts.slice(0, 10));

  // Check layout toggle or CV elements
  const cvMatches = [...html.matchAll(/<[^>]+(psst|cv|resume|modal|drawer|panel)[^>]*>/gi)].map(m => m[0].slice(0, 120));
  console.log('CV/Resume related elements:', cvMatches.slice(0, 8));

  // Check sections / nav
  const navMatches = [...html.matchAll(/<(nav|header|footer|section|main)[^>]*>/gi)].map(m => m[0].slice(0, 120));
  console.log('Semantic structure tags:', navMatches);
}

extractInfo(html1, 'Douglus');
extractInfo(html2, 'Daffed');

