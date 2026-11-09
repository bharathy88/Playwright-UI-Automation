import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  // Location of test files
  testDir: './tests',

  // Run tests sequentially to reduce memory consumption
  fullyParallel: false,

  // Prevent accidental test.only in CI
  forbidOnly: !!process.env.CI,

  // Retry failed tests only in CI
  retries: process.env.CI ? 2 : 0,

  // Use one worker locally and in GitHub Actions
  workers: 1,

  // HTML test report
  reporter: 'html',

  // Test timeout
  timeout: 30000,

  // Assertion timeout
  expect: {
    timeout: 5000,
  },

  // Shared browser settings
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  // Browser projects
  projects: [

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

  ],

});