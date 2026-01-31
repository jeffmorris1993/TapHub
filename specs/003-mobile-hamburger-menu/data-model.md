# Data Model: Mobile Hamburger Menu Navigation

**Feature Branch**: `003-mobile-hamburger-menu`
**Date**: 2026-01-29

## Overview

Data structures for the mobile hamburger menu. This feature is primarily UI-focused with minimal data requirements, extending existing types.

---

## Entities

### 1. MobileMenuItem (extends NavigationItem)

Represents a menu item in the hamburger menu with additional display properties.

**Location**: `frontend/src/types/index.ts`

```typescript
export interface MobileMenuItem extends NavigationItem {
  gradient: string;           // CSS gradient for icon background
  description?: string;       // Optional longer description (maps from subtitle)
}
```

**Fields**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique identifier (from NavigationItem) |
| icon | string | Yes | lucide-react icon name (from NavigationItem) |
| title | string | Yes | Primary display text (from NavigationItem) |
| subtitle | string | Yes | Secondary display text (from NavigationItem) |
| route | string | Yes | Navigation path (from NavigationItem) |
| order | number | Yes | Display order (from NavigationItem) |
| enabled | boolean | Yes | Whether item is visible (from NavigationItem) |
| gradient | string | Yes | CSS gradient for icon background |

---

### 2. MobileMenuState

Represents the state of the hamburger menu.

**Location**: `frontend/src/hooks/useMobileMenu.ts` (internal to hook)

```typescript
interface MobileMenuState {
  isOpen: boolean;
}
```

**Fields**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| isOpen | boolean | Yes | Whether menu is currently open |

---

### 3. MobileMenuProps

Props interface for the MobileMenu component.

**Location**: `frontend/src/components/MobileMenu/MobileMenu.tsx`

```typescript
export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}
```

**Fields**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| isOpen | boolean | Yes | Controls menu visibility |
| onClose | () => void | Yes | Callback to close menu |
| currentPath | string | Yes | Current route for active state |

---

### 4. MobileMenuItemProps

Props interface for individual menu items.

**Location**: `frontend/src/components/MobileMenu/MobileMenu.tsx`

```typescript
interface MobileMenuItemProps {
  item: MobileMenuItem;
  isActive: boolean;
  onClick: () => void;
}
```

**Fields**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| item | MobileMenuItem | Yes | Menu item data |
| isActive | boolean | Yes | Whether this is the current page |
| onClick | () => void | Yes | Navigation handler |

---

## Data Transformations

### Navigation Items to Mobile Menu Items

Transform existing `navigationItems` array to include gradient backgrounds.

**Source**: `frontend/src/data/navigationItems.ts`
**Target**: `frontend/src/data/mobileMenuItems.ts`

```typescript
import { navigationItems } from './navigationItems';
import type { MobileMenuItem } from '@/types';

const gradientMap: Record<string, string> = {
  'home': 'linear-gradient(to bottom, #c4956c, #e07a5f)',
  'new-here': 'linear-gradient(to bottom, #8b6f47, #6b5635)',
  'today': 'linear-gradient(to bottom, #c4956c, #8b6f47)',
  'events': 'linear-gradient(to bottom, #6b4423, #4a2f18)',
  'kids-youth': 'linear-gradient(to bottom, #9b7d54, #7b5d34)',
  'give': 'linear-gradient(to bottom, #a37e5a, #836342)',
  'feedback': 'linear-gradient(to bottom, #d4a574, #b48a5c)',
  'settings': 'linear-gradient(135deg, #6a7282, #4a5565)',
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
  ...navigationItems.map(item => ({
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
export const mainMenuItems = mobileMenuItems.filter(
  item => item.id !== 'settings'
).sort((a, b) => a.order - b.order);

export const settingsMenuItem = mobileMenuItems.find(
  item => item.id === 'settings'
)!;
```

---

## Validation Rules

1. **Menu Item ID**: Must be unique across all items
2. **Route**: Must start with `/` and be a valid URL path
3. **Order**: Must be a non-negative integer
4. **Gradient**: Must be a valid CSS gradient string
5. **Icon**: Must be a valid lucide-react icon name

---

## State Transitions

### Menu State Machine

```
┌─────────────┐
│   CLOSED    │ ← Initial state
└─────────────┘
      │
      │ openMenu()
      ▼
┌─────────────┐
│    OPEN     │
└─────────────┘
      │
      │ closeMenu() / onNavigate() / onOverlayClick() / onEscapeKey()
      ▼
┌─────────────┐
│   CLOSED    │
└─────────────┘
```

**Triggers for closing**:
- Close button click
- Overlay click
- Escape key press
- Navigation item selection
- Window resize above 768px (optional enhancement)

---

## Relationships

```
Header (1) ─── contains ──► (1) MobileMenu
                                    │
                                    │ displays
                                    ▼
                            (N) MobileMenuItem
                                    │
                                    │ navigates to
                                    ▼
                               (1) Route
```

---

## No API Contracts

This feature is entirely frontend with no backend API requirements. Navigation data is static/hardcoded. No contracts directory needed.
