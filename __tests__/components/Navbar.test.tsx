import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '@/app/components/Navbar';
import { SessionProvider } from '@/app/components/SessionProvider';

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
      expect(screen.getByText('Logout').closest('a'));
    });
  });
});
