import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { describe, it, expect } from 'vitest';
import { lightTheme } from '@/theme/theme';
import { MobileHeroSection } from '../MobileHeroSection';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);
};

describe('MobileHeroSection', () => {
  const defaultProps = {
    title: "We're glad you're here!",
    subtitle: '"Come As You Are and Change As You Come"',
    imageSrc: '/images/church-interior.jpg',
  };

  it('renders the title text', () => {
    renderWithTheme(<MobileHeroSection {...defaultProps} />);

    expect(screen.getByText("We're glad you're here!")).toBeInTheDocument();
  });

  it('renders the subtitle text', () => {
    renderWithTheme(<MobileHeroSection {...defaultProps} />);

    expect(
      screen.getByText('"Come As You Are and Change As You Come"')
    ).toBeInTheDocument();
  });

  it('renders the hero image with correct src', () => {
    const { container } = renderWithTheme(
      <MobileHeroSection {...defaultProps} />
    );

    // Image has aria-hidden="true" so use querySelector
    const image = container.querySelector('img');
    expect(image).toHaveAttribute('src', '/images/church-interior.jpg');
  });

  it('applies decorative role to image for accessibility', () => {
    const { container } = renderWithTheme(
      <MobileHeroSection {...defaultProps} />
    );

    // Image has aria-hidden="true" so use querySelector
    const image = container.querySelector('img');
    expect(image).toHaveAttribute('alt', '');
    expect(image).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders as a section element with proper accessibility', () => {
    renderWithTheme(<MobileHeroSection {...defaultProps} />);

    const section = screen.getByRole('banner');
    expect(section).toBeInTheDocument();
  });

  it('renders with custom className when provided', () => {
    const { container } = renderWithTheme(
      <MobileHeroSection {...defaultProps} className="custom-class" />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders different content for confirmation state', () => {
    renderWithTheme(
      <MobileHeroSection
        title="Welcome!"
        subtitle="We're excited to connect with you"
        imageSrc="/images/church-interior.jpg"
      />
    );

    expect(screen.getByText('Welcome!')).toBeInTheDocument();
    expect(
      screen.getByText("We're excited to connect with you")
    ).toBeInTheDocument();
  });
});
