import prisma from '@/lib/prisma';
import { test as base } from '@playwright/test';
import bcrypt from 'bcrypt';
export { expect } from '@playwright/test';

type Fixtures = {
  cleanDb: void;
  existingUser: { username: string; password: string };
};

export const test = base.extend<Fixtures>({
  cleanDb: [
    async ({}, use) => {
      await prisma.$transaction([prisma.user.deleteMany()]);
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
});
