import test from "@playwright/test";
import { Checkout } from "../page-objects/Checkout";
import { Navigation } from "../page-objects/Navigation";
import { ProductsPage } from "../page-objects/ProductsPage";

test.only("New user full end-to-end test journey", async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.visit();
  await productsPage.addProductToBasket(0);
  await productsPage.addProductToBasket(1);
  await productsPage.addProductToBasket(2);
  const navigation = new Navigation(page);
  await navigation.goToCheckout();

  const checkout = new Checkout(page);
  await checkout.removeCheapestProduct();
});
