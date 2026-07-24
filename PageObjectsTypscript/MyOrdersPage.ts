import {TestValidations} from '../Utils/TestValidations';
import {type Locator, type Page} from '@playwright/test';

export class MyOrdersPage
{
    page: Page;
    rows: Locator;


    constructor(page: Page)
    {
        this.page = page;
        this.rows =  page.locator('tbody tr');
        
    }

    async viewMyOrder(orderId: string)
    {
        await this.rows.filter({hasText: orderId})
                    .getByRole('button', { name: 'View'})
                    .click();
        
    }

    async confirmVisibility()
    {
       await new TestValidations(this.page).rowsVisibilityValidation(this.rows);
    }
}
