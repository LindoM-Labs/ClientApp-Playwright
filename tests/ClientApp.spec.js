import {test, expect} from '@playwright/test';
const {POManager} = require('../PageObjects/POManager');
//Json->string-.js object
const dataset = JSON.parse(JSON.stringify(require('../Utils/ClientAppTestData.json')));



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

    const loginPage = poManager.getLoginPage();
  
    await loginPage.navigateToLoginPage();
    await loginPage.login(dataset.username, dataset.password);

    
    const testValidations = poManager.getTestalidations();

    const expectedLoginSuccessfulText = 'Login Successfully';
    await testValidations.loginPageValidation(expectedLoginSuccessfulText);

   
    const productDashboardPage = poManager.getDashboardPage();
    await testValidations.waitForProductLocator(dataset.productName);
    await productDashboardPage.addProductToCart(dataset.productName);
    await testValidations.productAddedValidation();
    
    await productDashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await testValidations.waitForCartLocator('div li');
    await cartPage.checkout();
    
   
    const orderPage = poManager.getOrderPage();
    await testValidations.waitForCouponBtn('Apply Coupon');
  

    await orderPage.fillDetails(dataset.creditCardNo, dataset.date, dataset.month, dataset.cvv, dataset.nameOnTheCard, dataset.coupon, dataset.countryPrefix)
    await testValidations.emailValidation(dataset.username);

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