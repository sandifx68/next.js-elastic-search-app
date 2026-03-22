import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from '@/app/page';

jest.mock('@/app/components/posts/PostList', () => ({
  __esModule: true,
  default: () => <div data-testid="post-list">Post List</div>,
}));

describe('Home page', () => {
  beforeEach(() => {
    render(<Page />);
  });

  it('renders the post list', async () => {
    expect(screen.getByTestId('post-list')).toBeInTheDocument();
  });
});
