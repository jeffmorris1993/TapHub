import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeProvider } from '@/theme';
import { PageHeader } from '../PageHeader';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('PageHeader', () => {
  it('renders title text', () => {
    renderWithTheme(<PageHeader title="Welcome" />);
    expect(screen.getByText('Welcome')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    renderWithTheme(
      <PageHeader title="Welcome" subtitle="We're glad you're here" />
    );
    expect(screen.getByText("We're glad you're here")).toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    renderWithTheme(<PageHeader title="Welcome" />);
    expect(
      screen.queryByText("We're glad you're here")
    ).not.toBeInTheDocument();
  });

  it('renders title as h1 heading', () => {
    renderWithTheme(<PageHeader title="Test Title" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Test Title'
    );
  });

  it('applies dynamic title', () => {
    const { rerender } = renderWithTheme(<PageHeader title="First Title" />);
    expect(screen.getByText('First Title')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <PageHeader title="Second Title" />
      </ThemeProvider>
    );
    expect(screen.getByText('Second Title')).toBeInTheDocument();
  });

  it('applies dynamic subtitle', () => {
    const { rerender } = renderWithTheme(
      <PageHeader title="Title" subtitle="First Subtitle" />
    );
    expect(screen.getByText('First Subtitle')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <PageHeader title="Title" subtitle="Second Subtitle" />
      </ThemeProvider>
    );
    expect(screen.getByText('Second Subtitle')).toBeInTheDocument();
  });
});
