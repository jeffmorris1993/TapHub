import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { ThemeProvider } from '@/theme';
import { Header } from '../Header';

const renderHeader = () =>
  render(
    <BrowserRouter>
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    </BrowserRouter>
  );

describe('Header', () => {
  it('renders church logo image', () => {
    renderHeader();
    expect(screen.getByAltText("Nehemiah's Temple logo")).toBeInTheDocument();
  });

  // User Story 1: Hamburger button triggers menu
  describe('US1: Hamburger Menu Integration', () => {
    it('shows hamburger button in mobile actions', () => {
      renderHeader();
      const hamburgerButton = screen.getByLabelText('Open menu');
      expect(hamburgerButton).toBeInTheDocument();
    });

    it('opens mobile menu when hamburger button clicked', () => {
      renderHeader();
      const hamburgerButton = screen.getByLabelText('Open menu');

      fireEvent.click(hamburgerButton);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByLabelText('Navigation menu')).toBeInTheDocument();
    });
  });

  it('renders church name', () => {
    renderHeader();
    expect(screen.getByText("Nehemiah's Temple")).toBeInTheDocument();
  });

  it('renders Admin button', () => {
    renderHeader();
    const adminButton = screen.getByRole('link', { name: /admin/i });
    expect(adminButton).toBeInTheDocument();
    expect(adminButton).toHaveAttribute('href', '/admin');
  });

  it('renders navigation links on desktop', () => {
    renderHeader();

    // These should be present but may be hidden on mobile via CSS
    // Check by text content since they don't have explicit ARIA labels
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Today')).toBeInTheDocument();
    expect(screen.getByText('Events')).toBeInTheDocument();
    expect(screen.getByText('Kids')).toBeInTheDocument();
    expect(screen.getByText('Give')).toBeInTheDocument();
  });

  it('has proper ARIA labels for accessibility', () => {
    renderHeader();

    // Header should have a navigation landmark
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('logo is clickable and links to home', () => {
    renderHeader();

    const logo = screen.getByAltText("Nehemiah's Temple logo").closest('a');
    expect(logo).toHaveAttribute('href', '/');
  });
});
