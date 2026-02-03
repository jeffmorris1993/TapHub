import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/theme';
import { AnnouncementSkeleton } from '../AnnouncementSkeleton';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('AnnouncementSkeleton', () => {
  it('renders skeleton loading placeholders', () => {
    renderWithTheme(<AnnouncementSkeleton />);

    const skeletons = screen.getAllByTestId('announcement-skeleton-item');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders the expected number of skeleton items (2 by default)', () => {
    renderWithTheme(<AnnouncementSkeleton />);

    const skeletons = screen.getAllByTestId('announcement-skeleton-item');
    expect(skeletons).toHaveLength(2);
  });

  it('accepts a custom count prop', () => {
    renderWithTheme(<AnnouncementSkeleton count={3} />);

    const skeletons = screen.getAllByTestId('announcement-skeleton-item');
    expect(skeletons).toHaveLength(3);
  });
});
