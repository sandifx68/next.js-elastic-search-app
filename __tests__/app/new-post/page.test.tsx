import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Page from '@/app/new-post/page';

const mockPush = jest.fn();
const mockRefresh = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush, refresh: mockRefresh }),
}));

describe('New post page', () => {
  beforeEach(() => {
    render(<Page />);
  });

  it('renders the title', () => {
    expect(screen.getByText('Create new post')).toBeInTheDocument();
  });

  it('renders the form fields', () => {
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    expect(
      screen.getByRole('button', { name: 'Create post!' })
    ).toBeInTheDocument();
  });

  it('shows error when title is blank', async () => {
    await userEvent.click(screen.getByRole('button', { name: 'Create post!' }));
    expect(screen.getByText(/title cannot be blank/i)).toBeInTheDocument();
  });

  it('shows error when title is over the character limit', async () => {
    await userEvent.type(screen.getByLabelText('Title'), 'a'.repeat(201));
    await userEvent.click(screen.getByRole('button', { name: 'Create post!' }));
    expect(
      screen.getByText(/title cannot be longer than 200/i)
    ).toBeInTheDocument();
  });

  it('shows error when description is over the character limit', async () => {
    await userEvent.type(screen.getByLabelText('Title'), 'title');
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'a'.repeat(5001) },
    });
    await userEvent.click(screen.getByRole('button', { name: 'Create post!' }));
    expect(
      screen.getByText(/description cannot be longer than 5000/i)
    ).toBeInTheDocument();
  });

  it('displays sever side error', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({
        errors: ['nah that aint it'],
      }),
    });
    await userEvent.type(screen.getByLabelText('Title'), 'john');
    await userEvent.click(screen.getByRole('button', { name: 'Create post!' }));
    expect(screen.getByText(/nah that aint it/i)).toBeInTheDocument();
  });

  it('displays general sever side error', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue({ errors: [] }),
    });
    await userEvent.type(screen.getByLabelText('Title'), 'john');
    await userEvent.click(screen.getByRole('button', { name: 'Create post!' }));
    expect(
      screen.getByText(/There was an error creating the post/i)
    ).toBeInTheDocument();
  });

  it('redirects to home on successful submit', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: true });
    await userEvent.type(screen.getByLabelText('Title'), 'title');
    await userEvent.click(screen.getByRole('button', { name: 'Create post!' }));
    expect(mockPush).toHaveBeenCalledWith('/');
    expect(mockRefresh).toHaveBeenCalled();
  });
});
