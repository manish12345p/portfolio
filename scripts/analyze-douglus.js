const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const outputDir = path.resolve(__dirname, '../design-reference');

async function analyzeDouglus() {
  console.log('Launching browser for douglus.co...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('response', res => {
      if (res.status() >= 300 && res.status() < 400) {
        console.log('REDIRECT:', res.url(), '->', res.headers()['location']);
      }
    });

    console.log('Navigating to https://douglus.co/ ...');
    const response = await page.goto('https://douglus.co/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
    console.log('Response status:', response ? response.status() : 'null', 'URL:', page.url());

    // Screenshot preloader
    await page.screenshot({ path: path.join(outputDir, 'douglus-preloader.png') });
    console.log('Saved douglus-preloader.png');

    // Wait for page to finish loading / animations
    console.log('Waiting for preloader to finish...');
    await new Promise(r => setTimeout(r, 8000));

    const htmlContent = await page.content();
    fs.writeFileSync(path.join(outputDir, 'douglus-page.html'), htmlContent.slice(0, 5000), 'utf8');

    await page.screenshot({ path: path.join(outputDir, 'douglus-homepage-full.png'), fullPage: true });
    await page.screenshot({ path: path.join(outputDir, 'douglus-hero.png') });
    console.log('Saved fullpage & hero screenshots. Size of html:', htmlContent.length);

    // Inspect elements, colors, fonts
    const pageData = await page.evaluate(() => {
      const styles = window.getComputedStyle(document.body);
      const bg = styles.backgroundColor;
      const color = styles.color;
      const fontFamily = styles.fontFamily;

      const allElements = Array.from(document.querySelectorAll('*'));
      const textSnippets = allElements
        .filter(el => el.children.length === 0 && el.innerText && el.innerText.trim().length > 0)
        .map(el => ({
          tag: el.tagName,
          text: el.innerText.trim(),
          class: el.className,
          fontSize: window.getComputedStyle(el).fontSize,
          fontWeight: window.getComputedStyle(el).fontWeight,
          fontFamily: window.getComputedStyle(el).fontFamily,
          color: window.getComputedStyle(el).color
        }));

      // Look for toggle button (Fine / Bold)
      const toggleEl = allElements.find(el => {
        const t = (el.innerText || '').toLowerCase();
        return t.includes('fine') || t.includes('bold') || t.includes('layout');
      });

      // Look for menu
      const menuEl = allElements.find(el => {
        const t = (el.innerText || '').toLowerCase();
        const aria = (el.getAttribute('aria-label') || '').toLowerCase();
        return t.includes('menu') || aria.includes('menu');
      });

      return {
        bg,
        color,
        fontFamily,
        toggle: toggleEl ? { text: toggleEl.innerText, tag: toggleEl.tagName, class: toggleEl.className } : null,
        menu: menuEl ? { text: menuEl.innerText, tag: menuEl.tagName, class: menuEl.className } : null,
        sampleTexts: textSnippets.slice(0, 25)
      };
    });

    console.log('Page data:', JSON.stringify(pageData, null, 2));
    fs.writeFileSync(path.join(outputDir, 'douglus-data.json'), JSON.stringify(pageData, null, 2));

    // Try finding the toggle and clicking it
    const toggleSelector = await page.evaluate(() => {
      const els = Array.from(document.querySelectorAll('button, a, div, span, [role="button"]'));
      for (const el of els) {
        if (/fine|bold/i.test(el.innerText || '') && (el.innerText || '').length < 30) {
          el.setAttribute('data-test-toggle', 'true');
          return el.innerText;
        }
      }
      return null;
    });

    if (toggleSelector) {
      console.log('Found toggle selector:', toggleSelector);
      await page.screenshot({ path: path.join(outputDir, 'douglus-layout-fine.png') });
      const toggleBtn = await page.$('[data-test-toggle="true"]');
      if (toggleBtn) {
        await toggleBtn.click();
        await new Promise(r => setTimeout(r, 2000));
        await page.screenshot({ path: path.join(outputDir, 'douglus-layout-bold.png') });
        console.log('Saved douglus-layout-bold.png');
      }
    }

    // Try menu
    const menuSelector = await page.evaluate(() => {
      const els = Array.from(document.querySelectorAll('button, a, [role="button"]'));
      for (const el of els) {
        if (/menu/i.test(el.innerText || '') || /menu/i.test(el.getAttribute('aria-label') || '')) {
          el.setAttribute('data-test-menu', 'true');
          return el.innerText || 'menu';
        }
      }
      return null;
    });

    if (menuSelector) {
      console.log('Found menu button:', menuSelector);
      const menuBtn = await page.$('[data-test-menu="true"]');
      if (menuBtn) {
        await menuBtn.click();
        await new Promise(r => setTimeout(r, 2000));
        await page.screenshot({ path: path.join(outputDir, 'douglus-menu-open.png') });
        console.log('Saved douglus-menu-open.png');
      }
    }

    // Mobile view
    await page.setViewport({ width: 375, height: 812 });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(outputDir, 'douglus-mobile-home.png') });
    console.log('Saved douglus-mobile-home.png');

  } catch (err) {
    console.error('Error analyzing douglus.co:', err);
  } finally {
    await browser.close();
  }
}

analyzeDouglus();

