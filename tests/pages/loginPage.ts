import { Page, expect } from '@playwright/test';

export class LoginPage {
  private page: Page;

  // Constructor to initialize the page object
  constructor(page: Page) {
    this.page = page;
  }

  // Open the login page
  async open() {
    await this.page.goto('');  // Navigate to the login page
    await this.page.locator('[data-test="nav-sign-in"]').click();  // Click on "Sign in" button
  }

  // Login with user credentials (customer)
  async loginUser(email: string, password: string) {
    await this.page.locator('[data-test="email"]').fill(email);  // Fill in the email field
    await this.page.locator('[data-test="password"]').fill(password);  // Fill in the password field
    await this.page.locator('[data-test="login-submit"]').click();  // Click on the login submit button

    await expect(this.page.locator('[data-test="page-title"]')).toContainText('My account');  // Check that the page title contains "My account"
  }

  // Login with admin credentials
  async loginAdmin(email: string, password: string) {
    await this.page.locator('[data-test="email"]').fill(email);  // Fill in the email field (admin)
    await this.page.locator('[data-test="password"]').fill(password);  // Fill in the password field (admin)
    await this.page.locator('[data-test="login-submit"]').click();  // Click on the login submit button

    await expect(this.page.locator('[data-test="page-title"]')).toContainText('Sales over the years');  // Check that the page title contains "Sales over the years"
  }
}
