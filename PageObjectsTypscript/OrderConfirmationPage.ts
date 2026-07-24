import {type Locator, type Page} from '@playwright/test';

export class OrderConfirmationPage
{
    page: Page;
    ordersBtn: Locator;

    constructor(page: Page)
    {
        this.page = page;
        this.ordersBtn = page.getByRole('button', { name: 'ORDERS' });
    }

    async getOrderID(): Promise<any> 
    {        
        const text = await this.page
        .locator('.em-spacer-1 .ng-star-inserted')
        .textContent();

        if (!text) {
            throw new Error("Order ID not found.");
        }

        const orderId = text.split('|')[1]?.trim();

        if (!orderId) {
            throw new Error("Could not extract Order ID.");
        }

        return orderId;
    }

    async navigateToOrdersPage()
    {
        await this.ordersBtn.click();
    }
}
