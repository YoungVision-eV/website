import { expect, test } from '@playwright/test';

test.fail();

test.beforeEach(async ({ page }) => {
	await page.goto('/support-us');
});

test('support-us page screenshot', async ({ page }) => {
	await expect(page).toHaveScreenshot({ fullPage: true });
});

test('Expanding Fördermitglieder', async ({ page }) => {
	await page.getByRole('button', { name: 'Mehr' }).click();
	await expect(page.getByTestId('benefits')).toHaveScreenshot();
	await page.getByRole('button', { name: 'Weniger' }).click();
});

test.describe('Donation method details', () => {
	for (const method of ['Partner werden', 'Geld spenden', 'Expertise Spenden', 'Sachspenden']) {
		test(`Expanding '${method}'`, async ({ isMobile, page }) => {
			const element = page.getByRole(isMobile ? 'button' : 'tab', {
				name: new RegExp(method),
			});
			await element.click();
			let targetElement;
			if (isMobile) {
				// TODO: Find a better accessor
				targetElement = page.getByTitle(method);
			} else {
				targetElement = page.getByRole('tabpanel');
			}
			await expect(targetElement).toHaveScreenshot();
		});
	}
});
