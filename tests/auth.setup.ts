import { test as setup, expect } from '../fixtures/baseFixture';
import { STORAGE_STATE } from '../playwright.config';
import { requireEnv } from '../utils/env';

setup('authenticate once and save session', async ({ loginPage, dashboardPage, page }) => {
  await loginPage.goto();
  await loginPage.login(requireEnv('USER_NAME'), requireEnv('PASSWORD'));
  await expect(dashboardPage.heading).toBeVisible();
  await page.context().storageState({ path: STORAGE_STATE });
});
