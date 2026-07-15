
class CartPage
{
    constructor(page){
        this.page = page;
        this.checkoutBtn =  page.getByRole('button', {name: 'Checkout'})

    }

    
    async checkout()
    {
        await this.checkoutBtn.click();
    }


}

module.exports = {CartPage};