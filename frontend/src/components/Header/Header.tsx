import { useState } from 'react';
import { Settings, Menu, X } from 'lucide-react';
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
  MobileMenuButton,
  MobileMenuOverlay,
  MobileMenu,
  MobileMenuHeader,
  MobileNavLinks,
  MobileNavLink,
} from './Header.styles';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoSection to="/" aria-label="Nehemiah's Temple home">
          <LogoImage src="/neh_temple_logo.jpg" alt="Nehemiah's Temple" />
          <ChurchInfo>
            <ChurchName>Nehemiah's Temple</ChurchName>
            <AppName>Tap Hub</AppName>
          </ChurchInfo>
        </LogoSection>

        <AdminButton to="/admin">
          <Settings size={20} aria-hidden="true" />
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

        <MobileMenuButton onClick={toggleMobileMenu} aria-label="Toggle menu">
          <Menu size={24} />
        </MobileMenuButton>

        {mobileMenuOpen && (
          <>
            <MobileMenuOverlay onClick={closeMobileMenu} />
            <MobileMenu>
              <MobileMenuHeader>
                <span>Menu</span>
                <button onClick={closeMobileMenu} aria-label="Close menu">
                  <X size={24} />
                </button>
              </MobileMenuHeader>
              <MobileNavLinks>
                <MobileNavLink to="/" onClick={closeMobileMenu}>Home</MobileNavLink>
                <MobileNavLink to="/today" onClick={closeMobileMenu}>Today</MobileNavLink>
                <MobileNavLink to="/events" onClick={closeMobileMenu}>Events</MobileNavLink>
                <MobileNavLink to="/kids-youth" onClick={closeMobileMenu}>Kids</MobileNavLink>
                <MobileNavLink to="/give" onClick={closeMobileMenu}>Give</MobileNavLink>
              </MobileNavLinks>
            </MobileMenu>
          </>
        )}
      </HeaderContent>
    </HeaderContainer>
  );
};
