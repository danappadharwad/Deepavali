# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: web\customer-registration.spec.ts >> Customer registration succeeds @master @sanity @web
- Location: tests\web\customer-registration.spec.ts:4:1

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Test source

```ts
  1  | import { test, expect } from '../../fixtures/pageFixtures';
  2  | import { RandomDataUtil } from '../../utils/dataGenerator';
  3  | 
  4  | test('Customer registration succeeds @master @sanity @web', async ({
  5  |     homePage,
  6  |     loginPage,
  7  |     registerPage,
  8  |     accountSuccessPage,
  9  |     myAccountPage,
  10 | }) => {
  11 |     let customerEmail = '';
  12 |     let customerPassword = '';
  13 | 
  14 |     await test.step('1) Navigate to My Account and open Register', async () => {
  15 |         await homePage.clickMyAccount();
  16 |         await loginPage.clickRegister();
> 17 |         expect(await registerPage.isRegistrationPageDisplayed()).toBeTruthy();
     |                                                                  ^ Error: expect(received).toBeTruthy()
  18 |     });
  19 | 
  20 |     await test.step('2) Generate unique customer registration data', async () => {
  21 |         const [emailName, emailDomain] = RandomDataUtil.getEmail().split('@');
  22 |         customerEmail = `${emailName}${Date.now()}@${emailDomain}`;
  23 |         customerPassword = RandomDataUtil.getPassword(12);
  24 |     });
  25 | 
  26 |     await test.step('3) Complete and submit the registration form', async () => {
  27 |         await registerPage.fillRegistrationForm(
  28 |             RandomDataUtil.getFirstName(),
  29 |             RandomDataUtil.getLastName(),
  30 |             customerEmail,
  31 |             RandomDataUtil.getPhoneNumber(),
  32 |             customerPassword,
  33 |         );
  34 |         await registerPage.acceptPrivacyPolicy();
  35 |         await registerPage.submitRegistration();
  36 |     });
  37 | 
  38 |     await test.step('4) Verify account creation and availability through My Account', async () => {
  39 |         expect(await accountSuccessPage.isAccountCreated()).toBeTruthy();
  40 | 
  41 |         await homePage.clickMyAccount();
  42 |         if (await loginPage.isLoginPageDisplayed()) {
  43 |             await loginPage.login(customerEmail, customerPassword);
  44 |         }
  45 | 
  46 |         expect(await myAccountPage.isMyAccountPageDisplayed()).toBeTruthy();
  47 |     });
  48 | });
```