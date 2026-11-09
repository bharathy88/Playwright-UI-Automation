import { test, expect } from '@playwright/test';

test('Invalid username', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.locator('#user-name').fill('wrong_user');

    await page.locator('#password').fill('secret_sauce');

    await page.locator('#login-button').click();

    await expect(page.locator('[data-test="error"]'))
        .toContainText('Username and password do not match');

});

test('Invalid password', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.locator('#user-name').fill('standard_user');

    await page.locator('#password').fill('wrong_password');

    await page.locator('#login-button').click();

    await expect(page.locator('[data-test="error"]'))
        .toContainText('Username and password do not match');

});