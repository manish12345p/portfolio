import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

async function waitForPort(port, retries = 20) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (res.ok) return await res.json();
    } catch (e) {
      await new Promise(r => setTimeout(r, 500));
    }
  }
  throw new Error(`Port ${port} not reachable`);
}

async function main() {
  const artifactDir = 'C:\\Users\\manis\\.gemini\\antigravity\\brain\\bda12aac-571b-42a0-9f2a-a89c5b8c8bd1';
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const userDataDir = path.join(process.env.TEMP, 'chrome-verify-profile-' + Date.now());

  console.log('Spawning Chrome...');
  const chromeProc = spawn(chromePath, [
    '--remote-debugging-port=9223',
    `--user-data-dir=${userDataDir}`,
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    'http://localhost:3000'
  ], { stdio: 'ignore' });

  try {
    const version = await waitForPort(9223);
    console.log('Chrome ready:', version.Browser);

    const res = await fetch('http://127.0.0.1:9223/json/list');
    const targets = await res.json();
    const pageTarget = targets.find(t => t.type === 'page');

    if (!pageTarget) throw new Error('No page target found');

    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

    let id = 1;
    const pending = new Map();

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.id && pending.has(data.id)) {
        const { resolve, reject } = pending.get(data.id);
        pending.delete(data.id);
        if (data.error) reject(data.error);
        else resolve(data.result);
      }
    };

    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const msgId = id++;
        pending.set(msgId, { resolve, reject });
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    await send('Page.enable');
    await send('Runtime.enable');
    await send('Page.navigate', { url: 'http://localhost:3000' });
    await new Promise(r => setTimeout(r, 2500));

    // Check horizontal scroll
    const evalScroll = await send('Runtime.evaluate', {
      expression: `({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
      })`,
      returnByValue: true
    });
    console.log('Overflow check:', evalScroll.result.value);

    // --- 1440px Desktop Screenshot ---
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });
    await new Promise(r => setTimeout(r, 1200));

    const desktopShot = await send('Page.captureScreenshot', { format: 'png' });
    const desktopBuf = Buffer.from(desktopShot.data, 'base64');
    fs.writeFileSync(path.join(artifactDir, 'desktop-1440.png'), desktopBuf);
    fs.writeFileSync(path.join(process.cwd(), 'desktop-1440.png'), desktopBuf);
    console.log('Saved desktop screenshot, size:', desktopBuf.length);

    // --- Click Resume Printer Tab and capture Drawer ---
    console.log('Clicking resume printer tab...');
    await send('Runtime.evaluate', {
      expression: `document.getElementById('cvTab').click()`
    });
    // Wait for drawer slide-in and paper ejection
    await new Promise(r => setTimeout(r, 1500));

    const printerShot = await send('Page.captureScreenshot', { format: 'png' });
    const printerBuf = Buffer.from(printerShot.data, 'base64');
    fs.writeFileSync(path.join(artifactDir, 'printer-open.png'), printerBuf);
    fs.writeFileSync(path.join(process.cwd(), 'printer-open.png'), printerBuf);
    console.log('Saved printer open screenshot, size:', printerBuf.length);

    // Close dialog
    await send('Runtime.evaluate', {
      expression: `document.getElementById('cvClose').click()`
    });
    await new Promise(r => setTimeout(r, 800));

    // --- 390px Mobile Screenshot ---
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 1,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 1200));

    const mobileShot = await send('Page.captureScreenshot', { format: 'png' });
    const mobileBuf = Buffer.from(mobileShot.data, 'base64');
    fs.writeFileSync(path.join(artifactDir, 'mobile-390.png'), mobileBuf);
    fs.writeFileSync(path.join(process.cwd(), 'mobile-390.png'), mobileBuf);
    console.log('Saved mobile screenshot, size:', mobileBuf.length);

    ws.close();
  } finally {
    chromeProc.kill('SIGKILL');
  }
}

main().catch(err => {
  console.error('Error in verify-full-ui:', err);
  process.exit(1);
});
