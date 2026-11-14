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
  const userDataDir = path.join(process.env.TEMP, 'chrome-scr-profile-' + Date.now());

  console.log('Spawning Chrome...');
  const chromeProc = spawn(chromePath, [
    '--remote-debugging-port=9222',
    `--user-data-dir=${userDataDir}`,
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    'http://localhost:3000'
  ], { stdio: 'ignore' });

  try {
    const version = await waitForPort(9222);
    console.log('Chrome ready:', version.Browser);

    const res = await fetch('http://127.0.0.1:9222/json/list');
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
    await send('Page.navigate', { url: 'http://localhost:3000' });
    await new Promise(r => setTimeout(r, 2500));

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

    const desktopPathArtifact = path.join(artifactDir, 'desktop-1440.png');
    const desktopPathLocal = path.join(process.cwd(), 'desktop-1440.png');
    fs.writeFileSync(desktopPathArtifact, desktopBuf);
    fs.writeFileSync(desktopPathLocal, desktopBuf);
    console.log('Saved desktop screenshot:', desktopPathLocal, desktopBuf.length, 'bytes');

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

    const mobilePathArtifact = path.join(artifactDir, 'mobile-390.png');
    const mobilePathLocal = path.join(process.cwd(), 'mobile-390.png');
    fs.writeFileSync(mobilePathArtifact, mobileBuf);
    fs.writeFileSync(mobilePathLocal, mobileBuf);
    console.log('Saved mobile screenshot:', mobilePathLocal, mobileBuf.length, 'bytes');

    ws.close();
  } finally {
    chromeProc.kill('SIGKILL');
  }
}

main().catch(err => {
  console.error('Error in capture-screenshots:', err);
  process.exit(1);
});
