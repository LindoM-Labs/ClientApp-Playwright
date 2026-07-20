import { test, expect } from "@playwright/test";
const { POManager } = require("../PageObjects/POManager");
//Json->string-.js object
const dataset = JSON.parse(
  JSON.stringify(require("../Utils/ClientAppTestData.json")),
);

test("Empty credentials Test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator("#login").click();

  expect(page.locator(".invalid-feedback").first()).toHaveText(
    "*Email is required",
  );
  expect(page.locator(".invalid-feedback").last()).toHaveText(
    "*Password is required",
  );
});

test("Invalid Email Test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  const loginBtn = page.locator("#login");
  const emailField = page.getByPlaceholder("email@example.com");
  const passwordField = page.locator("#userPassword");
  const invalidEmail = "dsgnsgsrgrigwrgsjdgwrigjr";

  await emailField.fill(invalidEmail);
  await passwordField.fill("123456");
  await loginBtn.click();

  await expect(page.locator(".invalid-feedback").first()).toHaveText(
    "*Enter Valid Email",
  );
});

test("Invalid Password Test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  const emailField = page.getByPlaceholder("email@example.com");
  const passwordField = page.locator("#userPassword");
  const loginBtn = page.locator("#login");
  const invalidPassword = "12345";

  await emailField.fill("makanda.odwa@gmail.com");
  await passwordField.fill(invalidPassword);
  await loginBtn.click();

  await expect(page.locator(".toast-message")).toHaveText(
    "Incorrect email or password.",
  );
  await page.pause();
});

for (const data of dataset) { //This loop is going to act as a data provider, and I am using username/productName as part of the test title so that each test is unique otherwise Playwright will give ann error
  test(`End to End Test for ${data.productName}`, async ({ page }) => {
    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();

    await loginPage.navigateToLoginPage();
    await loginPage.login(data.username, data.password);

    const testValidations = poManager.getTestalidations();

    const expectedLoginSuccessfulText = "Login Successfully";
    await testValidations.loginPageValidation(expectedLoginSuccessfulText);

    const productDashboardPage = poManager.getDashboardPage();
    await testValidations.waitForProductLocator(data.productName);
    await productDashboardPage.addProductToCart(data.productName);
    await testValidations.productAddedValidation();

    await productDashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await testValidations.waitForCartLocator("div li");
    await cartPage.checkout();

    const orderPage = poManager.getOrderPage();
    await testValidations.waitForCouponBtn("Apply Coupon");

    await orderPage.fillDetails(
      data.creditCardNo,
      data.date,
      data.month,
      data.cvv,
      data.nameOnTheCard,
      data.coupon,
      data.countryPrefix,
      data.country,
    );
    await testValidations.emailValidation(data.username);

    const orderConfirmationPage = poManager.getOrderConfirmationPage();
    await testValidations.orderConfirmationValidation();
    const orderId = await orderConfirmationPage.getOrderID();
    await orderConfirmationPage.navigateToOrdersPage();

    const myOrdersPage = poManager.getMyOrdersPage();
    await myOrdersPage.confirmVisibility();
    await myOrdersPage.viewMyOrder(orderId);
    await testValidations.orderSummaryLocator();

    const summaryPage = poManager.getSummaryPage();
    await testValidations.validateOrderID(
      await summaryPage.getOrderSummaryId(),
      orderId,
    );
  });
}
