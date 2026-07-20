const {LoginPage} = require('../PageObjects/LoginPage');
const {TestValidations} = require('../Utils/TestValidations');
const {ProductDashboard} = require('../PageObjects/ProductDashboard');
const {CartPage} = require('../PageObjects/CartPage');
const {OrderDetailsPage} = require('../PageObjects/OrderDetailsPage');
const {OrderConfirmationPage} = require('../PageObjects/OrderConfirmationPage');
const {MyOrdersPage} = require('../PageObjects/MyOrdersPage');
const {OrderSummaryPage} = require('../PageObjects/OrderSummaryPage');
class POManager
{
    constructor(page)
    {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.testValidations = new TestValidations(page);
        this.productDashboardPage = new ProductDashboard(page);
        this.cartPage = new CartPage(page);
        this.orderPage = new OrderDetailsPage(page);
        this.orderConfirmationPage = new OrderConfirmationPage(page);
        this.myOrdersPage = new MyOrdersPage(page);
        this.summaryPage = new OrderSummaryPage(page);
    }

    getLoginPage()
    {
        return this.loginPage;
    }
    getTestalidations(){
        return this.testValidations;
    }
    getDashboardPage()
    {
        return this.productDashboardPage;
    }
    getCartPage(){
        return this.cartPage;
    }
    getOrderPage(){
        return this.orderPage;
    }
    getOrderConfirmationPage(){
        return this.orderConfirmationPage;
    }
    getMyOrdersPage(){
        return this.myOrdersPage;
    }
    getSummaryPage(){
        return this.summaryPage;
    }

}

module.exports = {POManager};