// @ts-check
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

test('should login successfully', 
  async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateTo('/');

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page.locator('text=Products')).toBeVisible();
  }
)

test('should show error for invalid login credentials',
  async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateTo('/');

    await loginPage.login('wrong_username', 'wrong_password');

    await expect(loginPage.getErrorMessage()).resolves.toContain('Username and password do not match any user in this service');
  }
)


test('should show error for empty username field',
  async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateTo('/');

    await loginPage.login('', 'secret_sauce');

    await expect(loginPage.getErrorMessage()).resolves.toContain('Username is required');
  }
)

test('should show error for empty pasword field',
  async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateTo('/');

    await loginPage.login('standard_user', '');

    await expect(loginPage.getErrorMessage()).resolves.toContain('Password is required');
  }
)
