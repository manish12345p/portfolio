const fs = require('fs');
const html = fs.readFileSync('design-reference/douglus-full.html', 'utf8');

// Find all occurrences of Douglus or Nguyen or Hero in douglus-full.html
const lines = html.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('home-hero') || line.includes('Douglus') || line.includes('Nguyen') || line.includes('layout-toggle') || line.includes('toggle')) {
    console.log(`L${idx+1}: ${line.trim().slice(0, 150)}`);
  }
});

