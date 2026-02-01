import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createRef } from 'react';
import { ThemeProvider } from '@/theme';
import { VisitorForm, VisitorFormRef } from '../VisitorForm';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('VisitorForm', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Name/Email Validation (US1)', () => {
    it('renders name input field', () => {
      renderWithTheme(<VisitorForm onSuccess={vi.fn()} />);
      expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    });

    it('renders email input field', () => {
      renderWithTheme(<VisitorForm onSuccess={vi.fn()} />);
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    });

    it('shows validation error when name is empty on submit', async () => {
      const formRef = createRef<VisitorFormRef>();
      renderWithTheme(<VisitorForm ref={formRef} onSuccess={vi.fn()} />);

      // Trigger submit via ref
      formRef.current?.submit();

      expect(
        await screen.findByText(/please enter your name/i)
      ).toBeInTheDocument();
    });

    it('shows validation error when email is empty on submit', async () => {
      const formRef = createRef<VisitorFormRef>();
      renderWithTheme(<VisitorForm ref={formRef} onSuccess={vi.fn()} />);

      // Trigger submit via ref
      formRef.current?.submit();

      expect(
        await screen.findByText(/please enter your email/i)
      ).toBeInTheDocument();
    });

    it('shows validation error for invalid email format', async () => {
      const formRef = createRef<VisitorFormRef>();
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      renderWithTheme(<VisitorForm ref={formRef} onSuccess={vi.fn()} />);

      await user.type(screen.getByLabelText(/your name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'invalid-email');

      // Trigger submit via ref
      formRef.current?.submit();

      expect(
        await screen.findByText(/please enter a valid email/i)
      ).toBeInTheDocument();
    });

    it('accepts valid email format', async () => {
      const formRef = createRef<VisitorFormRef>();
      const onSuccess = vi.fn();
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      renderWithTheme(<VisitorForm ref={formRef} onSuccess={onSuccess} />);

      await user.type(screen.getByLabelText(/your name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.click(screen.getByText(/yes, first time/i));

      // Trigger submit via ref
      formRef.current?.submit();

      await waitFor(() => {
        expect(onSuccess).toHaveBeenCalled();
      });
    });

    it('calls onSuccess with form data on valid submission', async () => {
      const formRef = createRef<VisitorFormRef>();
      const onSuccess = vi.fn();
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      renderWithTheme(<VisitorForm ref={formRef} onSuccess={onSuccess} />);

      await user.type(screen.getByLabelText(/your name/i), 'Jane Doe');
      await user.type(screen.getByLabelText(/email/i), 'jane@example.com');
      await user.click(screen.getByText(/yes, first time/i));

      // Trigger submit via ref
      formRef.current?.submit();

      await waitFor(() => {
        expect(onSuccess).toHaveBeenCalledWith(
          expect.objectContaining({
            name: 'Jane Doe',
            email: 'jane@example.com',
            isFirstTime: true,
          })
        );
      });
    });

    it('calls onLoadingChange during submission', async () => {
      const formRef = createRef<VisitorFormRef>();
      const onLoadingChange = vi.fn();
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      renderWithTheme(
        <VisitorForm
          ref={formRef}
          onSuccess={vi.fn()}
          onLoadingChange={onLoadingChange}
        />
      );

      await user.type(screen.getByLabelText(/your name/i), 'Test User');
      await user.type(screen.getByLabelText(/email/i), 'test@example.com');
      await user.click(screen.getByText(/yes, first time/i));

      // Trigger submit via ref
      formRef.current?.submit();

      await waitFor(() => {
        expect(onLoadingChange).toHaveBeenCalledWith(true);
      });
    });

    it('exposes submit method via ref', () => {
      const formRef = createRef<VisitorFormRef>();
      renderWithTheme(<VisitorForm ref={formRef} onSuccess={vi.fn()} />);
      expect(formRef.current?.submit).toBeDefined();
      expect(typeof formRef.current?.submit).toBe('function');
    });
  });

  describe('Interests Selection (US3)', () => {
    it('renders interests checkboxes', () => {
      renderWithTheme(<VisitorForm onSuccess={vi.fn()} />);
      expect(
        screen.getByLabelText('Connect with a small group')
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText('Learn about membership')
      ).toBeInTheDocument();
    });

    it('allows selecting multiple interests', async () => {
      const formRef = createRef<VisitorFormRef>();
      const onSuccess = vi.fn();
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      renderWithTheme(<VisitorForm ref={formRef} onSuccess={onSuccess} />);

      await user.type(screen.getByLabelText(/your name/i), 'Test User');
      await user.type(screen.getByLabelText(/email/i), 'test@example.com');
      await user.click(screen.getByText(/yes, first time/i));
      await user.click(screen.getByLabelText('Connect with a small group'));
      await user.click(screen.getByLabelText('Volunteer opportunities'));

      // Trigger submit via ref
      formRef.current?.submit();

      await waitFor(() => {
        expect(onSuccess).toHaveBeenCalledWith(
          expect.objectContaining({
            interests: expect.arrayContaining(['small-group', 'volunteer']),
          })
        );
      });
    });

    it('submits successfully with no interests selected', async () => {
      const formRef = createRef<VisitorFormRef>();
      const onSuccess = vi.fn();
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      renderWithTheme(<VisitorForm ref={formRef} onSuccess={onSuccess} />);

      await user.type(screen.getByLabelText(/your name/i), 'Test User');
      await user.type(screen.getByLabelText(/email/i), 'test@example.com');
      await user.click(screen.getByText(/yes, first time/i));

      // Trigger submit via ref
      formRef.current?.submit();

      await waitFor(() => {
        expect(onSuccess).toHaveBeenCalledWith(
          expect.objectContaining({
            interests: [],
          })
        );
      });
    });
  });

  describe('Optional Phone Field (US4)', () => {
    it('renders phone input field', () => {
      renderWithTheme(<VisitorForm onSuccess={vi.fn()} />);
      expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    });

    it('submits successfully without phone number', async () => {
      const formRef = createRef<VisitorFormRef>();
      const onSuccess = vi.fn();
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      renderWithTheme(<VisitorForm ref={formRef} onSuccess={onSuccess} />);

      await user.type(screen.getByLabelText(/your name/i), 'Test User');
      await user.type(screen.getByLabelText(/email/i), 'test@example.com');
      await user.click(screen.getByText(/yes, first time/i));

      // Trigger submit via ref
      formRef.current?.submit();

      await waitFor(() => {
        expect(onSuccess).toHaveBeenCalled();
      });
    });

    it('includes phone in submission when provided', async () => {
      const formRef = createRef<VisitorFormRef>();
      const onSuccess = vi.fn();
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      renderWithTheme(<VisitorForm ref={formRef} onSuccess={onSuccess} />);

      await user.type(screen.getByLabelText(/your name/i), 'Test User');
      await user.type(screen.getByLabelText(/email/i), 'test@example.com');
      await user.type(screen.getByLabelText(/phone/i), '555-123-4567');
      await user.click(screen.getByText(/yes, first time/i));

      // Trigger submit via ref
      formRef.current?.submit();

      await waitFor(() => {
        expect(onSuccess).toHaveBeenCalledWith(
          expect.objectContaining({
            phone: '555-123-4567',
          })
        );
      });
    });

    it('does not require phone validation', async () => {
      const formRef = createRef<VisitorFormRef>();
      const onSuccess = vi.fn();
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      renderWithTheme(<VisitorForm ref={formRef} onSuccess={onSuccess} />);

      await user.type(screen.getByLabelText(/your name/i), 'Test User');
      await user.type(screen.getByLabelText(/email/i), 'test@example.com');
      await user.type(screen.getByLabelText(/phone/i), 'any format works');
      await user.click(screen.getByText(/yes, first time/i));

      // Trigger submit via ref
      formRef.current?.submit();

      await waitFor(() => {
        expect(onSuccess).toHaveBeenCalledWith(
          expect.objectContaining({
            phone: 'any format works',
          })
        );
      });
    });
  });
});
