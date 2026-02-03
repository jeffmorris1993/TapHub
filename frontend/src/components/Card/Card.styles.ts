import styled from '@emotion/styled';

export const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

export const CardHeading = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;
