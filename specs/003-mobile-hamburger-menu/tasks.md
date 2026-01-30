# Tasks: Mobile Hamburger Menu Navigation

**Input**: Design documents from `/specs/003-mobile-hamburger-menu/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: Included per constitution TDD requirement (tests written FIRST, verified to FAIL, then implementation)

**Organization**: Tasks grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, etc.)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `frontend/src/` with co-located `__tests__/` folders
- **Test Location**: All tests live in `__tests__/` folders within the same directory as source code
- **Styles**: All styles in separate `.styles.ts` files (per constitution)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and component scaffolding

- [X] T001 Add MobileMenuItem type extending NavigationItem in frontend/src/types/index.ts
- [X] T002 [P] Create mobileMenuItems.ts data file with gradient mappings in frontend/src/data/mobileMenuItems.ts
- [X] T003 [P] Create MobileMenu component directory structure in frontend/src/components/MobileMenu/
- [X] T004 [P] Create useMobileMenu hook directory structure in frontend/src/hooks/

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Tests (TDD - Write First, Verify Fail)

- [X] T005 [P] Write useMobileMenu hook tests (isOpen, openMenu, closeMenu, toggle) in frontend/src/hooks/__tests__/useMobileMenu.test.ts

### Implementation

- [X] T006 Implement useMobileMenu hook with useState for menu state in frontend/src/hooks/useMobileMenu.ts
- [X] T007 Create barrel export for useMobileMenu hook in frontend/src/hooks/index.ts
- [X] T008 Verify T005 tests pass after implementation

**Checkpoint**: Foundation ready - useMobileMenu hook works, user story implementation can begin

---

## Phase 3: User Story 1 - Open Mobile Menu (Priority: P1) 🎯 MVP

**Goal**: Tap hamburger icon in header to open slide-out menu from right side with dark overlay

**Independent Test**: Tap hamburger icon → menu slides in from right with all navigation options visible

### Tests for User Story 1 (TDD - Write First, Verify Fail)

- [X] T009 [P] [US1] Write MobileMenu component tests for open state rendering in frontend/src/components/MobileMenu/__tests__/MobileMenu.test.tsx
- [X] T010 [P] [US1] Write Header integration tests for hamburger button triggering menu in frontend/src/components/Header/__tests__/Header.test.tsx

### Implementation for User Story 1

- [X] T011 [P] [US1] Create MobileMenu.styles.ts with Overlay, MenuPanel, MenuHeader styles in frontend/src/components/MobileMenu/MobileMenu.styles.ts
- [X] T012 [US1] Implement MobileMenu component with isOpen prop rendering overlay and panel in frontend/src/components/MobileMenu/MobileMenu.tsx
- [X] T013 [US1] Create barrel export for MobileMenu in frontend/src/components/MobileMenu/index.ts
- [X] T014 [US1] Add HamburgerButton styled component to Header.styles.ts in frontend/src/components/Header/Header.styles.ts
- [X] T015 [US1] Integrate MobileMenu into Header with useMobileMenu hook in frontend/src/components/Header/Header.tsx
- [X] T016 [US1] Implement active item highlighting with left accent bar based on currentPath in frontend/src/components/MobileMenu/MobileMenu.tsx
- [X] T017 [US1] Verify T009, T010 tests pass after implementation

**Checkpoint**: User Story 1 complete - hamburger icon opens menu with overlay and navigation items

---

## Phase 4: User Story 2 - Close Mobile Menu (Priority: P1)

**Goal**: Close menu via X button, overlay click, or Escape key

**Independent Test**: Open menu → tap X button OR tap overlay OR press Escape → menu closes

### Tests for User Story 2 (TDD - Write First, Verify Fail)

- [X] T018 [P] [US2] Write MobileMenu tests for close button click in frontend/src/components/MobileMenu/__tests__/MobileMenu.test.tsx
- [X] T019 [P] [US2] Write MobileMenu tests for overlay click close in frontend/src/components/MobileMenu/__tests__/MobileMenu.test.tsx
- [X] T020 [P] [US2] Write MobileMenu tests for Escape key close in frontend/src/components/MobileMenu/__tests__/MobileMenu.test.tsx

### Implementation for User Story 2

- [X] T021 [P] [US2] Add CloseButton styled component to MobileMenu.styles.ts in frontend/src/components/MobileMenu/MobileMenu.styles.ts
- [X] T022 [US2] Implement close button (X icon) with onClose callback in frontend/src/components/MobileMenu/MobileMenu.tsx
- [X] T023 [US2] Implement overlay click handler calling onClose in frontend/src/components/MobileMenu/MobileMenu.tsx
- [X] T024 [US2] Implement Escape key listener with useEffect in frontend/src/components/MobileMenu/MobileMenu.tsx
- [X] T025 [US2] Add body scroll lock when menu is open in frontend/src/components/MobileMenu/MobileMenu.tsx
- [X] T026 [US2] Verify T018, T019, T020 tests pass after implementation

**Checkpoint**: User Story 2 complete - menu can be closed via all three methods

---

## Phase 5: User Story 3 - Navigate to Section via Menu (Priority: P1)

**Goal**: Tap menu item to navigate to section and auto-close menu

**Independent Test**: Open menu → tap "Events" → navigated to /events, menu closes

### Tests for User Story 3 (TDD - Write First, Verify Fail)

- [X] T027 [P] [US3] Write MobileMenu tests for navigation item click triggering navigation in frontend/src/components/MobileMenu/__tests__/MobileMenu.test.tsx
- [X] T028 [P] [US3] Write MobileMenu tests for menu closing after navigation in frontend/src/components/MobileMenu/__tests__/MobileMenu.test.tsx

### Implementation for User Story 3

- [X] T029 [P] [US3] Add MenuItem, MenuItemLink styled components to MobileMenu.styles.ts in frontend/src/components/MobileMenu/MobileMenu.styles.ts
- [X] T030 [US3] Implement menu item click handler with React Router navigation in frontend/src/components/MobileMenu/MobileMenu.tsx
- [X] T031 [US3] Auto-close menu after navigation item selected in frontend/src/components/MobileMenu/MobileMenu.tsx
- [X] T032 [US3] Handle same-page navigation edge case (close without reload) in frontend/src/components/MobileMenu/MobileMenu.tsx
- [X] T033 [US3] Verify T027, T028 tests pass after implementation

**Checkpoint**: User Story 3 complete - full navigation flow works

---

## Phase 6: User Story 4 - View Menu Item Details (Priority: P2)

**Goal**: Each menu item displays icon, title, and subtitle description in Figma-specified order

**Independent Test**: Open menu → verify each item shows colored icon + title + description in correct order

### Tests for User Story 4 (TDD - Write First, Verify Fail)

- [X] T034 [P] [US4] Write MobileMenu tests for menu item icon/title/subtitle rendering in frontend/src/components/MobileMenu/__tests__/MobileMenu.test.tsx
- [X] T035 [P] [US4] Write MobileMenu tests for correct menu item ordering in frontend/src/components/MobileMenu/__tests__/MobileMenu.test.tsx

### Implementation for User Story 4

- [X] T036 [P] [US4] Add MenuItemIcon, MenuItemTitle, MenuItemSubtitle styled components in frontend/src/components/MobileMenu/MobileMenu.styles.ts
- [X] T037 [US4] Implement icon rendering with gradient backgrounds from mobileMenuItems data in frontend/src/components/MobileMenu/MobileMenu.tsx
- [X] T038 [US4] Add divider separating Settings from main menu items in frontend/src/components/MobileMenu/MobileMenu.tsx
- [X] T039 [US4] Add church branding section at bottom with contact link in frontend/src/components/MobileMenu/MobileMenu.tsx
- [X] T040 [US4] Verify T034, T035 tests pass after implementation

**Checkpoint**: User Story 4 complete - full visual design matches Figma

---

## Phase 7: User Story 5 - Remove Bottom Navigation Bar (Priority: P1)

**Goal**: Remove existing bottom navigation from all mobile views

**Independent Test**: View any page on mobile → no bottom navigation bar present, content extends to bottom

### Tests for User Story 5 (TDD - Write First, Verify Fail)

- [X] T041 [P] [US5] Write PublicLanding tests confirming no BottomNavigation rendered in frontend/src/pages/PublicLanding/__tests__/PublicLanding.test.tsx

### Implementation for User Story 5

- [X] T042 [US5] Remove BottomNavigation import from PublicLanding.tsx in frontend/src/pages/PublicLanding/PublicLanding.tsx
- [X] T043 [US5] Remove BottomNavigation component usage from PublicLanding render in frontend/src/pages/PublicLanding/PublicLanding.tsx
- [X] T044 [US5] Delete entire BottomNavigation directory in frontend/src/components/BottomNavigation/
- [X] T045 [US5] Remove BottomNavigation barrel export from components index if exists
- [X] T046 [US5] Verify T041 tests pass after implementation

**Checkpoint**: User Story 5 complete - bottom navigation removed, hamburger menu is sole mobile nav

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, performance, and final validation

- [X] T047 [P] Add aria-expanded to hamburger button in frontend/src/components/Header/Header.tsx
- [X] T048 [P] Add role="dialog" and aria-modal="true" to MobileMenu panel in frontend/src/components/MobileMenu/MobileMenu.tsx
- [X] T049 [P] Add aria-label to navigation landmarks in frontend/src/components/MobileMenu/MobileMenu.tsx
- [X] T050 Implement focus trap when menu is open in frontend/src/components/MobileMenu/MobileMenu.tsx
- [X] T051 Verify 300ms animation timing matches theme.transitions.base in frontend/src/components/MobileMenu/MobileMenu.styles.ts
- [X] T052 Run full test suite and verify all tests pass
- [X] T053 Manual verification per quickstart.md checklist
- [X] T054 Accessibility audit (keyboard navigation, screen reader)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup - BLOCKS all user stories
- **User Stories (Phases 3-7)**: All depend on Foundational phase completion
  - US1, US2, US3 can proceed in sequence (tightly related)
  - US4 can run parallel to US3 (styling enhancement)
  - US5 can run parallel to others (independent deletion task)
- **Polish (Phase 8)**: Depends on all user stories complete

### User Story Dependencies

- **User Story 1 (P1)**: Foundational complete → implements menu opening
- **User Story 2 (P1)**: US1 complete → adds close functionality
- **User Story 3 (P1)**: US2 complete → adds navigation functionality
- **User Story 4 (P2)**: US1 complete → enhances visual display (can parallel US3)
- **User Story 5 (P1)**: Foundational complete → independent deletion (can parallel US1-4)

### Within Each User Story

- Tests (TDD) MUST be written and FAIL before implementation
- Styles before components (separate .styles.ts files per constitution)
- Implementation completes all related functionality
- Verify tests pass after implementation
- Story complete before moving to dependent stories

### Parallel Opportunities

- T002, T003, T004 can run in parallel (Setup)
- T009, T010 can run in parallel (US1 tests)
- T011 can run parallel to tests (different file)
- T018, T019, T020 can run in parallel (US2 tests - same file, but additive)
- T027, T028 can run in parallel (US3 tests)
- T034, T035 can run in parallel (US4 tests)
- US4 and US5 can run in parallel with US3
- T047, T048, T049 can run in parallel (Polish - different files)

---

## Parallel Example: User Story 1

```bash
# Launch tests for User Story 1 together (TDD - verify they fail):
Task: "Write MobileMenu component tests in frontend/src/components/MobileMenu/__tests__/MobileMenu.test.tsx"
Task: "Write Header integration tests in frontend/src/components/Header/__tests__/Header.test.tsx"

# After tests written, launch styles (different file from component):
Task: "Create MobileMenu.styles.ts in frontend/src/components/MobileMenu/MobileMenu.styles.ts"
```

---

## Implementation Strategy

### MVP First (User Stories 1-3 + 5)

1. Complete Phase 1: Setup (types, data, directory structure)
2. Complete Phase 2: Foundational (useMobileMenu hook with tests)
3. Complete Phase 3: User Story 1 - Open menu
4. Complete Phase 4: User Story 2 - Close menu
5. Complete Phase 5: User Story 3 - Navigate via menu
6. Complete Phase 7: User Story 5 - Remove bottom nav
7. **STOP and VALIDATE**: Core navigation works
8. Deploy/demo MVP

### Complete Feature

1. MVP complete (above)
2. Complete Phase 6: User Story 4 - Visual polish (icons, descriptions, branding)
3. Complete Phase 8: Polish (accessibility, performance, final validation)
4. Full feature complete

### TDD Workflow Per Task

1. Write test → Run test → Confirm FAIL (Red)
2. Write minimal implementation → Run test → Confirm PASS (Green)
3. Refactor if needed → Run test → Confirm still PASS
4. Commit

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- TDD required: Tests written FIRST, verified to FAIL, then implementation
- All styles in separate `.styles.ts` files per constitution
- Use theme tokens for all design values
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently

---

## Summary

| Phase | Tasks | Parallel Opportunities |
|-------|-------|------------------------|
| Setup | 4 | 3 |
| Foundational | 4 | 1 |
| US1 - Open Menu | 9 | 4 |
| US2 - Close Menu | 9 | 4 |
| US3 - Navigate | 7 | 3 |
| US4 - Item Details | 7 | 3 |
| US5 - Remove Bottom Nav | 6 | 1 |
| Polish | 8 | 4 |
| **Total** | **54** | **23** |
