const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1080 });

  const filePath = 'file:///' + path.resolve('logo-export.html').replace(/\\/g, '/');
  await page.goto(filePath, { waitUntil: 'networkidle0' });

  // Hide the save button before screenshot
  await page.evaluate(() => {
    const btn = document.querySelector('.save-btn');
    if (btn) btn.remove();
  });

  await page.screenshot({
    path: 'site/images/logo-instagram.png',
    clip: { x: 0, y: 0, width: 1080, height: 1080 },
    omitBackground: true
  });

  await browser.close();
  console.log('Done! Saved to site/images/logo-instagram.png');
})();
