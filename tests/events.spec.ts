import { expect, test } from '@playwright/test';

test('Bauwoche 2024 screenshot', async ({ page }) => {
  await page.goto('/events/bauwoche-2024');
  await page.getByRole('contentinfo').scrollIntoViewIfNeeded();
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test('Event Page screenshot', async ({ page }) => {
  await page.goto('/events/event-1');
  await page.getByRole('contentinfo').scrollIntoViewIfNeeded();
  await expect(page).toHaveScreenshot({ fullPage: true });
});
