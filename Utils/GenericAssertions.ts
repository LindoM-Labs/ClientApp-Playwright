import { Locator, Page, expect } from "@playwright/test";

export class GenericAssertions{

    constructor(private page: Page){};


    async assertVisible(locator: Locator) {
        await expect(locator).toBeVisible();
    }

    async assertHidden(locator : Locator){
        await expect(locator).toBeHidden();
    }

    async assertText(locator: Locator, expectedText: string) {
        await expect(locator).toHaveText(expectedText);
    }

    async assertContainText(locator : Locator, expectedText : string){
        await expect(locator).toContainText(expectedText);
    }

    async assertURL(expectedURL: string | RegExp) {
        await expect(this.page).toHaveURL(expectedURL);
    }

    async assertEnabled(locator: Locator) {
        await expect(locator).toBeEnabled();
    }

    async assertElementCount(locator: Locator, count: number) {
        await expect(locator).toHaveCount(count);
    }

    async assertCount(locator : Locator, expectedCount : number){
        await expect(locator).toHaveCount(expectedCount);
    }
}