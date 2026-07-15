import {test, expect} from '@playwright/test';
const {POManager} = require('../PageObjects/POManager');



test('Empty credentials Test', async({page}) =>
{
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#login').click();

   expect(page.locator('.invalid-feedback').first()).toHaveText('*Email is required');
   expect(page.locator('.invalid-feedback').last()).toHaveText('*Password is required');
});

test('Invalid Email Test', async({page}) =>
{
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    const loginBtn = page.locator('#login');
    const emailField = page.getByPlaceholder('email@example.com');
    const passwordField = page.locator('#userPassword');
    const invalidEmail = 'dsgnsgsrgrigwrgsjdgwrigjr';

    await emailField.fill(invalidEmail);
    await passwordField.fill('123456');
    await loginBtn.click();

    await expect(page.locator('.invalid-feedback').first()).toHaveText('*Enter Valid Email');



});

test('Invalid Password Test', async({page}) =>
{
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
   
    const emailField = page.getByPlaceholder('email@example.com');
    const passwordField = page.locator('#userPassword');
    const loginBtn = page.locator('#login');
    const invalidPassword = '12345';

    await emailField.fill('makanda.odwa@gmail.com');
    await passwordField.fill(invalidPassword);
    await loginBtn.click();

    await expect(page.locator('.toast-message')).toHaveText('Incorrect email or password.');
    await page.pause();


});

test('End to End Test', async({page}) =>
{  
    const poManager = new POManager(page)

    const productName = 'iphone 13 pro';
    const username = 'makanda.odwa@gmail.com';
    const password = 'Issie24!';

    const loginPage = poManager.getLoginPage();
  
    await loginPage.navigateToLoginPage();
    await loginPage.login(username, password);

    
    const testValidations = poManager.getTestalidations();

    const expectedLoginSuccessfulText = 'Login Successfully';
    await testValidations.loginPageValidation(expectedLoginSuccessfulText);

   
    const productDashboardPage = poManager.getDashboardPage();
    await testValidations.waitForProductLocator(productName);
    await productDashboardPage.addProductToCart(productName);
    await testValidations.productAddedValidation();
    
    await productDashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await testValidations.waitForCartLocator('div li');
    await cartPage.checkout();
    
   
    const orderPage = poManager.getOrderPage();
    await testValidations.waitForCouponBtn('Apply Coupon');
  
    const creditCardNo = '1234567891012';
    const date = '15';
    const month = '02';
    const cvv = '2541';
    const nameOnTheCard = 'Lindokuhle M';
    const coupon = 'rahulshettyacademy';
    const countryPrefix = 'south';

    await orderPage.fillDetails(creditCardNo, date, month, cvv, nameOnTheCard, coupon, countryPrefix)
    await testValidations.emailValidation(username);

    const orderConfirmationPage = poManager.getOrderConfirmationPage();
    await testValidations.orderConfirmationValidation();
    const orderId = await orderConfirmationPage.getOrderID();
    await orderConfirmationPage.navigateToOrdersPage();

   

    const myOrdersPage = poManager.getMyOrdersPage();
    await myOrdersPage.confirmVisibility();
    await myOrdersPage.viewMyOrder(orderId);
    await testValidations.orderSummaryLocator();

    const summaryPage = poManager.getSummaryPage();
    await testValidations.validateOrderID(await summaryPage.getOrderSummaryId(), orderId);
    
});