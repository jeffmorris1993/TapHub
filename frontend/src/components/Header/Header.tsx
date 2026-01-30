import { useLocation } from 'react-router-dom';
import { Shield, Menu } from 'lucide-react';
import { useMobileMenu } from '@/hooks';
import { MobileMenu } from '@/components/MobileMenu';
import {
  HeaderContainer,
  HeaderContent,
  LogoSection,
  LogoImage,
  ChurchInfo,
  ChurchName,
  AppName,
  AdminButton,
  Nav,
  NavLinks,
  NavLink,
  MobileActions,
  HamburgerButton,
} from './Header.styles';

export const Header = () => {
  const { pathname } = useLocation();
  const { isOpen, openMenu, closeMenu } = useMobileMenu();

  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoSection to="/" aria-label="Nehemiah's Temple home">
          <LogoImage src="/neh_temple_logo.jpg" alt="Nehemiah's Temple logo" />
          <ChurchInfo>
            <ChurchName>Nehemiah's Temple</ChurchName>
            <AppName>Tap Hub</AppName>
          </ChurchInfo>
        </LogoSection>

        <AdminButton to="/admin">
          <Shield size={20} aria-hidden="true" />
          Admin
        </AdminButton>

        <Nav aria-label="Main navigation">
          <NavLinks>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/today">Today</NavLink>
            <NavLink to="/events">Events</NavLink>
            <NavLink to="/kids-youth">Kids</NavLink>
            <NavLink to="/give">Give</NavLink>
          </NavLinks>
        </Nav>

        <MobileActions>
          <button aria-label="Security settings">
            <Shield size={20} />
          </button>
          <HamburgerButton onClick={openMenu} aria-label="Open menu" aria-expanded={isOpen}>
            <Menu size={24} />
          </HamburgerButton>
        </MobileActions>
      </HeaderContent>

      <MobileMenu isOpen={isOpen} onClose={closeMenu} currentPath={pathname} />
    </HeaderContainer>
  );
};
