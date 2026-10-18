import { test, expect } from '../../fixtures/baseFixture';
import { requireEnv } from '../../utils/env';

test('user can log in and log out @smoke', async ({ loginPage, dashboardPage, page }) => {
  await loginPage.goto();
  await loginPage.login(requireEnv('USER_NAME'), requireEnv('PASSWORD'));
  await expect(page).toHaveURL(/dashboard/);
  await expect(dashboardPage.heading).toBeVisible();

  await dashboardPage.logout();
  await expect(page).toHaveURL(/auth\/login/);
  await expect(loginPage.loginButton).toBeVisible();
});
