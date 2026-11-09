# SauceDemo Login Test Plan

## Scope

Validate the SauceDemo login experience for the standard user, including successful authentication, credential and required-field failures, locked-out-user handling, and login error presentation.

**Application:** https://www.saucedemo.com/  
**User story:** As a standard user, I want to log in to SauceDemo so that I can access the product inventory.  
**Execution note:** The application was explored with Playwright MCP. This document is a manual test plan; no automation scripts are included.

## Shared Preconditions

- The SauceDemo application is available in a supported browser.
- Begin each test in a fresh browser context or after logging out, on the login page with no authenticated session.
- The login form has Username and Password fields and a Login button.
- Use the publicly displayed demo credentials: `standard_user` and `secret_sauce`. The same password is shown for all listed demo users.
- Treat each scenario as independent; do not rely on values or state left by another scenario.

## Test Cases

### SD-LOGIN-001: Successful standard-user login

**Test objective:** Verify that a standard user can authenticate and access the product inventory.

**Preconditions:** Shared preconditions. The user is logged out and the login page is displayed.

**Test data:** Username: `standard_user`; Password: `secret_sauce`.

**Test steps:**
1. Enter `standard_user` in the Username field.
2. Enter `secret_sauce` in the Password field.
3. Select Login.
4. Inspect the resulting URL and inventory page.

**Expected result:** Authentication succeeds and the browser navigates to `/inventory.html`. The page displays the Products heading and the product inventory (six product entries were observed during exploration). No login error alert is displayed.

### SD-LOGIN-002: Invalid username

**Test objective:** Verify that an unrecognized username is rejected when paired with the valid demo password.

**Preconditions:** Shared preconditions. The login page is displayed.

**Test data:** Username: `invalid_user`; Password: `secret_sauce`.

**Test steps:**
1. Enter `invalid_user` in the Username field.
2. Enter `secret_sauce` in the Password field.
3. Select Login.
4. Inspect the page and login error message.

**Expected result:** The user remains on the login page and the alert displays `Epic sadface: Username and password do not match any user in this service`. The inventory is not shown.

### SD-LOGIN-003: Invalid password

**Test objective:** Verify that an incorrect password is rejected for a valid standard username.

**Preconditions:** Shared preconditions. The login page is displayed.

**Test data:** Username: `standard_user`; Password: `wrong_password`.

**Test steps:**
1. Enter `standard_user` in the Username field.
2. Enter `wrong_password` in the Password field.
3. Select Login.
4. Inspect the page and login error message.

**Expected result:** The user remains on the login page and the alert displays `Epic sadface: Username and password do not match any user in this service`. The inventory is not shown.

### SD-LOGIN-004: Empty username

**Test objective:** Verify that username is required when a password is provided.

**Preconditions:** Shared preconditions. The login page is displayed.

**Test data:** Username: empty; Password: `secret_sauce`.

**Test steps:**
1. Leave the Username field empty.
2. Enter `secret_sauce` in the Password field.
3. Select Login.
4. Inspect the page and login error message.

**Expected result:** The user remains on the login page and the alert displays `Epic sadface: Username is required`. The inventory is not shown.

### SD-LOGIN-005: Empty password

**Test objective:** Verify that password is required when a valid standard username is provided.

**Preconditions:** Shared preconditions. The login page is displayed.

**Test data:** Username: `standard_user`; Password: empty.

**Test steps:**
1. Enter `standard_user` in the Username field.
2. Leave the Password field empty.
3. Select Login.
4. Inspect the page and login error message.

**Expected result:** The user remains on the login page and the alert displays `Epic sadface: Password is required`. The inventory is not shown.

### SD-LOGIN-006: Locked-out user

**Test objective:** Verify that the application prevents a locked-out account from accessing inventory.

**Preconditions:** Shared preconditions. The login page is displayed.

**Test data:** Username: `locked_out_user`; Password: `secret_sauce`.

**Test steps:**
1. Enter `locked_out_user` in the Username field.
2. Enter `secret_sauce` in the Password field.
3. Select Login.
4. Inspect the page and login error message.

**Expected result:** Authentication is denied, the user remains on the login page, and the alert displays `Epic sadface: Sorry, this user has been locked out.` The inventory is not shown.

### SD-LOGIN-007: Login error message validation and dismissal

**Test objective:** Verify that a credential error is exposed as a login alert with the exact message and can be dismissed.

**Preconditions:** Shared preconditions. The login page is displayed with no existing error alert.

**Test data:** Username: `invalid_user`; Password: `secret_sauce`; Expected message: `Epic sadface: Username and password do not match any user in this service`.

**Test steps:**
1. Enter `invalid_user` in the Username field.
2. Enter `secret_sauce` in the Password field.
3. Select Login.
4. Verify that one alert is present and its complete text exactly matches the expected message.
5. Verify that the alert provides a control named `Dismiss error`.
6. Select `Dismiss error`.
7. Verify that the alert is removed and the user remains on the login page.

**Expected result:** The mismatch message is available through an alert, matches the expected text exactly, and is removed when `Dismiss error` is selected. Dismissing the error does not authenticate the user or navigate away from the login page.