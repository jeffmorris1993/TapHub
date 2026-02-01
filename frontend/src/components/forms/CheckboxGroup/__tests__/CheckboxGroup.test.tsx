import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ThemeProvider } from '@/theme';
import { CheckboxGroup } from '../CheckboxGroup';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

const defaultOptions = [
  { value: 'small-group', label: 'Connect with a small group' },
  { value: 'membership', label: 'Learn about membership' },
  { value: 'volunteer', label: 'Volunteer opportunities' },
];

describe('CheckboxGroup', () => {
  it('renders all options as checkboxes', () => {
    renderWithTheme(
      <CheckboxGroup
        name="interests"
        options={defaultOptions}
        values={[]}
        onChange={vi.fn()}
      />
    );
    expect(screen.getByLabelText('Connect with a small group')).toBeInTheDocument();
    expect(screen.getByLabelText('Learn about membership')).toBeInTheDocument();
    expect(screen.getByLabelText('Volunteer opportunities')).toBeInTheDocument();
  });

  it('checks the checkboxes for selected values', () => {
    renderWithTheme(
      <CheckboxGroup
        name="interests"
        options={defaultOptions}
        values={['small-group', 'volunteer']}
        onChange={vi.fn()}
      />
    );
    expect(screen.getByLabelText('Connect with a small group')).toBeChecked();
    expect(screen.getByLabelText('Learn about membership')).not.toBeChecked();
    expect(screen.getByLabelText('Volunteer opportunities')).toBeChecked();
  });

  it('calls onChange with added value when unchecked option is clicked', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    renderWithTheme(
      <CheckboxGroup
        name="interests"
        options={defaultOptions}
        values={['small-group']}
        onChange={handleChange}
      />
    );

    await user.click(screen.getByLabelText('Learn about membership'));
    expect(handleChange).toHaveBeenCalledWith(['small-group', 'membership']);
  });

  it('calls onChange with removed value when checked option is clicked', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    renderWithTheme(
      <CheckboxGroup
        name="interests"
        options={defaultOptions}
        values={['small-group', 'membership']}
        onChange={handleChange}
      />
    );

    await user.click(screen.getByLabelText('Connect with a small group'));
    expect(handleChange).toHaveBeenCalledWith(['membership']);
  });

  it('has role="group" for accessibility', () => {
    renderWithTheme(
      <CheckboxGroup
        name="interests"
        options={defaultOptions}
        values={[]}
        onChange={vi.fn()}
        ariaLabel="Select your interests"
      />
    );
    expect(screen.getByRole('group')).toBeInTheDocument();
  });

  it('applies aria-label when provided', () => {
    renderWithTheme(
      <CheckboxGroup
        name="interests"
        options={defaultOptions}
        values={[]}
        onChange={vi.fn()}
        ariaLabel="Select your interests"
      />
    );
    expect(screen.getByLabelText('Select your interests')).toBeInTheDocument();
  });

  it('renders checkboxes with proper name attribute', () => {
    renderWithTheme(
      <CheckboxGroup
        name="interests"
        options={defaultOptions}
        values={[]}
        onChange={vi.fn()}
      />
    );
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach((checkbox) => {
      expect(checkbox).toHaveAttribute('name', 'interests');
    });
  });
});
