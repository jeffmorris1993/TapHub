import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/theme';
import { ContactInfo } from '../ContactInfo';
import type { ContactInfo as ContactInfoType } from '@/types';

describe('ContactInfo', () => {
  const mockContactInfo: ContactInfoType = {
    churchName: "Nehemiah's Temple of the Apostolic Faith",
    tagline: 'Come As You Are and Change As You Come',
    address: {
      street: '27303 Palmer St',
      cityStateZip: 'Madison Heights, MI 48071',
      full: '27303 Palmer St, Madison Heights, MI 48071',
    },
    phone: '(555) 123-4567',
    email: 'info@nehtemple.org',
    website: 'https://nehtemple.org',
  };

  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<ThemeProvider>{ui}</ThemeProvider>);
  };

  it('renders address', () => {
    renderWithTheme(<ContactInfo contact={mockContactInfo} />);

    expect(screen.getByText(/27303 Palmer St/i)).toBeInTheDocument();
    expect(screen.getByText(/Madison Heights, MI 48071/i)).toBeInTheDocument();
  });

  it('renders phone number', () => {
    renderWithTheme(<ContactInfo contact={mockContactInfo} />);

    expect(screen.getByText('(555) 123-4567')).toBeInTheDocument();
  });

  it('renders phone number as clickable link', () => {
    renderWithTheme(<ContactInfo contact={mockContactInfo} />);

    const phoneLink = screen.getByRole('link', { name: /555.*123.*4567/i });
    expect(phoneLink).toHaveAttribute('href', 'tel:5551234567');
  });

  it('renders email if provided', () => {
    renderWithTheme(<ContactInfo contact={mockContactInfo} />);

    const emailLink = screen.getByRole('link', { name: /info@nehtemple.org/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:info@nehtemple.org');
  });

  it('does not render email if not provided', () => {
    const contactWithoutEmail = { ...mockContactInfo, email: undefined };
    renderWithTheme(<ContactInfo contact={contactWithoutEmail} />);

    expect(screen.queryByRole('link', { name: /mailto:/i })).not.toBeInTheDocument();
  });
});
