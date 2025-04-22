// automationexercise.spec.js
import { test, expect } from '@playwright/test';

let page;
let context;
let browser;

test.describe.serial('Automation Exercise Flow', () => {
  test.beforeAll(async ({ browser: testBrowser }) => {
    browser = testBrowser;
    context = await browser.newContext();
    page = await context.newPage();

     // Set default timeout for all actions (like click, fill, etc.)
    page.setDefaultTimeout(100000); // 10 seconds

  // Set default timeout for navigation (like page.goto)
    page.setDefaultNavigationTimeout(100000);
  });

  test.afterAll(async () => {
    await context.close();
  });

  test('Step 1: Login Process', async () => {
    await page.goto('https://automationexercise.com/');
    await page.getByRole('link', { name: ' Signup / Login' }).click();
  });


test('Navigate and fill the signup form and click SingUp', async ()  => {
  
  await page.getByRole('textbox', { name: 'Name' }).type('nadeem', {delay:200});
  
  const timestamp = Date.now();
  const email = `nahmed+${timestamp}@techrivers.com`;  // Use backticks here

  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').type(email, { delay: 200 });

  await page.getByRole('button', { name: 'Signup' }).click();
});

test('Fill the detailed sign up form', async () =>{
  await page.getByRole('radio', { name: 'Mr.' }).check();
  await page.getByRole('textbox', { name: 'Name *', exact: true }).click();
  await page.getByRole('textbox', { name: 'Password *' }).fill('Admin@123');

  
  //select DOB filter //ss
  await page.locator('#days').selectOption('20');
  await page.locator('#months').selectOption('7');
  await page.locator('#years').selectOption('1993');
  
  //Mark the newsletter and special offer checked//
  await page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
  await page.getByRole('checkbox', { name: 'Receive special offers from' }).check();

  //Fillout the first, last name and address etc//
  await page.getByRole('textbox', { name: 'First name *' }).type('Nadeem',{delay:200});
  await page.getByRole('textbox', { name: 'Last name *' }).type('Ahmed', {delay:200});
  await page.getByRole('textbox', { name: 'Company', exact: true }).type('Techrivers', {delay:200});
  await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).type('street 51, F6-4', {delay:200});
  await page.getByLabel('Country *').selectOption('Australia');
  await page.getByRole('textbox', { name: 'State *' }).type('texas',{delay:200});
  await page.getByRole('textbox', { name: 'City * Zipcode *' }).type('texas', {delay:200});
  await page.locator('#zipcode').type('44220', {delay:200});
  await page.getByRole('textbox', { name: 'Mobile Number *' }).type('923440512054', {delay:200});
});

test('Click the create account button and Continue', async()=>{
  await page.getByRole('button', { name: 'Create Account' }).click();
  await page.getByRole('link', { name: 'Continue' }).click();
});
});
