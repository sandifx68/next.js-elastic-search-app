import { addPost, getPosts } from '@/lib/postService';
import prisma from '@/lib/prisma';
import ValidationError from '@/lib/ValidationError';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { getIronSession } from 'iron-session';

jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: {
    post: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  },
}));

describe('getPosts', () => {
  it('calls the post model to find many', async () => {
    await getPosts();

    expect(prisma.post.findMany).toHaveBeenCalled();
  });
});

jest.mock('iron-session', () => ({
  getIronSession: jest.fn(),
}));
jest.mock('next/headers', () => ({
  cookies: jest.fn().mockResolvedValue({}),
}));

describe('addPost', () => {
  describe('when user is not logged in', () => {
    beforeEach(() => {
      (getIronSession as jest.Mock).mockResolvedValue({ userId: undefined });
    });

    it('shows an error', async () => {
      expect(addPost('a')).rejects.toThrow(
        'You must be logged in to create a post'
      );
    });
  });

  describe('when user is logged in', () => {
    beforeEach(() => {
      (getIronSession as jest.Mock).mockResolvedValue({ userId: 1 });
    });

    describe('when creation succeeds', () => {
      beforeEach(() => {
        (prisma.post.create as jest.Mock).mockResolvedValue({
          id: 1,
          title: 'My Post',
          description: 'My Description',
          authorId: 1,
        });
      });

      it('returns the created post', async () => {
        const post = await addPost('My Post', 'My Description');
        expect(post).toMatchObject({ id: 1, title: 'My Post' });
      });
    });

    describe('when the title is missing', () => {
      beforeEach(() => {
        (prisma.post.create as jest.Mock).mockRejectedValue(
          new PrismaClientKnownRequestError('error', {
            code: 'P2000',
            clientVersion: '1.0',
          })
        );
      });

      it('throws a validation error', async () => {
        await expect(addPost('')).rejects.toThrow('Content is too long');
      });
    });

    describe('when title is too long', () => {
      beforeEach(() => {
        (prisma.post.create as jest.Mock).mockRejectedValue(
          new PrismaClientKnownRequestError('error', {
            code: 'P2000',
            clientVersion: '1.0',
          })
        );
      });

      it('throws a validation error', async () => {
        await expect(addPost('a'.repeat(201))).rejects.toThrow(
          'Content is too long'
        );
      });
    });

    describe('when the author is not found', () => {
      beforeEach(() => {
        (prisma.post.create as jest.Mock).mockRejectedValue(
          new PrismaClientKnownRequestError('error', {
            code: 'P2003',
            clientVersion: '1.0',
          })
        );
      });

      it('throws a validation error', async () => {
        await expect(addPost('My Post')).rejects.toThrow(
          'Author does not exist'
        );
      });
    });

    describe('with other prisma error', () => {
      beforeEach(() => {
        (prisma.post.create as jest.Mock).mockRejectedValue(
          new PrismaClientKnownRequestError('error', {
            code: 'P2004',
            clientVersion: '1.0',
          })
        );
      });

      it('throws the error', async () => {
        await expect(addPost('My Post')).rejects.toThrow('error');
      });
    });

    describe('with other error', () => {
      beforeEach(() => {
        (prisma.post.create as jest.Mock).mockRejectedValue(new Error('error'));
      });

      it('throws the error', async () => {
        await expect(addPost('My Post')).rejects.toThrow('error');
      });
    });
  });
});
