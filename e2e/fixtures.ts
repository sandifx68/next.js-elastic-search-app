import prisma from '@/lib/prisma';
import { test as base, Page } from '@playwright/test';
import bcrypt from 'bcrypt';
export { expect } from '@playwright/test';

type Fixtures = {
  cleanDb: void;
  existingUser: { username: string; password: string };
  loggedInPage: Page;
};

async function login(page: Page, username: string, password: string) {
  await page.goto('/login');
  await page.getByLabel('Username').fill(username);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('/');
}

export const test = base.extend<Fixtures>({
  cleanDb: [
    async ({}, use) => {
      await prisma.$transaction([
        prisma.post.deleteMany(),
        prisma.user.deleteMany(),
      ]);
      await use();
    },
    { auto: true },
  ],

  existingUser: async ({}, use) => {
    const user = await prisma.user.create({
      data: {
        username: 'john',
        password: await bcrypt.hash('pass', 10),
      },
    });

    await use({ username: 'john', password: 'pass' });
  },
  loggedInPage: async ({ page, existingUser }, use) => {
    await login(page, existingUser.username, existingUser.password);
    await use(page);
  },
});
