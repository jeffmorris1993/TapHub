import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/theme';
import { ScheduleSkeleton } from '../ScheduleSkeleton';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('ScheduleSkeleton', () => {
  it('renders skeleton loading placeholders', () => {
    renderWithTheme(<ScheduleSkeleton />);

    // Skeleton should render multiple placeholder items
    const skeletons = screen.getAllByTestId('schedule-skeleton-item');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders the expected number of skeleton items (5 by default)', () => {
    renderWithTheme(<ScheduleSkeleton />);

    const skeletons = screen.getAllByTestId('schedule-skeleton-item');
    expect(skeletons).toHaveLength(5);
  });

  it('accepts a custom count prop', () => {
    renderWithTheme(<ScheduleSkeleton count={3} />);

    const skeletons = screen.getAllByTestId('schedule-skeleton-item');
    expect(skeletons).toHaveLength(3);
  });
});
