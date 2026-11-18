import { expect, type Locator, type Page } from "@playwright/test";

export class LoginPage
{
    page: Page;
    usernameField: Locator;
    passwordField: Locator;
    loginBtn: Locator;

    constructor(page: Page)
    {
        this.page = page;
        this.usernameField =  page.getByPlaceholder('email@example.com');
        this.passwordField =  page.getByPlaceholder('enter your passsword');
        this.loginBtn =  page.getByRole('button', { name: "Login"});
    }

    async login(username: string, password: string)
    {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginBtn.click();
       
    }

    async navigateToLoginPage()
    {
         await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    }
}

