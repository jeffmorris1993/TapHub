# Implementation Plan: Today at Nehemiah Page

**Branch**: `005-today-at-nehemiah-page` | **Date**: 2026-02-01 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-today-at-nehemiah-page/spec.md`

## Summary

Create a "Today at Nehemiah's Temple" page that displays the current day's schedule of events and church announcements. The page fetches data from mock API endpoints (designed for easy backend migration), uses react-loading-skeleton for loading states, and follows a TDD approach. UI components will be refactored for reusability where patterns exist.

**Key Technical Decisions**:
- Mock API with service layer abstraction for easy backend switching
- Skeleton loading via react-loading-skeleton
- TDD with Vitest + React Testing Library
- Refactor existing components (PageHeader, Card patterns) for reuse

## Technical Context

**Language/Version**: TypeScript 5.9.3
**Primary Dependencies**: React 19, React Router v7, Emotion 11, lucide-react, react-loading-skeleton
**Storage**: Mock API (localStorage) for MVP, designed for backend migration
**Testing**: Vitest + React Testing Library (TDD approach)
**Target Platform**: Web (mobile-first, responsive 320px-1440px)
**Project Type**: Web application (frontend-only for this feature)
**Performance Goals**: Page load < 2 seconds on 3G, skeleton loading for perceived performance
**Constraints**: Follow Figma design exactly, WCAG 2.1 AA accessibility
**Scale/Scope**: Single page with 2 data sections (schedule, announcements)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. TDD | ✅ PASS | Tests written first for all components and services |
| II. UX | ✅ PASS | Mobile-first, skeleton loading, follows Figma exactly |
| III. Error Handling | ✅ PASS | Error states with retry, user-friendly messages |
| IV. Security | ✅ PASS | No auth required (public page), input sanitization N/A |
| V. Simplicity | ✅ PASS | Service layer abstraction, no over-engineering |

**Technical Stack Compliance**:
- ✅ TypeScript 5+ strict mode
- ✅ React 18+ (using React 19)
- ✅ Emotion 11 (CSS-in-JS)
- ✅ Vitest for testing
- ✅ No `any` types without justification

## Project Structure

### Documentation (this feature)

```text
specs/005-today-at-nehemiah-page/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── today-api.md     # Mock API contract
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
frontend/src/
├── components/
│   ├── PageHeader/              # EXISTING - reuse as-is
│   │   ├── __tests__/
│   │   ├── PageHeader.tsx
│   │   └── PageHeader.styles.ts
│   ├── Card/                    # NEW - generic card container
│   │   ├── __tests__/
│   │   │   └── Card.test.tsx
│   │   ├── Card.tsx
│   │   ├── Card.styles.ts
│   │   └── index.ts
│   ├── ScheduleItem/            # NEW - schedule event row
│   │   ├── __tests__/
│   │   │   └── ScheduleItem.test.tsx
│   │   ├── ScheduleItem.tsx
│   │   ├── ScheduleItem.styles.ts
│   │   └── index.ts
│   ├── ScheduleList/            # NEW - schedule list with loading
│   │   ├── __tests__/
│   │   │   └── ScheduleList.test.tsx
│   │   ├── ScheduleList.tsx
│   │   ├── ScheduleList.styles.ts
│   │   └── index.ts
│   ├── AnnouncementCard/        # NEW - announcement display
│   │   ├── __tests__/
│   │   │   └── AnnouncementCard.test.tsx
│   │   ├── AnnouncementCard.tsx
│   │   ├── AnnouncementCard.styles.ts
│   │   └── index.ts
│   ├── EmptyState/              # NEW - reusable empty state
│   │   ├── __tests__/
│   │   │   └── EmptyState.test.tsx
│   │   ├── EmptyState.tsx
│   │   ├── EmptyState.styles.ts
│   │   └── index.ts
│   ├── ErrorState/              # NEW - reusable error with retry
│   │   ├── __tests__/
│   │   │   └── ErrorState.test.tsx
│   │   ├── ErrorState.tsx
│   │   ├── ErrorState.styles.ts
│   │   └── index.ts
│   └── skeletons/               # NEW - skeleton loading components
│       ├── __tests__/
│       │   ├── ScheduleSkeleton.test.tsx
│       │   └── AnnouncementSkeleton.test.tsx
│       ├── ScheduleSkeleton.tsx
│       ├── AnnouncementSkeleton.tsx
│       └── index.ts
├── pages/
│   └── TodayPage/               # NEW - main page component
│       ├── __tests__/
│       │   └── TodayPage.test.tsx
│       ├── TodayPage.tsx
│       ├── TodayPage.styles.ts
│       └── index.ts
├── services/
│   ├── api/
│   │   └── apiClient.ts         # MODIFY - add GET support
│   ├── todayService.ts          # NEW - schedule/announcements API
│   └── __tests__/
│       └── todayService.test.ts # NEW - service tests
├── hooks/
│   ├── useTodayData.ts          # NEW - data fetching hook
│   └── __tests__/
│       └── useTodayData.test.ts # NEW - hook tests
├── types/
│   └── today.ts                 # NEW - Today page types
├── data/
│   └── todayMockData.ts         # NEW - mock schedule/announcements
└── App.tsx                      # MODIFY - add /today route
```

**Structure Decision**: Frontend-only feature extending the existing web application structure. Components follow the established pattern of co-located `__tests__/` directories. New reusable components (Card, EmptyState, ErrorState) extracted for future use.

## Complexity Tracking

> No violations - design follows simplicity principle.

| Decision | Rationale |
|----------|-----------|
| Service abstraction | Minimal overhead, enables easy backend switch per spec requirement |
| Separate skeleton components | Reusable, matches react-loading-skeleton patterns |
| Generic Card component | Observed pattern in Figma, enables future reuse |

## Implementation Approach

### TDD Workflow

For each component/service:
1. **RED**: Write failing test based on acceptance criteria
2. **GREEN**: Implement minimum code to pass test
3. **REFACTOR**: Clean up while tests pass

### Component Refactoring Strategy

**Existing Components to Reuse**:
1. `PageHeader` - Use directly for "Today at Nehemiah's Temple" + date subtitle
2. `Header` - Already integrated with navigation, no changes needed

**New Reusable Components to Extract**:
1. `Card` - Generic card container with shadow/rounded corners (pattern from Figma)
2. `EmptyState` - Generic empty state message (used by schedule + announcements)
3. `ErrorState` - Generic error with retry button (used across data-fetching sections)

### Data Fetching Architecture

```
TodayPage
    └── useTodayData() hook
            └── todayService.getSchedule() / getAnnouncements()
                    └── apiClient.get()
                            └── mockGet() (MVP) / axios (future)
```

**Switch Strategy**: Set `VITE_USE_MOCK_API=false` + implement real GET endpoints in apiClient.
