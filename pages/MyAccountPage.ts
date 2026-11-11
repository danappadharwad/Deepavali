import { Locator, Page } from '@playwright/test';

export class MyAccountPage {
    private readonly page: Page;

    // Locators
    private readonly editAccountLink: Locator;
    private readonly logoutLink: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        const accountNavigation = page.getByRole('complementary');
        this.editAccountLink = accountNavigation.getByRole('link', { name: 'Edit Account', exact: true });
        this.logoutLink = accountNavigation.getByRole('link', { name: 'Logout', exact: true });
    }

    /**
     * Checks that authenticated account navigation is available.
     * @returns Promise<boolean> - true when Edit Account and Logout links are visible
     */
    async isMyAccountPageDisplayed(): Promise<boolean> {
        return (await this.editAccountLink.isVisible()) && this.logoutLink.isVisible();
    }
}