import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@/theme';
import { ScheduleList } from '../ScheduleList';
import type { ScheduleEvent } from '@/types/today';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

const mockEvents: ScheduleEvent[] = [
  { id: '1', time: '10:00 AM', name: 'Sunday School', location: 'Sanctuary', order: 1 },
  { id: '2', time: '11:30 AM', name: 'Coffee & Fellowship', location: 'Fellowship Hall', order: 2 },
  { id: '3', time: '12:00 PM', name: 'Afternoon Service', location: 'Sanctuary', order: 3 },
];

// Unsorted to test ordering
const unsortedEvents: ScheduleEvent[] = [
  { id: '3', time: '12:00 PM', name: 'Afternoon Service', location: 'Sanctuary', order: 3 },
  { id: '1', time: '10:00 AM', name: 'Sunday School', location: 'Sanctuary', order: 1 },
  { id: '2', time: '11:30 AM', name: 'Coffee & Fellowship', location: 'Fellowship Hall', order: 2 },
];

describe('ScheduleList', () => {
  describe('US1: View Today\'s Schedule', () => {
    it('displays schedule items with time, name, and location', () => {
      renderWithTheme(
        <ScheduleList
          events={mockEvents}
          isLoading={false}
          error={null}
          onRetry={() => {}}
        />
      );

      expect(screen.getByText('10:00 AM')).toBeInTheDocument();
      expect(screen.getByText('Sunday School')).toBeInTheDocument();
      // Multiple events have "Sanctuary" so use getAllByText
      expect(screen.getAllByText('Sanctuary').length).toBeGreaterThan(0);
    });

    it('renders items in ascending order by order field - FR-005', () => {
      renderWithTheme(
        <ScheduleList
          events={unsortedEvents}
          isLoading={false}
          error={null}
          onRetry={() => {}}
        />
      );

      const items = screen.getAllByTestId('schedule-item');

      // First item should be Sunday School (order: 1)
      expect(items[0]).toHaveTextContent('Sunday School');
      // Second item should be Coffee & Fellowship (order: 2)
      expect(items[1]).toHaveTextContent('Coffee & Fellowship');
      // Third item should be Afternoon Service (order: 3)
      expect(items[2]).toHaveTextContent('Afternoon Service');
    });

    it('shows skeleton loading while fetching data', () => {
      renderWithTheme(
        <ScheduleList
          events={[]}
          isLoading={true}
          error={null}
          onRetry={() => {}}
        />
      );

      expect(screen.getAllByTestId('schedule-skeleton-item').length).toBeGreaterThan(0);
    });

    it('shows empty state when no events scheduled', () => {
      renderWithTheme(
        <ScheduleList
          events={[]}
          isLoading={false}
          error={null}
          onRetry={() => {}}
        />
      );

      expect(screen.getByText(/no events scheduled/i)).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('displays error message with retry button on fetch failure', async () => {
      const user = userEvent.setup();
      const handleRetry = vi.fn();

      renderWithTheme(
        <ScheduleList
          events={[]}
          isLoading={false}
          error="Unable to load schedule. Please try again."
          onRetry={handleRetry}
        />
      );

      expect(screen.getByText('Unable to load schedule. Please try again.')).toBeInTheDocument();

      const retryButton = screen.getByRole('button', { name: /retry/i });
      await user.click(retryButton);

      expect(handleRetry).toHaveBeenCalledTimes(1);
    });
  });

  it('renders the card with "Today\'s Schedule" heading', () => {
    renderWithTheme(
      <ScheduleList
        events={mockEvents}
        isLoading={false}
        error={null}
        onRetry={() => {}}
      />
    );

    expect(screen.getByText("Today's Schedule")).toBeInTheDocument();
  });
});
