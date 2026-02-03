# Tasks: Today at Nehemiah Page

**Input**: Design documents from `/specs/005-today-at-nehemiah-page/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: TDD approach required per plan.md - tests written FIRST for all components.

**Organization**: Tasks grouped by user story (US1: Schedule, US2: Date Context, US3: Announcements)

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Frontend**: `frontend/src/` with co-located `__tests__/` folders
- All tests in `__tests__/` folders within same directory as source

---

## Phase 1: Setup

**Purpose**: Project initialization, dependencies, and shared infrastructure

- [x] T001 Install react-loading-skeleton dependency: `npm install react-loading-skeleton`
- [x] T002 [P] Create TypeScript types in `frontend/src/types/today.ts` (ScheduleEvent, Announcement, component props)
- [x] T003 [P] Export types from `frontend/src/types/index.ts`
- [x] T004 [P] Create mock data in `frontend/src/data/todayMockData.ts` (mockScheduleEvents, mockAnnouncements)
- [x] T005 Add GET method support to `frontend/src/services/api/apiClient.ts` with mockGet handler for schedule and announcements endpoints

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Reusable components and service layer that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Tests for Foundational Components (TDD - Write First)

- [x] T006 [P] Write failing test for Card component in `frontend/src/components/Card/__tests__/Card.test.tsx`
- [x] T007 [P] Write failing test for EmptyState component in `frontend/src/components/EmptyState/__tests__/EmptyState.test.tsx`
- [x] T008 [P] Write failing test for ErrorState component in `frontend/src/components/ErrorState/__tests__/ErrorState.test.tsx`
- [x] T009 [P] Write failing test for todayService in `frontend/src/services/__tests__/todayService.test.ts`
- [x] T010 [P] Write failing test for useTodayData hook in `frontend/src/hooks/__tests__/useTodayData.test.ts`

### Implementation for Foundational Components

- [x] T011 [P] Create Card component in `frontend/src/components/Card/Card.tsx` (generic container with shadow, rounded corners, optional heading)
- [x] T012 [P] Create Card styles in `frontend/src/components/Card/Card.styles.ts`
- [x] T013 [P] Create Card index in `frontend/src/components/Card/index.ts`
- [x] T014 [P] Create EmptyState component in `frontend/src/components/EmptyState/EmptyState.tsx` (message with optional icon)
- [x] T015 [P] Create EmptyState styles in `frontend/src/components/EmptyState/EmptyState.styles.ts`
- [x] T016 [P] Create EmptyState index in `frontend/src/components/EmptyState/index.ts`
- [x] T017 [P] Create ErrorState component in `frontend/src/components/ErrorState/ErrorState.tsx` (error message with retry button)
- [x] T018 [P] Create ErrorState styles in `frontend/src/components/ErrorState/ErrorState.styles.ts`
- [x] T019 [P] Create ErrorState index in `frontend/src/components/ErrorState/index.ts`
- [x] T020 Create todayService in `frontend/src/services/todayService.ts` (getSchedule, getAnnouncements methods)
- [x] T021 Create useTodayData hook in `frontend/src/hooks/useTodayData.ts` (loading, error, retry states)

**Checkpoint**: Foundation ready - all tests passing, reusable components available

---

## Phase 3: User Story 1 - View Today's Schedule (Priority: P1) 🎯 MVP

**Goal**: Display the daily schedule with events showing time, name, and location

**Independent Test**: Navigate to /today, verify schedule card displays with all events sorted by time

### Tests for User Story 1 (TDD - Write First)

- [x] T022 [P] [US1] Write failing test for ScheduleSkeleton in `frontend/src/components/skeletons/__tests__/ScheduleSkeleton.test.tsx`
- [x] T023 [P] [US1] Write failing test for ScheduleItem in `frontend/src/components/ScheduleItem/__tests__/ScheduleItem.test.tsx`
- [x] T024 [P] [US1] Write failing test for ScheduleList in `frontend/src/components/ScheduleList/__tests__/ScheduleList.test.tsx` (include test verifying items render in ascending order by `order` field - FR-005)

### Implementation for User Story 1

- [x] T025 [P] [US1] Create ScheduleSkeleton component in `frontend/src/components/skeletons/ScheduleSkeleton.tsx`
- [x] T026 [P] [US1] Create skeletons index in `frontend/src/components/skeletons/index.ts`
- [x] T027 [P] [US1] Create ScheduleItem component in `frontend/src/components/ScheduleItem/ScheduleItem.tsx` (displays time in gold, name, location)
- [x] T028 [P] [US1] Create ScheduleItem styles in `frontend/src/components/ScheduleItem/ScheduleItem.styles.ts`
- [x] T029 [P] [US1] Create ScheduleItem index in `frontend/src/components/ScheduleItem/index.ts`
- [x] T030 [US1] Create ScheduleList component in `frontend/src/components/ScheduleList/ScheduleList.tsx` (uses Card, handles loading/empty/error states)
- [x] T031 [US1] Create ScheduleList styles in `frontend/src/components/ScheduleList/ScheduleList.styles.ts`
- [x] T032 [US1] Create ScheduleList index in `frontend/src/components/ScheduleList/index.ts`

**Checkpoint**: Schedule section complete - displays events with skeleton loading, empty state, and error handling

---

## Phase 4: User Story 2 - View Current Date Context (Priority: P1)

**Goal**: Display page title "Today at Nehemiah's Temple" with formatted current date

**Independent Test**: Navigate to /today, verify title and date display in correct format "Weekday, Month Day, Year"

### Tests for User Story 2 (TDD - Write First)

- [x] T033 [P] [US2] Write failing test for TodayPage in `frontend/src/pages/TodayPage/__tests__/TodayPage.test.tsx` (title, date display, uses PageHeader)

### Implementation for User Story 2

- [x] T034 [US2] Create TodayPage component in `frontend/src/pages/TodayPage/TodayPage.tsx` (uses existing PageHeader with title and formatted date)
- [x] T035 [US2] Create TodayPage styles in `frontend/src/pages/TodayPage/TodayPage.styles.ts`
- [x] T036 [US2] Create TodayPage index in `frontend/src/pages/TodayPage/index.ts`
- [x] T037 [US2] Create formatDate utility function in TodayPage using Intl.DateTimeFormat for "Weekday, Month Day, Year" format
- [x] T038 [US2] Add /today route to `frontend/src/App.tsx`

**Checkpoint**: Page accessible at /today with correct title and date, schedule section integrated

---

## Phase 5: User Story 3 - View Announcements (Priority: P2)

**Goal**: Display announcements section with icon, title, and description for each announcement

**Independent Test**: Navigate to /today, verify announcements section displays below schedule with correct content

### Tests for User Story 3 (TDD - Write First)

- [x] T039 [P] [US3] Write failing test for AnnouncementSkeleton in `frontend/src/components/skeletons/__tests__/AnnouncementSkeleton.test.tsx`
- [x] T040 [P] [US3] Write failing test for AnnouncementCard in `frontend/src/components/AnnouncementCard/__tests__/AnnouncementCard.test.tsx`

### Implementation for User Story 3

- [x] T041 [P] [US3] Create AnnouncementSkeleton component in `frontend/src/components/skeletons/AnnouncementSkeleton.tsx`
- [x] T042 [P] [US3] Update skeletons index to export AnnouncementSkeleton in `frontend/src/components/skeletons/index.ts`
- [x] T043 [P] [US3] Create AnnouncementCard component in `frontend/src/components/AnnouncementCard/AnnouncementCard.tsx` (icon with lucide-react, title, description)
- [x] T044 [P] [US3] Create AnnouncementCard styles in `frontend/src/components/AnnouncementCard/AnnouncementCard.styles.ts`
- [x] T045 [P] [US3] Create AnnouncementCard index in `frontend/src/components/AnnouncementCard/index.ts`
- [x] T046 [US3] Create AnnouncementsList component in `frontend/src/components/AnnouncementsList/AnnouncementsList.tsx` (handles loading/empty/error states)
- [x] T047 [US3] Create AnnouncementsList styles in `frontend/src/components/AnnouncementsList/AnnouncementsList.styles.ts`
- [x] T048 [US3] Create AnnouncementsList index in `frontend/src/components/AnnouncementsList/index.ts`
- [x] T049 [US3] Integrate AnnouncementsList into TodayPage in `frontend/src/pages/TodayPage/TodayPage.tsx`

**Checkpoint**: Announcements section complete - displays below schedule with icon, title, description, and proper states

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Responsive design verification, accessibility, and final integration testing

- [x] T050 [P] Verify responsive layout at 320px and 1440px viewports
- [x] T051 [P] Add keyboard navigation and ARIA labels to interactive elements
- [x] T052 [P] Verify "Today" navigation link shows as active in Header when pathname is `/today` (check NavLink active class or aria-current attribute - FR-009)
- [x] T053 Run full test suite and verify all tests pass: `npm test`
- [ ] T054 Manual validation against Figma design for visual accuracy
- [x] T055 Run quickstart.md validation checklist

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - US1 and US2 are both P1 priority but US1 should complete first (schedule is page's primary purpose)
  - US2 creates the page shell that US1 integrates into
  - US3 integrates into the page created in US2
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (Schedule)**: Depends on Foundational - Can be developed in isolation
- **User Story 2 (Date/Page)**: Depends on Foundational + US1 (integrates ScheduleList)
- **User Story 3 (Announcements)**: Depends on US2 (integrates into TodayPage)

### Within Each User Story

- Tests MUST be written and FAIL before implementation (TDD)
- Skeleton components before main components
- Individual items before list containers
- All components before page integration

### Parallel Opportunities

**Phase 1 (Setup)**: T002, T003, T004 can run in parallel after T001

**Phase 2 (Foundational)**:
- All tests (T006-T010) can run in parallel
- Component implementations (T011-T019) can run in parallel after tests

**Phase 3 (US1)**:
- All tests (T022-T024) can run in parallel
- T025-T029 can run in parallel after tests

**Phase 5 (US3)**:
- All tests (T039-T040) can run in parallel
- T041-T045 can run in parallel after tests

---

## Parallel Example: Foundational Phase

```bash
# Launch all foundational tests together:
Task: "Write failing test for Card component"
Task: "Write failing test for EmptyState component"
Task: "Write failing test for ErrorState component"
Task: "Write failing test for todayService"
Task: "Write failing test for useTodayData hook"

# Then launch all component implementations together:
Task: "Create Card component"
Task: "Create EmptyState component"
Task: "Create ErrorState component"
```

---

## Parallel Example: User Story 1

```bash
# Launch all US1 tests together:
Task: "Write failing test for ScheduleSkeleton"
Task: "Write failing test for ScheduleItem"
Task: "Write failing test for ScheduleList"

# Then launch skeleton and item components together:
Task: "Create ScheduleSkeleton component"
Task: "Create ScheduleItem component"
```

---

## Implementation Strategy

### MVP First (User Stories 1 + 2)

1. Complete Phase 1: Setup (dependencies, types, mock data)
2. Complete Phase 2: Foundational (reusable components, service, hook)
3. Complete Phase 3: User Story 1 (Schedule display)
4. Complete Phase 4: User Story 2 (Page with date)
5. **STOP and VALIDATE**: Page at /today shows schedule with date
6. Deploy/demo if ready - this is a functional MVP!

### Incremental Delivery

1. Setup + Foundational → Infrastructure ready
2. Add US1 (Schedule) → Test independently
3. Add US2 (Page/Date) → Test independently → **MVP Complete!**
4. Add US3 (Announcements) → Test independently → Full feature
5. Polish phase → Production ready

### TDD Workflow for Each Task

1. Write test that describes expected behavior
2. Run test - confirm it FAILS (RED)
3. Implement minimum code to pass
4. Run test - confirm it PASSES (GREEN)
5. Refactor if needed while tests pass
6. Commit

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks
- [US#] label maps task to specific user story for traceability
- Each user story should be independently testable after completion
- Verify tests fail before implementing (TDD discipline)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Follow Figma design exactly for colors, spacing, typography
