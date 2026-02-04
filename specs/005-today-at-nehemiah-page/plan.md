# Implementation Plan: Today at Nehemiah Page (Enhanced)

**Branch**: `005-today-at-nehemiah-page` | **Date**: 2026-02-03 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification with enhanced mobile/desktop designs including schedule status indicators, announcement Learn More, and desktop Quick Links

**Note**: This plan updates the existing Today page implementation with new features from Figma designs (node-id=97-1199 mobile, node-id=97-958 desktop).

## Summary

Enhance the existing Today at Nehemiah page with:
1. **Schedule Status Indicators**: "NOW" badge for currently active events, "UP NEXT" divider for upcoming events, auto-refresh every 1 minute
2. **Location Type Icons**: Building icon for in-person, video icon for online/Zoom events
3. **Announcement Learn More**: Expandable content to reveal full announcement details
4. **Quick Links (Desktop Only)**: Two-column layout with sidebar containing Live Stream, Prayer Requests, Contact Staff links
5. **Mock Data Strategy**: Provide relative time-based mock data that always shows NOW/UP NEXT badges for consistent development/testing

## Technical Context

**Language/Version**: TypeScript 5.9.3
**Primary Dependencies**: React 19, React Router v7, Emotion 11, lucide-react, react-loading-skeleton
**Storage**: Mock API with localStorage (MVP), designed for backend migration
**Testing**: Vitest + React Testing Library
**Target Platform**: Web (responsive: 320px - 1440px)
**Project Type**: Web application (frontend-only for this feature)
**Performance Goals**: Page load < 2 seconds, schedule status update every 1 minute
**Constraints**: Mobile-first design, WCAG 2.1 AA accessibility
**Scale/Scope**: Single page enhancement, ~10 new/modified components

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Evidence |
|-----------|--------|----------|
| I. Test-Driven Development | ✅ PASS | Tests will be written first for all new components; existing test patterns followed |
| II. Compelling User Experience | ✅ PASS | Mobile-first design from Figma; < 2s load target; WCAG 2.1 AA compliance |
| III. Error Handling & Logging | ✅ PASS | Existing error/retry patterns reused; loading states via react-loading-skeleton |
| IV. Security & Privacy First | ✅ PASS | Read-only public data; no auth required for this page |
| V. Simplicity & Pragmatism | ✅ PASS | Enhancing existing components; no new state management; styles in separate files |

**Constitution Compliance**: All gates pass. No violations requiring justification.

## Project Structure

### Documentation (this feature)

```text
specs/005-today-at-nehemiah-page/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (mock API contracts)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
frontend/src/
├── components/
│   ├── ScheduleItem/
│   │   ├── ScheduleItem.tsx           # UPDATE: Add NOW badge, location icon
│   │   ├── ScheduleItem.styles.ts     # UPDATE: Add NOW styling, icon styles
│   │   ├── index.ts
│   │   └── __tests__/
│   │       └── ScheduleItem.test.tsx  # UPDATE: Test NOW/UP NEXT states
│   ├── ScheduleList/
│   │   ├── ScheduleList.tsx           # UPDATE: Add UP NEXT divider logic
│   │   ├── ScheduleList.styles.ts     # UPDATE: Add UP NEXT divider styles
│   │   ├── index.ts
│   │   └── __tests__/
│   │       └── ScheduleList.test.tsx  # UPDATE: Test divider rendering
│   ├── AnnouncementCard/
│   │   ├── AnnouncementCard.tsx       # UPDATE: Add Learn More expand/collapse
│   │   ├── AnnouncementCard.styles.ts # UPDATE: Add expanded state styles
│   │   ├── index.ts
│   │   └── __tests__/
│   │       └── AnnouncementCard.test.tsx # UPDATE: Test expand/collapse
│   ├── QuickLinks/                    # NEW: Desktop-only component
│   │   ├── QuickLinks.tsx
│   │   ├── QuickLinks.styles.ts
│   │   ├── index.ts
│   │   └── __tests__/
│   │       └── QuickLinks.test.tsx
│   └── QuickLinkItem/                 # NEW: Individual link component
│       ├── QuickLinkItem.tsx
│       ├── QuickLinkItem.styles.ts
│       ├── index.ts
│       └── __tests__/
│           └── QuickLinkItem.test.tsx
├── pages/
│   └── TodayPage/
│       ├── TodayPage.tsx              # UPDATE: Two-column layout, Quick Links
│       ├── TodayPage.styles.ts        # UPDATE: Responsive two-column grid
│       └── __tests__/
│           └── TodayPage.test.tsx     # UPDATE: Test responsive layout
├── data/
│   └── todayMockData.ts               # UPDATE: Add startTime/endTime, fullDescription
├── hooks/
│   ├── useTodayData.ts                # UPDATE: Add auto-refresh interval
│   ├── useScheduleStatus.ts           # NEW: NOW/UP NEXT calculation logic
│   └── __tests__/
│       ├── useTodayData.test.ts       # UPDATE: Test auto-refresh
│       └── useScheduleStatus.test.ts  # NEW: Test status calculations
├── types/
│   └── today.ts                       # UPDATE: Add new fields to interfaces
├── services/
│   ├── todayService.ts                # UPDATE: Add quickLinks endpoint
│   └── api/
│       └── apiClient.ts               # UPDATE: Add quickLinks mock handler
└── utils/
    ├── scheduleUtils.ts               # NEW: Time comparison utilities
    └── __tests__/
        └── scheduleUtils.test.ts      # NEW: Test time utilities
```

**Structure Decision**: Follows existing frontend-only pattern. All new components use the established `ComponentName/` folder structure with separate `.styles.ts` files and co-located `__tests__/` directories.

## Complexity Tracking

> No violations - all gates pass.
