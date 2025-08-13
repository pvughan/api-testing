import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import { OrderManagementPage } from './pages/orderManagementPage';  

import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const orderTestData = parse(
  fs.readFileSync(path.join(__dirname, '../tests/data/order_test_data.csv'), 'utf8'), { 
    columns: true, 
    skip_empty_lines: true, 
    trim: true 
  }
);

test.describe('Admin Order Management Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.loginAdmin('admin@practicesoftwaretesting.com', 'welcome01');
  });

  orderTestData.forEach((testCase: any) => {
    test(`${testCase['TestCase ID']} - ${testCase['TestCase Name']}`, async ({ page }) => {
        const orders = new OrderManagementPage(page);
        await orders.open();

        if (testCase['Input']) {
            await orders.searchOrder(testCase['Input']);

            const count = await orders.getOrderCount();

            if (testCase['Number valid']) 
                expect(count).toBe(Number(testCase['Number valid']));
            else 
                expect(count).toBeGreaterThan(0);

            if (count > 0) 
                await orders.verifyEachOrderDetailsMatch(testCase['Input'], testCase['Field']);
        }
    })
  });
});
