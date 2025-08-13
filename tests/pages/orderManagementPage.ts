import { Page, expect } from '@playwright/test';

export class OrderManagementPage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto('');
    await this.page.click('data-test=nav-admin-menu');
    await Promise.all([
    this.page.waitForResponse(response =>
        response.url().includes('/invoices?page=1') && response.status() === 200),
        this.page.click('[data-test=nav-admin-orders]')
    ]);
  }

  async searchOrder(input: string) {
    await this.page.fill('[data-test=order-search-query]', input);
    await Promise.all([
        this.page.waitForResponse(resp =>
        resp.url().includes('/invoices/search') && resp.status() === 200
        ),
        this.page.click('[data-test=order-search-submit]'),
    ]);
  }

  async getVisibleInvoiceNumbers(): Promise<string[]> {
    return this.page
      .locator('table tbody tr td:nth-child(1)')
      .allTextContents();
  }

  async openEditByInvoice(invoiceNumber: string) {
    const row = this.page.locator('table tr', {
      has: this.page.locator(`text=${invoiceNumber}`)
    });
    await expect(row).toBeVisible();
    await Promise.all([
        this.page.waitForResponse(resp =>
        /\/invoices\/\d+$/.test(resp.url()) && resp.status() === 200),
        row.locator('a:has-text("Edit")').click(),
    ]);
  }

  async verifyEachOrderDetailsMatch(input: string, field: string) {
    const invoices = await this.getVisibleInvoiceNumbers();
    for (const inv of invoices) {
      await this.openEditByInvoice(inv);
      if (field && input) {
        const locator = this.page.locator(`[data-test="${field}"]`);
        const tagName = (await locator.first().evaluate(el => el.tagName)).toLowerCase();
        if (['input', 'textarea', 'select'].includes(tagName)) {
            await expect(locator).toHaveValue(input);
        } else {
            await expect(locator).toHaveText(input);
        }
        }
      await this.page.click('text=Back');
    }
  }

  async updateStatus(newStatus: string) {
    await this.page.selectOption('select', newStatus);
    await this.page.click('button:has-text("Update status")');
  }

  async verifyStatus(expectedStatus: string) {
    const statusSelect = this.page.locator('select');
    await expect(statusSelect).toHaveValue(expectedStatus);
  }

  async getOrderCount(): Promise<number> {
    return this.page.locator('table tbody tr').count();
  }
}