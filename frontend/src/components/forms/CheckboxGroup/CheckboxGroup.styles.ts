import styled from '@emotion/styled';

export const GroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: ${({ theme }) => theme.colors.surface};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  box-sizing: border-box;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:has(input:checked) {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primary}10;
  }

  &:focus-within {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}40;
  }
`;

export const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

interface CheckboxVisualProps {
  isChecked: boolean;
}

export const CheckboxVisual = styled.span<CheckboxVisualProps>`
  width: 20px;
  height: 20px;
  border: 2px solid
    ${({ theme, isChecked }) =>
      isChecked ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  background-color: ${({ theme, isChecked }) =>
    isChecked ? theme.colors.primary : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all ${({ theme }) => theme.transitions.fast};
`;

export const CheckIcon = styled.svg`
  width: 12px;
  height: 12px;
  fill: none;
  stroke: ${({ theme }) => theme.colors.textOnPrimary};
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

export const LabelText = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.textPrimary};
`;
