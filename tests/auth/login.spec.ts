import { test, expect } from '../../fixtures/baseFixture';
import users from '../../test-data/users.json';
import { requireEnv } from '../../utils/env';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('valid user can log in @smoke', async ({ loginPage, dashboardPage, page }) => {
    await loginPage.login(requireEnv('USER_NAME'), requireEnv('PASSWORD'));
    await expect(page).toHaveURL(/dashboard/);
    await expect(dashboardPage.heading).toBeVisible();
  });

  for (const creds of users.invalidCredentials) {
    test(`login fails with ${creds.name}`, async ({ loginPage }) => {
      await loginPage.login(creds.username, creds.password);
      await expect(loginPage.errorMessage).toHaveText('Invalid credentials');
    });
  }
});
