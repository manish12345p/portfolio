const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const outputDir = path.resolve(__dirname, '../design-reference');

async function captureDouglusScreenshots() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  try {
    console.log('Navigating to https://douglus.co/ ...');
    await page.goto('https://douglus.co/', { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(e => console.log('goto note:', e.message));
    
    // Wait for preloader to finish (the counter runs 0 to 100%)
    console.log('Waiting for preloader (7 seconds)...');
    await new Promise(r => setTimeout(r, 7000));

    // Capture Fine mode
    await page.screenshot({ path: path.join(outputDir, 'douglus-layout-fine.png') });
    console.log('Captured douglus-layout-fine.png');

    // Toggle Bold mode: find the switch and click it
    await page.evaluate(() => {
      const modeBtn = document.querySelector('.home-hero__mode-switch, [data-mode="brutalism"]');
      if (modeBtn) modeBtn.click();
    });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(outputDir, 'douglus-layout-bold.png') });
    console.log('Captured douglus-layout-bold.png');

    // Open Menu: find menu button and click it
    await page.evaluate(() => {
      const menuBtn = document.querySelector('.site-header__menu-btn, button[class*="menu"], [data-menu-toggle]');
      if (menuBtn) menuBtn.click();
      else {
        const anyMenu = Array.from(document.querySelectorAll('button, a')).find(el => el.innerText.trim().toLowerCase() === 'menu');
        if (anyMenu) anyMenu.click();
      }
    });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(outputDir, 'douglus-menu-open.png') });
    console.log('Captured douglus-menu-open.png');

    // Hover over a menu item to capture preview shape & words
    await page.evaluate(() => {
      const workLink = document.querySelector('a[href="/work"], [data-menu-item="work"]');
      if (workLink) {
        workLink.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      }
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(outputDir, 'douglus-menu-hover.png') });
    console.log('Captured douglus-menu-hover.png');

    // Mobile view (375x812)
    await page.setViewport({ width: 375, height: 812 });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(outputDir, 'douglus-mobile-menu.png') });
    console.log('Captured douglus-mobile-menu.png');

    // Close menu or reload on mobile
    await page.goto('https://douglus.co/', { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});
    await new Promise(r => setTimeout(r, 7000));
    await page.screenshot({ path: path.join(outputDir, 'douglus-mobile-home.png') });
    console.log('Captured douglus-mobile-home.png');

    // Desktop view for subpages
    await page.setViewport({ width: 1440, height: 900 });

    // /about
    console.log('Navigating to /about...');
    await page.goto('https://douglus.co/about', { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});
    await new Promise(r => setTimeout(r, 6000));
    await page.screenshot({ path: path.join(outputDir, 'douglus-about.png') });
    console.log('Captured douglus-about.png');

    // /work
    console.log('Navigating to /work...');
    await page.goto('https://douglus.co/work', { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});
    await new Promise(r => setTimeout(r, 6000));
    await page.screenshot({ path: path.join(outputDir, 'douglus-work.png') });
    console.log('Captured douglus-work.png');

    // /contact
    console.log('Navigating to /contact...');
    await page.goto('https://douglus.co/contact', { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});
    await new Promise(r => setTimeout(r, 6000));
    await page.screenshot({ path: path.join(outputDir, 'douglus-contact.png') });
    console.log('Captured douglus-contact.png');

    console.log('\nAll Douglus screenshots captured successfully!');
  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    await browser.close();
  }
}

captureDouglusScreenshots();

