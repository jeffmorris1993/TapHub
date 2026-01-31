import styled from '@emotion/styled';

interface GroupContainerProps {
  hasError?: boolean;
}

export const GroupContainer = styled.div<GroupContainerProps>`
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

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}40;
  }
`;
