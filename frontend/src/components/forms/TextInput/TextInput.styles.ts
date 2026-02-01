import styled from '@emotion/styled';

interface StyledInputProps {
  hasError?: boolean;
}

export const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  box-sizing: border-box;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: 2px solid
    ${({ theme, hasError }) =>
      hasError ? theme.colors.error : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  color: ${({ theme }) => theme.colors.textPrimary};
  background-color: ${({ theme }) => theme.colors.surface};
  transition: border-color ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme, hasError }) =>
      hasError ? theme.colors.error : theme.colors.primary};
    box-shadow: 0 0 0 3px
      ${({ theme, hasError }) =>
        hasError
          ? `${theme.colors.error}20`
          : `${theme.colors.primary}20`};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textTertiary};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.borderLight};
    cursor: not-allowed;
  }
`;
