import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@/theme';
import { ErrorState } from '../ErrorState';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('ErrorState', () => {
  it('renders the error message', () => {
    renderWithTheme(
      <ErrorState
        message="Unable to load schedule. Please try again."
        onRetry={() => {}}
      />
    );

    expect(screen.getByText('Unable to load schedule. Please try again.')).toBeInTheDocument();
  });

  it('renders a retry button', () => {
    renderWithTheme(
      <ErrorState
        message="Error"
        onRetry={() => {}}
      />
    );

    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });

  it('calls onRetry when retry button is clicked', async () => {
    const user = userEvent.setup();
    const handleRetry = vi.fn();

    renderWithTheme(
      <ErrorState
        message="Error"
        onRetry={handleRetry}
      />
    );

    await user.click(screen.getByRole('button', { name: /retry/i }));

    expect(handleRetry).toHaveBeenCalledTimes(1);
  });
});
