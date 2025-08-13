import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import { AddProductPage } from './pages/addProductPage';
import { deleteAllProductsFromDB } from './utils/dbUtils';

import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const productTestData = parse(
  fs.readFileSync(path.join(__dirname, '../tests/data/product_test_data.csv'), 'utf8'), {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }
);

test.describe('Admin Add Product Tests', () => {
  test.beforeEach(async ({ page }) => {
    await deleteAllProductsFromDB();

    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.loginAdmin('admin@practicesoftwaretesting.com', 'welcome01');
  });

  productTestData.forEach((testCase: any) => {
    test(`${testCase['TestCase ID']} - ${testCase['TestCase Name']}`, async ({ page }) => {
      const productPage = new AddProductPage(page);
      await productPage.open();
      await productPage.fillProductDetails(
        testCase['Name'],
        testCase['Description'],
        testCase['Stock'],
        testCase['Price']
      );
      await productPage.selectProductOptions(
        testCase['Location offer'],
        testCase['Item for rent']
      );
      await productPage.selectProductCategoryBrandImage(
        testCase['Brand'],
        testCase['Category'],
        testCase['Image']
      );
      await productPage.saveProduct();

      await productPage.verifyExpectedMessage(testCase['Expected message']);
      await productPage.verifyProductCreation(
        testCase['Should create product?']?.toLowerCase() === 'yes',
        testCase['Name'],
        testCase['Description'],
        testCase['Stock'],
        testCase['Price'],
        testCase['Brand'],
        testCase['Category'],
        testCase['Image'],
        testCase['Location offer'],
        testCase['Item for rent'],
      );
    });
  });
});
