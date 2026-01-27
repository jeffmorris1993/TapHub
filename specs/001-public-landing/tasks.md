# Tasks: Public Landing Page

**Input**: Design documents from `/specs/001-public-landing/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

**Tests**: Tests are included (TDD approach per constitution requirement)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `frontend/src/` with co-located `__tests__/` folders
- **Test Location**: All tests live in `__tests__/` folders within the same directory as source code

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Initialize React TypeScript project with Vite in frontend/ directory
- [ ] T002 [P] Install dependencies: React 18+, TypeScript 5+, Emotion 11, React Router 6, Vitest, React Testing Library
- [ ] T003 [P] Configure TypeScript (tsconfig.json) with strict mode and path aliases (@/)
- [ ] T004 [P] Configure Vite (vite.config.ts) with Emotion plugin and path resolution
- [ ] T005 [P] Configure Vitest (vitest.config.ts) with jsdom environment and test setup
- [ ] T006 [P] Configure ESLint and Prettier for code quality
- [ ] T007 [P] Create test setup file in frontend/src/test/setup.ts with @testing-library/jest-dom
- [ ] T008 Create .env.example file with environment variable templates
- [ ] T009 Create frontend/src/vite-env.d.ts for Vite type definitions

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T010 [P] Create theme system: light theme object in frontend/src/theme/theme.ts with colors, typography, spacing, breakpoints
- [ ] T011 [P] Create ThemeProvider component in frontend/src/theme/ThemeProvider.tsx using React Context and Emotion ThemeProvider
- [ ] T012 [P] Create theme barrel export in frontend/src/theme/index.ts
- [ ] T013 [P] Create TypeScript types file in frontend/src/types/index.ts with NavigationItem, ServiceTime, ContactInfo, HeroContent, PublicLandingPageData interfaces
- [ ] T014 [P] Create static data: navigationItems in frontend/src/data/navigationItems.ts with 6 navigation cards
- [ ] T015 [P] Create static data: serviceTimes in frontend/src/data/serviceTimes.ts with 3 service schedules
- [ ] T016 [P] Create static data: contactInfo in frontend/src/data/contactInfo.ts with church contact information
- [ ] T017 [P] Create static data: heroContent in frontend/src/data/heroContent.ts with hero section content
- [ ] T018 [P] Create data barrel export in frontend/src/data/index.ts
- [ ] T019 [P] Create landingPageService in frontend/src/services/landingPageService.ts that returns static data
- [ ] T020 [P] Create services barrel export in frontend/src/services/index.ts
- [ ] T021 [P] Create App.tsx with React Router setup and ThemeProvider wrapper
- [ ] T022 [P] Create main.tsx as application entry point
- [ ] T023 Add hero-image.jpg to frontend/public/ directory (recommended: 1920x1080px, < 500KB, optimized for web)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - First-Time Visitor Orientation (Priority: P1) 🎯 MVP

**Goal**: Display a complete landing page with church branding, hero section, 6 navigation cards, service times, and contact info that loads in < 2 seconds on mobile

**Independent Test**: Load the landing page and verify church name, tagline, hero image, 6 navigation cards (clickable), service times (3 services), and contact information are all visible and functional

### Tests for User Story 1 (TDD - Write FIRST, ensure they FAIL)

- [x] T024 [P] [US1] Write test for NavigationCard component in frontend/src/components/NavigationCard/__tests__/NavigationCard.test.tsx (renders title, subtitle, icon, onClick handler)
- [x] T025 [P] [US1] Write test for HeroSection component in frontend/src/components/HeroSection/__tests__/HeroSection.test.tsx (renders heading, subtitle, image with fallback)
- [x] T026 [P] [US1] Write test for ServiceTimes component in frontend/src/components/ServiceTimes/__tests__/ServiceTimes.test.tsx (renders all service times)
- [x] T027 [P] [US1] Write test for ContactInfo component in frontend/src/components/ContactInfo/__tests__/ContactInfo.test.tsx (renders address and phone)
- [x] T028 [P] [US1] Write test for PublicLanding page in frontend/src/pages/PublicLanding/__tests__/PublicLanding.test.tsx (renders all sections, loads data from service)

### Implementation for User Story 1

- [x] T029 [P] [US1] Create NavigationCard.styles.ts in frontend/src/components/NavigationCard/ with Emotion styled components
- [x] T030 [US1] Implement NavigationCard component in frontend/src/components/NavigationCard/NavigationCard.tsx (uses styles, accepts props, handles click)
- [x] T031 [US1] Create NavigationCard barrel export in frontend/src/components/NavigationCard/index.ts
- [x] T032 [P] [US1] Create HeroSection.styles.ts in frontend/src/components/HeroSection/ with responsive styles and overlay
- [x] T033 [US1] Implement HeroSection component in frontend/src/components/HeroSection/HeroSection.tsx with image fallback handling
- [x] T034 [US1] Create HeroSection barrel export in frontend/src/components/HeroSection/index.ts
- [x] T035 [P] [US1] Create ServiceTimes.styles.ts in frontend/src/components/ServiceTimes/ with list styling
- [x] T036 [US1] Implement ServiceTimes component in frontend/src/components/ServiceTimes/ServiceTimes.tsx (renders service list with clock icon)
- [x] T037 [US1] Create ServiceTimes barrel export in frontend/src/components/ServiceTimes/index.ts
- [x] T038 [P] [US1] Create ContactInfo.styles.ts in frontend/src/components/ContactInfo/ with contact layout styles
- [x] T039 [US1] Implement ContactInfo component in frontend/src/components/ContactInfo/ContactInfo.tsx (renders address and phone)
- [x] T040 [US1] Create ContactInfo barrel export in frontend/src/components/ContactInfo/index.ts
- [x] T041 [US1] Create PublicLanding.tsx page in frontend/src/pages/PublicLanding/ that composes all components and fetches data from landingPageService
- [x] T042 [US1] Create PublicLanding page barrel export in frontend/src/pages/PublicLanding/index.ts
- [x] T043 [US1] Add route for PublicLanding page to App.tsx (root path "/")
- [x] T044 [US1] Verify all tests pass and page renders correctly on mobile (320px) and desktop (1920px)

**Checkpoint**: At this point, User Story 1 should be fully functional - landing page displays with all content, navigation cards are clickable, page is responsive

---

## Phase 4: User Story 2 - Header Navigation Access (Priority: P2)

**Goal**: Add a header with church branding, navigation links (desktop/tablet), and Admin button for alternative navigation

**Independent Test**: Load the landing page and verify header displays church logo "NT", church name, navigation links (Home, Today, Events, Kids, Give) on desktop, and Admin button that navigates correctly

### Tests for User Story 2 (TDD - Write FIRST, ensure they FAIL)

- [x] T045 [P] [US2] Write test for Header component in frontend/src/components/Header/__tests__/Header.test.tsx (renders logo, church name, nav links on desktop, Admin button)

### Implementation for User Story 2

- [x] T046 [P] [US2] Create Header.styles.ts in frontend/src/components/Header/ with responsive header styles (mobile vs desktop nav)
- [x] T047 [US2] Implement Header component in frontend/src/components/Header/Header.tsx with logo, church name, desktop nav links, Admin button
- [x] T048 [US2] Create Header barrel export in frontend/src/components/Header/index.ts
- [x] T049 [US2] Add Header component to PublicLanding page in frontend/src/pages/PublicLanding/PublicLanding.tsx
- [x] T050 [US2] Verify header test passes and header renders correctly on mobile (no nav links) and desktop (with nav links)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently - landing page has header with navigation options

---

## Phase 5: Accessibility & Performance (Cross-Cutting Concerns)

**Purpose**: Ensure WCAG 2.1 AA compliance, performance optimization, and analytics

- [x] T051 [P] Write test for accessibility utilities in frontend/src/utils/__tests__/accessibility.test.ts (contrast ratio, touch target validation)
- [x] T052 [P] Implement accessibility utilities in frontend/src/utils/accessibility.ts (getContrastRatio, validateTouchTarget, getAriaLabel functions)
- [x] T053 [P] Create utils barrel export in frontend/src/utils/index.ts
- [x] T054 [P] Write test for useOffline hook in frontend/src/hooks/__tests__/useOffline.test.ts
- [x] T055 [P] Implement useOffline hook in frontend/src/hooks/useOffline.ts (detects online/offline status)
- [x] T056 [P] Write test for useAnalytics hook in frontend/src/hooks/__tests__/useAnalytics.test.ts
- [x] T057 [P] Implement useAnalytics hook in frontend/src/hooks/useAnalytics.ts (trackEvent with navigator.sendBeacon)
- [x] T058 [P] Create hooks barrel export in frontend/src/hooks/index.ts
- [x] T059 Add ARIA labels to all interactive elements in NavigationCard, Header components
- [x] T060 Add keyboard navigation support (Tab, Enter) to NavigationCard component
- [x] T061 Verify all tap targets are minimum 44x44px in NavigationCard and Header components
- [x] T062 Add React Error Boundary component in frontend/src/components/ErrorBoundary/ErrorBoundary.tsx
- [x] T063 Wrap App.tsx with ErrorBoundary component
- [x] T064 Configure Vite PWA plugin in vite.config.ts for offline caching (Service Worker with Workbox)
- [x] T065 Add useAnalytics hook to PublicLanding page to track page views and navigation card clicks
- [ ] T066 Run Lighthouse audit and verify performance score 90+, accessibility score 100

---

## Phase 6: Polish & Final Validation

**Purpose**: Final touches, documentation, and validation

- [ ] T067 [P] Write theme unit tests in frontend/src/theme/__tests__/theme.test.ts (validates theme structure)
- [ ] T068 [P] Add loading skeleton/placeholder for hero image in HeroSection component
- [x] T069 [P] Add visual feedback (hover, active states) to all interactive elements
- [ ] T070 [P] Optimize images: compress hero-image.jpg, add WebP version with fallback
- [ ] T071 Run full test suite (npm run test) and ensure all tests pass
- [x] T072 Run type checking (npm run type-check) and fix any TypeScript errors
- [ ] T073 Run linting (npm run lint) and fix any ESLint errors
- [x] T074 Build for production (npm run build) and verify bundle size < 150KB gzipped
- [ ] T075 Test on real devices: iOS Safari, Android Chrome, verify responsive design 320px-1920px
- [ ] T076 Run WCAG accessibility validator and fix any violations
- [ ] T077 Verify all quickstart.md scenarios work (development setup, running tests, building)
- [ ] T078 Update README.md with project setup instructions

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User Story 1 and 2 can proceed in parallel after Foundational
  - User Story 2 has light dependency on US1 (adds Header to existing page)
- **Accessibility & Performance (Phase 5)**: Can start after US1 is complete
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Integrates with US1 page but independently testable
- **Accessibility & Performance**: Can start after US1 (needs components to exist)

### Within Each User Story

- Tests MUST be written and FAIL before implementation (TDD)
- Styles files before component implementation
- Components before page composition
- Page integration last
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks (T002-T009) can run in parallel after T001
- All Foundational data tasks (T014-T018) can run in parallel
- All Foundational infrastructure (T010-T013, T019-T023) can run in parallel
- All US1 test files (T024-T028) can be written in parallel
- All US1 styles files (T029, T032, T035, T038) can be created in parallel
- All US2 implementation can start once US1 components exist
- All accessibility utilities and hooks (T051-T058) can be implemented in parallel

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task T024: "Write test for NavigationCard component in frontend/src/components/NavigationCard/__tests__/NavigationCard.test.tsx"
Task T025: "Write test for HeroSection component in frontend/src/components/HeroSection/__tests__/HeroSection.test.tsx"
Task T026: "Write test for ServiceTimes component in frontend/src/components/ServiceTimes/__tests__/ServiceTimes.test.tsx"
Task T027: "Write test for ContactInfo component in frontend/src/components/ContactInfo/__tests__/ContactInfo.test.tsx"
Task T028: "Write test for PublicLanding page in frontend/src/pages/PublicLanding/__tests__/PublicLanding.test.tsx"

# Launch all styles files for User Story 1 together:
Task T029: "Create NavigationCard.styles.ts in frontend/src/components/NavigationCard/"
Task T032: "Create HeroSection.styles.ts in frontend/src/components/HeroSection/"
Task T035: "Create ServiceTimes.styles.ts in frontend/src/components/ServiceTimes/"
Task T038: "Create ContactInfo.styles.ts in frontend/src/components/ContactInfo/"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T009)
2. Complete Phase 2: Foundational (T010-T023) - CRITICAL
3. Complete Phase 3: User Story 1 (T024-T044)
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready (landing page fully functional)

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP! 🎯)
3. Add User Story 2 → Test independently → Deploy/Demo (Header navigation added)
4. Add Accessibility & Performance → Validate compliance → Deploy/Demo
5. Add Polish → Final validation → Production release

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (core landing page)
   - Developer B: User Story 2 (header navigation)
   - Developer C: Accessibility & Performance hooks/utils
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- TDD: Write tests FIRST, verify they FAIL, then implement
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Constitution compliance: Tests in `__tests__/`, Emotion styled-components, React Context for theme, WCAG 2.1 AA, privacy-respecting analytics
