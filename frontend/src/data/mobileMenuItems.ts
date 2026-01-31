import { navigationItems } from './navigationItems';
import type { MobileMenuItem } from '@/types';

const gradientMap: Record<string, string> = {
  home: 'linear-gradient(to bottom, #c4956c, #e07a5f)',
  'new-here': 'linear-gradient(to bottom, #8b6f47, #6b5635)',
  today: 'linear-gradient(to bottom, #c4956c, #8b6f47)',
  events: 'linear-gradient(to bottom, #6b4423, #4a2f18)',
  'kids-youth': 'linear-gradient(to bottom, #9b7d54, #7b5d34)',
  give: 'linear-gradient(to bottom, #a37e5a, #836342)',
  feedback: 'linear-gradient(to bottom, #d4a574, #b48a5c)',
  settings: 'linear-gradient(135deg, #6a7282, #4a5565)',
};

export const mobileMenuItems: MobileMenuItem[] = [
  // Home item (not in original navigationItems)
  {
    id: 'home',
    icon: 'Home',
    title: 'Home',
    subtitle: 'Welcome & Overview',
    route: '/',
    order: 0,
    enabled: true,
    gradient: gradientMap['home'],
  },
  // Existing items with gradients
  ...navigationItems.map((item) => ({
    ...item,
    gradient: gradientMap[item.id] || gradientMap['home'],
  })),
  // Settings item (separated in menu)
  {
    id: 'settings',
    icon: 'Settings',
    title: 'Settings',
    subtitle: 'Preferences & app info',
    route: '/settings',
    order: 99,
    enabled: true,
    gradient: gradientMap['settings'],
  },
];

// Separate main items from settings for display
export const mainMenuItems = mobileMenuItems
  .filter((item) => item.id !== 'settings')
  .sort((a, b) => a.order - b.order);

export const settingsMenuItem = mobileMenuItems.find(
  (item) => item.id === 'settings'
)!;
