import { Home, Calendar, CalendarCheck, Users, Heart } from 'lucide-react';
import {
  BottomNavContainer,
  NavItems,
  NavItem,
  NavLabel,
} from './BottomNavigation.styles';

export const BottomNavigation = () => {
  return (
    <BottomNavContainer aria-label="Mobile navigation">
      <NavItems>
        <NavItem to="/">
          <Home size={24} />
          <NavLabel>Home</NavLabel>
        </NavItem>
        <NavItem to="/today">
          <Calendar size={24} />
          <NavLabel>Today</NavLabel>
        </NavItem>
        <NavItem to="/events">
          <CalendarCheck size={24} />
          <NavLabel>Events</NavLabel>
        </NavItem>
        <NavItem to="/kids-youth">
          <Users size={24} />
          <NavLabel>Kids</NavLabel>
        </NavItem>
        <NavItem to="/give">
          <Heart size={24} />
          <NavLabel>Give</NavLabel>
        </NavItem>
      </NavItems>
    </BottomNavContainer>
  );
};
