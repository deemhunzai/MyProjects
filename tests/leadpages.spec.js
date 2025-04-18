import { test, expect } from '@playwright/test';


test('test', async ({ page, browser }) => {

    test.setTimeout(10000000); // Setting the timeout for the test.

    // Navigate to the page and perform the login actions
    await page.goto('https://my.leadpagestest.com/');
    await page.getByRole('textbox', { name: 'Email Address' }).type('uforia.logic@leadpages.com', { delay: 200 });
    await page.getByRole('textbox', { name: 'Password' }).fill('Leadpages123!', { delay: 200 });
    await page.getByRole('button', { name: 'Log in' }).click();

    // Wait for the 'Landing Pages' selector to appear as a confirmation of successful login
    await page.waitForSelector('text=Landing Pages');

    await page.getByRole('link', { name: 'Landing Pages' }).click();
    await page.waitForSelector('text=Create New Landing Page');
    await page.getByRole('link', { name: 'Create New Landing Page' }).click();
    await page.waitForTimeout(2000);

    await page.locator('#templates-scrolling-element').click();

    const targetContainer = page.locator('div').filter({
        hasText: /^Start BuildingPreviewBuster Business$/
    });
    const startBuildingButton = targetContainer.getByRole('button').first();

    for (let i = 0; i < 300; i++) {
        if (await targetContainer.isVisible().catch(() => false)) break;
        await page.keyboard.press('ArrowDown');
        await page.waitForTimeout(10);
    }

    await targetContainer.scrollIntoViewIfNeeded();
    await targetContainer.hover();

    await startBuildingButton.waitFor({ state: 'visible', timeout: 10000 });
    await page.locator('div').filter({ hasText: /^Start BuildingPreviewBuster Business$/ }).getByRole('button').first().click();

    await page.getByRole('heading', { name: 'Hang on a moment while we load your experience…'}).waitFor({ state: 'hidden', timeout: 1000000 });
    await page.getByText('Give your page a name').waitFor({ state: 'visible', timeout: 90000 });

    const fs = require('fs');
    let counter = fs.existsSync('counter.txt') ? parseInt(fs.readFileSync('counter.txt', 'utf8')) : 1;

    await page.getByRole('textbox', { name: 'Page Name' }).fill('');
    await page.getByRole('textbox', { name: 'Page Name' }).type(`leadpages-${counter}`, { delay: 200 });

    fs.writeFileSync('counter.txt', (counter + 1).toString());

    const continueButton = page.getByRole('button', { name: 'Continue' });

    console.log('Trying to find the Continue button...');
    await expect(continueButton).toBeVisible();
    console.log('Button is visible');
    await expect(continueButton).toBeEnabled();
    console.log('Button is enabled, clicking...');
    await continueButton.click();
    console.log('Button clicked');

    const guideButton = page.getByText('Send Me the Guide!');
    await guideButton.waitFor({ state: 'visible', timeout: 90000 }); 
    console.log('"Send Me the Guide!" button is now visible.');
    await guideButton.hover();
    console.log('Hovered over the "Send Me the Guide!" button.');

    const editPopup = page.getByText('Edit Pop-Up');
    await editPopup.waitFor({ state: 'visible', timeout: 30000 });
    console.log('"Edit Pop-Up" is now visible.');
    await editPopup.hover();
    console.log('Hovered over "Edit Pop-Up".');
    await editPopup.click();
    console.log('"Edit Pop-Up" clicked.');

    const headlineText = page.getByText('Enter Your Email to Get Your Free Business Guide', { exact: true });
    await headlineText.waitFor({ state: 'visible', timeout: 30000 });
    console.log('Headline is visible.');
    await page.waitForTimeout(1000); 
    await headlineText.hover();
    await headlineText.click();
    console.log('Clicked into headline.');

    await page.evaluate(() => {
        const el = document.activeElement;
        if (el && el.innerText) {
          el.innerText = el.innerText.replace('Business', '').trim();

          const range = document.createRange();
          range.selectNodeContents(el);
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        }
    });
    console.log('Removed "Business" from headline.');

    await page.waitForSelector('[data-qa-selector="view-title-close-button"]');
    await page.click('[data-qa-selector="view-title-close-button"]');

    await page.getByRole('button', { name: 'Preview check error' }).click();
    await page.locator('iframe[title="Preview"]').contentFrame().getByRole('link', { name: 'Send Me the Guide!' }).click();
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
});


    




  


    





    

    


    

    

   

