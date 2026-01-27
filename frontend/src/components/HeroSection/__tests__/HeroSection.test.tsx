import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@/theme';
import { HeroSection } from '../HeroSection';

describe('HeroSection', () => {
  const defaultProps = {
    heading: 'Welcome! 👋',
    subtitle: 'Choose an option below to get started',
    imageUrl: '/hero-image.jpg',
    imageAlt: 'Church leadership welcoming visitors',
    showOverlay: true,
  };

  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<ThemeProvider>{ui}</ThemeProvider>);
  };

  it('renders heading and subtitle', () => {
    renderWithTheme(<HeroSection {...defaultProps} />);

    expect(screen.getByText('Welcome! 👋')).toBeInTheDocument();
    expect(screen.getByText('Choose an option below to get started')).toBeInTheDocument();
  });

  it('renders image with correct alt text', () => {
    renderWithTheme(<HeroSection {...defaultProps} />);

    const image = screen.getByAltText('Church leadership welcoming visitors');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/hero-image.jpg');
  });

  it('handles image load failure with fallback', () => {
    renderWithTheme(<HeroSection {...defaultProps} />);

    const image = screen.getByAltText('Church leadership welcoming visitors') as HTMLImageElement;

    // Simulate image error
    fireEvent.error(image);

    // Heading and subtitle should still be visible
    expect(screen.getByText('Welcome! 👋')).toBeInTheDocument();
  });

  it('applies overlay when showOverlay is true', () => {
    const { container } = renderWithTheme(<HeroSection {...defaultProps} showOverlay={true} />);

    // Check for overlay element (we'll use data-testid)
    const overlay = container.querySelector('[data-testid="hero-overlay"]');
    expect(overlay).toBeInTheDocument();
  });

  it('does not apply overlay when showOverlay is false', () => {
    const { container } = renderWithTheme(<HeroSection {...defaultProps} showOverlay={false} />);

    const overlay = container.querySelector('[data-testid="hero-overlay"]');
    expect(overlay).not.toBeInTheDocument();
  });
});
