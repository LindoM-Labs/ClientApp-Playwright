const {TestValidations} = require('../tests/Utils/TestValidations');

class OrderDetailsPage
{
    constructor(page){
        this.page = page;
        this.couponBtn = page.getByRole('button', { name: 'Apply Coupon' });
        this.creditCardField = page.locator('.row input').nth(0);
        this.months =  page.locator('.ddl').nth(0);
        this.dates = page.locator('.ddl').nth(1);
        this.cvvField =  page.locator('.row input').nth(1);
        this.nameOnTheCardField =  page.locator('.row input').nth(2); 
        this.couponField =  page.locator('.row input').nth(3);
        this.countryField =  page.getByPlaceholder('Select Country');
        this.dropdown = page.locator(".ta-results");
        this.placeOrderBtn = page.locator('.action__submit');
    }

   

    async fillDetails(creditCardNo, date, month, cvv, nameOnTheCard, coupon, countryPrefix)
    {
        await this.creditCardField.fill('');
        await this.creditCardField.fill(creditCardNo);
        await this.dates.selectOption(date);
        await this.months.selectOption(month);
        await this.cvvField.fill(cvv);
        await this.nameOnTheCardField.fill(nameOnTheCard);
        await this.countryField.pressSequentially(countryPrefix,{delay:100});
        await this.dropdown.waitFor();
        await this.page.getByRole('button', { name: /south africa/i }).click();
        await this.couponFieldHandling(coupon);
        await this.placeOrderBtn.click();

    }
     async couponFieldHandling(coupon)
    {
        const testValidation = new TestValidations(this.page);
        await this.couponField.fill(coupon);
        await testValidation.couponAppliedValidation();
    }
}

module.exports = {OrderDetailsPage};