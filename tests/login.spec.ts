import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', () => {
    test('Standard user can log in and view the inventory', async ({ page }) => {
        const loginPage = new LoginPage(page);

        // 1. Open a fresh login page.
        await loginPage.navigate();

        // 2. Enter the standard user's credentials and submit the form.
        await loginPage.login('standard_user', 'secret_sauce');

        // 3. Verify that the inventory is available after login.
        await expect(page).toHaveURL(/\/inventory\.html$/);
        await expect(page.getByRole('button', { name: 'Add to cart' })).toHaveCount(6);
        await expect(loginPage.errorMessage).toHaveCount(0);
    });
});