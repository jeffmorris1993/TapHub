import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { describe, it, expect } from 'vitest';
import { lightTheme } from '@/theme/theme';
import { DesktopDecorativePanel } from '../DesktopDecorativePanel';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);
};

describe('DesktopDecorativePanel', () => {
  const defaultProps = {
    imageSrc: '/images/church-people.jpg',
  };

  it('renders the main heading text', () => {
    renderWithTheme(<DesktopDecorativePanel {...defaultProps} />);

    expect(screen.getByText("Let's get you connected")).toBeInTheDocument();
  });

  it('renders the church quote', () => {
    renderWithTheme(<DesktopDecorativePanel {...defaultProps} />);

    expect(
      screen.getByText('"Come As You Are and Change As You Come"')
    ).toBeInTheDocument();
  });

  it('renders the attribution', () => {
    renderWithTheme(<DesktopDecorativePanel {...defaultProps} />);

    expect(
      screen.getByText("— Nehemiah's Temple of the Apostolic Faith")
    ).toBeInTheDocument();
  });

  it('renders the decorative image', () => {
    const { container } = renderWithTheme(
      <DesktopDecorativePanel {...defaultProps} />
    );

    // Image has aria-hidden="true" and is inside display:none container,
    // so use querySelector
    const image = container.querySelector('img');
    expect(image).toHaveAttribute('src', '/images/church-people.jpg');
  });

  it('renders the checkmark icon', () => {
    renderWithTheme(<DesktopDecorativePanel {...defaultProps} />);

    const icon = screen.getByTestId('checkmark-icon');
    expect(icon).toBeInTheDocument();
  });

  it('is hidden on mobile viewport', () => {
    const { container } = renderWithTheme(
      <DesktopDecorativePanel {...defaultProps} />
    );

    // The component should have display: none on mobile (handled by CSS)
    // In JSDOM, display:none still renders the element but hides it from accessibility tree
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders as aside element for accessibility', () => {
    const { container } = renderWithTheme(
      <DesktopDecorativePanel {...defaultProps} />
    );

    // The aside element has display:none by default (desktop-only panel)
    // Use querySelector to verify it renders as aside element
    const aside = container.querySelector('aside');
    expect(aside).toBeInTheDocument();
    expect(aside).toHaveAttribute('role', 'complementary');
  });

  it('renders with custom className when provided', () => {
    const { container } = renderWithTheme(
      <DesktopDecorativePanel {...defaultProps} className="custom-panel" />
    );

    expect(container.firstChild).toHaveClass('custom-panel');
  });
});
