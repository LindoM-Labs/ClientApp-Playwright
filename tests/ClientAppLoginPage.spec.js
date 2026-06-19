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

    // const invalidCredentialError = await page.locator('.toast-message').textContent();
    // console.log(invalidCredentialError);
});

test('Valid Credentials Test', async({page}) =>
{
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
   
    const emailField = page.getByPlaceholder('email@example.com');
    const passwordField = page.locator('#userPassword');
    const loginBtn = page.locator('#login');

    await emailField.fill('makanda.odwa@gmail.com');
    await passwordField.fill('Issie24!');
    await loginBtn.click();
    
  
     const text = await page.locator('.toast-success').textContent();
     expect(text?.trim()).toBe('Login Successfully');
     console.log(text);

    //await expect(page.locator('.toast-tittle')).toHaveText(' Login Successful ', { exact: true });


});