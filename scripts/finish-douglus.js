const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const outputDir = path.resolve(__dirname, '../design-reference');

async function finishDouglus() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    console.log('Navigating to douglus.co...');
    await page.goto('https://douglus.co/', { waitUntil: 'networkidle2', timeout: 60000 });
    console.log('Current URL after idle:', page.url());

    // Wait a little for any animations
    await new Promise(r => setTimeout(r, 4000));

    // Inspect the DOM safely
    const data = await page.evaluate(() => {
      // Find all text and interactive elements
      const elements = Array.from(document.querySelectorAll('*'));
      
      const toggle = elements.find(el => /fine|bold/i.test(el.innerText || '') && el.innerText.length < 30);
      const menu = elements.find(el => (/menu/i.test(el.innerText || '') || /menu/i.test(el.getAttribute('aria-label') || '')) && el.tagName !== 'SCRIPT');

      const headings = Array.from(document.querySelectorAll('h1, h2, h3, [class*="hero"], [class*="title"], [class*="split"]')).map(el => ({
        tag: el.tagName,
        text: el.innerText.trim(),
        fontFamily: window.getComputedStyle(el).fontFamily,
        fontSize: window.getComputedStyle(el).fontSize,
        fontWeight: window.getComputedStyle(el).fontWeight,
        color: window.getComputedStyle(el).color
      }));

      const bodyStyles = window.getComputedStyle(document.body);

      return {
        url: window.location.href,
        bg: bodyStyles.backgroundColor,
        color: bodyStyles.color,
        fontFamily: bodyStyles.fontFamily,
        toggleText: toggle ? toggle.innerText : null,
        toggleTag: toggle ? toggle.tagName : null,
        menuText: menu ? menu.innerText : null,
        menuTag: menu ? menu.tagName : null,
        headings: headings.slice(0, 15)
      };
    });

    console.log('Douglus inspection:', JSON.stringify(data, null, 2));
    fs.writeFileSync(path.join(outputDir, 'douglus-inspect.json'), JSON.stringify(data, null, 2));

    // Try finding and clicking Fine / Bold toggle
    const toggleSelector = await page.evaluate(() => {
      const candidates = Array.from(document.querySelectorAll('button, a, div, span'));
      const btn = candidates.find(el => /fine|bold/i.test(el.innerText || '') && el.innerText.length < 30);
      if (btn) {
        btn.setAttribute('id', 'my-debug-toggle');
        return btn.innerText;
      }
      return null;
    });

    if (toggleSelector) {
      console.log('Found toggle selector:', toggleSelector);
      await page.screenshot({ path: path.join(outputDir, 'douglus-layout-fine.png') });
      await page.click('#my-debug-toggle');
      await new Promise(r => setTimeout(r, 2000));
      await page.screenshot({ path: path.join(outputDir, 'douglus-layout-bold.png') });
      console.log('Saved douglus-layout-fine.png and douglus-layout-bold.png');
      // toggle back
      await page.click('#my-debug-toggle');
      await new Promise(r => setTimeout(r, 1000));
    }

    // Try finding and opening the menu
    const menuSelector = await page.evaluate(() => {
      const candidates = Array.from(document.querySelectorAll('button, [role="button"], a, div'));
      const btn = candidates.find(el => {
        const text = (el.innerText || '').toLowerCase().trim();
        const aria = (el.getAttribute('aria-label') || '').toLowerCase().trim();
        return text === 'menu' || aria === 'menu' || text.includes('menu');
      });
      if (btn) {
        btn.setAttribute('id', 'my-debug-menu');
        return btn.innerText || 'menu';
      }
      return null;
    });

    if (menuSelector) {
      console.log('Found menu button:', menuSelector);
      await page.click('#my-debug-menu');
      await new Promise(r => setTimeout(r, 2500));
      await page.screenshot({ path: path.join(outputDir, 'douglus-menu-open.png') });
      console.log('Saved douglus-menu-open.png');
    }

    // Mobile screenshot
    await page.setViewport({ width: 375, height: 812 });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(outputDir, 'douglus-mobile-home.png') });
    console.log('Saved douglus-mobile-home.png');

    console.log('Done capturing douglus details!');
  } catch (err) {
    console.error('Error in finishDouglus:', err);
  } finally {
    await browser.close();
  }
}

finishDouglus();

