import { test as base } from '@playwright/test';

type OrderData = {
    username: string;
    password: string;
    productName: string;
    creditCardNo: string;
    date: string;
    month: string;
    cvv: string;
    nameOnTheCard: string;
    coupon: string;
    countryPrefix: string;
    country: string;
};

export const test = base.extend<{
    testDataForOrder: OrderData;
}>({
    testDataForOrder: async ({}, use) => {
        await use({
            username: "Issie@gmail.com",
            password: "Luphawu24!",
            productName: "ADIDAS ORIGINAL",
            creditCardNo: "1234567887412",
            date: "13",
            month: "11",
            cvv: "147852",
            nameOnTheCard: "Isiphile M",
            coupon: "rahulshettyacademy",
            countryPrefix: "ind",
            country: "India"
        });
    }
});