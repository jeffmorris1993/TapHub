import type { FC } from 'react';
import { Check } from 'lucide-react';
import {
  ConfirmationCard,
  IconCircle,
  Heading,
  Message,
  SubmitAnotherButton,
} from './SuccessConfirmation.styles';

interface SuccessConfirmationProps {
  /** Callback when Submit Another button is clicked */
  onSubmitAnother: () => void;
}

/**
 * Success confirmation card shown after form submission.
 * Displays thank you message with green checkmark and option to submit another.
 */
export const SuccessConfirmation: FC<SuccessConfirmationProps> = ({
  onSubmitAnother,
}) => {
  return (
    <ConfirmationCard>
      <IconCircle>
        <Check size={32} color="white" data-testid="check-icon" />
      </IconCircle>
      <Heading>Thank you!</Heading>
      <Message>
        Someone from our team will reach out to you this week. We can't wait to
        meet you in person!
      </Message>
      <SubmitAnotherButton onClick={onSubmitAnother}>
        Submit Another
      </SubmitAnotherButton>
    </ConfirmationCard>
  );
};
