import { Locator, Page } from '@playwright/test';

export class HomePage {
    private readonly page: Page;

    // Locators
    private readonly myAccountLink: Locator;
    private readonly registerLink: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.myAccountLink = page
            .getByRole('navigation')
            .first()
            .getByRole('link', { name: /My Account/ });
        this.registerLink = page.getByRole('link', { name: 'Register', exact: true });
    }

    /**
     * Opens the My Account area.
     */
    async clickMyAccount(): Promise<void> {
        await this.myAccountLink.click();
    }

    /**
     * Opens the customer registration form from the My Account menu.
     */
    async clickRegister(): Promise<void> {
        await this.registerLink.click();
    }
}