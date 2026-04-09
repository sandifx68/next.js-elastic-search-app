import { test, expect } from '../fixtures';

test('user can post after logging in', async ({ loggedInPage }) => {
  await loggedInPage.getByRole('link', { name: 'New post' }).click();
  await loggedInPage.getByRole('textbox', { name: 'Title' }).click();
  await loggedInPage.getByRole('textbox', { name: 'Title' }).fill('New post');
  await loggedInPage.getByRole('textbox', { name: 'Description' }).click();
  await loggedInPage
    .getByRole('textbox', { name: 'Description' })
    .fill('Some description');
  await loggedInPage.getByRole('button', { name: 'Create post!' }).click();

  await expect(
    loggedInPage.getByRole('main').getByText('New post')
  ).toBeVisible();
  await expect(loggedInPage.getByText('Some description')).toBeVisible();
});
