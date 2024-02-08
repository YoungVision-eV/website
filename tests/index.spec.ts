import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('/');
});

test('index page screenshot', async ({ page, browserName }) => {
	// firefox and chrome load images differently
	// TODO: remove this after port
	if (browserName !== 'firefox') {
		await page.getByTestId('testimonials').scrollIntoViewIfNeeded();
	}
	await page.getByRole('contentinfo').scrollIntoViewIfNeeded();

	await page.waitForTimeout(1000);
	await page.waitForLoadState('networkidle');

	await expect(page).toHaveScreenshot({ fullPage: true });
});

test('testimonials can be scrolled', async ({ page }) => {
	await page.getByTestId('testimonials').scrollIntoViewIfNeeded();
	await page.waitForLoadState('networkidle');
	await page.getByRole('button', { name: 'Next Testimonial' }).click();
	await expect(page.getByTestId('testimonials')).toHaveScreenshot();
});
