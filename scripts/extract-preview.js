const fs = require('fs');
const path = require('path');

const htmlPath = 'C:/Users/manis/.gemini/antigravity/brain/bda12aac-571b-42a0-9f2a-a89c5b8c8bd1/.user_uploaded/media_1794648850963_656587dc.html';
const html = fs.readFileSync(htmlPath, 'utf8');

const match = html.match(/src="(data:image\/jpeg;base64,[^"]+)"/);
if (match) {
  const base64Data = match[1].replace(/^data:image\/jpeg;base64,/, '');
  const outPath = path.join(__dirname, '..', 'public', 'resume-preview.jpg');
  fs.writeFileSync(outPath, Buffer.from(base64Data, 'base64'));
  console.log('Saved public/resume-preview.jpg, size:', fs.statSync(outPath).size);
} else {
  console.log('No base64 match found');
}
