import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';

test('Customer registration succeeds @master @sanity @web', async ({
    homePage,
    registerPage,
    accountSuccessPage,
    myAccountPage,
}) => {
    let customerEmail = '';
    let customerPassword = '';

    await test.step('1) Navigate to My Account and open Register', async () => {
        await homePage.clickMyAccount();
        await homePage.clickRegister();
        await expect.poll(() => registerPage.isRegistrationPageDisplayed()).toBeTruthy();
    });

    await test.step('2) Generate unique customer registration data', async () => {
        const [emailName, emailDomain] = RandomDataUtil.getEmail().split('@');
        customerEmail = `${emailName}${Date.now()}@${emailDomain}`;
        customerPassword = RandomDataUtil.getPassword(12);
    });

    await test.step('3) Complete and submit the registration form', async () => {
        await registerPage.fillRegistrationForm(
            RandomDataUtil.getFirstName(),
            RandomDataUtil.getLastName(),
            customerEmail,
            RandomDataUtil.getPhoneNumber(),
            customerPassword,
        );
        await registerPage.acceptPrivacyPolicy();
        await registerPage.submitRegistration();
    });

    await test.step('4) Verify account creation and availability through My Account', async () => {
        await expect.poll(() => accountSuccessPage.isAccountCreated()).toBeTruthy();

        await homePage.clickMyAccount();
        await expect.poll(() => myAccountPage.isMyAccountPageDisplayed()).toBeTruthy();
    });
});