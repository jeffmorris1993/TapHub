import type { FC } from 'react';
import { HeaderContainer, Title, Subtitle } from './PageHeader.styles';

interface PageHeaderProps {
  /** Main page title */
  title: string;
  /** Optional subtitle text */
  subtitle?: string;
}

/**
 * Reusable page header with title and optional subtitle.
 * Renders title as h1 for semantic HTML.
 */
export const PageHeader: FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <HeaderContainer>
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </HeaderContainer>
  );
};
