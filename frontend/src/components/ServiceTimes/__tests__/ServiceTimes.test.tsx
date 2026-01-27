import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/theme';
import { ServiceTimes } from '../ServiceTimes';
import type { ServiceTime } from '@/types';

describe('ServiceTimes', () => {
  const mockServiceTimes: ServiceTime[] = [
    {
      id: 'sunday-morning',
      day: 'Sunday',
      time: '10:00 AM',
      serviceName: 'Main Worship Service',
      order: 1,
    },
    {
      id: 'sunday-evening',
      day: 'Sunday',
      time: '6:00 PM',
      serviceName: 'Evening Service',
      order: 2,
    },
    {
      id: 'wednesday',
      day: 'Wednesday',
      time: '7:00 PM',
      serviceName: 'Bible Study',
      order: 3,
    },
  ];

  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<ThemeProvider>{ui}</ThemeProvider>);
  };

  it('renders all service times', () => {
    renderWithTheme(<ServiceTimes services={mockServiceTimes} />);

    expect(screen.getByText('Sunday Morning - Main Worship Service - 10:00 AM')).toBeInTheDocument();
    expect(screen.getByText('Sunday Evening - Evening Service - 6:00 PM')).toBeInTheDocument();
    expect(screen.getByText('Wednesday - Bible Study - 7:00 PM')).toBeInTheDocument();
  });

  it('renders Service Times heading with clock icon', () => {
    renderWithTheme(<ServiceTimes services={mockServiceTimes} />);

    expect(screen.getByText('Service Times')).toBeInTheDocument();
    // Clock icon should be present (we'll use data-icon attribute)
    const heading = screen.getByText('Service Times').closest('div');
    expect(heading?.querySelector('[data-icon="clock"]')).toBeInTheDocument();
  });

  it('renders services in correct order', () => {
    renderWithTheme(<ServiceTimes services={mockServiceTimes} />);

    const serviceElements = screen.getAllByRole('listitem');
    expect(serviceElements).toHaveLength(3);

    expect(serviceElements[0]).toHaveTextContent('Sunday Morning');
    expect(serviceElements[1]).toHaveTextContent('Sunday Evening');
    expect(serviceElements[2]).toHaveTextContent('Wednesday');
  });

  it('handles empty service list', () => {
    renderWithTheme(<ServiceTimes services={[]} />);

    expect(screen.getByText('Service Times')).toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
});
