import { defineConfig } from '@playwright/test';

const baseURL = process.env.DOCS_BASE_URL || 'http://127.0.0.1:4322';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 2,
  timeout: 60000,
  expect: { timeout: 15000 },
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    browserName: 'chromium',
    colorScheme: 'dark', // The marketing site's light appearance must still win.
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
      : {},
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 1000 } } },
    { name: 'tablet', use: { viewport: { width: 900, height: 1000 } } },
    { name: 'mobile', use: { viewport: { width: 390, height: 844 } } },
    { name: 'small-mobile', use: { viewport: { width: 320, height: 740 } } },
  ],
  webServer: process.env.DOCS_BASE_URL ? undefined : {
    command: 'npm run preview -- --host 127.0.0.1 --port 4322',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
});
