import type { FC, ReactNode } from 'react';
import {
  FieldContainer,
  Label,
  RequiredAsterisk,
  ErrorMessage,
  InputWrapper,
} from './FormField.styles';

interface FormFieldProps {
  /** Label text to display */
  label: string;
  /** Whether the field is required */
  required?: boolean;
  /** Error message to display */
  error?: string;
  /** ID for label htmlFor attribute */
  htmlFor?: string;
  /** Child input element */
  children: ReactNode;
}

/**
 * Wrapper component for form inputs with label and error display.
 * Provides consistent styling and accessibility attributes.
 */
export const FormField: FC<FormFieldProps> = ({
  label,
  required = false,
  error,
  htmlFor,
  children,
}) => {
  const errorId = htmlFor ? `${htmlFor}-error` : undefined;

  return (
    <FieldContainer>
      <Label htmlFor={htmlFor}>
        {label}
        {required && <RequiredAsterisk aria-hidden="true">*</RequiredAsterisk>}
      </Label>
      <InputWrapper>{children}</InputWrapper>
      {error && (
        <ErrorMessage id={errorId} role="alert">
          {error}
        </ErrorMessage>
      )}
    </FieldContainer>
  );
};
