import { expect, test, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/events');
});

async function expectForAllSelected(page: Page) {
  for (const e of await page.getByRole('list').getByText('Nur Mitglieder').all()) {
    await expect(e).not.toBeVisible();
  }
  for (const e of await page.getByRole('list').getByText('Für Alle').all()) {
    await expect(e).toBeVisible();
  }
}

async function expectOnlyMembersSelected(page: Page) {
  for (const e of await page.getByRole('list').getByText('Nur Mitglieder').all()) {
    await expect(e).toBeVisible();
  }
  for (const e of await page.getByRole('list').getByText('Für Alle').all()) {
    await expect(e).not.toBeVisible();
  }
}

test('Select members_only', async ({ page }) => {
  await page.getByLabel('Nur Mitglieder').click();
  await expectOnlyMembersSelected(page);
});

test('Reselect for_all', async ({ page }) => {
  await page.getByLabel('Für Alle').click();
  await expectOnlyMembersSelected(page);

  await page.getByLabel('Für Alle').click();
  await expectForAllSelected(page);
});
