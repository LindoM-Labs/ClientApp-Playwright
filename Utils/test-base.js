//For every test case, create a custom feature here like testDataOrder

const { test: base } = require('@playwright/test');

exports.test = base.test.extend(
    {
        testDataForOrder :  
        {
            username : "Issie@gmail.com",
            password : "Luphawu24!",
            productName : "ADIDAS ORIGINAL",
            creditCardNo : "1234567887412",
            date : "13",
            month : "11",
            cvv : "147852",
            nameOnTheCard : "Isiphile M",
            coupon : "rahulshettyacademy",
            countryPrefix : "ind",
            country : "India"
        }
    }
);