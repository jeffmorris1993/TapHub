import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ThemeProvider } from '@/theme';
import { SuccessConfirmation } from '../SuccessConfirmation';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('SuccessConfirmation', () => {
  it('renders Thank you! heading', () => {
    renderWithTheme(<SuccessConfirmation onSubmitAnother={vi.fn()} />);
    expect(screen.getByText('Thank you!')).toBeInTheDocument();
  });

  it('renders confirmation message', () => {
    renderWithTheme(<SuccessConfirmation onSubmitAnother={vi.fn()} />);
    expect(
      screen.getByText(/someone from our team will reach out/i)
    ).toBeInTheDocument();
  });

  it('renders green checkmark icon', () => {
    renderWithTheme(<SuccessConfirmation onSubmitAnother={vi.fn()} />);
    expect(screen.getByTestId('check-icon')).toBeInTheDocument();
  });

  it('renders Submit Another button', () => {
    renderWithTheme(<SuccessConfirmation onSubmitAnother={vi.fn()} />);
    expect(
      screen.getByRole('button', { name: /submit another/i })
    ).toBeInTheDocument();
  });

  it('calls onSubmitAnother when button is clicked', async () => {
    const handleSubmitAnother = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      <SuccessConfirmation onSubmitAnother={handleSubmitAnother} />
    );

    await user.click(screen.getByRole('button', { name: /submit another/i }));

    expect(handleSubmitAnother).toHaveBeenCalledOnce();
  });

  it('has accessible structure', () => {
    renderWithTheme(<SuccessConfirmation onSubmitAnother={vi.fn()} />);
    // Heading should be present for screen readers
    expect(
      screen.getByRole('heading', { name: 'Thank you!' })
    ).toBeInTheDocument();
  });
});
