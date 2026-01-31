import { forwardRef, type InputHTMLAttributes } from 'react';
import { StyledInput } from './TextInput.styles';

interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Input type: text, email, or tel */
  type?: 'text' | 'email' | 'tel';
  /** Whether to show error styling */
  hasError?: boolean;
}

/**
 * Styled text input component with error state support.
 * Works with react-hook-form via forwardRef.
 */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ type = 'text', hasError = false, ...props }, ref) => {
    return <StyledInput ref={ref} type={type} hasError={hasError} {...props} />;
  }
);

TextInput.displayName = 'TextInput';
