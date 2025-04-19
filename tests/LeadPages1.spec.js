import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

    // Set a very high timeout for the entire test
    test.setTimeout(10000000); 

    // ================================================
    // Step 1: Login Process
    // ================================================
    await page.goto('https://my.leadpagestest.com/');
    await page.getByRole('textbox', { name: 'Email Address' }).type('uforia.logic@leadpages.com', { delay: 200 });
    await page.getByRole('textbox', { name: 'Password' }).fill('Leadpages123!', { delay: 200 });
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForSelector('text=Landing Pages');

    // ================================================
    // Step 2: Navigate to Landing Pages and Create a New Landing Page
    // ================================================
    await page.getByRole('link', { name: 'Landing Pages' }).click();
    await page.waitForSelector('text=Create New Landing Page');
    await page.getByRole('link', { name: 'Create New Landing Page' }).click();
    await page.waitForTimeout(2000); // Wait for page to load

    // ================================================
    // Step 3: Click the Scrollable Area
    // ================================================
    await page.locator('#templates-scrolling-element').click();

    // ================================================
    // Step 4: Locate and Interact with the Template Selection Button
    // ================================================
    const targetContainer = page.locator('div').filter({
        hasText: /^Start BuildingPreviewBuster Business$/
    });
    const startBuildingButton = targetContainer.getByRole('button').first();

    // Step 5: Scroll Until the Container is Visible
    for (let i = 0; i < 300; i++) {
        if (await targetContainer.isVisible().catch(() => false)) break;
        await page.keyboard.press('ArrowDown');
        await page.waitForTimeout(10); // Small delay for scrolling
    }

    // Step 6: Hover & Click the "Start Building" Button
    await targetContainer.scrollIntoViewIfNeeded();
    await targetContainer.hover();
    await startBuildingButton.waitFor({ state: 'visible', timeout: 10000 });
    await startBuildingButton.click();

    // ================================================
    // Step 7: Wait for Page to Load (Give Your Page a Name)
    // ================================================
    await page.getByRole('heading', { name: 'Hang on a moment while we load your experience…'}).waitFor({ state: 'hidden', timeout: 1000000 });
    await page.getByText('Give your page a name').waitFor({ state: 'visible', timeout: 90000 });

    // ================================================
    // Step 8: Generate a Unique Page Name
    // ================================================
    const fs = require('fs');
    let counter = fs.existsSync('counter.txt') ? parseInt(fs.readFileSync('counter.txt', 'utf8')) : 1;

    await page.getByRole('textbox', { name: 'Page Name' }).fill('');
    await page.getByRole('textbox', { name: 'Page Name' }).type(`leadpages-${counter}`, { delay: 200 });

    fs.writeFileSync('counter.txt', (counter + 1).toString()); // Increment page name counter

    // ================================================
    // Step 9: Click the Continue Button
    // ================================================
    const continueButton = page.getByRole('button', { name: 'Continue' });

    console.log('Trying to find the Continue button...');
    await expect(continueButton).toBeVisible();
    console.log('Button is visible');
    await expect(continueButton).toBeEnabled();
    console.log('Button is enabled, clicking...');
    await continueButton.click();
    console.log('Button clicked');

    // ================================================
    // Step 10: Wait for "Send Me the Guide!" Button to Appear
    // ================================================
    const guideButton = page.getByText('Send Me the Guide!');
    await guideButton.waitFor({ state: 'visible', timeout: 90000 });
    console.log('"Send Me the Guide!" button is now visible.');

    // Hover over the button to show any hover states
    await guideButton.hover();
    console.log('Hovered over the "Send Me the Guide!" button.');

    // ================================================
    // Step 11: Edit the Pop-Up (Click "Edit Pop-Up")
    // ================================================
    const editPopup = page.getByText('Edit Pop-Up');
    await editPopup.waitFor({ state: 'visible', timeout: 30000 });
    console.log('"Edit Pop-Up" is now visible.');

    // Hover over the "Edit Pop-Up" button and click it
    await editPopup.hover();
    console.log('Hovered over "Edit Pop-Up".');
    await editPopup.click();
    console.log('"Edit Pop-Up" clicked.');

    // ================================================
    // Step 12: Edit the Headline Text (Modify the "Business" text)
    // ================================================
    const headlineText = page.getByText('Enter Your Email to Get Your Free Business Guide', { exact: true });
    await headlineText.waitFor({ state: 'visible', timeout: 30000 });
    console.log('Headline is visible.');

    await page.waitForTimeout(1000); 
    await headlineText.hover();
    await headlineText.click();
    console.log('Clicked into headline.');

    // Replace "Business" in the text with an empty string
    await page.evaluate(() => {
        const el = document.activeElement;
        if (el && el.innerText) {
            el.innerText = el.innerText.replace('Business', '').trim();
        }
    });

    // ================================================
    // Step 13: Click the Bold Button
    // ================================================
    await page.locator('button[aria-label="Bold"]').click();
    await page.waitForTimeout(1000); // Wait a bit before continuing
    console.log("Bold button clicked");

    // ================================================
    // Step 14: Close the View Title
    // ================================================
    await page.waitForSelector('[data-qa-selector="view-title-close-button"]', { visible: true });
    await page.evaluate(() => {
        document.querySelector('[data-qa-selector="view-title-close-button"]').click();
    });

    // ================================================
    // Step 15: Preview Check & Handle Error
    // ================================================
    await page.getByRole('button', { name: 'Preview check error' }).click();
    await page.locator('iframe[title="Preview"]').contentFrame().getByRole('link', { name: 'Send Me the Guide!' }).click();

    // Sleep to give time for the actions to take place
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

});
