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
  await page
    .getByRole('list')
    .getByRole('heading', { name: 'Silvester' })
    .or(page.getByRole('list').getByRole('heading', { name: 'Mitgliederversammlung' }))
    .scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
}

async function expectForAllSelected(page: Page) {
  for (const e of await page.getByRole('list').getByText('Nur Mitglieder').all()) {
    await expect(e).not.toBeVisible();
  }
  for (const e of await page.getByRole('list').getByText('Für Alle').all()) {
    await expect(e).toBeVisible();
  }
}

async function expectOnlyMemebersSelected(page: Page) {
  for (const e of await page.getByRole('list').getByText('Nur Mitglieder').all()) {
    await expect(e).toBeVisible();
  }
  for (const e of await page.getByRole('list').getByText('Für Alle').all()) {
    await expect(e).not.toBeVisible();
  }
}

test('Projects page screenshot', async ({ page }) => {
  await forceLoadImages(page);

  console.log('PLAYWRIGHT_TEST: "%s"', process.env.PLAYWRIGHT_TEST);
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test('Select members_only', async ({ page }) => {
  await page.getByLabel('Nur Mitglieder').click();
  await expectOnlyMemebersSelected(page);

  await forceLoadImages(page);

  await expect(page).toHaveScreenshot({ fullPage: true });
});

test('Reselect for_all', async ({ page }) => {
  await page.getByLabel('Für Alle').click();
  await expectOnlyMemebersSelected(page);

  await page.getByLabel('Für Alle').click();
  await expectForAllSelected(page);

  await forceLoadImages(page);

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
