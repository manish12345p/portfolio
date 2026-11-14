const fs = require('fs');
const html = fs.readFileSync('design-reference/douglus-full.html', 'utf8');

const lines = html.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('preloader') || line.includes('menu-overlay__item') || line.includes('menu-overlay__link')) {
    console.log(`L${idx+1}: ${line.trim().slice(0, 150)}`);
  }
});

