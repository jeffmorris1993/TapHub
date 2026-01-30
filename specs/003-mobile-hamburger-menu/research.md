# Research: Mobile Hamburger Menu Navigation

**Feature Branch**: `003-mobile-hamburger-menu`
**Date**: 2026-01-29

## Overview

Research findings for implementing the mobile hamburger menu navigation to replace the bottom navigation bar.

---

## 1. Existing Navigation Patterns

### Decision: Extend existing `navigationItems.ts` data structure

**Rationale**: The codebase already has a well-defined `NavigationItem` type and data file that includes icon, title, subtitle, route, order, and enabled fields. This structure is sufficient for the hamburger menu with minor additions.

**Alternatives considered**:
- Create separate menu data structure → Rejected (duplicates data, harder to maintain)
- Use route-based discovery → Rejected (less control over ordering and display)

### Current Structure (from `/frontend/src/data/navigationItems.ts`):
```typescript
interface NavigationItem {
  id: string;
  icon: string;      // lucide-react icon name
  title: string;
  subtitle: string;
  route: string;
  order: number;
  enabled: boolean;
}
```

### Required Additions:
1. Add "Home" item (id: 'home', route: '/', order: 0)
2. Add "Settings" item (id: 'settings', route: '/settings', order: 7)
3. Add optional `gradient` field for icon background colors (per Figma)

---

## 2. Component Architecture

### Decision: Single MobileMenu component with internal state via custom hook

**Rationale**:
- Menu state (open/closed) is localized to header area
- Custom hook (`useMobileMenu`) provides clean separation of concerns
- No need for global state (Redux/Context) for single-component state

**Alternatives considered**:
- Context API for menu state → Rejected (over-engineering for single component)
- State directly in Header → Rejected (mixing UI logic with presentation)

### Component Hierarchy:
```
Header
├── LogoSection
├── AdminButton (desktop only)
├── Nav (desktop only)
├── MobileActions (mobile only)
│   ├── DarkModeToggle
│   └── HamburgerButton ← triggers MobileMenu
└── MobileMenu (portal to body)
    ├── Overlay
    └── MenuPanel
        ├── MenuHeader
        ├── NavigationItems
        ├── Divider
        ├── SettingsItem
        └── ChurchBranding
```

---

## 3. Styling Approach

### Decision: Emotion styled-components in separate `.styles.ts` file

**Rationale**:
- Matches existing codebase patterns (all components use `.styles.ts`)
- Constitution requires styles in separate files
- Theme tokens ensure consistency

**Key Styling Requirements from Figma**:
| Element | Value | Theme Token |
|---------|-------|-------------|
| Overlay background | rgba(0,0,0,0.6) | Custom (60% black) |
| Menu panel width | ~85% viewport, max 334px | Custom |
| Menu background | White with gradient hint | `theme.colors.surface` + gradient |
| Animation duration | 300ms | `theme.transitions.base` |
| Active item indicator | Left border bar, accent color | `theme.colors.primary` |
| Menu item icon size | 44px with gradient background | `theme.spacing` + gradients |
| Border radius | 16px for panel, 14px for icons | `theme.radii.xl`, `theme.radii.lg` |

---

## 4. Accessibility Requirements

### Decision: Full keyboard and screen reader support

**Rationale**: Constitution requires WCAG 2.1 AA compliance, and spec explicitly requires Escape key dismissal.

**Implementation details**:
- Focus trap when menu is open (tab cycles within menu)
- Escape key closes menu (FR-016)
- `aria-expanded` on hamburger button
- `aria-hidden` on background content when menu open
- `role="dialog"` and `aria-modal="true"` on menu panel
- `aria-label` on navigation landmarks
- Visible focus indicators (existing pattern)

**Alternatives considered**:
- Skip focus trap → Rejected (accessibility violation)
- Custom keyboard handling only → Rejected (need standard dialog behavior)

---

## 5. Animation Approach

### Decision: CSS transitions for slide-in animation

**Rationale**:
- Simple and performant
- Uses GPU-accelerated `transform` property
- 300ms matches theme transition speed

**Implementation**:
```css
/* Overlay fade */
transition: opacity 300ms ease;

/* Panel slide */
transform: translateX(100%); /* closed */
transform: translateX(0);    /* open */
transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
```

**Alternatives considered**:
- Framer Motion → Rejected (overkill for simple slide, adds bundle size)
- CSS animations → Rejected (transitions are simpler for state-based changes)

---

## 6. Route Detection for Active State

### Decision: Use React Router's `useLocation` hook

**Rationale**:
- Native to existing router setup
- Provides current pathname for comparison
- No additional dependencies

**Implementation**:
```typescript
const { pathname } = useLocation();
const isActive = pathname === item.route;
```

---

## 7. Icon Gradient Mapping

### Decision: Map navigation item IDs to theme gradient values

**Rationale**:
- Figma designs show different gradient backgrounds for each icon
- Theme already has `colors.gradients.icon1` through `icon6`
- Extend with additional gradients for Home and Settings

**Mapping from Figma**:
| Item | Gradient |
|------|----------|
| Home | `linear-gradient(to bottom, #c4956c, #e07a5f)` - primary to coral |
| New Here | `icon1: linear-gradient(to bottom, #8b6f47, #6b5635)` |
| Today | `icon2: linear-gradient(to bottom, #c4956c, #8b6f47)` |
| Events | `icon3: linear-gradient(to bottom, #6b4423, #4a2f18)` |
| Kids | `icon4: linear-gradient(to bottom, #9b7d54, #7b5d34)` |
| Give | `icon5: linear-gradient(to bottom, #a37e5a, #836342)` |
| Feedback | `icon6: linear-gradient(to bottom, #d4a574, #b48a5c)` |
| Settings | `linear-gradient(135deg, #6a7282, #4a5565)` - gray |

---

## 8. Body Scroll Lock

### Decision: Apply `overflow: hidden` to body when menu is open

**Rationale**:
- Prevents background scrolling while menu is open
- Standard UX pattern for modals/drawers

**Implementation**:
```typescript
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
```

---

## Summary

All technical decisions align with:
- Existing codebase patterns (Emotion, component structure)
- Constitution requirements (TDD, simplicity, accessibility)
- User requirements (use existing code, separate styles, follow Figma)

No NEEDS CLARIFICATION items remain. Ready to proceed with Phase 1 design.
