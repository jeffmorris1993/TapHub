import styled from '@emotion/styled';

/**
 * Form card wrapper - white background with shadow on mobile,
 * transparent on desktop (left panel provides background).
 */
export const FormCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    background-color: transparent;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  box-sizing: border-box;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const SectionLabel = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const RequiredAsterisk = styled.span`
  color: #fb2c36;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

export const RadioButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

interface RadioButtonProps {
  isSelected: boolean;
}

export const RadioButton = styled.button<RadioButtonProps>`
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid
    ${({ theme, isSelected }) =>
      isSelected ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: ${({ theme, isSelected }) =>
    isSelected ? `${theme.colors.primary}10` : theme.colors.surface};
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.primary : theme.colors.textSecondary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  box-sizing: border-box;
  min-height: 50px;
  text-align: center;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}40;
  }
`;

export const ErrorText = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.error};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;
