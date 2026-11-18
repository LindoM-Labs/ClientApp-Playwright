import {type Locator,type Page} from '@playwright/test';
import { LoginPage } from "./LoginPage";
import{ TestValidations} from '../Utils/ClientAppBusinessAssertions';
import {ProductDashboard} from './ProductDashboard';
import {CartPage} from './CartPage';


import {OrderDetailsPage} from './OrderDetailsPage';
import {OrderConfirmationPage} from './OrderConfirmationPage';
import {MyOrdersPage} from './MyOrdersPage';
import {OrderSummaryPage} from './OrderSummaryPage';


export class POManager
{
    page: Page;
    loginPage;
    testValidations;
    productDashboardPage;
    cartPage;
    orderPage;
    orderConfirmationPage;
    myOrdersPage;
    summaryPage;

    constructor(page: Page)
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

    getLoginPage(): LoginPage
    {
        return this.loginPage;
    }
    getTestalidations(): TestValidations
    {
        return this.testValidations;
    }
    getDashboardPage(): ProductDashboard
    {
        return this.productDashboardPage;
    }
    getCartPage(): CartPage
    {
        return this.cartPage;
    }
    getOrderPage(): OrderDetailsPage
    {
        return this.orderPage;
    }
    getOrderConfirmationPage(): OrderConfirmationPage
    {
        return this.orderConfirmationPage;
    }
    getMyOrdersPage(): MyOrdersPage
    {
        return this.myOrdersPage;
    }
    getSummaryPage(): OrderSummaryPage
    {
        return this.summaryPage;
    }

}
