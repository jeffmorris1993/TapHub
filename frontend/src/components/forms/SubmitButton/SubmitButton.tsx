import type { FC, ButtonHTMLAttributes, ReactNode } from 'react';
import { StyledButton, ButtonContent, Spinner } from './SubmitButton.styles';

interface SubmitButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** Button content */
  children: ReactNode;
  /** Show loading spinner */
  isLoading?: boolean;
}

/**
 * Submit button with loading state support.
 * Displays a spinner while loading and disables interaction.
 */
export const SubmitButton: FC<SubmitButtonProps> = ({
  children,
  isLoading = false,
  disabled = false,
  ...props
}) => {
  const isDisabled = disabled || isLoading;

  return (
    <StyledButton
      type="submit"
      disabled={isDisabled}
      aria-disabled={isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading && <Spinner data-testid="loading-spinner" />}
      <ButtonContent isHidden={isLoading}>{children}</ButtonContent>
    </StyledButton>
  );
};
