const {TestValidations} = require('../tests/Utils/TestValidations');
class MyOrdersPage
{
    constructor(page)
    {
        this.page = page;
        this.rows =  page.locator('tbody tr');
        this.confirmVisibility(this.rows);
    }

    async viewMyOrder(orderId)
    {
        await this.rows.filter({hasText: orderId})
                    .getByRole('button', { name: 'View'})
                    .click();
        
    }

    async confirmVisibility()
    {
        new TestValidations(this.page).rowsVisibilityValidation(this.rows);
    }
}

module.exports = {MyOrdersPage};