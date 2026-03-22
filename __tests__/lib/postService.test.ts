import { getPosts } from '@/lib/postService';
import prisma from '@/lib/prisma';

jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: {
    post: {
      findMany: jest.fn(),
    },
  },
}));

describe('getPosts', () => {
  it('calls the post model to find many', async () => {
    await getPosts();

    expect(prisma.post.findMany).toHaveBeenCalled();
  });
});
