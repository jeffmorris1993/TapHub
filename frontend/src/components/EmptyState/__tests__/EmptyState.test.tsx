import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/theme';
import { Calendar } from 'lucide-react';
import { EmptyState } from '../EmptyState';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('EmptyState', () => {
  it('renders the message', () => {
    renderWithTheme(<EmptyState message="No events scheduled for today" />);

    expect(screen.getByText('No events scheduled for today')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    renderWithTheme(
      <EmptyState
        message="No events"
        icon={<Calendar data-testid="calendar-icon" />}
      />
    );

    expect(screen.getByTestId('calendar-icon')).toBeInTheDocument();
  });

  it('renders without icon when not provided', () => {
    renderWithTheme(<EmptyState message="No events" />);

    expect(screen.getByText('No events')).toBeInTheDocument();
  });
});
