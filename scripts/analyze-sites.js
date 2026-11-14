const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const outputDir = path.resolve(__dirname, '../design-reference');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function analyzeSites() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const analysisData = {
    daffed: {},
    douglus: {}
  };

  try {
    // -------------------------------------------------------------
    // SITE 1: get-daffed.com
    // -------------------------------------------------------------
    console.log('\n--- Analyzing https://www.get-daffed.com/ ---');
    const page1 = await browser.newPage();
    await page1.setViewport({ width: 1440, height: 900 });

    try {
      await page1.goto('https://www.get-daffed.com/', { waitUntil: 'networkidle2', timeout: 45000 });
    } catch (e) {
      console.log('Goto timed out or had warning, continuing...', e.message);
    }

    await new Promise(r => setTimeout(r, 3000));

    // Full homepage screenshot
    await page1.screenshot({ path: path.join(outputDir, 'daffed-homepage-full.png'), fullPage: true });
    console.log('Saved daffed-homepage-full.png');

    // Extract basic page structure & styles
    const daffedData = await page1.evaluate(() => {
      const styles = window.getComputedStyle(document.body);
      const bg = styles.backgroundColor;
      const color = styles.color;
      const fontFamily = styles.fontFamily;

      // Find all buttons, links, headings
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => ({
        tag: h.tagName,
        text: h.innerText.trim(),
        fontFamily: window.getComputedStyle(h).fontFamily,
        fontSize: window.getComputedStyle(h).fontSize,
        fontWeight: window.getComputedStyle(h).fontWeight,
        color: window.getComputedStyle(h).color
      }));

      // Look for CV or psst trigger
      const allElements = Array.from(document.querySelectorAll('*'));
      const triggerEl = allElements.find(el => {
        const text = (el.innerText || '').toLowerCase();
        return text.includes('psst') || text.includes('cv') || text.includes('resume');
      });

      let triggerInfo = null;
      if (triggerEl) {
        const s = window.getComputedStyle(triggerEl);
        const rect = triggerEl.getBoundingClientRect();
        triggerInfo = {
          tag: triggerEl.tagName,
          text: triggerEl.innerText,
          className: triggerEl.className,
          rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
          position: s.position,
          backgroundColor: s.backgroundColor,
          color: s.color,
          fontSize: s.fontSize,
          borderRadius: s.borderRadius
        };
      }

      // Check projects section
      const sections = Array.from(document.querySelectorAll('section, main > div, article')).map(s => ({
        id: s.id,
        className: s.className,
        heading: s.querySelector('h1, h2, h3')?.innerText || '',
        textSnippet: s.innerText.slice(0, 100)
      }));

      return {
        body: { bg, color, fontFamily },
        headings,
        triggerInfo,
        sections
      };
    });

    analysisData.daffed = daffedData;
    console.log('Daffed initial data:', JSON.stringify(daffedData.triggerInfo));

    // Try to find the CV trigger by text content or clicking
    const cvTriggerFound = await page1.evaluate(() => {
      const els = Array.from(document.querySelectorAll('button, a, div, span'));
      for (const el of els) {
        if (el.innerText && /psst|cv|resume/i.test(el.innerText) && el.innerText.length < 30) {
          el.setAttribute('data-target-cv-trigger', 'true');
          return true;
        }
      }
      return false;
    });

    if (cvTriggerFound) {
      const triggerElement = await page1.$('[data-target-cv-trigger="true"]');
      if (triggerElement) {
        await triggerElement.screenshot({ path: path.join(outputDir, 'daffed-cv-trigger.png') });
        console.log('Saved daffed-cv-trigger.png');

        await triggerElement.click();
        await new Promise(r => setTimeout(r, 2000));
        await page1.screenshot({ path: path.join(outputDir, 'daffed-cv-panel-open.png') });
        console.log('Saved daffed-cv-panel-open.png');

        // Scroll inside panel or page
        await page1.mouse.wheel({ deltaY: 400 });
        await new Promise(r => setTimeout(r, 1000));
        await page1.screenshot({ path: path.join(outputDir, 'daffed-cv-panel-scrolled.png') });
        console.log('Saved daffed-cv-panel-scrolled.png');

        // Check if there is a close button
        await page1.keyboard.press('Escape');
        await new Promise(r => setTimeout(r, 1500));
      }
    }

    // Projects section screenshot
    const projectsElem = await page1.$('section, [id*="project"], [class*="project"], [class*="work"]');
    if (projectsElem) {
      await projectsElem.screenshot({ path: path.join(outputDir, 'daffed-projects.png') });
      console.log('Saved daffed-projects.png');
    }

    // Look for a project link to navigate to a case study
    const projectLink = await page1.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a[href]'));
      const found = links.find(a => a.href && (a.href.includes('/work/') || a.href.includes('/project/') || a.href.includes('/case-study/')));
      return found ? found.href : null;
    });

    if (projectLink) {
      console.log('Navigating to project case study:', projectLink);
      await page1.goto(projectLink, { waitUntil: 'networkidle2', timeout: 30000 });
      await new Promise(r => setTimeout(r, 2000));
      await page1.screenshot({ path: path.join(outputDir, 'daffed-case-study-full.png'), fullPage: true });
      await page1.screenshot({ path: path.join(outputDir, 'daffed-case-study-hero.png') });
      console.log('Saved case study screenshots');
      await page1.goBack({ waitUntil: 'networkidle2' });
    }

    // Mobile Viewport (375x812)
    console.log('Testing daffed mobile view...');
    await page1.setViewport({ width: 375, height: 812 });
    await new Promise(r => setTimeout(r, 1500));
    await page1.screenshot({ path: path.join(outputDir, 'daffed-mobile-home.png') });
    console.log('Saved daffed-mobile-home.png');

    await page1.close();

    // -------------------------------------------------------------
    // SITE 2: douglus.co
    // -------------------------------------------------------------
    console.log('\n--- Analyzing https://douglus.co/ ---');
    const page2 = await browser.newPage();
    await page2.setViewport({ width: 1440, height: 900 });

    // Try to capture preloader if visible right away
    page2.goto('https://douglus.co/').catch(() => {});
    await new Promise(r => setTimeout(r, 500));
    try {
      await page2.screenshot({ path: path.join(outputDir, 'douglus-preloader.png') });
      console.log('Saved douglus-preloader.png');
    } catch (e) {}

    // Wait for preloader to finish and network to settle
    await new Promise(r => setTimeout(r, 6000));

    await page2.screenshot({ path: path.join(outputDir, 'douglus-homepage-full.png'), fullPage: true });
    await page2.screenshot({ path: path.join(outputDir, 'douglus-hero.png') });
    console.log('Saved douglus-homepage-full.png and douglus-hero.png');

    // Extract douglus styles, fonts, layout toggle, menu
    const douglusData = await page2.evaluate(() => {
      const styles = window.getComputedStyle(document.body);
      const bg = styles.backgroundColor;
      const color = styles.color;
      const fontFamily = styles.fontFamily;

      // Find toggle element
      const allEls = Array.from(document.querySelectorAll('*'));
      const toggleEl = allEls.find(el => {
        const text = (el.innerText || '').toLowerCase();
        return text.includes('layout') || text.includes('fine') || text.includes('bold');
      });

      // Find menu button
      const menuBtn = allEls.find(el => {
        const text = (el.innerText || '').toLowerCase();
        return text.includes('menu') || el.getAttribute('aria-label')?.toLowerCase().includes('menu');
      });

      // Oversized hero elements
      const heroHeadings = Array.from(document.querySelectorAll('h1, h2, [class*="hero"], [class*="title"]')).map(el => {
        const s = window.getComputedStyle(el);
        return {
          tag: el.tagName,
          text: el.innerText.trim().slice(0, 100),
          fontSize: s.fontSize,
          lineHeight: s.lineHeight,
          letterSpacing: s.letterSpacing,
          fontFamily: s.fontFamily,
          textTransform: s.textTransform
        };
      });

      return {
        body: { bg, color, fontFamily },
        hasToggle: !!toggleEl,
        toggleText: toggleEl?.innerText || '',
        hasMenuBtn: !!menuBtn,
        menuText: menuBtn?.innerText || '',
        heroHeadings
      };
    });

    analysisData.douglus = douglusData;
    console.log('Douglus initial data:', JSON.stringify(douglusData));

    // Try finding and toggling Fine / Bold
    const toggleFound = await page2.evaluate(() => {
      const els = Array.from(document.querySelectorAll('button, a, div, span'));
      for (const el of els) {
        if (/fine|bold/i.test(el.innerText || '') && (el.innerText || '').length < 30) {
          el.setAttribute('data-target-toggle', 'true');
          return el.innerText;
        }
      }
      return null;
    });

    if (toggleFound) {
      console.log('Found toggle element with text:', toggleFound);
      await page2.screenshot({ path: path.join(outputDir, 'douglus-layout-fine.png') });
      const toggleEl = await page2.$('[data-target-toggle="true"]');
      if (toggleEl) {
        await toggleEl.click();
        await new Promise(r => setTimeout(r, 1500));
        await page2.screenshot({ path: path.join(outputDir, 'douglus-layout-bold.png') });
        console.log('Saved douglus-layout-fine.png and douglus-layout-bold.png');
      }
    }

    // Try opening the menu
    const menuFound = await page2.evaluate(() => {
      const els = Array.from(document.querySelectorAll('button, a, [role="button"]'));
      for (const el of els) {
        if (/menu/i.test(el.innerText || '') || /menu/i.test(el.getAttribute('aria-label') || '')) {
          el.setAttribute('data-target-menu', 'true');
          return el.innerText || 'menu-btn';
        }
      }
      return null;
    });

    if (menuFound) {
      console.log('Found menu button:', menuFound);
      const menuBtn = await page2.$('[data-target-menu="true"]');
      if (menuBtn) {
        await menuBtn.click();
        await new Promise(r => setTimeout(r, 2000));
        await page2.screenshot({ path: path.join(outputDir, 'douglus-menu-open.png') });
        console.log('Saved douglus-menu-open.png');
      }
    }

    // Mobile Viewport (375x812)
    console.log('Testing douglus mobile view...');
    await page2.setViewport({ width: 375, height: 812 });
    await new Promise(r => setTimeout(r, 1500));
    await page2.screenshot({ path: path.join(outputDir, 'douglus-mobile-home.png') });
    console.log('Saved douglus-mobile-home.png');

    await page2.close();

    // Save all data
    fs.writeFileSync(
      path.join(outputDir, 'extracted-data.json'),
      JSON.stringify(analysisData, null, 2),
      'utf8'
    );
    console.log('\nSUCCESS! Analysis data and screenshots saved.');

  } catch (err) {
    console.error('Error during analysis:', err);
  } finally {
    await browser.close();
  }
}

analyzeSites();

