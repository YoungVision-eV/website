import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('/members');
});

test('members page screenshot', async ({ page }) => {
	await expect(page).toHaveScreenshot({ fullPage: true });
});
