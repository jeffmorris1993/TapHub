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

describe('ImNewHerePage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Page Display', () => {
    it('renders page header with title', () => {
      renderWithProviders(<ImNewHerePage />);
      expect(screen.getByText("I'm New Here")).toBeInTheDocument();
    });

    it('renders page header with subtitle', () => {
      renderWithProviders(<ImNewHerePage />);
      expect(
        screen.getByText("We're so glad you're here!")
      ).toBeInTheDocument();
    });

    it('renders the visitor form initially', () => {
      renderWithProviders(<ImNewHerePage />);
      expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    });
  });

  describe('Form/Success State Toggle', () => {
    it('shows success confirmation after form submission', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      renderWithProviders(<ImNewHerePage />);

      await user.type(screen.getByLabelText(/your name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.click(screen.getByText(/yes, first time/i));
      await user.click(screen.getByRole('button', { name: /submit/i }));

      await waitFor(() => {
        expect(screen.getByText(/thank you/i)).toBeInTheDocument();
      });
    });

    it('hides form after successful submission', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      renderWithProviders(<ImNewHerePage />);

      await user.type(screen.getByLabelText(/your name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.click(screen.getByText(/yes, first time/i));
      await user.click(screen.getByRole('button', { name: /submit/i }));

      await waitFor(() => {
        expect(screen.queryByLabelText(/your name/i)).not.toBeInTheDocument();
      });
    });

    it('shows Submit Another button after success', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      renderWithProviders(<ImNewHerePage />);

      await user.type(screen.getByLabelText(/your name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.click(screen.getByText(/yes, first time/i));
      await user.click(screen.getByRole('button', { name: /submit/i }));

      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: /submit another/i })
        ).toBeInTheDocument();
      });
    });

    it('resets to form when Submit Another is clicked', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      renderWithProviders(<ImNewHerePage />);

      // Submit form
      await user.type(screen.getByLabelText(/your name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.click(screen.getByText(/yes, first time/i));
      await user.click(screen.getByRole('button', { name: /submit/i }));

      // Wait for success state
      await waitFor(() => {
        expect(screen.getByText(/thank you/i)).toBeInTheDocument();
      });

      // Click Submit Another
      await user.click(
        screen.getByRole('button', { name: /submit another/i })
      );

      // Form should be visible again
      expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    });

    it('changes header to Welcome! after success', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      renderWithProviders(<ImNewHerePage />);

      await user.type(screen.getByLabelText(/your name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.click(screen.getByText(/yes, first time/i));
      await user.click(screen.getByRole('button', { name: /submit/i }));

      await waitFor(() => {
        expect(screen.getByText('Welcome!')).toBeInTheDocument();
      });
    });
  });
});
