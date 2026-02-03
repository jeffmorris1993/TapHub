import type { FC } from 'react';
import type { ScheduleItemProps } from '@/types/today';
import { ItemContainer, Time, Details, EventName, Location } from './ScheduleItem.styles';

export const ScheduleItem: FC<ScheduleItemProps> = ({ event }) => {
  return (
    <ItemContainer data-testid="schedule-item" role="listitem">
      <Time>{event.time}</Time>
      <Details>
        <EventName>{event.name}</EventName>
        <Location>{event.location}</Location>
      </Details>
    </ItemContainer>
  );
};
