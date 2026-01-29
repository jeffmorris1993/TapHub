import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: sticky;
  top: 0;
  z-index: 1000;
`;

export const HeaderContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    grid-template-columns: 1fr auto;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const LogoSection = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  transition: opacity ${({ theme }) => theme.transitions.fast};

  &:hover {
    opacity: 0.8;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
    border-radius: ${({ theme }) => theme.radii.sm};
  }
`;

export const LogoImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radii.full};
  object-fit: cover;
  flex-shrink: 0;
`;

export const LogoCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const LogoText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  line-height: 1;
`;

export const ChurchInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const ChurchName = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1.25;
`;

export const AppName = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  color: ${({ theme }) => theme.colors.textTertiary};
  line-height: 1.33;
`;

export const AdminButton = styled(Link)`
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.md};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: all ${({ theme }) => theme.transitions.fast};
  min-height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const NavLink = styled(Link)`
  color: #364153;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
  letter-spacing: -0.3125px;
  line-height: 24px;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radii.sm};
  transition: all ${({ theme }) => theme.transitions.fast};
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const MobileActions = styled.div`
  display: none;
  gap: ${({ theme }) => theme.spacing.xs};
  align-items: center;
  justify-self: end;

  button {
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.textSecondary};
    cursor: pointer;
    padding: ${({ theme }) => theme.spacing.xs};
    border-radius: ${({ theme }) => theme.radii.sm};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all ${({ theme }) => theme.transitions.fast};
    min-width: 36px;
    min-height: 36px;

    &:hover {
      background: ${({ theme }) => theme.colors.background};
    }

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 2px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
  }
`;
