import {test, expect} from '@playwright/test';

test('Client App E2E Test', async({page}) =>
{
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
   
    const emailField = page.getByPlaceholder('email@example.com');
    const passwordField = page.locator('#userPassword');
    const loginBtn = page.locator('#login');

    await emailField.fill('makanda.odwa@gmail.com');
    await passwordField.fill('Issie24!');
    await loginBtn.click();

    await page.getByRole('heading', {name: 'Automation'}).waitFor();
    const myProduct = await page.locator('h5').nth(2).textContent(); // Getting the name of the product i will be placing in the cart and use it for validations
    await page.locator("[class*='w-10']").nth(2).click(); // Clicking on the add to cart button of the product i will be placing in the cart
    await page.locator("[class*='ng-trigger']").waitFor();
    const productToCartConfirmationText = await page.locator("[class*='toast-success']").textContent();
    console.log(productToCartConfirmationText);
    expect(productToCartConfirmationText?.trim()).toBe("Product Added To Cart");
});