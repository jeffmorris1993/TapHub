import type { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styled from '@emotion/styled';

interface AnnouncementSkeletonProps {
  count?: number;
}

const SkeletonCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  &:last-child {
    margin-bottom: 0;
  }
`;

const IconWrapper = styled.div`
  flex-shrink: 0;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

export const AnnouncementSkeleton: FC<AnnouncementSkeletonProps> = ({ count = 2 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} data-testid="announcement-skeleton-item">
          <IconWrapper>
            <Skeleton circle width={40} height={40} />
          </IconWrapper>
          <ContentWrapper>
            <Skeleton width="60%" height={20} borderRadius={4} />
            <Skeleton count={2} height={14} borderRadius={4} style={{ marginTop: 8 }} />
          </ContentWrapper>
        </SkeletonCard>
      ))}
    </>
  );
};
