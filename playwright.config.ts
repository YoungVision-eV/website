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
  use: { actionTimeout: 10000 },
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
