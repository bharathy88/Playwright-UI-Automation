import { Page, Locator } from '@playwright/test';

export class LoginPage {

    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly dismissErrorButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.username = page.getByPlaceholder('Username');

        this.password = page.getByPlaceholder('Password');

        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.getByRole('alert');
        this.dismissErrorButton = page.getByRole('button', { name: 'Dismiss error' });

    }

    async navigate() {

        await this.page.goto('https://www.saucedemo.com/');

    }

    async login(username: string, password: string) {

        await this.username.fill(username);

        await this.password.fill(password);

        await this.loginButton.click();

    }

}