import type { FC } from 'react';
import { AlertCircle } from 'lucide-react';
import type { ErrorStateProps } from '@/types/today';
import { ErrorStateContainer, IconWrapper, Message, RetryButton } from './ErrorState.styles';

export const ErrorState: FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <ErrorStateContainer>
      <IconWrapper>
        <AlertCircle size={32} />
      </IconWrapper>
      <Message>{message}</Message>
      <RetryButton onClick={onRetry} aria-label="Retry loading">Retry</RetryButton>
    </ErrorStateContainer>
  );
};
