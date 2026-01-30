import { UserPlus, Bell, Calendar, Users, Heart, MessageSquare, ChevronRight } from 'lucide-react';
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
  gradientIndex?: number;
}

// Map icon names to lucide-react components
const iconComponents = {
  UserPlus,
  Bell,
  Calendar,
  Users,
  Heart,
  MessageSquare,
};

export const NavigationCard: React.FC<NavigationCardProps> = ({
  title,
  subtitle,
  icon,
  onClick,
  gradientIndex = 0,
}) => {
  const IconComponent = iconComponents[icon as keyof typeof iconComponents];

  return (
    <CardContainer onClick={onClick} aria-label={`${title}: ${subtitle}`} data-icon={icon}>
      <IconWrapper $gradientIndex={gradientIndex}>
        {IconComponent && <IconComponent size={32} color="white" aria-hidden="true" />}
      </IconWrapper>
      <ContentWrapper>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </ContentWrapper>
      <ChevronRight size={24} color="#4a5565" aria-hidden="true" />
    </CardContainer>
  );
};
