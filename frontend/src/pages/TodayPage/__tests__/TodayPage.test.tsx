import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/theme';
import { TodayPage } from '../TodayPage';
import { todayService } from '@/services/todayService';
import type { ScheduleEvent, Announcement } from '@/types/today';

vi.mock('@/services/todayService', () => ({
  todayService: {
    getSchedule: vi.fn(),
    getAnnouncements: vi.fn(),
  },
}));

const mockTodayService = vi.mocked(todayService);

const mockSchedule: ScheduleEvent[] = [
  { id: '1', time: '10:00 AM', name: 'Sunday School', location: 'Sanctuary', order: 1 },
];

const mockAnnouncements: Announcement[] = [
  {
    id: 'a1',
    title: 'Test Announcement',
    description: 'Test description',
    icon: 'users',
    color: '#c4956c',
    publishDate: '2026-01-15',
    status: 'published',
    createdAt: '2026-01-10T10:00:00.000Z',
    updatedAt: '2026-01-15T08:00:00.000Z',
  },
];

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider>{ui}</ThemeProvider>
    </BrowserRouter>
  );
};

describe('TodayPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockTodayService.getSchedule.mockResolvedValue({
      data: mockSchedule,
      error: null,
      meta: { timestamp: '2026-01-19T10:00:00.000Z' },
    });
    mockTodayService.getAnnouncements.mockResolvedValue({
      data: mockAnnouncements,
      error: null,
      meta: { timestamp: '2026-01-19T10:00:00.000Z' },
    });
  });

  describe('US2: View Current Date Context', () => {
    it('displays the page title "Today at Nehemiah\'s Temple"', async () => {
      renderWithProviders(<TodayPage />);

      await waitFor(() => {
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
          "Today at Nehemiah's Temple"
        );
      });
    });

    it('displays the current date in "Weekday, Month Day, Year" format', async () => {
      renderWithProviders(<TodayPage />);

      await waitFor(() => {
        // Verify date format pattern: "Weekday, Month Day, Year"
        // Match pattern like "Sunday, February 2, 2026" (actual current date)
        const datePattern = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}, \d{4}$/;
        const subtitle = screen.getByText(datePattern);
        expect(subtitle).toBeInTheDocument();
      });
    });

    it('uses PageHeader component for title and date subtitle', async () => {
      renderWithProviders(<TodayPage />);

      await waitFor(() => {
        // PageHeader renders h1 for title
        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toBeInTheDocument();
      });
    });
  });

  describe('Schedule Integration', () => {
    it('displays the schedule section', async () => {
      renderWithProviders(<TodayPage />);

      await waitFor(() => {
        expect(screen.getByText("Today's Schedule")).toBeInTheDocument();
      });
    });

    it('shows schedule events when loaded', async () => {
      renderWithProviders(<TodayPage />);

      await waitFor(() => {
        expect(screen.getByText('Sunday School')).toBeInTheDocument();
      });
    });
  });
});
