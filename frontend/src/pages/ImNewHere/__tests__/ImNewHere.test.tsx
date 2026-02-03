import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/theme';
import { ImNewHerePage } from '../ImNewHere';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider>{ui}</ThemeProvider>
    </BrowserRouter>
  );
};

/**
 * Helper to get form elements for testing.
 * In JSDOM, DesktopLayout has display:none (media queries not supported),
 * so we use the MobileLayout elements which are visible by default.
 */
const getFormElements = () => {
  const nameInputs = screen.getAllByLabelText(/your name/i);
  const emailInputs = screen.getAllByLabelText(/email/i);
  const firstTimeButtons = screen.getAllByText(/yes, first time/i);
  const submitButton = screen.getByRole('button', { name: /submit/i });

  // Use last form elements (mobile, since desktop is hidden with display:none)
  const mobileIndex = nameInputs.length - 1;

  return {
    nameInput: nameInputs[mobileIndex],
    emailInput: emailInputs[mobileIndex],
    firstTimeButton: firstTimeButtons[mobileIndex],
    submitButton,
  };
};

describe('ImNewHerePage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Page Layout Structure', () => {
    it('renders the app header', () => {
      renderWithProviders(<ImNewHerePage />);
      // Header should be present (use getAllByRole since mobile hero also has banner role)
      const banners = screen.getAllByRole('banner');
      expect(banners.length).toBeGreaterThan(0);
    });

    it('renders page title', () => {
      renderWithProviders(<ImNewHerePage />);
      // Title appears in both mobile and desktop layouts
      expect(screen.getAllByText("We're glad you're here!").length).toBeGreaterThan(0);
    });

    it('renders the visitor form initially', () => {
      renderWithProviders(<ImNewHerePage />);
      expect(screen.getAllByLabelText(/your name/i).length).toBeGreaterThan(0);
      expect(screen.getAllByLabelText(/email/i).length).toBeGreaterThan(0);
    });

    it('renders submit button in footer', () => {
      renderWithProviders(<ImNewHerePage />);
      expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });
  });

  describe('Desktop Layout', () => {
    it('renders decorative panel heading', () => {
      renderWithProviders(<ImNewHerePage />);
      expect(screen.getByText("Let's get you connected")).toBeInTheDocument();
    });

    it('renders church quote in decorative panel', () => {
      renderWithProviders(<ImNewHerePage />);
      // Quote appears in both mobile hero subtitle and desktop decorative panel
      expect(
        screen.getAllByText('"Come As You Are and Change As You Come"').length
      ).toBeGreaterThan(0);
    });
  });

  describe('Form/Success State Toggle', () => {
    it('shows success confirmation after form submission', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      renderWithProviders(<ImNewHerePage />);

      const { nameInput, emailInput, firstTimeButton, submitButton } = getFormElements();

      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.click(firstTimeButton);
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getAllByText(/thank you/i).length).toBeGreaterThan(0);
      });
    });

    it('hides form after successful submission', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      renderWithProviders(<ImNewHerePage />);

      const { nameInput, emailInput, firstTimeButton, submitButton } = getFormElements();

      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.click(firstTimeButton);
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.queryByLabelText(/your name/i)).not.toBeInTheDocument();
      });
    });

    it('shows Submit Another button after success', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      renderWithProviders(<ImNewHerePage />);

      const { nameInput, emailInput, firstTimeButton, submitButton } = getFormElements();

      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.click(firstTimeButton);
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getAllByRole('button', { name: /submit another/i }).length).toBeGreaterThan(
          0
        );
      });
    });

    it('resets to form when Submit Another is clicked', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      renderWithProviders(<ImNewHerePage />);

      const { nameInput, emailInput, firstTimeButton, submitButton } = getFormElements();

      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.click(firstTimeButton);
      await user.click(submitButton);

      // Wait for success state
      await waitFor(() => {
        expect(screen.getAllByText(/thank you/i).length).toBeGreaterThan(0);
      });

      // Click Submit Another
      const submitAnotherButtons = screen.getAllByRole('button', {
        name: /submit another/i,
      });
      await user.click(submitAnotherButtons[0]);

      // Form should be visible again
      expect(screen.getAllByLabelText(/your name/i).length).toBeGreaterThan(0);
    });

    it('changes header to Welcome! after success', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      renderWithProviders(<ImNewHerePage />);

      const { nameInput, emailInput, firstTimeButton, submitButton } = getFormElements();

      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.click(firstTimeButton);
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getAllByText('Welcome!').length).toBeGreaterThan(0);
      });
    });

    it('hides submit footer in success state on mobile', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      renderWithProviders(<ImNewHerePage />);

      const { nameInput, emailInput, firstTimeButton, submitButton } = getFormElements();

      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.click(firstTimeButton);
      await user.click(submitButton);

      await waitFor(() => {
        // After success, Submit Another buttons should appear
        const submitAnotherButtons = screen.queryAllByRole('button', {
          name: /submit another/i,
        });
        expect(submitAnotherButtons.length).toBeGreaterThan(0);

        // The main submit button should no longer be present
        const remainingSubmitButtons = screen.queryAllByRole('button', {
          name: /^submit$/i,
        });
        expect(remainingSubmitButtons.length).toBe(0);
      });
    });
  });
});
