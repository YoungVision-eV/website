import { expect, test } from '@playwright/test';

test.fail();

test.beforeEach(async ({ page }) => {
	await page.goto('/');
});

test('index page screenshot', async ({ page }) => {
	await expect(page).toHaveScreenshot({ fullPage: true });
});

test('testimonials can be scrolled', async ({ page }) => {
	await page.getByRole('button', { name: 'Next Testimonial' }).click();
	await expect(page.getByTestId('testimonials')).toHaveScreenshot();
});
