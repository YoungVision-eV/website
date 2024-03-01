import { expect, test } from '@playwright/test';

test('Bauwoche 2024 screenshot', async ({ page, isMobile }) => {
  await page.goto('/events/bauwoche-2024');
  if (!isMobile) {
    // load lazy loaded image
    await page.getByRole('img', { name: 'Wochenplan Bauwoche 2024' }).scrollIntoViewIfNeeded();
  }
  await page.getByRole('contentinfo').scrollIntoViewIfNeeded();
  await expect(page).toHaveScreenshot({ fullPage: true });
});
