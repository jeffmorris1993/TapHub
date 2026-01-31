import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { describe, it, expect, vi } from 'vitest';
import { lightTheme } from '@/theme/theme';
import { StickySubmitFooter } from '../StickySubmitFooter';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);
};

describe('StickySubmitFooter', () => {
  it('renders the submit button with default text', () => {
    renderWithTheme(<StickySubmitFooter />);

    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('renders custom button text when provided', () => {
    renderWithTheme(<StickySubmitFooter buttonText="Send" />);

    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });

  it('shows loading state when isLoading is true', () => {
    renderWithTheme(<StickySubmitFooter isLoading />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('disables button when isLoading is true', () => {
    renderWithTheme(<StickySubmitFooter isLoading />);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('disables button when disabled prop is true', () => {
    renderWithTheme(<StickySubmitFooter disabled />);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('calls onClick handler when button is clicked', () => {
    const handleClick = vi.fn();
    renderWithTheme(<StickySubmitFooter onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    renderWithTheme(<StickySubmitFooter onClick={handleClick} disabled />);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders as a footer element', () => {
    renderWithTheme(<StickySubmitFooter />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const { container } = renderWithTheme(
      <StickySubmitFooter className="custom-footer" />
    );

    expect(container.firstChild).toHaveClass('custom-footer');
  });

  it('renders with type submit by default', () => {
    renderWithTheme(<StickySubmitFooter />);

    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });
});
