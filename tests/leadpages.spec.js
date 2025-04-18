import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

    test.setTimeout(10000000); 
    await page.goto('https://my.leadpagestest.com/');
    await page.getByRole('textbox', { name: 'Email Address' }).type('uforia.logic@leadpages.com', { delay: 200 });
    await page.getByRole('textbox', { name: 'Password' }).fill('Leadpages123!', { delay: 200 });
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForSelector('text=Landing Pages');

    await page.getByRole('link', { name: 'Landing Pages' }).click();
    await page.waitForSelector('text=Create New Landing Page');
    await page.getByRole('link', { name: 'Create New Landing Page' }).click();
    await page.waitForTimeout(2000);

    // Step 1: Click the scrollable area first
    await page.locator('#templates-scrolling-element').click();

    // Step 2: Define the target container and button inside it
    const targetContainer = page.locator('div').filter({
        hasText: /^Start BuildingPreviewBuster Business$/
    });
    const startBuildingButton = targetContainer.getByRole('button').first();

    // Step 3: Scroll until the container is visible
    for (let i = 0; i < 300; i++) {
        if (await targetContainer.isVisible().catch(() => false)) break;
        await page.keyboard.press('ArrowDown');
        await page.waitForTimeout(10); // Small delay for scroll to apply
    }

    // Step 4: Hover & Click
    await targetContainer.scrollIntoViewIfNeeded();
    await targetContainer.hover();

    await startBuildingButton.waitFor({ state: 'visible', timeout: 10000 });
    //   await startBuildingButton.click();

    
    await page.locator('div').filter({ hasText: /^Start BuildingPreviewBuster Business$/ }).getByRole('button').first().click();

    

    await page.getByRole('heading', { name: 'Hang on a moment while we load your experience…'}).waitFor({ state: 'hidden', timeout: 1000000 });
    await page.getByText('Give your page a name').waitFor({ state: 'visible', timeout: 90000 });

    //Each time different page name 
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


    // Now wait for "Send Me the Guide!" to appear
    const guideButton = page.getByText('Send Me the Guide!');

    // Wait indefinitely or set a long timeout to give "Continue" time to process
    await guideButton.waitFor({ state: 'visible', timeout: 90000 }); 
    console.log('"Send Me the Guide!" button is now visible.');

    // Hover over the button
    await guideButton.hover();
    console.log('Hovered over the "Send Me the Guide!" button.');

    // After hovering "Send Me the Guide!" button...
    const editPopup = page.getByText('Edit Pop-Up');

    // Wait for the "Edit Pop-Up" option to appear
    await editPopup.waitFor({ state: 'visible', timeout: 30000 });
    console.log('"Edit Pop-Up" is now visible.');

    // Hover over it (if needed)
    await editPopup.hover();
    console.log('Hovered over "Edit Pop-Up".');

    // Click it
    await editPopup.click();
    console.log('"Edit Pop-Up" clicked.');

    // 1. Wait for the headline with the specific text
    const headlineText = page.getByText('Enter Your Email to Get Your Free Business Guide', { exact: true });
    await headlineText.waitFor({ state: 'visible', timeout: 30000 });
    console.log('Headline is visible.');

    // 2. Click into the text (to enable editing)
    await page.waitForTimeout(1000); 
    await headlineText.hover();
    await headlineText.click();
    console.log('Clicked into headline.');

    // 3. Replace "Business" without clearing all text
    await page.evaluate(() => {
    const el = document.activeElement;
    if (el && el.innerText) {
      el.innerText = el.innerText.replace('Business', '').trim();
    }
    });

    console.log('Removed "Business" from headline.');



    await page.locator('#hero i').first().click();
    await page.getByRole('button', { name: 'Bold' }).click();
    
});



