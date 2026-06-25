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
    const passwordField =  page.locator('#userPassword');
    const loginBtn =  page.locator('#login');
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
     const titles = await page.locator('.card-body b').allTextContents();
     console.log(titles);

    //Adding a product to the cart
    //Option 1: Selecting the product from the page
    // const myProduct = await page.locator('h5').nth(2).textContent(); // Getting the name of the product i will be placing in the cart and use it for validations
    // console.log(myProduct);
    // await page.locator("[class*='w-10']").nth(2).click(); // Clicking on the add to cart button of the product i will be placing in the cart

    //Option 2: Using for loop to get the product
    const count = await products.count();
    for(let i = 0; i < count; i++){
        const name = (await products.nth(i).locator('b').textContent())?.trim();
        console.log(name);
        if(name === productName){
           await page.locator("[class*='w-10']").nth(i).click();
           break;
        }
    }

    //Cart confirmation
    await page.locator("[class*='ng-trigger']").waitFor();
    const productToCartConfirmationText = await page.locator("[class*='toast-success']").textContent();
    
    //Added to cart assertion
    await expect(productToCartConfirmationText?.trim()).toBe("Product Added To Cart");
    console.log(productToCartConfirmationText);
    
    //Going to the cart page
    // Option 1: const cartBtn = await page.locator("[class*='btn-custom']").nth(2);
    //Option 2:
    await page.locator("[routerlink*='cart']").click();
    await page.locator('div li').first().waitFor({state: 'visible'});// This gives assurance that the page is loaded with the products

    //Finding the product in the cart amongst other products
    //Option 1: Getting a collection of all the headings, then using .toContainText(productName) with expect, to confirm if it does exist
    // const cartItems = await page.locator('.cart h3');
    // await expect(cartItems).toContainText(productName);// .toContainText() is used to go through the text elements especially if they are a collection of elements and check if the text is present in any of them. .toHaveText() is used to check if the text is present in a single element
   
    //Option 2: Using Playwright CSS selector with a text psueso-class
    const bool = await page.getByRole('heading', { name: /iphone/i }); //Returns Boolean value
    expect(bool).toBeTruthy();

    //Proceeding to checkout
    await page.getByRole('button', {name: 'Checkout'}).click();
    const paymentPageText = await page.locator('.payment__title').nth(0).textContent();
   
    //Filling in the payment details
    expect(paymentPageText?.trim()).toBe('Payment Method');
    console.log(paymentPageText);
    const coupon = 'rahulshettyacademy';
    const creditCardNo = '1234567891012'
    const creditCardField = await page.locator('.row input').nth(0);

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

    await page.getByPlaceholder('Select Country').pressSequentially("south",{delay:100});
    const dropdown = await page.locator(".ta-results");
    await dropdown.waitFor();
    await page.getByRole('button', { name: /south africa/i }).click();
    // const options = dropdown.locator("button");
    // await dropdown.waitFor();
    // const optionsCount = await options.count();

    // for(let i = 0; i < optionsCount; i++){
    //     const option = options.nth(i);
    //     const text = (await option.textContent()).trim();
    //    // const countryOption = (await dropdown.locator("button").nth(i).textContent())?.trim();
    //     console.log(text);
    //     if(text?.toLowerCase() === "south africa"){
    //         await dropdown.locator("button").nth(i).click();
    //         break;
    //     }
    // }
   
    await page.locator('.action__submit').click();

    //Order Confirmation Page
    await expect(page.locator('.hero-primary')).toBeVisible();
    const orderIDtext = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();

    const myOrderID = orderIDtext
                    ?.split('|')[1]
                    ?.trim();

    console.log(myOrderID);
    await page.locator("li [routerlink*='myorders']").click();

    //View Orders Page
    const rows =  page.locator('tbody tr');
    await expect(rows.first()).toBeVisible();
    const rowCount = await rows.count();
    console.log(rowCount);

    for(let i = 0; i < rowCount; i++){
        const row = rows.nth(i);
        const rowOrderId = (await row.locator("th").textContent())?.trim();
        console.log(rowOrderId);

        if(rowOrderId === myOrderID){
            await row.locator("td .btn-primary").click();
            break;
        }
    }

    await expect(page.locator('.email-preheader p')).toBeVisible();
    const ordeSummeryId = (await page.locator('.col-text').textContent())?.trim();
    expect(ordeSummeryId).toBe(myOrderID);
    
});