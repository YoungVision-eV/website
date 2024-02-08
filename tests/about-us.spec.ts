import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('/about-us');
});

test('About Us page screenshot', async ({ page }) => {
	await expect(page).toHaveScreenshot({ fullPage: true });
});
