import { test as setup } from '@playwright/test';

setup('set environment variables', async ({}) => {
  process.env.PLAYWRIGHT_TEST = 'true';
});
