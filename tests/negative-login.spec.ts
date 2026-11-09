import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const INVALID_CREDENTIALS_MESSAGE = 'Epic sadface: Username and password do not match any user in this service';

test.describe('Negative login scenarios', () => {
    test('Invalid username', async ({ page }) => {
        const loginPage = new LoginPage(page);

        // 1. Open the login page.
        await loginPage.navigate();

        // 2. Submit an unknown username with the valid demo password.
        await loginPage.login('invalid_user', 'secret_sauce');

        // 3. Verify the credential error and that login was rejected.
        await expect(loginPage.errorMessage).toHaveText(INVALID_CREDENTIALS_MESSAGE);
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });

    test('Invalid password', async ({ page }) => {
        const loginPage = new LoginPage(page);

        // 1. Open the login page.
        await loginPage.navigate();

        // 2. Submit the standard username with an incorrect password.
        await loginPage.login('standard_user', 'wrong_password');

        // 3. Verify the credential error and that login was rejected.
        await expect(loginPage.errorMessage).toHaveText(INVALID_CREDENTIALS_MESSAGE);
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });

    test('Empty username', async ({ page }) => {
        const loginPage = new LoginPage(page);

        // 1. Open the login page.
        await loginPage.navigate();

        // 2. Submit an empty username with the valid demo password.
        await loginPage.login('', 'secret_sauce');

        // 3. Verify the required-username error.
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username is required');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });

    test('Empty password', async ({ page }) => {
        const loginPage = new LoginPage(page);

        // 1. Open the login page.
        await loginPage.navigate();

        // 2. Submit the standard username without a password.
        await loginPage.login('standard_user', '');

        // 3. Verify the required-password error.
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Password is required');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });

    test('Locked-out user', async ({ page }) => {
        const loginPage = new LoginPage(page);

        // 1. Open the login page.
        await loginPage.navigate();

        // 2. Submit the locked-out user's credentials.
        await loginPage.login('locked_out_user', 'secret_sauce');

        // 3. Verify that access is denied with the locked-out message.
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });

    test('Login error message can be validated and dismissed', async ({ page }) => {
        const loginPage = new LoginPage(page);

        // 1. Open the login page.
        await loginPage.navigate();

        // 2. Submit invalid credentials to trigger the login error.
        await loginPage.login('invalid_user', 'secret_sauce');

        // 3. Verify the alert's exact message and dismiss control.
        await expect(loginPage.errorMessage).toHaveCount(1);
        await expect(loginPage.errorMessage).toHaveText(INVALID_CREDENTIALS_MESSAGE);
        await expect(loginPage.dismissErrorButton).toBeVisible();

        // 4. Dismiss the error and verify the user remains logged out.
        await loginPage.dismissErrorButton.click();
        await expect(loginPage.errorMessage).toHaveCount(0);
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
});