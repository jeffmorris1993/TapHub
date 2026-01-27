import {
  CardContainer,
  IconWrapper,
  ContentWrapper,
  Title,
  Subtitle,
} from './NavigationCard.styles';

export interface NavigationCardProps {
  title: string;
  subtitle: string;
  icon: string;
  onClick: () => void;
}

export const NavigationCard: React.FC<NavigationCardProps> = ({
  title,
  subtitle,
  icon,
  onClick,
}) => {
  return (
    <CardContainer onClick={onClick} data-icon={icon} aria-label={`${title}: ${subtitle}`}>
      <IconWrapper>
        {/* Simple icon placeholder - could be replaced with icon library */}
        <span data-icon={icon} aria-hidden="true">
          📍
        </span>
      </IconWrapper>
      <ContentWrapper>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </ContentWrapper>
    </CardContainer>
  );
};
