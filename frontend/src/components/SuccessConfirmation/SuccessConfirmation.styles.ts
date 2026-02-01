import styled from '@emotion/styled';

export const ConfirmationCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 2px solid #22c55e;
  border-radius: ${({ theme }) => theme.radii['2xl']};
  padding: ${({ theme }) => theme.spacing['2xl']};
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.xl};
  box-sizing: border-box;
  width: 100%;
  max-width: 454px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl};
    border-radius: ${({ theme }) => theme.radii.xl};
  }
`;

export const IconCircle = styled.div`
  width: 80px;
  height: 80px;
  background-color: #22c55e;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${({ theme }) => theme.spacing.xl};

  svg {
    width: 40px;
    height: 40px;
    color: ${({ theme }) => theme.colors.textOnPrimary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 64px;
    height: 64px;
    margin-bottom: ${({ theme }) => theme.spacing.lg};

    svg {
      width: 32px;
      height: 32px;
    }
  }
`;

export const Heading = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
  font-size: 32px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  line-height: 40px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    line-height: 32px;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

export const Message = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0 0 ${({ theme }) => theme.spacing['2xl']} 0;
  line-height: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }
`;

export const SubmitAnotherButton = styled.button`
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.primary} 0%,
    #b48a5c 100%
  );
  color: ${({ theme }) => theme.colors.textOnPrimary};
  border: none;
  border-radius: ${({ theme }) => theme.radii.full};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing['2xl']};
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  min-height: 56px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}40;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: 48px;
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  }
`;
