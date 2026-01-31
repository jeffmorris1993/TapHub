import styled from '@emotion/styled';

export const FormCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii['2xl']};
  box-shadow: 0px 20px 25px 0px rgba(0, 0, 0, 0.1);
  padding: ${({ theme }) => theme.spacing.lg};
  box-sizing: border-box;
  width: 100%;
  max-width: 640px;
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['2xl']};
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  box-sizing: border-box;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const SectionLabel = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const RequiredAsterisk = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

export const RadioButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

interface RadioButtonProps {
  isSelected: boolean;
}

export const RadioButton = styled.button<RadioButtonProps>`
  flex: 1;
  min-width: 140px;
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
    isSelected ? theme.colors.primary : theme.colors.textPrimary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  box-sizing: border-box;

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
