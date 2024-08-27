import { expect } from "@playwright/test";

export class PaymentPage {
  constructor(page) {
    this.page = page;
    this.discountCode = page
      .frameLocator('data-qa="active-discount-container"')
      .locator('[data-qa="discount-code"]');
    this.activateDiscountButton = page.locator(
      '[data-qa="submit-discount-button"]'
    );
    this.discountInput = page.getByPlaceholder("Discount code");

    this.discountInput = page
      .getByPlaceholder("Discount code")
      .locator('class="discount-code-input');
    this.totalValue = page.locator('[data-qa="total-value"]');
    this.discountValue = page.locator('[data-qa="total-with-discount-value"]');
    this.discountActiveMessage = page.locator(
      '[data-qa="discount-active-message"]'
    );
  }

  async activateDiscount() {
    await this.discountCode.waitFor();
    const code = await this.discountCode.innerText();
    await this.discountInput.waitFor();
    await this.discountInput.fill(code);
    await expect(this.discountInput).toHaveValue(code);

    await this.activateDiscountButton.waitFor();
    await this.activateDiscountButton.click();
    await this.page.pause();
  }
}
