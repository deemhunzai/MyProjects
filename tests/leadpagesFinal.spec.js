import { test, expect } from '@playwright/test';
import fs from 'fs';

test.describe('Leadpages Flow - Broken into Steps', () => {

  test('Login to Leadpages', async ({ page }) => {
    test.setTimeout(10000000);
    await page.goto('https://my.leadpagestest.com/');
    await page.getByRole('textbox', { name: 'Email Address' }).type('uforia.logic@leadpages.com', { delay: 200 });
    await page.getByRole('textbox', { name: 'Password' }).fill('Leadpages123!', { delay: 200 });
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForSelector('text=Landing Pages');
  });

  test('Navigate to Landing Pages Section', async ({ page }) => {
    test.setTimeout(10000000);
    await page.goto('https://my.leadpagestest.com/');
    // Login
    await page.getByRole('textbox', { name: 'Email Address' }).type('uforia.logic@leadpages.com', { delay: 200 });
    await page.getByRole('textbox', { name: 'Password' }).fill('Leadpages123!', { delay: 200 });
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForSelector('text=Landing Pages');

    await page.getByRole('link', { name: 'Landing Pages' }).click();
    await page.waitForSelector('text=Create New Landing Page');
  });

  test('Create New Landing Page', async ({ page }) => {
    test.setTimeout(10000000);
    await page.goto('https://my.leadpagestest.com/');
    // Login + Navigate
    await page.getByRole('textbox', { name: 'Email Address' }).type('uforia.logic@leadpages.com', { delay: 200 });
    await page.getByRole('textbox', { name: 'Password' }).fill('Leadpages123!', { delay: 200 });
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForSelector('text=Landing Pages');
    await page.getByRole('link', { name: 'Landing Pages' }).click();
    await page.waitForSelector('text=Create New Landing Page');

    await page.getByRole('link', { name: 'Create New Landing Page' }).click();
    await page.waitForTimeout(2000);
  });

  test('Scroll and Select Buster Business Template', async ({ page }) => {
    test.setTimeout(10000000);
    await page.goto('https://my.leadpagestest.com/');
    // Login + Navigate + Create New Page
    await page.getByRole('textbox', { name: 'Email Address' }).type('uforia.logic@leadpages.com', { delay: 200 });
    await page.getByRole('textbox', { name: 'Password' }).fill('Leadpages123!', { delay: 200 });
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForSelector('text=Landing Pages');
    await page.getByRole('link', { name: 'Landing Pages' }).click();
    await page.waitForSelector('text=Create New Landing Page');
    await page.getByRole('link', { name: 'Create New Landing Page' }).click();
    await page.waitForTimeout(2000);

    // Select Template
    await page.locator('#templates-scrolling-element').click();
    const targetContainer = page.locator('div').filter({ hasText: /^Start BuildingPreviewBuster Business$/ });
    const startBuildingButton = targetContainer.getByRole('button').first();

    for (let i = 0; i < 300; i++) {
      if (await targetContainer.isVisible().catch(() => false)) break;
      await page.keyboard.press('ArrowDown');
      await page.waitForTimeout(10);
    }

    await targetContainer.scrollIntoViewIfNeeded();
    await targetContainer.hover();

    await startBuildingButton.waitFor({ state: 'visible', timeout: 10000 });
    await startBuildingButton.click();
  });

  test('Wait for Builder to Load and Enter Page Name', async ({ page }) => {
    test.setTimeout(10000000);
    await page.goto('https://my.leadpagestest.com/');
    // Login + Navigate + Create New Page + Select Template
    await page.getByRole('textbox', { name: 'Email Address' }).type('uforia.logic@leadpages.com', { delay: 200 });
    await page.getByRole('textbox', { name: 'Password' }).fill('Leadpages123!', { delay: 200 });
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForSelector('text=Landing Pages');
    await page.getByRole('link', { name: 'Landing Pages' }).click();
    await page.waitForSelector('text=Create New Landing Page');
    await page.getByRole('link', { name: 'Create New Landing Page' }).click();
    await page.waitForTimeout(2000);
    await page.locator('#templates-scrolling-element').click();
    const targetContainer = page.locator('div').filter({ hasText: /^Start BuildingPreviewBuster Business$/ });
    for (let i = 0; i < 300; i++) {
      if (await targetContainer.isVisible().catch(() => false)) break;
      await page.keyboard.press('ArrowDown');
      await page.waitForTimeout(10);
    }
    await page.locator('div').filter({ hasText: /^Start BuildingPreviewBuster Business$/ }).getByRole('button').first().click();

    await page.getByRole('heading', { name: 'Hang on a moment while we load your experience…' }).waitFor({ state: 'hidden', timeout: 1000000 });
    await page.getByText('Give your page a name').waitFor({ state: 'visible', timeout: 90000 });

    let counter = fs.existsSync('counter.txt') ? parseInt(fs.readFileSync('counter.txt', 'utf8')) : 1;
    await page.getByRole('textbox', { name: 'Page Name' }).fill('');
    await page.getByRole('textbox', { name: 'Page Name' }).type(`leadpages-${counter}`, { delay: 200 });
    fs.writeFileSync('counter.txt', (counter + 1).toString());
  });

  test('Click Continue and Wait for Send Me the Guide Button', async ({ page }) => {
    test.setTimeout(10000000);
    await page.goto('https://my.leadpagestest.com/');
    // Login + Navigate + Create Page + Select Template + Name Page
    await page.getByRole('textbox', { name: 'Email Address' }).type('uforia.logic@leadpages.com', { delay: 200 });
    await page.getByRole('textbox', { name: 'Password' }).fill('Leadpages123!', { delay: 200 });
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForSelector('text=Landing Pages');
    await page.getByRole('link', { name: 'Landing Pages' }).click();
    await page.waitForSelector('text=Create New Landing Page');
    await page.getByRole('link', { name: 'Create New Landing Page' }).click();
    await page.waitForTimeout(2000);
    await page.locator('#templates-scrolling-element').click();
    const targetContainer = page.locator('div').filter({ hasText: /^Start BuildingPreviewBuster Business$/ });
    for (let i = 0; i < 300; i++) {
      if (await targetContainer.isVisible().catch(() => false)) break;
      await page.keyboard.press('ArrowDown');
      await page.waitForTimeout(10);
    }
    await page.locator('div').filter({ hasText: /^Start BuildingPreviewBuster Business$/ }).getByRole('button').first().click();

    await page.getByRole('heading', { name: 'Hang on a moment while we load your experience…' }).waitFor({ state: 'hidden', timeout: 1000000 });
    await page.getByText('Give your page a name').waitFor({ state: 'visible', timeout: 90000 });

    let counter = fs.existsSync('counter.txt') ? parseInt(fs.readFileSync('counter.txt', 'utf8')) : 1;
    await page.getByRole('textbox', { name: 'Page Name' }).fill('');
    await page.getByRole('textbox', { name: 'Page Name' }).type(`leadpages-${counter}`, { delay: 200 });
    fs.writeFileSync('counter.txt', (counter + 1).toString());

    const continueButton = page.getByRole('button', { name: 'Continue' });
    await expect(continueButton).toBeVisible();
    await expect(continueButton).toBeEnabled();
    await continueButton.click();

    const guideButton = page.getByText('Send Me the Guide!');
    await guideButton.waitFor({ state: 'visible', timeout: 90000 });
    await guideButton.hover();
  });

  test('Edit the Pop-Up and Modify Text', async ({ page }) => {
    test.setTimeout(10000000);
    await page.goto('https://my.leadpagestest.com/');
    // Complete all steps before
    await page.getByRole('textbox', { name: 'Email Address' }).type('uforia.logic@leadpages.com', { delay: 200 });
    await page.getByRole('textbox', { name: 'Password' }).fill('Leadpages123!', { delay: 200 });
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForSelector('text=Landing Pages');
    await page.getByRole('link', { name: 'Landing Pages' }).click();
    await page.waitForSelector('text=Create New Landing Page');
    await page.getByRole('link', { name: 'Create New Landing Page' }).click();
    await page.waitForTimeout(2000);
    await page.locator('#templates-scrolling-element').click();
    const targetContainer = page.locator('div').filter({ hasText: /^Start BuildingPreviewBuster Business$/ });
    for (let i = 0; i < 300; i++) {
      if (await targetContainer.isVisible().catch(() => false)) break;
      await page.keyboard.press('ArrowDown');
      await page.waitForTimeout(10);
    }
    await page.locator('div').filter({ hasText: /^Start BuildingPreviewBuster Business$/ }).getByRole('button').first().click();

    await page.getByRole('heading', { name: 'Hang on a moment while we load your experience…' }).waitFor({ state: 'hidden', timeout: 1000000 });
    await page.getByText('Give your page a name').waitFor({ state: 'visible', timeout: 90000 });

    let counter = fs.existsSync('counter.txt') ? parseInt(fs.readFileSync('counter.txt', 'utf8')) : 1;
    await page.getByRole('textbox', { name: 'Page Name' }).fill('');
    await page.getByRole('textbox', { name: 'Page Name' }).type(`leadpages-${counter}`, { delay: 200 });
    fs.writeFileSync('counter.txt', (counter + 1).toString());

    const continueButton = page.getByRole('button', { name: 'Continue' });
    await expect(continueButton).toBeVisible();
    await expect(continueButton).toBeEnabled();
    await continueButton.click();

    const guideButton = page.getByText('Send Me the Guide!');
    await guideButton.waitFor({ state: 'visible', timeout: 90000 });
    await guideButton.hover();

    const editPopup = page.getByText('Edit Pop-Up');
    await editPopup.waitFor({ state: 'visible', timeout: 30000 });
    await editPopup.hover();
    await editPopup.click();

    const headlineText = page.getByText('Enter Your Email to Get Your Free Business Guide', { exact: true });
    await headlineText.waitFor({ state: 'visible', timeout: 30000 });
    await page.waitForTimeout(1000);
    await headlineText.hover();
    await headlineText.click();

    await page.evaluate(() => {
      const el = document.activeElement;
      if (el && el.innerText) {
        el.innerText = el.innerText.replace('Business', '').trim();
      }
    });

    await page.locator('#hero i').first().click();
    await page.getByRole('button', { name: 'Bold' }).click();
  });

});
