import { test, expect } from '@playwright/test';

test('Verify successful login', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.locator('#user-name').fill('standard_user');

    await page.locator('#password').fill('secret_sauce');

    await page.locator('#login-button').click();

    // Verify URL
    await expect(page).toHaveURL(/inventory/);

    // Verify page heading
    await expect(page.getByText('Products')).toBeVisible();

    // Verify six products
    await expect(page.locator('.inventory_item')).toHaveCount(6);

});