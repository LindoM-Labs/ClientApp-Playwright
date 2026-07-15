class ProductDashboard
{
    constructor(page)
    {
        this.page = page;
        this.products = page.locator('.card-body');
        this.cartButton = page.locator('li').getByRole('button', { name: "Cart"});
    }

  

    async addProductToCart(productName)
    {
        await this.products
                           .filter({hasText: productName})
                           .getByRole('button', { name: " Add To Cart"})
                           .click();

        await this.page.locator("[class*='ng-trigger']").waitFor();
    }

    async navigateToCart()
    {
        await this.cartButton.click();
    }
}

module.exports = {ProductDashboard};