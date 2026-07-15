const {expect} = require('@playwright/test');

class TestValidations 
{
    constructor(page)
    {
        this.page = page;
    }

    async loginPageValidation(loginText)
    {
        const text = await this.page.locator('.toast-success').textContent();
        expect(text?.trim()).toBe(loginText);
        
    }

    async productAddedValidation()
    {
        const productToCartConfirmationText = await this.page.locator("[class*='toast-success']").textContent();
        await expect(productToCartConfirmationText?.trim()).toBe("Product Added To Cart");
    }

    async waitForCartLocator(locator)
    {
        await expect(this.page.locator(locator).first()).toBeVisible();
    }
      async waitForProductLocator(productName)
    {
        await this.page.getByText(productName).waitFor({state: 'visible'});
    }
    async waitForCouponBtn(btnText){
       await expect(this.page.getByRole('button', { name: btnText })).toBeVisible();
    }
    async couponAppliedValidation()
    {
        await this.page.getByRole('button', { name: 'Apply Coupon' }).click(); //Clicking the Coupon button to apply the coupon code
        await this.page.locator("[class*='mt-1 ng-star-inserted']").waitFor();
        const couponConfirmationText = await this.page.locator("[class*='mt-1 ng-star-inserted']").textContent();
        expect(couponConfirmationText?.trim()).toBe('* Coupon Applied');

    }

    async emailValidation(myEmail){
            const emailLabel = await this.page.locator(`label:has-text("${myEmail}")`).textContent();
            expect(emailLabel?.trim()).toBe(myEmail);
    }

    async orderConfirmationValidation()
    {
         await expect(this.page.getByText('Thankyou for the order.')).toBeVisible();
    }

    async rowsVisibilityValidation(rows){
         await expect(await rows.first()).toBeVisible();
    }

    async orderSummaryLocator(){
         await expect(this.page.getByText('Thank you for Shopping With Us')).toBeVisible();
    }

    async validateOrderID(summaryId, orderId){
        expect(summaryId).toBe(orderId);
    }
    
   

}

module.exports = {TestValidations};