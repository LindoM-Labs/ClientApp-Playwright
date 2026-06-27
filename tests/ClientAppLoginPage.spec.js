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
    const emailField =  page.getByPlaceholder('email@example.com');
    const passwordField =  page.getByPlaceholder('enter your passsword');
    const loginBtn =  page.getByRole('button', { name: "Login"});
    const productName = 'iphone 13 pro';
    const myEmail = 'makanda.odwa@gmail.com';
    const password = 'Issie24!';

    await emailField.fill(myEmail);
    await passwordField.fill(password);
    await loginBtn.click();
    
    //Login successful assertion
     const text = await page.locator('.toast-success').textContent();
     expect(text?.trim()).toBe('Login Successfully');
     console.log(text);

     //Product Page Loading
     await page.waitForLoadState('networkidle');
     await page.getByText(productName).waitFor({state: 'visible'});
     const products =  page.locator('.card-body'); 
     
     await products.filter({hasText: productName})
                   .getByRole('button', { name: " Add To Cart"}).click();


    //Cart confirmation
    await page.locator("[class*='ng-trigger']").waitFor();
    const productToCartConfirmationText = await page.locator("[class*='toast-success']").textContent();
    
    //Added to cart assertion
    await expect(productToCartConfirmationText?.trim()).toBe("Product Added To Cart");
    
    //Going to the cart page
    await page.locator('li').getByRole('button', { name: "Cart"}).click();
    await expect(page.locator('div li').first()).toBeVisible();
    
    
    //Finding the product in the cart amongst other products
    await expect(page.getByText(productName)).toBeVisible();
    
    //Proceeding to checkout
    await page.getByRole('button', {name: 'Checkout'}).click();
   
    //Filling in the payment details
    await expect(page.getByRole('button', { name: 'Apply Coupon' })).toBeVisible();
    const coupon = 'rahulshettyacademy';
    const creditCardNo = '1234567891012'
    const creditCardField = page.locator('.row input').nth(0);

    await creditCardField.fill('');
    await creditCardField.fill(creditCardNo);

    //Date section
    const months = await page.locator('.ddl').nth(0);
    const dates = await page.locator('.ddl').nth(1);

    await dates.selectOption('15');
    await months.selectOption('07');

    await page.locator('.row input').nth(1).fill('2548'); //CVV Field
    await page.locator('.row input').nth(2).fill('Lindokuhle M'); //Name on the Card DateField
    await page.locator('.row input').nth(3).fill(coupon); //Coupon Field
    await page.getByRole('button', { name: 'Apply Coupon' }).click(); //Clicking the Coupon button to apply the coupon code
    await page.locator("[class*='mt-1 ng-star-inserted']").waitFor();
    const couponConfirmationText = await page.locator("[class*='mt-1 ng-star-inserted']").textContent();
    expect(couponConfirmationText?.trim()).toBe('* Coupon Applied');

    //Validating if the email address is the same as the login email
    const emailLabel = await page.locator(`label:has-text("${myEmail}")`).textContent();
    expect(emailLabel?.trim()).toBe(myEmail);

    //Select Country
    await page.getByPlaceholder('Select Country').pressSequentially("south",{delay:100});
    const dropdown = await page.locator(".ta-results");
    await dropdown.waitFor();
    await page.getByRole('button', { name: /south africa/i }).click();
    await page.locator('.action__submit').click();

    //Order Confirmation Page
    await expect(page.getByText('Thankyou for the order.')).toBeVisible();
    const orderIDtext = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();

    const myOrderID = orderIDtext
                    ?.split('|')[1]
                    ?.trim();

    await page.getByRole('button', { name: 'ORDERS' }).click();

    //View Orders Page
    const rows =  page.locator('tbody tr');
    await expect(rows.first()).toBeVisible();

    await rows.filter({hasText: myOrderID})
              .getByRole('button', { name: 'View'})
              .click();
   
    await expect(page.getByText('Thank you for Shopping With Us')).toBeVisible();
    const ordeSummeryId = (await page.locator('.col-text').textContent())?.trim();
    expect(ordeSummeryId).toBe(myOrderID);
    
});