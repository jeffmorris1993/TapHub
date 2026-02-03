import styled from '@emotion/styled';

export const AnnouncementsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SectionHeading = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
`;
