import { test, expect } from '@playwright/test';

test('Verify Client Work text is visible on EPAM site', async ({ page }) => {
  await page.goto('https://www.epam.com/');

  // Click 'Services' from the header menu
  await page.getByRole('link', { name: /Services/i }).click();

  // Click the 'Explore Our Client Work' link
  await page.getByRole('link', { name: /Explore Our Client Work/i }).click();

  // Verify that the 'Client Work' text is visible on the page
  const clientWork = page.locator('text=Client Work');
  await expect(clientWork).toBeVisible();
});
