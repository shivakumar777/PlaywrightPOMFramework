import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  readonly heading: Locator;
  readonly userMenu: Locator;
  readonly logoutLink: Locator;
  readonly sideMenu: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Dashboard' });
    this.userMenu = page.locator('.oxd-userdropdown-tab');
    this.logoutLink = page.getByRole('menuitem', { name: 'Logout' });
    this.sideMenu = page.locator('.oxd-main-menu');
  }

  async goto(): Promise<void> {
    await this.navigate('web/index.php/dashboard/index');
  }

  async openMenu(name: string): Promise<void> {
    await this.sideMenu.getByRole('link', { name }).click();
  }

  async logout(): Promise<void> {
    await this.userMenu.click();
    await this.logoutLink.click();
  }
}
