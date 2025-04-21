// leadpages.spec.js
import { test, expect } from '@playwright/test';
import fs from 'fs';

let page;
let context;
let browser;

test.describe.serial('Leadpages Flow', () => {
  test.beforeAll(async ({ browser: testBrowser }) => {
    browser = testBrowser;
    context = await browser.newContext();
    page = await context.newPage();
    test.setTimeout(10000000);
  });

  test.afterAll(async () => {
    await context.close();
  });

  test('Step 1: Login Process', async () => {
    await page.goto('https://my.leadpagestest.com/');
    await page.getByRole('textbox', { name: 'Email Address' }).type('uforia.logic@leadpages.com', { delay: 200 });
    await page.getByRole('textbox', { name: 'Password' }).fill('Leadpages123!', { delay: 200 });
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForSelector('text=Landing Pages');
  });

  test('Step 2: Navigate to Landing Pages and Create New Page', async () => {
    await page.getByRole('link', { name: 'Landing Pages' }).click();
    await page.waitForSelector('text=Create New Landing Page');
    await page.getByRole('link', { name: 'Create New Landing Page' }).click();
    await page.waitForTimeout(2000);
  });

  test('Step 3–6: Template Selection', async () => {
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
    await startBuildingButton.click();
  });

  test('Step 7–9: Name the Page & Continue', async () => {
    await page.getByRole('heading', { name: 'Hang on a moment while we load your experience…'}).waitFor({ state: 'hidden', timeout: 1000000 });
    await page.getByText('Give your page a name').waitFor({ state: 'visible', timeout: 90000 });

    const uniqueId = Date.now();
    await page.getByRole('textbox', { name: 'Page Name' }).type(`leadpages-${uniqueId}`, { delay: 200 });
    const continueButton = page.getByRole('button', { name: 'Continue' });
    await expect(continueButton).toBeVisible();
    await expect(continueButton).toBeEnabled();
    await continueButton.click();
  });

  test('Step 10–11: Open and Click Edit Pop-Up', async () => {
    const guideButton = page.getByText('Send Me the Guide!');
    await guideButton.waitFor({ state: 'visible', timeout: 90000 });
    await guideButton.hover();

    const editPopup = page.getByText('Edit Pop-Up');
    await editPopup.waitFor({ state: 'visible', timeout: 30000 });
    await editPopup.hover();
    await editPopup.click();
  });

  test('Step 12–13: Edit Text and Apply Bold', async () => {
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

    await page.locator('button[aria-label="Bold"]').click();
    await page.waitForTimeout(1000);
  });

  test('Step 14–15: Close View Title & Preview Click', async () => {
    await page.waitForSelector('[data-qa-selector="view-title-close-button"]', { visible: true });
    await page.evaluate(() => {
      document.querySelector('[data-qa-selector="view-title-close-button"]').click();
    });

    await page.getByRole('button', { name: 'Preview check error' }).click();
    await page.locator('iframe[title="Preview"]').contentFrame().getByRole('link', { name: 'Send Me the Guide!' }).click();
  });
});
