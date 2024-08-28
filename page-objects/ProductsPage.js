import { expect } from "@playwright/test";
import { Navigation } from "./Navigation.js";
import { isDesktopViewport } from "../utils/isDesktopViewport.js";

export class ProductsPage {
  constructor(page) {
    this.page = page;

    this.addButtons = page.locator('[data-qa="product-button"]');
    this.basketCounter = page.locator('[data-qa="header-basket-count"]');
    this.sortDropdown = page.locator('[data-qa="sort-dropdown"]');
    this.productTitle = page.locator('[data-qa="product-title"]');
  }

  visit = async () => {
    await this.page.goto("http://localhost:2221");
  };

  getBasketCount = async () => {
    await this.basketCounter.waitFor();
    await this.productTitle.first().waitFor();
    const productTitleBeforeSorting = await this.productTitle.allInnerText;
    const text = await this.basketCounter.innerText();
    return parseInt(text, 10);
  };

  addProductToBasket = async (index) => {
    const specificButton = this.addButtons.nth(index);
    await specificButton.waitFor();
    await expect(specificButton).toHaveText("Add to Basket");
    const navigation = new Navigation(this.page);

    if (isDesktopViewport(this.page)) {
      const basketCountBeforeAdding = await this.getBasketCount();
    }
    await specificButton.click();
    await expect(specificButton).toHaveText("Remove from Basket");
    const basketCountAfterAdding = await this.getBasketCount();
    expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding);
  };

  sortByCheapest = async () => {
    await this.sortDropdown.waitFor();
    await this.productTitle.first().waitFor();
    const productTitleBeforeSorting = await this.productTitle.allInnerTexts();
    await this.sortDropdown.selectOption("price-asc");
    const productTitleAfterSorting = await this.productTitle.allInnerTexts();
    expect(productTitleAfterSorting).not.toEqual(productTitleBeforeSorting);
  };
}
