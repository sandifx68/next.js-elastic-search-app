import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Page from '@/app/login/page';

const mockPush = jest.fn();
const mockRefresh = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush, refresh: mockRefresh }),
}));

describe('Login page', () => {
  beforeEach(() => {
    render(<Page />);
  });

  it('renders the specific login page welcome text', () => {
    expect(screen.getByText('Welcome back!')).toBeInTheDocument();
  });

  it('renders the form fields', () => {
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    expect(screen.getByRole('button', { name: 'Login!' })).toBeInTheDocument();
  });

  it('shows error when fields are blank', async () => {
    await userEvent.click(screen.getByRole('button', { name: 'Login!' }));
    expect(screen.getByText(/username cannot be blank/i)).toBeInTheDocument();
    expect(screen.getByText(/password cannot be blank/i)).toBeInTheDocument();
  });

  it('shows error when the password does not match', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({
        errors: ['nah that aint it'],
      }),
    });
    await userEvent.type(screen.getByLabelText('Username'), 'john');
    await userEvent.type(screen.getByLabelText('Password'), 'pork');
    await userEvent.click(screen.getByRole('button', { name: 'Login!' }));
    expect(screen.getByText(/nah that aint it/i)).toBeInTheDocument();
  });

  it('redirects to home on successful submit', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: true });
    await userEvent.type(screen.getByLabelText('Username'), 'john');
    await userEvent.type(screen.getByLabelText('Password'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: 'Login!' }));
    expect(mockPush).toHaveBeenCalledWith('/');
    expect(mockRefresh).toHaveBeenCalled();
  });
});
