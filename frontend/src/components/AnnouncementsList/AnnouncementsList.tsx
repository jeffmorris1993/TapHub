import type { FC } from 'react';
import { Megaphone } from 'lucide-react';
import type { AnnouncementsListProps } from '@/types/today';
import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { AnnouncementCard } from '@/components/AnnouncementCard';
import { AnnouncementSkeleton } from '@/components/skeletons';
import { AnnouncementsContainer, SectionHeading } from './AnnouncementsList.styles';

export const AnnouncementsList: FC<AnnouncementsListProps> = ({
  announcements,
  isLoading,
  error,
  onRetry,
}) => {
  const renderContent = () => {
    if (isLoading) {
      return <AnnouncementSkeleton />;
    }

    if (error) {
      return <ErrorState message={error} onRetry={onRetry} />;
    }

    if (announcements.length === 0) {
      return (
        <EmptyState
          message="No announcements today"
          icon={<Megaphone size={32} />}
        />
      );
    }

    return (
      <AnnouncementsContainer>
        {announcements.map((announcement) => (
          <AnnouncementCard key={announcement.id} announcement={announcement} />
        ))}
      </AnnouncementsContainer>
    );
  };

  return (
    <div>
      <SectionHeading>Announcements</SectionHeading>
      {renderContent()}
    </div>
  );
};
