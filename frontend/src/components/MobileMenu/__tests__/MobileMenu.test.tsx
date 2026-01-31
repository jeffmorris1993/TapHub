import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { ThemeProvider } from '@/theme';
import { MobileMenu } from '../MobileMenu';

const renderMobileMenu = (props: {
  isOpen: boolean;
  onClose: () => void;
  currentPath?: string;
}) =>
  render(
    <BrowserRouter>
      <ThemeProvider>
        <MobileMenu
          isOpen={props.isOpen}
          onClose={props.onClose}
          currentPath={props.currentPath ?? '/'}
        />
      </ThemeProvider>
    </BrowserRouter>
  );

describe('MobileMenu', () => {
  // User Story 1: Open Mobile Menu
  describe('US1: Open Mobile Menu', () => {
    it('renders nothing when closed', () => {
      const onClose = vi.fn();
      const { container } = renderMobileMenu({ isOpen: false, onClose });
      expect(container.querySelector('[role="dialog"]')).not.toBeInTheDocument();
    });

    it('renders overlay and panel when open', () => {
      const onClose = vi.fn();
      renderMobileMenu({ isOpen: true, onClose });

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByLabelText('Navigation menu')).toBeInTheDocument();
    });

    it('renders all navigation items when open', () => {
      const onClose = vi.fn();
      renderMobileMenu({ isOpen: true, onClose });

      // Check for main menu items
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText("I'm New Here")).toBeInTheDocument();
      expect(screen.getByText('Today at Nehemiah')).toBeInTheDocument();
      expect(screen.getByText('Events & Signups')).toBeInTheDocument();
      expect(screen.getByText('Kids + Youth Hub')).toBeInTheDocument();
      expect(screen.getByText('Give')).toBeInTheDocument();
      expect(screen.getByText('Feedback / Prayer')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('highlights active navigation item based on currentPath', () => {
      const onClose = vi.fn();
      renderMobileMenu({ isOpen: true, onClose, currentPath: '/events' });

      const eventsItem = screen.getByText('Events & Signups').closest('li');
      expect(eventsItem).toHaveAttribute('data-active', 'true');
    });
  });

  // User Story 2: Close Mobile Menu
  describe('US2: Close Mobile Menu', () => {
    it('calls onClose when close button clicked', () => {
      const onClose = vi.fn();
      renderMobileMenu({ isOpen: true, onClose });

      const closeButton = screen.getByLabelText('Close menu');
      fireEvent.click(closeButton);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when overlay clicked', () => {
      const onClose = vi.fn();
      const { container } = renderMobileMenu({ isOpen: true, onClose });

      // The overlay is the first child (before the menu panel)
      const overlay = container.querySelector('[class*="Overlay"]');
      if (overlay) {
        fireEvent.click(overlay);
      }

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when Escape key pressed', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      renderMobileMenu({ isOpen: true, onClose });

      await user.keyboard('{Escape}');

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('locks body scroll when menu is open', () => {
      const onClose = vi.fn();
      renderMobileMenu({ isOpen: true, onClose });

      expect(document.body.style.overflow).toBe('hidden');
    });
  });

  // User Story 3: Navigate to Section via Menu
  describe('US3: Navigate via Menu', () => {
    it('navigation items are links with correct routes', () => {
      const onClose = vi.fn();
      renderMobileMenu({ isOpen: true, onClose });

      const eventsLink = screen.getByText('Events & Signups').closest('a');
      expect(eventsLink).toHaveAttribute('href', '/events');

      const homeLink = screen.getByText('Home').closest('a');
      expect(homeLink).toHaveAttribute('href', '/');

      const settingsLink = screen.getByText('Settings').closest('a');
      expect(settingsLink).toHaveAttribute('href', '/settings');
    });

    it('calls onClose when navigation item clicked', () => {
      const onClose = vi.fn();
      renderMobileMenu({ isOpen: true, onClose });

      const eventsLink = screen.getByText('Events & Signups').closest('a');
      if (eventsLink) {
        fireEvent.click(eventsLink);
      }

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  // User Story 4: View Menu Item Details
  describe('US4: Menu Item Details', () => {
    it('displays menu items with icon, title, and subtitle', () => {
      const onClose = vi.fn();
      renderMobileMenu({ isOpen: true, onClose });

      // Check for title and subtitle for each item
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Welcome & Overview')).toBeInTheDocument();

      expect(screen.getByText("I'm New Here")).toBeInTheDocument();
      expect(screen.getByText('Connect with us')).toBeInTheDocument();

      expect(screen.getByText('Events & Signups')).toBeInTheDocument();
      expect(screen.getByText("What's coming up")).toBeInTheDocument();
    });

    it('displays menu items in correct order', () => {
      const onClose = vi.fn();
      renderMobileMenu({ isOpen: true, onClose });

      // Get all menu item titles in the main list
      const menuItems = screen.getAllByRole('listitem');

      // Home should be first
      expect(menuItems[0]).toHaveTextContent('Home');

      // Settings should be last (after divider, in its own list)
      const settingsItem = screen.getByText('Settings').closest('li');
      expect(settingsItem).toBeInTheDocument();
    });

    it('displays Settings separated by divider', () => {
      const onClose = vi.fn();
      const { container } = renderMobileMenu({ isOpen: true, onClose });

      // There should be a divider element
      const divider = container.querySelector('[class*="Divider"]');
      expect(divider).toBeInTheDocument();
    });

    it('displays church branding section at bottom', () => {
      const onClose = vi.fn();
      renderMobileMenu({ isOpen: true, onClose });

      expect(screen.getByText("Nehemiah's Temple")).toBeInTheDocument();
      expect(screen.getByText('Contact Us')).toBeInTheDocument();
    });
  });
});
