import {
  HeaderContainer,
  HeaderContent,
  LogoSection,
  Logo,
  ChurchName,
  Nav,
  NavLinks,
  NavLink,
  AdminButton,
} from './Header.styles';

export const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoSection to="/" aria-label="Nehemiah's Temple home">
          <Logo aria-hidden="true">NT</Logo>
          <ChurchName>Nehemiah's Temple</ChurchName>
        </LogoSection>

        <Nav aria-label="Main navigation">
          <NavLinks>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/today">Today</NavLink>
            <NavLink to="/events">Events</NavLink>
            <NavLink to="/kids-youth">Kids</NavLink>
            <NavLink to="/give">Give</NavLink>
          </NavLinks>

          <AdminButton to="/admin">Admin</AdminButton>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};
