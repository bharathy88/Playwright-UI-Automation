import { test, expect } from '@playwright/test';

test('Practice Playwright locators', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    // Using getByRole
    await page.getByRole('textbox', { name: 'Username' })
        .fill('standard_user');

    // Using locator
    await page.locator('#password')
        .fill('secret_sauce');

    // Using getByRole
    await page.getByRole('button', { name: 'Login' })
        .click();

    // Using getByText
    await expect(page.getByText('Products')).toBeVisible();

});