import { expect, test } from '@playwright/test';
import { forceLoadImages } from './fixtures';

test.beforeEach(async ({ page }) => {
  await page.goto('/about-us');
});

test('About Us page screenshot', async ({ page }) => {
  await forceLoadImages(page);
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test('Exercises can be expanded', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Tanzen' })).not.toBeVisible();
  await page.getByRole('button', { name: 'Mehr lesen' }).click();
  await expect(page.getByRole('heading', { name: 'Tanzen' })).toBeVisible();
  await page.getByRole('button', { name: 'Weniger' }).click();
});
