import { Settings, Shield, Moon } from 'lucide-react';
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
} from './Header.styles';

export const Header = () => {
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

        <MobileActions>
          <button aria-label="Security settings">
            <Shield size={20} />
          </button>
          <button aria-label="Toggle dark mode">
            <Moon size={20} />
          </button>
        </MobileActions>
      </HeaderContent>
    </HeaderContainer>
  );
};
