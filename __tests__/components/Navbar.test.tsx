import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '@/app/components/Navbar';
import { SessionProvider } from '@/app/components/SessionProvider';
import userEvent from '@testing-library/user-event';

const mockPush = jest.fn();
const mockRefresh = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush, refresh: mockRefresh }),
}));

describe('Navbar', () => {
  describe('when not logged in', () => {
    beforeEach(() => {
      render(<Navbar />);
    });

    it('renders app name', () => {
      expect(screen.getByText('elastic-search-app')).toBeInTheDocument();
    });

    it('renders Login', () => {
      expect(screen.getByText('Login').closest('a')).toHaveAttribute(
        'href',
        '/login'
      );
    });

    it('renders Sign up', () => {
      expect(screen.getByText('Sign up').closest('a')).toHaveAttribute(
        'href',
        '/sign-up'
      );
    });
  });

  describe('When logged in', () => {
    beforeEach(() => {
      render(
        <SessionProvider username="diny" userId={1}>
          <Navbar />
        </SessionProvider>
      );
    });

    it('renders the username', () => {
      expect(screen.getByText('diny')).toBeInTheDocument();
    });

    it('renders the logout text', () => {
      expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    it('clicking logout destroys the session', async () => {
      await userEvent.click(screen.getByRole('button', { name: 'Logout' }));
      expect(global.fetch).toHaveBeenCalledWith('/api/logout', {
        method: 'POST',
      });
      expect(mockPush).toHaveBeenCalledWith('/');
      expect(mockRefresh).toHaveBeenCalled();
    });
  });
});
