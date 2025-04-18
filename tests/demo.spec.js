const { test, expect } = require('@playwright/test');

// This runs before each test
test.beforeEach(async ({ page }) => {
  await page.goto("https://my.leadpagestest.com/login/?nextUri=https%3A%2F%2Fmy.leadpagestest.com%2F&logout=true");
});



test('Check page title contains Leadpages', async ({ page }) => {
  await expect(page).toHaveTitle(/Leadpages/);
});


test('Verify if the user is navigated to the login page', async ({ page }) => {
    await expect(page.url()).toContain('https://my.leadpagestest.com/login/');
    await page.waitForTimeout(3000)
  });


test('Enter User name and Password in the login form', async({page}) => {
    await page.getByRole('textbox', { name: 'Email Address' }).type('uforia.logic@leadpages.com', {delay:200});
    await page.getByRole('textbox', { name: 'Password' }).type('Leadpages123!', {delay: 100});
    await page.getByRole('button', { name: 'Log in' }).click();   
});


test('test', async ({ page }) => {
    await page.getByRole('link', { name: 'Landing Pages' }).click();
    await page.waitForTimeout(3000)
    await page.getByRole('link', { name: 'Create New Landing Page' }).click();
    
    
    const startButtonSelector = 'div.MuiGrid-root >> text=Start Building';
    await page.waitForSelector(startButtonSelector);
    const element = await page.locator(startButtonSelector).first();
    await element.scrollIntoViewIfNeeded();
  });





 