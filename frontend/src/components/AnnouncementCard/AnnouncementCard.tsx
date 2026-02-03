import type { FC } from 'react';
import { Users, Calendar, Bell, Info, type LucideProps } from 'lucide-react';
import type { AnnouncementCardProps } from '@/types/today';
import { CardContainer, IconWrapper, Content, Title, Description } from './AnnouncementCard.styles';

const iconMap: Record<string, FC<LucideProps>> = {
  users: Users,
  calendar: Calendar,
  bell: Bell,
  info: Info,
};

export const AnnouncementCard: FC<AnnouncementCardProps> = ({ announcement }) => {
  const IconComponent = announcement.icon
    ? iconMap[announcement.icon] || Info
    : Info;

  return (
    <CardContainer data-testid="announcement-card">
      <IconWrapper color={announcement.color || undefined}>
        <IconComponent size={20} />
      </IconWrapper>
      <Content>
        <Title>{announcement.title}</Title>
        <Description>{announcement.description}</Description>
      </Content>
    </CardContainer>
  );
};
