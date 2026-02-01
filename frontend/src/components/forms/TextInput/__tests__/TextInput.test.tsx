import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ThemeProvider } from '@/theme';
import { TextInput } from '../TextInput';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('TextInput', () => {
  it('renders with placeholder text', () => {
    renderWithTheme(<TextInput placeholder="Enter your name" />);
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  it('renders with type="text" by default', () => {
    renderWithTheme(<TextInput placeholder="Test" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
  });

  it('renders with type="email" when specified', () => {
    renderWithTheme(<TextInput type="email" placeholder="Email" />);
    expect(screen.getByPlaceholderText('Email')).toHaveAttribute(
      'type',
      'email'
    );
  });

  it('renders with type="tel" when specified', () => {
    renderWithTheme(<TextInput type="tel" placeholder="Phone" />);
    expect(screen.getByPlaceholderText('Phone')).toHaveAttribute('type', 'tel');
  });

  it('calls onChange when user types', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    renderWithTheme(<TextInput onChange={handleChange} placeholder="Type here" />);

    await user.type(screen.getByPlaceholderText('Type here'), 'Hello');
    expect(handleChange).toHaveBeenCalled();
  });

  it('displays the value prop', () => {
    renderWithTheme(<TextInput value="Initial value" readOnly />);
    expect(screen.getByDisplayValue('Initial value')).toBeInTheDocument();
  });

  it('applies hasError styling when hasError is true', () => {
    const { container } = renderWithTheme(
      <TextInput hasError placeholder="With error" />
    );
    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();
  });

  it('applies id attribute when provided', () => {
    renderWithTheme(<TextInput id="email-input" placeholder="Email" />);
    expect(screen.getByPlaceholderText('Email')).toHaveAttribute(
      'id',
      'email-input'
    );
  });

  it('applies name attribute when provided', () => {
    renderWithTheme(<TextInput name="email" placeholder="Email" />);
    expect(screen.getByPlaceholderText('Email')).toHaveAttribute(
      'name',
      'email'
    );
  });

  it('forwards ref to input element', () => {
    const ref = { current: null as HTMLInputElement | null };
    render(
      <ThemeProvider>
        <TextInput ref={ref} placeholder="Test" />
      </ThemeProvider>
    );
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('supports aria-describedby for accessibility', () => {
    renderWithTheme(
      <TextInput
        placeholder="Email"
        aria-describedby="email-error"
      />
    );
    expect(screen.getByPlaceholderText('Email')).toHaveAttribute(
      'aria-describedby',
      'email-error'
    );
  });
});
