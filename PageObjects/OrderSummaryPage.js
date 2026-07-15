class OrderSummaryPage
{
    constructor(page)
    {
        this.page = page;

    }

    async getOrderSummaryId()
    {
         return (await this.page.locator('.col-text').textContent())?.trim();
    }
}

module.exports = {OrderSummaryPage};