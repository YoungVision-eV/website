import { expect, test } from '@playwright/test';
import { SUB_PAGES } from './data';

test.beforeEach(async ({ page }) => {
	await page.goto('/');
});

test.describe('Navigation', () => {
	for (const subPage of SUB_PAGES) {
		test(`clicking '${subPage.name}' navigates to ${subPage.url}`, async ({ page, isMobile }) => {
			test.fail(subPage.name !== 'Home');
			if (isMobile) {
				await page.getByRole('button', { name: 'Open main menu' }).click();
			}
			await page.getByRole('link', { name: subPage.name }).click();
			// menu closes on mobile!
			if (!isMobile) {
				await page.getByRole('link', { name: subPage.name }).hover();
			}
			await expect(page).toHaveURL(subPage.url);

			// on mobile the navbar is only the header
			await expect(page.getByRole('navigation')).toHaveScreenshot();
			if (isMobile) {
				// have to open menu again
				await page.getByRole('button', { name: 'Open main menu' }).click();
			}
			await expect(page.getByRole('link', { name: subPage.name })).toHaveCSS('font-weight', '600');
		});
	}
});

test.describe('Mobile only', () => {
	test.skip(({ isMobile }) => !isMobile, 'Mobile only');

	test.beforeEach(async ({ page }) => {
		// mobile menu is very interactive
		// astro loads interactivity on page load
		// this can cause race conditions where we click before the event handler is attached
		await page.waitForLoadState('networkidle');
	});

	test('on mobile opens main menu', async ({ page }) => {
		await page.getByRole('button', { name: 'Open main menu' }).click();

		await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
		await expect(page).toHaveScreenshot();
	});

	test('on mobile closes main menu', async ({ page }) => {
		await page.getByRole('button', { name: 'Open main menu' }).click();
		await page.getByRole('button', { name: 'Close main menu' }).click();
		await expect(page.getByRole('link', { name: 'Home' })).not.toBeVisible();
	});

	for (const subPage of SUB_PAGES) {
		test(`menu closes when clicking ${subPage.name}`, async ({ page }) => {
			await page.getByRole('button', { name: 'Open main menu' }).click();
			await page.getByRole('link', { name: subPage.name }).click();
			await expect(page.getByRole('link', { name: subPage.name })).not.toBeVisible();
		});
	}
});
