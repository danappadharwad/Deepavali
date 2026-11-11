import { Locator, Page } from '@playwright/test';

export class RegisterPage {
    private readonly page: Page;

    // Locators
    private readonly heading: Locator;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly telephoneInput: Locator;
    private readonly passwordInput: Locator;
    private readonly passwordConfirmInput: Locator;
    private readonly privacyPolicyCheckbox: Locator;
    private readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.heading = page.getByRole('heading', { name: 'Register Account', exact: true });
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.emailInput = page.getByPlaceholder('E-Mail');
        this.telephoneInput = page.getByPlaceholder('Telephone');
        this.passwordInput = page.getByPlaceholder('Password', { exact: true });
        this.passwordConfirmInput = page.getByPlaceholder('Password Confirm');
        this.privacyPolicyCheckbox = page.getByRole('checkbox');
        this.continueButton = page.getByRole('button', { name: 'Continue', exact: true });
    }

    /**
     * Checks whether the registration page is displayed.
     * @returns Promise<boolean> - true when the registration heading is visible
     */
    async isRegistrationPageDisplayed(): Promise<boolean> {
        return this.heading.isVisible();
    }

    /**
     * Fills the customer registration form.
     * @param firstName - Customer first name
     * @param lastName - Customer last name
     * @param email - Customer email address
     * @param telephone - Customer telephone number
     * @param password - Customer password
     */
    async fillRegistrationForm(
        firstName: string,
        lastName: string,
        email: string,
        telephone: string,
        password: string,
    ): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.telephoneInput.fill(telephone);
        await this.passwordInput.fill(password);
        await this.passwordConfirmInput.fill(password);
    }

    /**
     * Accepts the Privacy Policy.
     */
    async acceptPrivacyPolicy(): Promise<void> {
        await this.privacyPolicyCheckbox.check();
    }

    /**
     * Submits the customer registration form.
     */
    async submitRegistration(): Promise<void> {
        await this.continueButton.click();
    }
}