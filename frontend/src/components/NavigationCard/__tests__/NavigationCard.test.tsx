import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@/theme';
import { NavigationCard } from '../NavigationCard';

describe('NavigationCard', () => {
  const defaultProps = {
    title: "I'm New Here",
    subtitle: 'Connect with us',
    icon: 'user',
    onClick: vi.fn(),
  };

  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<ThemeProvider>{ui}</ThemeProvider>);
  };

  it('renders title and subtitle', () => {
    renderWithTheme(<NavigationCard {...defaultProps} />);

    expect(screen.getByText("I'm New Here")).toBeInTheDocument();
    expect(screen.getByText('Connect with us')).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', () => {
    const handleClick = vi.fn();
    renderWithTheme(<NavigationCard {...defaultProps} onClick={handleClick} />);

    const card = screen.getByRole('button');
    fireEvent.click(card);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('displays icon identifier', () => {
    renderWithTheme(<NavigationCard {...defaultProps} />);

    // Icon should be present (we'll use data-icon attribute)
    const card = screen.getByRole('button');
    expect(card).toHaveAttribute('data-icon', 'user');
  });

  it('is keyboard accessible', () => {
    const handleClick = vi.fn();
    renderWithTheme(<NavigationCard {...defaultProps} onClick={handleClick} />);

    const card = screen.getByRole('button');
    card.focus();

    expect(card).toHaveFocus();
  });
});
