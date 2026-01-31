import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ThemeProvider } from '@/theme';
import { RadioGroup } from '../RadioGroup';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

const defaultOptions = [
  { value: 'yes', label: 'Yes, first time' },
  { value: 'no', label: "I've been before" },
];

describe('RadioGroup', () => {
  it('renders all options as buttons', () => {
    renderWithTheme(
      <RadioGroup
        name="test"
        options={defaultOptions}
        value=""
        onChange={vi.fn()}
      />
    );
    expect(screen.getByText('Yes, first time')).toBeInTheDocument();
    expect(screen.getByText("I've been before")).toBeInTheDocument();
  });

  it('applies selected styling to the selected option', () => {
    renderWithTheme(
      <RadioGroup
        name="test"
        options={defaultOptions}
        value="yes"
        onChange={vi.fn()}
      />
    );
    const selectedButton = screen.getByText('Yes, first time').closest('button');
    expect(selectedButton).toHaveAttribute('aria-checked', 'true');
  });

  it('calls onChange with the option value when clicked', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    renderWithTheme(
      <RadioGroup
        name="test"
        options={defaultOptions}
        value=""
        onChange={handleChange}
      />
    );

    await user.click(screen.getByText('Yes, first time'));
    expect(handleChange).toHaveBeenCalledWith('yes');
  });

  it('has role="radiogroup" for accessibility', () => {
    renderWithTheme(
      <RadioGroup
        name="test"
        options={defaultOptions}
        value=""
        onChange={vi.fn()}
      />
    );
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('has role="radio" on each option', () => {
    renderWithTheme(
      <RadioGroup
        name="test"
        options={defaultOptions}
        value=""
        onChange={vi.fn()}
      />
    );
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(2);
  });

  it('applies aria-label when provided', () => {
    renderWithTheme(
      <RadioGroup
        name="test"
        options={defaultOptions}
        value=""
        onChange={vi.fn()}
        ariaLabel="First time visiting"
      />
    );
    expect(screen.getByLabelText('First time visiting')).toBeInTheDocument();
  });

  it('shows error styling when hasError is true', () => {
    const { container } = renderWithTheme(
      <RadioGroup
        name="test"
        options={defaultOptions}
        value=""
        onChange={vi.fn()}
        hasError
      />
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});
