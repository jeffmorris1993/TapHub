import type { FC } from 'react';
import { Calendar } from 'lucide-react';
import type { ScheduleListProps } from '@/types/today';
import { Card } from '@/components/Card';
import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { ScheduleItem } from '@/components/ScheduleItem';
import { ScheduleSkeleton } from '@/components/skeletons';
import { ScheduleContainer } from './ScheduleList.styles';

export const ScheduleList: FC<ScheduleListProps> = ({
  events,
  isLoading,
  error,
  onRetry,
}) => {
  // Sort events by order field (ascending) - FR-005
  const sortedEvents = [...events].sort((a, b) => a.order - b.order);

  const renderContent = () => {
    if (isLoading) {
      return <ScheduleSkeleton />;
    }

    if (error) {
      return <ErrorState message={error} onRetry={onRetry} />;
    }

    if (sortedEvents.length === 0) {
      return (
        <EmptyState
          message="No events scheduled for today"
          icon={<Calendar size={32} />}
        />
      );
    }

    return (
      <ScheduleContainer>
        {sortedEvents.map((event) => (
          <ScheduleItem key={event.id} event={event} />
        ))}
      </ScheduleContainer>
    );
  };

  return (
    <Card heading="Today's Schedule">
      <div role="list" aria-label="Today's schedule">
        {renderContent()}
      </div>
    </Card>
  );
};
