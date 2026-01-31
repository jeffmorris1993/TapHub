import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeProvider } from '@/theme';
import { FormField } from '../FormField';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('FormField', () => {
  it('renders label text', () => {
    renderWithTheme(
      <FormField label="Email">
        <input type="email" id="email" />
      </FormField>
    );
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('shows required asterisk when required prop is true', () => {
    renderWithTheme(
      <FormField label="Name" required>
        <input type="text" id="name" />
      </FormField>
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('does not show asterisk when required is false', () => {
    renderWithTheme(
      <FormField label="Phone">
        <input type="tel" id="phone" />
      </FormField>
    );
    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });

  it('renders error message when error prop is provided', () => {
    renderWithTheme(
      <FormField label="Email" error="Please enter a valid email">
        <input type="email" id="email" />
      </FormField>
    );
    expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
  });

  it('does not render error message when error prop is undefined', () => {
    renderWithTheme(
      <FormField label="Email">
        <input type="email" id="email" />
      </FormField>
    );
    expect(
      screen.queryByText('Please enter a valid email')
    ).not.toBeInTheDocument();
  });

  it('renders children (input element)', () => {
    renderWithTheme(
      <FormField label="Username">
        <input type="text" id="username" placeholder="Enter username" />
      </FormField>
    );
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
  });

  it('associates label with input via htmlFor', () => {
    renderWithTheme(
      <FormField label="Email" htmlFor="email-input">
        <input type="email" id="email-input" />
      </FormField>
    );
    const label = screen.getByText('Email').closest('label');
    expect(label).toHaveAttribute('for', 'email-input');
  });

  it('has aria-describedby pointing to error when error exists', () => {
    const { container } = renderWithTheme(
      <FormField label="Email" error="Invalid email" htmlFor="email-field">
        <input type="email" id="email-field" />
      </FormField>
    );
    const errorElement = container.querySelector('[id$="-error"]');
    expect(errorElement).toBeInTheDocument();
  });
});
