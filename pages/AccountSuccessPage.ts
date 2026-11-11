import { Locator, Page } from '@playwright/test';

export class AccountSuccessPage {
    private readonly page: Page;

    // Locators
    private readonly confirmationHeading: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.confirmationHeading = page.getByRole('heading', {
            name: 'Your Account Has Been Created!',
            exact: true,
        });
    }

    /**
     * Checks whether the account-created confirmation is displayed.
     * @returns Promise<boolean> - true when the confirmation heading is visible
     */
    async isAccountCreated(): Promise<boolean> {
        return this.confirmationHeading.isVisible();
    }
}