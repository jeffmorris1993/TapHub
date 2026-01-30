# Quickstart: Mobile Hamburger Menu Navigation

**Feature Branch**: `003-mobile-hamburger-menu`
**Date**: 2026-01-29

## Prerequisites

- Node.js 18+
- npm or yarn
- Git

## Setup

```bash
# Clone and checkout feature branch
git checkout 003-mobile-hamburger-menu

# Install dependencies
cd frontend
npm install

# Start development server
npm run dev
```

## Development Workflow (TDD)

Following the constitution's TDD requirement:

### 1. Write Tests First

```bash
# Run tests in watch mode
npm run test

# Or with UI
npm run test:ui
```

### 2. Create Test Files

Before writing any component code, create test files:

```
frontend/src/components/MobileMenu/__tests__/MobileMenu.test.tsx
frontend/src/hooks/__tests__/useMobileMenu.test.ts
```

### 3. Verify Tests Fail (Red Phase)

Run tests to confirm they fail before implementation:

```bash
npm run test -- --run
```

### 4. Implement (Green Phase)

Write minimal code to make tests pass.

### 5. Refactor

Clean up code while keeping tests green.

---

## File Structure

New files to create:

```
frontend/src/
├── components/
│   └── MobileMenu/
│       ├── MobileMenu.tsx
│       ├── MobileMenu.styles.ts
│       ├── index.ts
│       └── __tests__/
│           └── MobileMenu.test.tsx
├── hooks/
│   ├── useMobileMenu.ts
│   └── __tests__/
│       └── useMobileMenu.test.ts
└── data/
    └── mobileMenuItems.ts
```

Files to modify:

```
frontend/src/
├── components/
│   └── Header/
│       ├── Header.tsx          # Add hamburger button, integrate MobileMenu
│       └── Header.styles.ts    # Add HamburgerButton styles
├── types/
│   └── index.ts                # Add MobileMenuItem type
└── pages/
    └── PublicLanding/
        └── PublicLanding.tsx   # Remove BottomNavigation
```

Files to delete:

```
frontend/src/components/BottomNavigation/  # Entire directory
```

---

## Key Implementation Notes

### 1. Styles in Separate Files

Per constitution requirements, all styles go in `.styles.ts`:

```typescript
// MobileMenu.styles.ts
import styled from '@emotion/styled';

export const MenuOverlay = styled.div`
  // styles using theme tokens
`;
```

### 2. Use Theme Tokens

```typescript
// Use theme values, never hardcoded
background: ${({ theme }) => theme.colors.surface};
padding: ${({ theme }) => theme.spacing.md};
```

### 3. Leverage Existing Data

```typescript
// Import from existing navigation items
import { navigationItems } from '@/data/navigationItems';
```

### 4. Accessibility

```typescript
// Required ARIA attributes
<button aria-expanded={isOpen} aria-label="Open menu">
<div role="dialog" aria-modal="true" aria-label="Navigation menu">
```

---

## Testing Approach

### Unit Tests (useMobileMenu hook)

```typescript
describe('useMobileMenu', () => {
  it('starts with menu closed');
  it('opens menu when openMenu called');
  it('closes menu when closeMenu called');
  it('toggles menu state');
});
```

### Component Tests (MobileMenu)

```typescript
describe('MobileMenu', () => {
  it('renders nothing when closed');
  it('renders overlay and panel when open');
  it('calls onClose when overlay clicked');
  it('calls onClose when close button clicked');
  it('calls onClose when Escape pressed');
  it('highlights active navigation item');
  it('navigates and closes when item clicked');
  it('renders all menu items in correct order');
  it('has correct accessibility attributes');
});
```

### Integration Tests (Header)

```typescript
describe('Header with MobileMenu', () => {
  it('shows hamburger button on mobile');
  it('opens menu when hamburger clicked');
  it('passes current path to menu');
});
```

---

## Figma Reference

- Hamburger Menu (closed): Node 52:815
- Hamburger Menu (open): Node 52:511

Key design tokens from Figma:
- Overlay: `rgba(0,0,0,0.6)`
- Panel width: ~85% viewport width
- Animation: 300ms slide from right
- Active indicator: Left border bar in primary color

---

## Verification Checklist

Before considering feature complete:

- [ ] All tests pass
- [ ] Menu opens from hamburger button
- [ ] Menu closes via X button
- [ ] Menu closes via overlay click
- [ ] Menu closes via Escape key
- [ ] Menu closes after navigation
- [ ] Active item is highlighted
- [ ] All 8 items display correctly
- [ ] Settings is separated by divider
- [ ] Bottom navigation is removed
- [ ] Works on mobile viewport (< 768px)
- [ ] Animations are smooth (300ms)
- [ ] Accessibility audit passes
