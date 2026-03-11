import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '@/app/components/Navbar';

describe('Navbar', () => {
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
