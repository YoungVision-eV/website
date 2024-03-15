import { expect, type Page } from '@playwright/test';

export async function forceLoadImages(page: Page) {
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
