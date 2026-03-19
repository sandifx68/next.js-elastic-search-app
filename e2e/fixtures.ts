// tests/fixtures.ts
import prisma from '@/lib/prisma';
import { test as base } from '@playwright/test';

type Fixtures = {
  cleanDb: void;
};

export const test = base.extend<Fixtures>({
  cleanDb: [
    async ({}, use) => {
      console.log(process.env.DATABASE_URL);
      await prisma.$transaction([prisma.user.deleteMany()]);

      await use();
    },
    { auto: true },
  ],
});

export { expect } from '@playwright/test';
