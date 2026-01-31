# Implementation Plan: Mobile Hamburger Menu Navigation

**Branch**: `003-mobile-hamburger-menu` | **Date**: 2026-01-29 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-mobile-hamburger-menu/spec.md`

## Summary

Replace the existing bottom navigation bar with a hamburger menu for mobile devices (< 768px). The hamburger menu slides in from the right side with a dark overlay, displays all navigation items with icons/titles/descriptions, highlights the active route, and can be dismissed via close button, overlay tap, or Escape key. This follows the Figma designs provided and uses existing navigation data structures.

## Technical Context

**Language/Version**: TypeScript 5+
**Primary Dependencies**: React 18+, Emotion 11 (CSS-in-JS), React Router v7, lucide-react (icons)
**Storage**: N/A (stateless UI component)
**Testing**: Vitest + React Testing Library
**Target Platform**: Web (mobile-first, responsive)
**Project Type**: Web application (frontend-only for this feature)
**Performance Goals**: Menu open/close animation within 300ms
**Constraints**: WCAG 2.1 AA accessibility, mobile breakpoint < 768px
**Scale/Scope**: Single hamburger menu component, updates to Header component, removal of BottomNavigation

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| TDD | PASS | Tests written first using Vitest + React Testing Library |
| Compelling UX | PASS | Figma designs followed exactly, 300ms animations, WCAG 2.1 AA |
| Error Handling | PASS | Handle edge cases (rotation, same-page navigation) |
| Security/Privacy | PASS | No sensitive data involved, client-side only |
| Simplicity | PASS | Single component, leverages existing navigation data |

**Constitution-specific requirements from user input:**
- TDD: Write tests FIRST, verify they FAIL, then implement
- Styling: All styles in separate `.styles.ts` files (Emotion pattern)
- Consistency: Use theme tokens for all design values
- Use existing code: Leverage `navigationItems.ts` data structure

## Project Structure

### Documentation (this feature)

```text
specs/003-mobile-hamburger-menu/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A - no API)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
frontend/src/
├── components/
│   ├── MobileMenu/                    # NEW - Hamburger menu component
│   │   ├── MobileMenu.tsx
│   │   ├── MobileMenu.styles.ts
│   │   ├── index.ts
│   │   └── __tests__/
│   │       └── MobileMenu.test.tsx
│   ├── Header/                        # MODIFY - Add hamburger button
│   │   ├── Header.tsx
│   │   ├── Header.styles.ts
│   │   └── __tests__/
│   │       └── Header.test.tsx        # UPDATE tests
│   └── BottomNavigation/              # DELETE - Remove component
│       ├── BottomNavigation.tsx
│       ├── BottomNavigation.styles.ts
│       └── __tests__/
├── data/
│   └── navigationItems.ts             # MODIFY - Add Home and Settings items
├── types/
│   └── index.ts                       # MODIFY - Add MobileMenuItem type
├── hooks/
│   └── useMobileMenu.ts               # NEW - Menu state management hook
│       └── __tests__/
│           └── useMobileMenu.test.ts
└── pages/
    └── PublicLanding/
        └── PublicLanding.tsx          # MODIFY - Remove BottomNavigation import
```

**Structure Decision**: Web application structure with components, hooks, and data directories. New MobileMenu component follows existing patterns with co-located styles and tests.

## Complexity Tracking

> No violations - architecture is simple and follows existing patterns.

| Aspect | Decision | Rationale |
|--------|----------|-----------|
| State Management | React useState in custom hook | Simpler than Context for single component |
| Animation | CSS transitions | 300ms matches theme.transitions.base |
| Navigation Data | Extend existing navigationItems.ts | Reuse existing structure per user request |
