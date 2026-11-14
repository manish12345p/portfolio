const fs = require('fs');
const html = fs.readFileSync('design-reference/daffed-case-study.html', 'utf8');

// Find headings, sections, project meta
const sections = [...html.matchAll(/<(section|header|div)[^>]+class=["']([^"']*(hero|meta|challenge|solution|result|gallery|overview|brief|impact)[^"']*)["'][^>]*>/gi)]
  .map(m => `<${m[1]} class="${m[2]}">`);

console.log('Case study key sections:', sections.slice(0, 15));

// Find project details like client, role, year, tech
const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
console.log('H1:', h1 ? h1[1].replace(/<[^>]+>/g, '').trim() : 'none');

const headings = [...html.matchAll(/<h[234][^>]*>([\s\S]*?)<\/h[234]>/gi)]
  .map(m => m[1].replace(/<[^>]+>/g, '').trim())
  .filter(Boolean);

console.log('Subheadings in case study:', headings);

