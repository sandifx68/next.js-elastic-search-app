import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextInput from '@/app/components/input/TextInput';
import userEvent from '@testing-library/user-event';

const mockOnChange = jest.fn();
describe('TextInput', () => {
  beforeEach(() => {
    render(
      <TextInput
        id="test"
        value="bla"
        onChange={mockOnChange}
        label="Test field"
      />
    );
  });

  it('renders with the value', () => {
    expect(screen.getByDisplayValue('bla')).toBeInTheDocument();
  });

  it('renders the label', () => {
    expect(screen.getByText('Test field')).toBeInTheDocument();
  });

  it('calls on change when the text is modified', async () => {
    await userEvent.type(screen.getByLabelText('Test field'), 'hello');
    expect(mockOnChange).toHaveBeenCalled();
  });
});
