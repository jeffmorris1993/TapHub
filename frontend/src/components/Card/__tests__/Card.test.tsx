import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/theme';
import { Card } from '../Card';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('Card', () => {
  it('renders children content', () => {
    renderWithTheme(
      <Card>
        <p>Test content</p>
      </Card>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders heading when provided', () => {
    renderWithTheme(
      <Card heading="Test Heading">
        <p>Content</p>
      </Card>
    );

    expect(screen.getByText('Test Heading')).toBeInTheDocument();
  });

  it('does not render heading when not provided', () => {
    renderWithTheme(
      <Card>
        <p>Content only</p>
      </Card>
    );

    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const { container } = renderWithTheme(
      <Card className="custom-class">
        <p>Content</p>
      </Card>
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });
});
