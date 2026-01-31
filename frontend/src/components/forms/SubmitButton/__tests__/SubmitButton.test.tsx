import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ThemeProvider } from '@/theme';
import { SubmitButton } from '../SubmitButton';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('SubmitButton', () => {
  it('renders button with children text', () => {
    renderWithTheme(<SubmitButton>Submit</SubmitButton>);
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('has type="submit" by default', () => {
    renderWithTheme(<SubmitButton>Submit</SubmitButton>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('shows loading spinner when isLoading is true', () => {
    renderWithTheme(<SubmitButton isLoading>Submit</SubmitButton>);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('hides children text when loading', () => {
    renderWithTheme(<SubmitButton isLoading>Submit</SubmitButton>);
    expect(screen.queryByText('Submit')).not.toBeVisible();
  });

  it('is disabled when isLoading is true', () => {
    renderWithTheme(<SubmitButton isLoading>Submit</SubmitButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is disabled when disabled prop is true', () => {
    renderWithTheme(<SubmitButton disabled>Submit</SubmitButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is enabled by default', () => {
    renderWithTheme(<SubmitButton>Submit</SubmitButton>);
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    renderWithTheme(<SubmitButton onClick={handleClick}>Submit</SubmitButton>);

    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('does not call onClick when disabled', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    renderWithTheme(
      <SubmitButton onClick={handleClick} disabled>
        Submit
      </SubmitButton>
    );

    await user.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('has aria-disabled when loading', () => {
    renderWithTheme(<SubmitButton isLoading>Submit</SubmitButton>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
  });

  it('has aria-busy when loading', () => {
    renderWithTheme(<SubmitButton isLoading>Submit</SubmitButton>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });
});
