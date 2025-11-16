import puppeteer from 'puppeteer-core';
import chrome from 'chrome-aws-lambda';
(async () => {
  const browser = await puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: true
  });
  console.log('¡Chrome lanzado en local! Leads incoming...');
  await browser.close();
})();
