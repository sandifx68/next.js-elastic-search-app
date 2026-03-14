// __tests__/unit/lib/userService.test.ts
import prisma from '@/lib/prisma';
import { createUser } from '@/lib/userService';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import bcrypt from 'bcrypt';

// mock bcrypt
jest.mock('bcrypt');

jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: {
    user: {
      create: jest.fn(),
    },
  },
}));

describe('createUser', () => {
  it('hashes the password before saving', async () => {
    const mockUser = { id: 1, username: 'john', password: 'hashed' };
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed');
    (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

    await createUser('john', 'plaintext');

    expect(bcrypt.hash).toHaveBeenCalledWith('plaintext', 10);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: { username: 'john', password: 'hashed' },
    });
  });

  it('catches unique constraint error and throws it', async () => {
    (prisma.user.create as jest.Mock).mockRejectedValue(
      new PrismaClientKnownRequestError('Unique constraint failed', {
        code: 'P2002',
        clientVersion: '1',
      })
    );
    expect(createUser('john', 'plaintext')).rejects.toThrow(
      'Username is already taken'
    );
  });

  it('catches other errors', async () => {
    (prisma.user.create as jest.Mock).mockRejectedValue(
      new PrismaClientKnownRequestError('Other error', {
        code: 'P200',
        clientVersion: '1',
      })
    );
    expect(createUser('john', 'plaintext')).rejects.toThrow('Other error');
  });
});
