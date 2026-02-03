import styled from '@emotion/styled';

export const CardContainer = styled.div`
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

export const IconWrapper = styled.div<{ color?: string }>`
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ color, theme }) => color || theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

export const Content = styled.div`
  flex: 1;
`;

export const Title = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  line-height: 1.4;
`;

export const Description = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  line-height: 1.5;
`;
