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
      ['html', { outputFolder: 'playwright-report', open: 'never' }],
      ['junit', { outputFile: 'playwright-results.xml' }],
    ]
  : [['list'], ['html']];

const config: PlaywrightTestConfig = {
  retries: 3,
  use: { actionTimeout: 10000 },
  expect: {
    // because of image optimizations we have to be lenient during the port to astro
    toHaveScreenshot: { maxDiffPixels: 500, maxDiffPixelRatio: 0.07, threshold: 0.3 },
  },
  webServer,
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
  testDir: 'tests',
  testMatch: /(.+\.)?(test|spec)\.[jt]s/,
  reporter,
};

export default config;
