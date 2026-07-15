class OrderConfirmationPage
{
    constructor(page){
        this.page = page;
        this.ordersBtn = page.getByRole('button', { name: 'ORDERS' });
    }

    async getOrderID()
    {        
        return (await this.page.locator('.em-spacer-1 .ng-star-inserted').textContent())?.split('|')[1]?.trim();
    }

    async navigateToOrdersPage()
    {
        await this.ordersBtn.click();
    }
}

module.exports = {OrderConfirmationPage};