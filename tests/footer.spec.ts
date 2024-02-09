import { expect, test } from '@playwright/test';
import { SUB_PAGES } from './data';

for (const subPage of SUB_PAGES) {
	test(`${subPage.name} has footer`, async ({ page }) => {
		test.fail(
			subPage.name !== 'Home' &&
				subPage.name !== 'Veranstaltungen' &&
				subPage.name !== 'Unterstütze uns' &&
				subPage.name !== 'Über Uns',
		);
		await page.goto(subPage.url);
		await expect(page.getByRole('contentinfo')).toBeVisible();
	});
}

test('Opens dialog from footer', async ({ page }) => {
	await page.goto('/');
	const signUpButton = page.getByRole('button', { name: 'Sign up' });
	await signUpButton.scrollIntoViewIfNeeded();

	// because astro lazy loads the JS of the footer we need to wait for it
	// otherwise the button is pressed before interactivity is available
	// this only seems to be an issue on firefox
	await page.waitForLoadState('networkidle');

	await signUpButton.click();
	await expect(page.getByRole('dialog')).toBeVisible();
});
