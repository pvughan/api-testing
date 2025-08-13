import { Page, expect } from '@playwright/test';

export class AddProductPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Open the "Add Product" page
  async open() {
    await this.page.goto('');
    await this.page.click('data-test=nav-admin-menu');
    await this.page.click('data-test=nav-admin-products');
    await this.page.click('data-test=product-add');
  }

  // Fill product details
  async fillProductDetails(name: string, description: string, stock: number, price: number) {
    await this.page.fill('[data-test="name"]', name);  // Product name input field
    await this.page.fill('[data-test="description"]', description);  // Product description textarea
    await this.page.fill('[data-test="stock"]', stock.toString());  // Product stock input field
    await this.page.fill('[data-test="price"]', price.toString());  // Product price input field
  }

  // Select product options like "Location Offer" and "Rental"
  async selectProductOptions(locationOfferAction: string, rentalAction: string) {
    if (locationOfferAction === 'check') {
      await this.page.check('[data-test="location-offer"]');
    } else if (locationOfferAction === 'uncheck') {
      await this.page.uncheck('[data-test="location-offer"]');
    }

    if (rentalAction === 'check') {
      await this.page.check('[data-test="rental"]');
    } else if (rentalAction === 'uncheck') {
      await this.page.uncheck('[data-test="rental"]');
    }
  }


  // Select brand and category for the product
  async selectProductCategoryBrandImage(brand: string, category: string, imageId: string) {
    await this.page.selectOption('[data-test="brand-id"]', { label: brand });  // Select brand
    await this.page.selectOption('[data-test="category-id"]', { label: category });  // Select category
    await this.page.selectOption('[data-test="product-image-id"]', { label: imageId });  // Select product image
  }

  // Click the "Save" button
  async saveProduct() {
    await this.page.click('[data-test="product-submit"]');  // Click on the "Save" button
  }

  // Verify success notification after saving the product
  async verifySuccessNotification() {
    const successMessage = this.page.locator('.alert-success');  
    await expect(successMessage).toBeVisible(); 
    await expect(successMessage).toHaveText(/Product saved/);
  }

  async verifyExpectedMessage(expectedMessage: string) {
    const notification = this.page.locator('.alert-success, .alert-danger, .alert');
    await expect(notification).toBeVisible();
    await expect(notification).toHaveText(new RegExp(expectedMessage, "i"));
  }

  async verifyProductCreation(shouldCreate: boolean, 
    Name: string,
    Description: string,
    Stock: number,
    Price: number,
    Brand: string,
    Category: string,
    Image: string,
    LocationOffer: string,
    Rental: string,
  ) {
    await this.page.goto('');
    await this.page.click('data-test=nav-admin-menu');
    await this.page.click('data-test=nav-admin-products');
    const productRow = this.page.locator(`text="${Name}"`);
    if (shouldCreate) {
      await expect(productRow).toBeVisible();
      const editButton = this.page.locator('[data-test="product-edit-"]', { hasText: "Edit" });
      await expect(editButton).toBeVisible();
      await editButton.click();
      await expect(this.page.locator('[data-test="name"]')).toHaveValue(Name);
      await expect(this.page.locator('[data-test="description"]')).toHaveValue(Description);
      await expect(this.page.locator('[data-test="stock"]')).toHaveValue(Stock.toString());
      await expect(this.page.locator('[data-test="price"]')).toHaveValue(Price.toString());
      await expect(this.page.locator('[data-test="brand-id"]')).toHaveValue(Brand);
      await expect(this.page.locator('[data-test="category-id"]')).toHaveValue(Category);
      await expect(this.page.locator('[data-test="product-image-id"]')).toHaveValue(Image);
      if (LocationOffer !== undefined) {
        const isChecked = LocationOffer.toLowerCase() === 'checked';
        await expect(this.page.locator('[data-test="location-offer"]')).toBeChecked({ checked: isChecked });
      }
      if (Rental !== undefined) {
        const isChecked = Rental.toLowerCase() === 'checked';
        await expect(this.page.locator('[data-test="rental"]')).toBeChecked({ checked: isChecked });
      }
    } else {
      const productRow = this.page.locator('table tr', { has: this.page.locator(`[data-test="product-name"]`, { hasText: Name }) });
      await expect(productRow).toHaveCount(0);
    }
  }
}
