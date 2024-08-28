import { expect } from "@playwright/test";

export class PaymentPage {
  constructor(page) {
    this.page = page;
    this.discountCode = page
      .frameLocator('[data-qa="active-discount-container"]')
      .locator('[data-qa="discount-code"]');
    this.activateDiscountButton = page.locator(
      '[data-qa="submit-discount-button"]'
    );
    this.discountInput = page
      .locator('[placeholder="Discount code"]')
      .locator(".discount-code-input");
    this.totalValue = page.locator('[data-qa="total-value"]');
    this.discountValue = page.locator('[data-qa="total-with-discount-value"]');
    this.discountActiveMessage = page.locator(
      '[data-qa="discount-active-message"]'
    );
    this.creditCardOwnerInput = page.getByPlaceholder("Credit card owner");
    this.creditCardNumberInput = page.getByPlaceholder("Credit card number");
    this.creditCardValidUnitInput = page.getByPlaceholder("Valid until");
    this.creditCardCvcInput = page.getByPlaceholder("Credit card CVC");
    this.payButton = page.locator('[data-qa="pay-button"]');
  }

  async activateDiscount() {
    await this.discountCode.waitFor();
    const code = await this.discountCode.innerText();
    await this.discountInput.waitFor();
    await this.discountInput.fill(code); // Fill the discount input field with the code
    await this.activateDiscountButton.waitFor();
    await this.activateDiscountButton.click(); // Click the button to submit the code
    await expect(this.discountInput).toHaveValue(code);

    await this.discountValue.waitFor();
    const discountValueText = await this.discountValue.innerText();
    const discountValueNumber = this.parsePrice(discountValueText);

    await this.totalValue.waitFor();
    const totalValueText = await this.totalValue.innerText();
    const totalValueNumber = this.parsePrice(totalValueText);

    expect(discountValueNumber).toBeLessThan(totalValueNumber);
  }

  async fillPaymentDetails(paymentDetails) {
    await this.creditCardOwnerInput.waitFor();
    await this.creditCardOwnerInput.fill(paymentDetails.owner);
    await this.creditCardNumberInput.waitFor();
    await this.creditCardNumberInput.fill(paymentDetails.number);
    await this.creditCardValidUnitInput.waitFor();
    await this.creditCardValidUnitInput.fill(paymentDetails.validUnit);
    await this.creditCardCvcInput.waitFor();
    await this.creditCardCvcInput.fill(paymentDetails.cvc);
  }

  async completePayment() {
    await this.payButton.waitFor();
    await this.payButton.click();
    await this.page.waitForURL(/\/thank-you/, { timeout: 3000 });
  }

  parsePrice(priceText) {
    const priceOnlyStringNumber = priceText.replace("$", "");
    return parseInt(priceOnlyStringNumber, 10);
  }
}
  