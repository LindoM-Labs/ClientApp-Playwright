import { type Locator, type Page } from "@playwright/test";

export class OrderSummaryPage
{
    page: Page;

    constructor(page: Page)
    {
        this.page = page;

    }

    async getOrderSummaryId(): Promise<any>
    {
        const text = await this.page
        .locator('.col-text')
        .textContent();

        if (!text) {
            throw new Error("Order Summary ID not found.");
        }

        const orderSummaryId = text.trim();

        if (!orderSummaryId) {
            throw new Error("Could not extract Order Summary ID.");
        }

        return orderSummaryId;
        
    }
}

