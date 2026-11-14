const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const http = require('http');

async function testPrinter() {
  console.log('Testing CV Printer in browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // Navigate to local dev server (port 3000) or check if running
  try {
    const res = await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 10000 });
    console.log('Connected to localhost:3000!');
    
    // Wait for preloader to finish
    await new Promise(r => setTimeout(r, 3500));

    // 1. Capture Floating CV Tab
    await page.screenshot({ path: path.join(__dirname, '../design-reference/my-cv-tab-peeking.png') });
    console.log('Captured my-cv-tab-peeking.png');

    // 2. Click the floating CV tab
    const tabBtn = await page.$('button[aria-label="Open CV printer drawer"]');
    if (tabBtn) {
      await tabBtn.click();
      console.log('Clicked CV floating tab!');
      
      // Wait 1.5s (during printing)
      await new Promise(r => setTimeout(r, 1500));
      await page.screenshot({ path: path.join(__dirname, '../design-reference/my-cv-printing.png') });
      console.log('Captured my-cv-printing.png');

      // Wait 2.5s more (after printing finishes)
      await new Promise(r => setTimeout(r, 2500));
      await page.screenshot({ path: path.join(__dirname, '../design-reference/my-cv-printed-done.png') });
      console.log('Captured my-cv-printed-done.png');
    } else {
      console.log('Could not find tabBtn');
    }
  } catch (err) {
    console.log('Note on localhost test:', err.message);
  } finally {
    await browser.close();
  }
}

testPrinter();

