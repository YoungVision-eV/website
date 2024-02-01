import { expect, test } from '@playwright/test';
import { SUB_PAGES } from './data';

for (const subPage of SUB_PAGES) {
	test(`${subPage.name} has footer`, async ({ page }) => {
		test.fail(subPage.name !== 'Home');
		await page.goto(subPage.url);
		await expect(page.getByRole('contentinfo')).toBeVisible();
	});
}

test('Opens dialog from footer', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('button', { name: 'Sign up' }).click();
	await expect(page.getByRole('dialog')).toBeVisible();
});
