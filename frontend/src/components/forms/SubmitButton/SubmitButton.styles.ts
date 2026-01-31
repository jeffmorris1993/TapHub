import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const StyledButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  border: none;
  border-radius: ${({ theme }) => theme.radii.full};
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast};
  min-height: 48px;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.interactiveHover};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.interactiveActive};
    transform: translateY(0);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}40;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.border};
    cursor: not-allowed;
  }
`;

export const ButtonContent = styled.span<{ isHidden: boolean }>`
  visibility: ${({ isHidden }) => (isHidden ? 'hidden' : 'visible')};
`;

export const Spinner = styled.span`
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid ${({ theme }) => theme.colors.textOnPrimary}40;
  border-top-color: ${({ theme }) => theme.colors.textOnPrimary};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;
