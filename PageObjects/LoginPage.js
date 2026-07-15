class LoginPage
{
    constructor(page)
    {
        this.page = page;
        this.usernameField =  page.getByPlaceholder('email@example.com');
        this.passwordField =  page.getByPlaceholder('enter your passsword');
        this.loginBtn =  page.getByRole('button', { name: "Login"});
    }

    async login(username, password)
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

module.exports = {LoginPage};