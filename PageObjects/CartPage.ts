 import {type Locator, type Page} from '@playwright/test';

 
export class CartPage
{
    page: Page;
    checkoutBtn: Locator;

    constructor(page: Page){
        this.page = page;
        this.checkoutBtn =  page.getByRole('button', {name: 'Checkout'})

    }

    
    async checkout()
    {
        await this.checkoutBtn.click();
    }


}

