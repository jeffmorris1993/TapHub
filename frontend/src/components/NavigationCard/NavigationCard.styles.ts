import styled from '@emotion/styled';

export const CardContainer = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 108px;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: ${({ theme }) => theme.radii.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  text-align: left;
  width: 100%;
  gap: ${({ theme }) => theme.spacing.md};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.interactive};
    outline-offset: 2px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: auto;
    min-height: 88px;
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const gradients = [
  'linear-gradient(to bottom, #8b6f47, #6b5635)', // icon1
  'linear-gradient(to bottom, #c4956c, #8b6f47)', // icon2
  'linear-gradient(to bottom, #6b4423, #4a2f18)', // icon3
  'linear-gradient(to bottom, #9b7d54, #7b5d34)', // icon4
  'linear-gradient(to bottom, #a37e5a, #836342)', // icon5
  'linear-gradient(to bottom, #d4a574, #b48a5c)', // icon6
];

export const IconWrapper = styled.div<{ $gradientIndex: number }>`
  width: 64px;
  height: 64px;
  min-width: 64px;
  border-radius: ${({ theme }) => theme.radii.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  background: ${({ $gradientIndex }) => gradients[$gradientIndex % gradients.length]};
  box-shadow: ${({ theme }) => theme.shadows.card};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 48px;
    height: 48px;
    min-width: 48px;
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  flex: 1;
  min-width: 0;
`;

export const Title = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
`;

export const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;
