import type { FC } from 'react';
import type { EmptyStateProps } from '@/types/today';
import { EmptyStateContainer, IconWrapper, Message } from './EmptyState.styles';

export const EmptyState: FC<EmptyStateProps> = ({ message, icon }) => {
  return (
    <EmptyStateContainer>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      <Message>{message}</Message>
    </EmptyStateContainer>
  );
};
