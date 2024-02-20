import { expect, test, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('/events');
});

// Because we lazy load images but compare them in screenshots
// we have to first make sure that they are loaded by scrolling them into view
async function forceLoadImages(page: Page) {
	await page.getByRole('contentinfo').scrollIntoViewIfNeeded();
	await page.locator('#event-1').scrollIntoViewIfNeeded();
	await page.waitForTimeout(500);
	await page.getByRole('list').getByRole('heading', { name: 'Silvester' }).scrollIntoViewIfNeeded();
	await page.waitForTimeout(500);
}

test('Projects page screenshot', async ({ page }) => {
	await forceLoadImages(page);

	await expect(page).toHaveScreenshot({ fullPage: true });
});

test('Filter members_only', async ({ page }) => {
	await page.getByLabel('Nur Mitglieder').click();
	await expect(page.getByRole('list').getByText('Nur Mitglieder')).not.toBeVisible();

	await forceLoadImages(page);

	await expect(page).toHaveScreenshot({ fullPage: true });
});

test('Filter for_all', async ({ page }) => {
	await page.getByLabel('Für Alle').click();
	await expect(page.getByRole('list').getByText('Für Alle')).not.toBeVisible();
	await page.getByRole('contentinfo').scrollIntoViewIfNeeded();
	await page.waitForLoadState('networkidle');

	await expect(page).toHaveScreenshot({ fullPage: true });
});

for (const project of ['Mitgliederversammlung', 'Silvester']) {
	// TODO: readd when event pages are ready
	test.skip(`Click on ${project}`, async ({ page }) => {
		await page.getByText(project).click();
		await expect(page.getByRole('heading').getByText(project)).toBeVisible();
		await expect(page.getByRole('heading').getByText('Finanzierung')).toBeVisible();
		await expect(page).toHaveScreenshot({ fullPage: true });
	});
}
