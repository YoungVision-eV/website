import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/members');
});

test('members page screenshot', async ({ page }) => {
  await page
    .getByRole('img', { name: 'Leute sitzen im Kreis auf dem Boden' })
    .scrollIntoViewIfNeeded();
  await page.getByTestId('testimonials').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page
    .getByRole('img', { name: 'YoungVision Menschen sitzen am Lagerfeuer' })
    .scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.getByRole('contentinfo').scrollIntoViewIfNeeded();
  await page.waitForLoadState('networkidle');

  await expect(page).toHaveScreenshot({ fullPage: true });
});
