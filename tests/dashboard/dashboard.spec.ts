import { test, expect } from '../../fixtures/baseFixture';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ dashboardPage }) => {
    await dashboardPage.goto();
  });

  test('dashboard loads for authenticated user @smoke', async ({ dashboardPage }) => {
    await expect(dashboardPage.heading).toBeVisible();
  });

  test('user can open PIM from the side menu', async ({ dashboardPage, page }) => {
    await dashboardPage.openMenu('PIM');
    await expect(page).toHaveURL(/pim/);
  });

  test('user can log out', async ({ dashboardPage, page }) => {
    await dashboardPage.logout();
    await expect(page).toHaveURL(/auth\/login/);
  });
});
