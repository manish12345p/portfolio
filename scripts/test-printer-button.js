const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const outputDir = path.resolve(__dirname, '../design-reference');

async function testPrinterButton() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  // Click View CV button in header
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.innerText.includes('View CV') || b.getAttribute('aria-label') === 'View CV');
    if (btn) btn.click();
  });

  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outputDir, 'redesign-cv-printing.png') });
  console.log('Saved redesign-cv-printing.png');

  await new Promise(r => setTimeout(r, 2600));
  await page.screenshot({ path: path.join(outputDir, 'redesign-cv-finished.png') });
  console.log('Saved redesign-cv-finished.png');

  await browser.close();
}

testPrinterButton();

