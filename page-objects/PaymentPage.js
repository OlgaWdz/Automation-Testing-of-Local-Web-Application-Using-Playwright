export class PaymentPage {
  constructor(page) {
    this.page = page;
    this.discountCode = page
      .frameLocator('data-qa="active-discount-container"')
      .locator('class="active-discount-container"');

    this.discountInput = page
      .frameLocator('data-qa="discount-code-input"')
      .locator('class="discount-code-input');
  }

  activateDiscount = async () => {
    await this.discountCode.waitFor();
    const code = await this.discountCode.innerText();
    await this.discountInput.fill(code);
    await expect(this.discountInput).toHaveValue(code);
    
    await this.page.pause();
  };
}
