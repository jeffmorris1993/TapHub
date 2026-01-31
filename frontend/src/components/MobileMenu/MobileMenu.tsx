import { useEffect, useCallback, useRef } from 'react';
import {
  Home,
  UserPlus,
  Bell,
  Calendar,
  Users,
  Heart,
  MessageSquare,
  Settings,
  X,
} from 'lucide-react';
import { mainMenuItems, settingsMenuItem } from '@/data/mobileMenuItems';
import {
  Overlay,
  MenuPanel,
  MenuHeader,
  MenuTitle,
  CloseButton,
  MenuContent,
  MenuList,
  MenuItem,
  MenuItemLink,
  MenuItemIcon,
  MenuItemContent,
  MenuItemTitle,
  MenuItemSubtitle,
  MenuDivider,
  ChurchBranding,
  BrandingText,
  ContactLink,
} from './MobileMenu.styles';

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Home,
  UserPlus,
  Bell,
  Calendar,
  Users,
  Heart,
  MessageSquare,
  Settings,
};

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  currentPath,
}) => {
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Handle Escape key
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    },
    [isOpen, onClose]
  );

  // Add/remove escape key listener
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Focus trap - keep focus within menu when open
  useEffect(() => {
    if (!isOpen || !menuPanelRef.current) return;

    // Focus the close button when menu opens
    closeButtonRef.current?.focus();

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !menuPanelRef.current) return;

      const focusableElements = menuPanelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isOpen]);

  // Handle overlay click
  const handleOverlayClick = useCallback(() => {
    onClose();
  }, [onClose]);

  // Handle menu panel click - prevent propagation to overlay
  const handlePanelClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
    },
    []
  );

  // Handle navigation item click
  const handleNavClick = useCallback(() => {
    onClose();
  }, [onClose]);

  // Don't render if closed
  if (!isOpen) {
    return null;
  }

  const renderIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent size={22} /> : null;
  };

  return (
    <>
      <Overlay isOpen={isOpen} onClick={handleOverlayClick} />
      <MenuPanel
        ref={menuPanelRef}
        isOpen={isOpen}
        onClick={handlePanelClick}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <MenuHeader>
          <MenuTitle>Menu</MenuTitle>
          <CloseButton ref={closeButtonRef} onClick={onClose} aria-label="Close menu">
            <X size={24} />
          </CloseButton>
        </MenuHeader>

        <MenuContent aria-label="Main navigation">
          <MenuList>
            {mainMenuItems.map((item) => {
              const isActive = currentPath === item.route;
              return (
                <MenuItem
                  key={item.id}
                  isActive={isActive}
                  data-active={isActive}
                >
                  <MenuItemLink to={item.route} onClick={handleNavClick}>
                    <MenuItemIcon gradient={item.gradient}>
                      {renderIcon(item.icon)}
                    </MenuItemIcon>
                    <MenuItemContent>
                      <MenuItemTitle>{item.title}</MenuItemTitle>
                      <MenuItemSubtitle>{item.subtitle}</MenuItemSubtitle>
                    </MenuItemContent>
                  </MenuItemLink>
                </MenuItem>
              );
            })}
          </MenuList>

          <MenuDivider />

          <MenuList>
            <MenuItem
              isActive={currentPath === settingsMenuItem.route}
              data-active={currentPath === settingsMenuItem.route}
            >
              <MenuItemLink to={settingsMenuItem.route} onClick={handleNavClick}>
                <MenuItemIcon gradient={settingsMenuItem.gradient}>
                  {renderIcon(settingsMenuItem.icon)}
                </MenuItemIcon>
                <MenuItemContent>
                  <MenuItemTitle>{settingsMenuItem.title}</MenuItemTitle>
                  <MenuItemSubtitle>{settingsMenuItem.subtitle}</MenuItemSubtitle>
                </MenuItemContent>
              </MenuItemLink>
            </MenuItem>
          </MenuList>
        </MenuContent>

        <ChurchBranding>
          <BrandingText>Nehemiah's Temple</BrandingText>
          <ContactLink href="mailto:info@nehemiahstemple.org">
            Contact Us
          </ContactLink>
        </ChurchBranding>
      </MenuPanel>
    </>
  );
};
