import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Page from '@/app/sign-up/page';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe('Sign up page', () => {
  beforeEach(() => {
    render(<Page />);
  });

  it('renders the form fields', () => {
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm password')).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    expect(
      screen.getByRole('button', { name: 'Sign up!' })
    ).toBeInTheDocument();
  });

  it('shows error when fields are blank', async () => {
    await userEvent.click(screen.getByRole('button', { name: 'Sign up!' }));
    expect(screen.getByText(/username cannot be blank/i)).toBeInTheDocument();
    expect(screen.getByText(/password cannot be blank/i)).toBeInTheDocument();
    expect(
      screen.getByText(/confirm password cannot be blank/i)
    ).toBeInTheDocument();
  });

  it('shows error when passwords do not match', async () => {
    await userEvent.type(screen.getByLabelText('Username'), 'john');
    await userEvent.type(screen.getByLabelText('Password'), 'password123');
    await userEvent.type(
      screen.getByLabelText('Confirm password'),
      'different123'
    );
    await userEvent.click(screen.getByRole('button', { name: 'Sign up!' }));
    expect(
      screen.getByText(/password and confirm password do not match/i)
    ).toBeInTheDocument();
  });

  it('redirects to home on successful submit', async () => {
    await userEvent.type(screen.getByLabelText('Username'), 'john');
    await userEvent.type(screen.getByLabelText('Password'), 'password123');
    await userEvent.type(
      screen.getByLabelText('Confirm password'),
      'password123'
    );
    await userEvent.click(screen.getByRole('button', { name: 'Sign up!' }));
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
