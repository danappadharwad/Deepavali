import { test as base, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { AccountSuccessPage } from '../pages/AccountSuccessPage';
import { HomePage } from '../pages/HomePage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { RegisterPage } from '../pages/RegisterPage';

dotenv.config();

const APP_URL = process.env.WEB_APP_URL || 'https://awesomeqa.com/ui/';

type PageFixtures = {
    homePage: HomePage;
    registerPage: RegisterPage;
    accountSuccessPage: AccountSuccessPage;
    myAccountPage: MyAccountPage;
};

export const test = base.extend<PageFixtures>({
    homePage: async ({ page }, use) => {
        await page.goto(APP_URL);
        await use(new HomePage(page));
    },
    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },
    accountSuccessPage: async ({ page }, use) => {
        await use(new AccountSuccessPage(page));
    },
    myAccountPage: async ({ page }, use) => {
        await use(new MyAccountPage(page));
    },
});

test.afterEach(async ({ page, context }) => {
    if (!page.isClosed()) {
        await page.close();
    }
    if (context.pages().length === 0) {
        await context.close();
    }
});

export { expect };