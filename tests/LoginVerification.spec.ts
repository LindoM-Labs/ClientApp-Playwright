import {test} from '../fixtures/AppFixtures.ts';


test("@NegScenarios @Login Empty credentials Test", async ({ loginPage, businessAssertions }) => {
    await loginPage.navigateToLoginPage();
    await loginPage.login("","");
    await businessAssertions.assertEmptyCredentials();
});

test("@NegScenarios @Login Invalid Email Test", async ({ loginPage, businessAssertions,invalidEmailCredential }) => {
  await loginPage.navigateToLoginPage(); 
  await loginPage.login(invalidEmailCredential.username,invalidEmailCredential.password);
  await businessAssertions.invalidEmailCredentials();
});

test("@NegScenarios @Login Invalid Password Test", async ({ loginPage, businessAssertions, invalidPasswordCredential }) => {
 
  await loginPage.navigateToLoginPage(); 
  await loginPage.login(invalidPasswordCredential.username,invalidPasswordCredential.password);
  await businessAssertions.invalidPasswordCredentials();
});

test("@NegScenarios @Login Valid Credentials Test", async ({ loginPage, businessAssertions, validUser }) => {
 
  await loginPage.navigateToLoginPage(); 
  await loginPage.login(validUser.username,validUser.password);
  await businessAssertions.successfullLoginCredentials();
});