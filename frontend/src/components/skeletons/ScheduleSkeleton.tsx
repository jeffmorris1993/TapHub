import type { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styled from '@emotion/styled';

interface ScheduleSkeletonProps {
  count?: number;
}

const SkeletonItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm} 0;

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const TimeWrapper = styled.div`
  flex-shrink: 0;
  width: 80px;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

export const ScheduleSkeleton: FC<ScheduleSkeletonProps> = ({ count = 5 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonItem key={index} data-testid="schedule-skeleton-item">
          <TimeWrapper>
            <Skeleton width={70} height={20} borderRadius={4} />
          </TimeWrapper>
          <ContentWrapper>
            <Skeleton width="80%" height={18} borderRadius={4} />
            <Skeleton width="50%" height={14} borderRadius={4} style={{ marginTop: 4 }} />
          </ContentWrapper>
        </SkeletonItem>
      ))}
    </>
  );
};
