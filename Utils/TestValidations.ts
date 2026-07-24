import{expect, type Locator, type Page} from '@playwright/test';

export class TestValidations 
{
    page: Page;
    constructor(page: Page)
    {
        this.page = page;
    }

    async loginPageValidation(loginText: string)
    {
        const text = await this.page.locator('.toast-success').textContent();
        expect(text?.trim()).toBe(loginText);
        
    }

    async productAddedValidation()
    {
        // const productToCartConfirmationText = await this.page.getByRole('alert', { name: 'Product Added To Cart'}).textContent();
        // await expect(
        //     productToCartConfirmationText?.trim())
        // .toHaveText("Product Added To Cart");

        await expect(
                        this.page.getByRole('alert', { name: 'Product Added To Cart'})
                    ).toHaveText("Product Added To Cart");
    }

    async waitForCartLocator(locatorString: string)
    {
        await expect(this.page.locator(locatorString).first()).toBeVisible();
    }
      async waitForProductLocator(productName: string)
    {
        await this.page.getByText(productName).waitFor({state: 'visible'});
    }
    async waitForCouponBtn(btnText: string){
       await expect(this.page.getByRole('button', { name: btnText })).toBeVisible();
    }
    async couponAppliedValidation()
    {
        await this.page.getByRole('button', { name: 'Apply Coupon' }).click(); //Clicking the Coupon button to apply the coupon code
        await this.page.locator("[class*='mt-1 ng-star-inserted']").waitFor();
        const couponConfirmationText = await this.page.locator("[class*='mt-1 ng-star-inserted']").textContent();
        expect(couponConfirmationText?.trim()).toBe('* Coupon Applied');

    }

    async emailValidation(myEmail: string){
            const emailLabel = await this.page.locator(`label:has-text("${myEmail}")`).textContent();
            expect(emailLabel?.trim()).toBe(myEmail);
    }

    async orderConfirmationValidation()
    {
         await expect(this.page.getByText('Thankyou for the order.')).toBeVisible();
    }

    async rowsVisibilityValidation(rows: Locator){
         await expect(await rows.first()).toBeVisible();
    }

    async orderSummaryLocator(){
         await expect(this.page.getByText('Thank you for Shopping With Us')).toBeVisible();
    }

    async validateOrderID(summaryId: string, orderId: string ){
        expect(summaryId).toBe(orderId);
    }
    
   

}

