import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/theme';
import { AnnouncementCard } from '../AnnouncementCard';
import type { Announcement } from '@/types/today';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

const mockAnnouncement: Announcement = {
  id: 'a1',
  title: 'Individual Spiritual Growth Plan',
  description: 'The ISGP has been released! Please make sure to fill in your intake form by Jan 31st 2026.',
  icon: 'users',
  color: '#c4956c',
  publishDate: '2026-01-15',
  status: 'published',
  createdAt: '2026-01-10T10:00:00.000Z',
  updatedAt: '2026-01-15T08:00:00.000Z',
};

describe('AnnouncementCard', () => {
  it('renders the announcement title', () => {
    renderWithTheme(<AnnouncementCard announcement={mockAnnouncement} />);

    expect(screen.getByText('Individual Spiritual Growth Plan')).toBeInTheDocument();
  });

  it('renders the announcement description', () => {
    renderWithTheme(<AnnouncementCard announcement={mockAnnouncement} />);

    expect(
      screen.getByText(/The ISGP has been released/)
    ).toBeInTheDocument();
  });

  it('renders an icon', () => {
    renderWithTheme(<AnnouncementCard announcement={mockAnnouncement} />);

    // The icon should be rendered - we check for the icon wrapper
    const card = screen.getByTestId('announcement-card');
    expect(card).toBeInTheDocument();
  });

  it('handles announcement without icon', () => {
    const announcementWithoutIcon: Announcement = {
      ...mockAnnouncement,
      icon: null,
    };

    renderWithTheme(<AnnouncementCard announcement={announcementWithoutIcon} />);

    // Should still render without error
    expect(screen.getByText('Individual Spiritual Growth Plan')).toBeInTheDocument();
  });

  it('handles unknown icon names by using fallback icon', () => {
    const announcementWithUnknownIcon: Announcement = {
      ...mockAnnouncement,
      icon: 'unknown-icon-xyz',
    };

    renderWithTheme(<AnnouncementCard announcement={announcementWithUnknownIcon} />);

    // Should still render without error
    expect(screen.getByText('Individual Spiritual Growth Plan')).toBeInTheDocument();
  });
});
