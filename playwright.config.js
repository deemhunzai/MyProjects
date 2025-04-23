import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: 180000,   // ✅ Move this here, not after "use"

  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry', // ✅ Also trace should be inside "use"
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // baseURL: 'http://127.0.0.1:3000',
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 812 },
        screenshot: "on",
        video: "on",
        trace: "on"
      },
    },
  ],

  // webServer: { ... },
});
