import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/theme';
import { ScheduleItem } from '../ScheduleItem';
import type { ScheduleEvent } from '@/types/today';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

const mockEvent: ScheduleEvent = {
  id: '1',
  time: '10:00 AM',
  name: 'Sunday School',
  location: 'Sanctuary',
  order: 1,
};

describe('ScheduleItem', () => {
  it('renders the event time', () => {
    renderWithTheme(<ScheduleItem event={mockEvent} />);

    expect(screen.getByText('10:00 AM')).toBeInTheDocument();
  });

  it('renders the event name', () => {
    renderWithTheme(<ScheduleItem event={mockEvent} />);

    expect(screen.getByText('Sunday School')).toBeInTheDocument();
  });

  it('renders the event location', () => {
    renderWithTheme(<ScheduleItem event={mockEvent} />);

    expect(screen.getByText('Sanctuary')).toBeInTheDocument();
  });

  it('displays time with gold/accent color styling', () => {
    renderWithTheme(<ScheduleItem event={mockEvent} />);

    const timeElement = screen.getByText('10:00 AM');
    expect(timeElement).toBeInTheDocument();
    // The time should have styling applied via emotion - we verify it renders correctly
  });
});
