import { createPost } from '@/lib/postActions';
import { addPost } from '@/lib/postService';

jest.mock('@/lib/postService', () => ({
  addPost: jest.fn(),
}));

describe('createPost', () => {
  describe('when addPost succeeds', () => {
    beforeEach(() => {
      (addPost as jest.Mock).mockResolvedValue({
        id: 1,
        title: 'My Post',
        description: 'My Description',
      });
    });

    it('returns the created post', async () => {
      const post = await createPost('My Post', 'My Description');
      expect(post).toMatchObject({ id: 1, title: 'My Post' });
    });

    it('calls addPost with the correct arguments', async () => {
      await createPost('My Post', 'My Description');
      expect(addPost).toHaveBeenCalledWith('My Post', 'My Description');
    });
  });
});
