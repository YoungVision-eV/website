import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('testimonials can be scrolled', async ({ page }) => {
  await expect(page.getByText('Andrea, 22')).toBeVisible();
  await page.getByRole('button', { name: 'Next Testimonial' }).click();
  await expect(page.getByText('Lena, 17')).toBeVisible();
});
