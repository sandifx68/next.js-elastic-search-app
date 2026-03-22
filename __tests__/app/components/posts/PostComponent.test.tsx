import PostComponent from '@/app/components/posts/PostComponent';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('PostList', () => {
  beforeEach(async () => {
    const author = {
      username: 'John',
    };
    const post = {
      title: 'Post title',
      description: 'Post description',
      author,
    };
    render(<PostComponent post={post as any} />);
  });

  it('renders the author', () => {
    expect(screen.getByText('John:')).toBeInTheDocument();
  });

  it('renders the title', () => {
    expect(screen.getByText('Post title')).toBeInTheDocument();
  });

  it('renders the description', () => {
    expect(screen.getByText('Post description')).toBeInTheDocument();
  });
});
