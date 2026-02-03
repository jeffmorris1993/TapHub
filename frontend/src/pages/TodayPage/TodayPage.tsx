import type { FC } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { ScheduleList } from '@/components/ScheduleList';
import { AnnouncementsList } from '@/components/AnnouncementsList';
import { useTodayData } from '@/hooks/useTodayData';
import { PageContainer, ContentContainer, SectionSpacing } from './TodayPage.styles';

/**
 * Formats a date as "Weekday, Month Day, Year"
 * Example: "Sunday, January 19, 2026"
 */
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

export const TodayPage: FC = () => {
  const { schedule, announcements, isLoading, error, retry } = useTodayData();
  const currentDate = formatDate(new Date());

  return (
    <PageContainer>
      <PageHeader title="Today at Nehemiah's Temple" subtitle={currentDate} />
      <ContentContainer>
        <SectionSpacing>
          <ScheduleList
            events={schedule}
            isLoading={isLoading}
            error={error}
            onRetry={retry}
          />
        </SectionSpacing>
        <SectionSpacing>
          <AnnouncementsList
            announcements={announcements}
            isLoading={isLoading}
            error={error}
            onRetry={retry}
          />
        </SectionSpacing>
      </ContentContainer>
    </PageContainer>
  );
};
