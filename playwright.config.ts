import type { PlaywrightTestConfig, ReporterDescription } from '@playwright/test';

import { devices } from '@playwright/test';

const webServer: PlaywrightTestConfig['webServer'] = process.env.PLAYWRIGHT_TEST_BASE_URL
  ? undefined
  : {
      command: 'PLAYWRIGHT_TEST=true pnpm run build && pnpm run preview',
      port: 4321,
      timeout: 5 * 60 * 1000,
    };

const reporter: ReporterDescription[] = process.env.CI
  ? [
      ['github', { outputMode: 'summary' }],
      ['html', { open: 'never', outputFolder: 'playwright-report' }],
      ['junit', { outputFile: 'playwright-results.xml' }],
    ]
  : [['list'], ['html']];

const config: PlaywrightTestConfig = {
  expect: {
    // because of image optimizations we have to be lenient during the port to astro
    toHaveScreenshot: { maxDiffPixelRatio: 0.07, maxDiffPixels: 500, threshold: 0.3 },
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
      },
    },
  ],
  reporter,
  retries: 3,
  testDir: 'tests',
  testMatch: /(.+\.)?(test|spec)\.[jt]s/,
  use: { actionTimeout: 10000 },
  webServer,
};

export default config;
