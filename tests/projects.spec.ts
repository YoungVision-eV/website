import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
	await page.goto('/events');
});

test('Projects page screenshot', async ({ page }) => {
	await expect(page).toHaveScreenshot({ fullPage: true });
});

test('Filter members_only', async ({ page }) => {
	await page.getByLabel('Nur Mitglieder').click();
	await expect(page.getByRole('list').getByText('Nur Mitglieder')).not.toBeVisible();
	await expect(page).toHaveScreenshot({ fullPage: true });
});

test('Filter for_all', async ({ page }) => {
	await page.getByLabel('Für Alle').click();
	await expect(page.getByRole('list').getByText('Für Alle')).not.toBeVisible();
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
