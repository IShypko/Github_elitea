// Playwright test: EPAM client work navigation
const { test, expect } = require('@playwright/test');

test('Navigate EPAM site -> Services -> Explore Our Client Work -> verify Client Work visible', async ({ page }) => {
  // Navigate to EPAM home
  await page.goto('https://www.epam.com/', { waitUntil: 'domcontentloaded' });

  // Accept cookies / dismiss overlays if present - best-effort
  try {
    const accept = page.locator('button:has-text("Accept")');
    if (await accept.count()) await accept.click();
  } catch (e) {
    // ignore
  }

  // Click Services in header menu
  await page.click('text=Services');

  // Click the "Explore Our Client Work" link
  await page.click('text=Explore Our Client Work');

  // Verify that "Client Work" text is visible on the page
  const clientWork = page.locator('text=Client Work');
  await expect(clientWork).toBeVisible({ timeout: 10000 });
});
