const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const outputDir = path.resolve(__dirname, '../design-reference');

async function verifyRedesign() {
  console.log('Testing redesigned portfolio across viewports...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  const viewports = [
    { name: '1440', width: 1440, height: 900 },
    { name: '1024', width: 1024, height: 800 },
    { name: '390', width: 390, height: 844 }
  ];

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 15000 });
    await new Promise(r => setTimeout(r, 1000));

    // Check horizontal scroll / overflow
    const overflow = await page.evaluate(() => {
      const scrollW = document.documentElement.scrollWidth;
      const clientW = document.documentElement.clientWidth;
      const h1Rect = document.querySelector('h1')?.getBoundingClientRect();
      return {
        hasHorizontalOverflow: scrollW > clientW,
        scrollW,
        clientW,
        h1Width: h1Rect ? h1Rect.width : 0,
        h1Right: h1Rect ? h1Rect.right : 0
      };
    });

    console.log(`Viewport ${vp.name}px:`, JSON.stringify(overflow));

    await page.screenshot({
      path: path.join(outputDir, `redesign-${vp.name}px.png`),
      fullPage: true
    });
    console.log(`Saved redesign-${vp.name}px.png`);
  }

  // Test CV Printer open via header "View CV" button
  console.log('Testing CV printer via header button at 1440px...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  const viewCvBtn = await page.$('button[aria-label="View CV"]');
  if (viewCvBtn) {
    await viewCvBtn.click();
    console.log('Clicked View CV button!');
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(outputDir, 'redesign-cv-printing.png') });

    await new Promise(r => setTimeout(r, 2600));
    await page.screenshot({ path: path.join(outputDir, 'redesign-cv-finished.png') });
    console.log('Saved redesign-cv-printing.png and redesign-cv-finished.png');
  }

  await browser.close();
  console.log('Verification finished successfully!');
}

verifyRedesign();

