import { expect, test, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/about-us');
});

async function forceLoadImages(page: Page) {
  // absolute images are placed in the background
  const lazyImages = page.locator('img[loading="lazy"]:not(.absolute):visible');
  for (const img of await lazyImages.all()) {
    await img.scrollIntoViewIfNeeded();
  }
  await expect
    .poll(() =>
      lazyImages.evaluateAll((imgs) => imgs.every((img) => (img as HTMLImageElement).complete)),
    )
    .toBe(true);
}

test('About Us page screenshot', async ({ page }) => {
  await forceLoadImages(page);
  await expect(page).toHaveScreenshot({ fullPage: true });
});
