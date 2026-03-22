import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostList from '@/app/components/posts/PostList';
import { Post } from '@/app/generated/prisma/browser';

jest.mock('@/app/components/posts/PostComponent', () => ({
  __esModule: true,
  default: ({ post }: { post: Post }) => (
    <div data-testid="post-item">Post {post.id}</div>
  ),
}));
jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: {
    post: {
      findMany: jest.fn().mockResolvedValue([{ id: 1 }, { id: 2 }, { id: 3 }]),
    },
  },
}));
jest.mock('@/lib/postService', () => ({
  getPosts: jest.fn().mockResolvedValue([{ id: 1 }, { id: 2 }, { id: 3 }]),
}));

describe('PostList', () => {
  beforeEach(async () => {
    render(await PostList());
  });

  it('renders the component', () => {
    expect(document.querySelector('.flex')).toBeInTheDocument();
  });

  // it('renders 3 posts', () => {
  //   expect(screen.getAllByTestId('post-item')).toHaveLength(3);
  // });

  // it('renders the correct post ids', () => {
  //   expect(screen.getByText('1')).toBeInTheDocument();
  //   expect(screen.getByText('2')).toBeInTheDocument();
  //   expect(screen.getByText('3')).toBeInTheDocument();
  // });
});
