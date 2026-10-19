const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  const rects = await page.evaluate(() => {
    const visual = document.querySelector('.product-flow-visual--collection');
    const copyTop = document.querySelector('.feature-01-copy-top');
    const desc = document.querySelector('.feature-01-description');
    
    if (!visual || !copyTop || !desc) return { error: 'Elements not found' };

    const vRect = visual.getBoundingClientRect();
    const tRect = copyTop.getBoundingClientRect();
    const dRect = desc.getBoundingClientRect();
    
    const copy = document.querySelector('.feature-01-copy');
    const copyRect = copy.getBoundingClientRect();
    
    const row = document.querySelector('.feature-01-layout');
    const rowRect = row.getBoundingClientRect();

    const rowStyles = window.getComputedStyle(row);
    const copyStyles = window.getComputedStyle(copy);

    return {
      visual: { top: vRect.top, bottom: vRect.bottom, height: vRect.height },
      copyTop: { top: tRect.top, bottom: tRect.bottom },
      desc: { top: dRect.top, bottom: dRect.bottom },
      copy: { top: copyRect.top, bottom: copyRect.bottom, height: copyRect.height },
      row: { top: rowRect.top, bottom: rowRect.bottom, height: rowRect.height },
      rowAlign: rowStyles.alignItems,
      copyAlign: copyStyles.alignSelf,
      copyDisplay: copyStyles.display,
      copyFlexDirection: copyStyles.flexDirection
    };
  });

  console.log(JSON.stringify(rects, null, 2));
  await browser.close();
})();
