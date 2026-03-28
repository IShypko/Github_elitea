import { test, expect } from '@playwright/test';

test('EPAM — explore client work', async ({ page, context }) => {
  // INITIALIZE: test body will be added in subsequent commit.
  // 1) Navigate to homepage
  await page.goto('https://www.epam.com/', { waitUntil: 'domcontentloaded' });

  // Optional: dismiss cookie/consent banners if present
  const consentButton = page.locator('button:has-text("Accept"), button:has-text("I Accept"), button:has-text("Agree"), button:has-text("Accept All")');
  if (await consentButton.count() > 0) {
    await consentButton.first().click().catch(() => {});
  }

  // 2) Open "Services" from the header menu (hover first, fallback to click)
  const services = page.locator('header >> text=Services');
  await services.waitFor({ state: 'visible', timeout: 7000 });
  await services.hover().catch(async () => {
    await services.click();
  });

  // 3) Click the "Explore Our Client Work" link
  const exploreLink = page.locator('text=Explore Our Client Work');
  await expect(exploreLink).toBeVisible({ timeout: 7000 });

  // If the link opens a new tab, wait for it; otherwise continue on same page
  const [newPagePromise] = await Promise.all([
    context.waitForEvent('page').catch(() => null), // may resolve to null if no new page
    exploreLink.click(),
  ]);

  const target = newPagePromise ?? page;
  await target.waitForLoadState('domcontentloaded');

  // 4) Verify that the "Client Work" text is visible on the page
  const clientWorkHeading = target.locator('text=Client Work');
  await expect(clientWorkHeading).toBeVisible({ timeout: 10000 });

  // Capture a screenshot after reaching the Client Work page
  await target.screenshot({ path: 'client-work.png', fullPage: true });
});
