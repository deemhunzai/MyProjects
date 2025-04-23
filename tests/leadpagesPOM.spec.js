import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { LandingPage } from '../pages/LandingPages';
import { TemplatePage } from '../pages/TemplatePage';
import { NamePage } from '../pages/NamePage';
import { EditorPage } from '../pages/EditorPage';
import { PreviewPage } from '../pages/PreviewPage';

let page, context, browser;

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

  test('Complete Leadpages Flow', async () => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('uforia.logic@leadpages.com', 'Leadpages123!');

    const landing = new LandingPage(page);
    await landing.goToLandingPages();
    await landing.createNewPage();

    const template = new TemplatePage(page);
    await template.selectTemplate();

    const namePage = new NamePage(page);
    await namePage.namePage();

    const editor = new EditorPage(page);
    await editor.editTextAndBold();

    const preview = new PreviewPage(page);
    await preview.previewAndClickCTA();
  });
});
