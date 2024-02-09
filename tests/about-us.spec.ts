import { test, expect } from '@playwright/test';
import exp from 'constants';

test.beforeEach(async ({ page }) => {
	await page.goto('/about-us');
});

test('About Us page screenshot', async ({ page }) => {
	let portraitEmma = page.getByAltText('Emma');
	portraitEmma.scrollIntoViewIfNeeded();
	expect(portraitEmma).toBeVisible();
	await page.waitForTimeout(1000);
	await page.getByRole('contentinfo').scrollIntoViewIfNeeded();
	await expect(page).toHaveScreenshot({ fullPage: true });
});
