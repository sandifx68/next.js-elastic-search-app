import { test, expect } from '../fixtures';

test('user can log in and sign out', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('john');
  await page
    .getByRole('textbox', { name: 'Password', exact: true })
    .fill('pass');
  await page.getByRole('textbox', { name: 'Confirm password' }).fill('pass');
  await page.getByRole('button', { name: 'Sign up!' }).click();
  await page.waitForURL('/');
  expect(page.locator('nav')).toContainText('john');
  expect(page.locator('nav')).toContainText('Logout');

  await page.getByRole('button', { name: 'Logout' }).click();
  await expect(page.locator('nav')).not.toContainText('john');
  expect(page.locator('nav')).not.toContainText('Logout');
});
