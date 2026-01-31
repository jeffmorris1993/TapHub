import type { FC, MouseEventHandler } from 'react';
import { SubmitButton } from '@/components/forms';
import { FooterContainer, FooterButton } from './StickySubmitFooter.styles';

interface StickySubmitFooterProps {
  /** Button text (defaults to "Submit") */
  buttonText?: string;
  /** Show loading spinner on button */
  isLoading?: boolean;
  /** Disable the button */
  disabled?: boolean;
  /** Click handler for the button */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** Optional additional CSS class */
  className?: string;
}

/**
 * Sticky footer containing the submit button.
 * Fixed to bottom of viewport on mobile, relative positioning on desktop.
 * Used to keep the submit button always accessible while scrolling the form.
 */
export const StickySubmitFooter: FC<StickySubmitFooterProps> = ({
  buttonText = 'Submit',
  isLoading = false,
  disabled = false,
  onClick,
  className,
}) => {
  return (
    <FooterContainer role="contentinfo" className={className}>
      <FooterButton>
        <SubmitButton
          isLoading={isLoading}
          disabled={disabled}
          onClick={onClick}
        >
          {buttonText}
        </SubmitButton>
      </FooterButton>
    </FooterContainer>
  );
};
