import {test as baseTest} from '@playwright/test';
import { LoginPage } from '../PageObjects/LoginPage';
import { CartPage } from '../PageObjects/CartPage'; 
import { ProductDashboard } from '../PageObjects/ProductDashboard';
import { MyOrdersPage } from '../PageObjects/MyOrdersPage';
import { OrderDetailsPage } from '../PageObjects/OrderDetailsPage';
import { OrderConfirmationPage } from '../PageObjects/OrderConfirmationPage';
import { OrderSummaryPage } from '../PageObjects/OrderSummaryPage';
import {ClientAppBusinessAssertions} from '../Utils/ClientAppBusinessAssertions'


type PomFixtures = {
    loginPage: LoginPage,
    cartPage: CartPage,
    dashboardPage: ProductDashboard,
    ordersPage: MyOrdersPage,
    orderDetailsPage: OrderDetailsPage,
    orderConfirmationPage: OrderConfirmationPage,
    orderSummaryPage: OrderSummaryPage,
    businessAssertions: ClientAppBusinessAssertions
};

type UserFixtures = {
    validUser: {
        username: string,
        password: string
    },
    invalidEmailCredential: {
        username: string,
        password: string
    },
    invalidPasswordCredential: {
        username: string,
        password: string
    }
};

export const test = baseTest.extend<PomFixtures,UserFixtures>({
    loginPage: async({page}, use)=>{
        await use(new LoginPage(page));
    },
    cartPage: async({page}, use)=>{
        await use(new CartPage(page));
    },
    dashboardPage: async({page}, use)=>{
        await use(new ProductDashboard(page));
    },
    ordersPage: async({page}, use)=>{
        await use(new MyOrdersPage(page));
    },
    orderDetailsPage: async({page}, use)=>{
        await use(new OrderDetailsPage(page));
    },
    orderConfirmationPage: async({page}, use)=>{
        await use(new OrderConfirmationPage(page));
    },
    orderSummaryPage: async({page}, use)=>{
        await use(new OrderSummaryPage(page));
    },
    businessAssertions: async({page}, use)=>{
        await use(new ClientAppBusinessAssertions(page));
    },
    validUser: [async({}, use)=>{

        await use({username: "Issie@gmail.com", password: "Luphawu24!"});

    }, {scope: "worker"}],
    invalidEmailCredential:[ async({}, use)=>{
      
        await use({username: "dajgadjvodag", password: "Luphawu24!"});

    }, {scope: "worker"}],
     invalidPasswordCredential:[ async({}, use)=>{
      
        await use({username: "Issie@gmail.com", password: "Luphawu24!Invalid"});
        
    }, {scope: "worker"}]
   
});