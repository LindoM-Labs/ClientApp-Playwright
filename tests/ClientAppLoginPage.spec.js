import {test, expect} from '@playwright/test';

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
    page.pause();


});

test('End to End Test', async({page}) =>
{
    
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
   //Login with valid credentials
    const emailField = page.getByPlaceholder('email@example.com');
    const passwordField = page.locator('#userPassword');
    const loginBtn = page.locator('#login');

    await emailField.fill('makanda.odwa@gmail.com');
    await passwordField.fill('Issie24!');
    await loginBtn.click();
    //Login successful assertion
     const text = await page.locator('.toast-success').textContent();
     expect(text?.trim()).toBe('Login Successfully');
     console.log(text);
    //Adding a product to the cart
    await page.getByRole('heading', {name: 'Automation'}).waitFor();
    const myProduct = await page.locator('h5').nth(2).textContent(); // Getting the name of the product i will be placing in the cart and use it for validations
    await page.locator("[class*='w-10']").nth(2).click(); // Clicking on the add to cart button of the product i will be placing in the cart
    await page.locator("[class*='ng-trigger']").waitFor();
    const productToCartConfirmationText = await page.locator("[class*='toast-success']").textContent();
    //Added to cart assertion
    expect(productToCartConfirmationText?.trim()).toBe("Product Added To Cart");
    console.log(productToCartConfirmationText);
    //Going to the cart page
    const cartBtn = await page.locator("[class*='btn-custom']").nth(2);
    await cartBtn.click();
    await page.getByRole('heading', {name: 'My Cart'}).waitFor();
    const cartItems = await page.locator('.cart h3');
    await expect(cartItems).toContainText(myProduct);// .toContainText() is used to go through the text elements especially if they are a collection of elements and check if the text is present in any of them. .toHaveText() is used to check if the text is present in a single element

  
});