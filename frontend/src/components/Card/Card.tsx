import type { FC } from 'react';
import type { CardProps } from '@/types/today';
import { CardContainer, CardHeading, CardContent } from './Card.styles';

export const Card: FC<CardProps> = ({ heading, children, className }) => {
  return (
    <CardContainer className={className}>
      {heading && <CardHeading>{heading}</CardHeading>}
      <CardContent>{children}</CardContent>
    </CardContainer>
  );
};
