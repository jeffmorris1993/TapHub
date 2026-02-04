# Tasks: Today at Nehemiah Page (Enhanced)

**Input**: Design documents from `/specs/005-today-at-nehemiah-page/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/
**Updated**: 2026-02-03

**Tests**: TDD approach required per plan.md and constitution - tests written FIRST for all components.

**Organization**: Tasks grouped by user story. Previous tasks (T001-T055) have been completed. New tasks start at T056.

**Note**: This update adds new features from enhanced Figma designs: schedule status indicators (NOW/UP NEXT), announcement Learn More expand, and desktop Quick Links.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Frontend**: `frontend/src/` with co-located `__tests__/` folders
- All tests in `__tests__/` folders within same directory as source

---

## Previously Completed Phases (T001-T055)

> **Status**: All tasks from original implementation are complete. See git history for details.
>
> - Phase 1: Setup - COMPLETE
> - Phase 2: Foundational - COMPLETE
> - Phase 3: US1 (Schedule) - COMPLETE (basic display)
> - Phase 4: US2 (Date Context) - COMPLETE
> - Phase 5: US3 (Announcements) - COMPLETE (basic display)
> - Phase 6: Polish - MOSTLY COMPLETE (T054 pending)

---

## Phase 7: Enhanced Foundational (New Shared Infrastructure)

**Purpose**: New utilities and hooks needed by multiple user story enhancements

### Tests for Enhanced Foundational (TDD - Write First)

- [ ] T056 [P] Write failing test for scheduleUtils in `frontend/src/utils/__tests__/scheduleUtils.test.ts` (calculateScheduleStatus function with cases: no events, past events, current NOW event, UP NEXT event, overlapping events)
- [ ] T057 [P] Write failing test for useScheduleStatus hook in `frontend/src/hooks/__tests__/useScheduleStatus.test.ts` (returns nowEventIds, upNextEventId; updates every 1 minute)

### Implementation for Enhanced Foundational

- [ ] T058 [P] Create scheduleUtils in `frontend/src/utils/scheduleUtils.ts` (calculateScheduleStatus function, LocationType type, locationIcons mapping)
- [ ] T059 [P] Create utils index in `frontend/src/utils/index.ts` (export scheduleUtils)
- [ ] T060 Create useScheduleStatus hook in `frontend/src/hooks/useScheduleStatus.ts` (1-minute interval refresh, cleanup on unmount) — depends on T058

**Checkpoint**: Schedule status utilities ready - NOW/UP NEXT calculation available

---

## Phase 8: User Story 1 Enhancement - Schedule Status Indicators (Priority: P1)

**Goal**: Enhance schedule to show "NOW" badge for active events, "UP NEXT" divider, location type icons, and auto-refresh

**Independent Test**: Navigate to /today, verify NOW badge appears on current event with gradient styling, UP NEXT divider shows above next event, location icons display correctly

### Tests for US1 Enhancement (TDD - Write First)

- [ ] T061 [P] [US1] Update test for ScheduleItem in `frontend/src/components/ScheduleItem/__tests__/ScheduleItem.test.tsx` (add tests for: isNow prop shows NOW badge, location icon based on locationType)
- [ ] T062 [P] [US1] Update test for ScheduleList in `frontend/src/components/ScheduleList/__tests__/ScheduleList.test.tsx` (add tests for: UP NEXT divider renders before upNextEventId, status props passed to ScheduleItem)

### Implementation for US1 Enhancement

- [ ] T063 [P] [US1] Update ScheduleEvent type in `frontend/src/types/today.ts` (add startTime, endTime, locationType, onlineUrl fields)
- [ ] T064 [P] [US1] Update ScheduleItemProps type in `frontend/src/types/today.ts` (add isNow, isUpNext optional props)
- [ ] T065 [P] [US1] Update mock data in `frontend/src/data/todayMockData.ts` (add USE_DEMO_MODE flag, generateRelativeSchedule function, new fields)
- [ ] T066 [US1] Update ScheduleItem styles in `frontend/src/components/ScheduleItem/ScheduleItem.styles.ts` (add NowBadge, NowContainer gradient, LocationIcon styles)
- [ ] T067 [US1] Update ScheduleItem component in `frontend/src/components/ScheduleItem/ScheduleItem.tsx` (add NOW badge, location type icon using lucide-react Building2/Video)
- [ ] T068 [US1] Update ScheduleList styles in `frontend/src/components/ScheduleList/ScheduleList.styles.ts` (add UpNextDivider styles)
- [ ] T069 [US1] Update ScheduleList component in `frontend/src/components/ScheduleList/ScheduleList.tsx` (integrate useScheduleStatus, pass isNow/isUpNext props, render UP NEXT divider)

**Checkpoint**: Schedule shows NOW badge and UP NEXT divider, auto-refreshes every minute

---

## Phase 9: User Story 3 Enhancement - Announcement Learn More (Priority: P2)

**Goal**: Add expandable "Learn More" functionality to announcements showing full description

**Independent Test**: Navigate to /today, click "Learn More" on announcement, verify expanded content appears with animation

### Tests for US3 Enhancement (TDD - Write First)

- [ ] T070 [P] [US3] Update test for AnnouncementCard in `frontend/src/components/AnnouncementCard/__tests__/AnnouncementCard.test.tsx` (add tests for: Learn More link visible, click expands content, shows fullDescription, chevron rotates)

### Implementation for US3 Enhancement

- [ ] T071 [P] [US3] Update Announcement type in `frontend/src/types/today.ts` (add fullDescription, actionUrl fields)
- [ ] T072 [P] [US3] Update mock announcements in `frontend/src/data/todayMockData.ts` (add fullDescription, actionUrl to each announcement)
- [ ] T073 [US3] Update AnnouncementCard styles in `frontend/src/components/AnnouncementCard/AnnouncementCard.styles.ts` (add LearnMoreButton, ExpandableContent with max-height transition, ChevronIcon rotation)
- [ ] T074 [US3] Update AnnouncementCard component in `frontend/src/components/AnnouncementCard/AnnouncementCard.tsx` (add isExpanded state, Learn More click handler, expandable content section)

**Checkpoint**: Announcements expand/collapse with Learn More button

---

## Phase 10: User Story 4 - Desktop Quick Links (Priority: P2)

**Goal**: Add Quick Links sidebar on desktop viewports with two-column layout

**Independent Test**: View /today at ≥768px viewport, verify two-column layout with Quick Links on right; at <768px, verify single column with no Quick Links

### Tests for US4 (TDD - Write First)

- [ ] T075 [P] [US4] Write failing test for QuickLinkItem in `frontend/src/components/QuickLinkItem/__tests__/QuickLinkItem.test.tsx` (renders label with chevron icon, navigates on click)
- [ ] T076 [P] [US4] Write failing test for QuickLinks in `frontend/src/components/QuickLinks/__tests__/QuickLinks.test.tsx` (renders heading, renders all links, handles empty state)
- [ ] T077 [P] [US4] Update test for TodayPage in `frontend/src/pages/TodayPage/__tests__/TodayPage.test.tsx` (add tests for: desktop shows two-column layout, Quick Links visible on desktop, hidden on mobile)

### Implementation for US4

- [ ] T078 [P] [US4] Add QuickLink type to `frontend/src/types/today.ts`
- [ ] T079 [P] [US4] Add mockQuickLinks data to `frontend/src/data/todayMockData.ts` (hardcoded: Live Stream, Prayer Requests, Contact Staff)
- [ ] T080 [P] [US4] Create QuickLinkItem component in `frontend/src/components/QuickLinkItem/QuickLinkItem.tsx`
- [ ] T081 [P] [US4] Create QuickLinkItem styles in `frontend/src/components/QuickLinkItem/QuickLinkItem.styles.ts`
- [ ] T082 [P] [US4] Create QuickLinkItem index in `frontend/src/components/QuickLinkItem/index.ts`
- [ ] T083 [P] [US4] Create QuickLinks component in `frontend/src/components/QuickLinks/QuickLinks.tsx` (uses Card, maps QuickLinkItem)
- [ ] T084 [P] [US4] Create QuickLinks styles in `frontend/src/components/QuickLinks/QuickLinks.styles.ts`
- [ ] T085 [P] [US4] Create QuickLinks index in `frontend/src/components/QuickLinks/index.ts`
- [ ] T086 [US4] Update TodayPage styles in `frontend/src/pages/TodayPage/TodayPage.styles.ts` (add TwoColumnLayout grid, QuickLinksContainer with display:none for mobile)
- [ ] T087 [US4] Update TodayPage component in `frontend/src/pages/TodayPage/TodayPage.tsx` (integrate two-column layout, add QuickLinks in right column)

**Checkpoint**: Desktop shows two-column layout with Quick Links; mobile shows single column

---

## Phase 11: Polish & Validation

**Purpose**: Final integration testing, accessibility, and design validation

- [ ] T088 [P] Update useTodayData hook to integrate auto-refresh for schedule status in `frontend/src/hooks/useTodayData.ts` (coordinate with useScheduleStatus or merge refresh logic)
- [ ] T089 [P] Verify keyboard navigation for Learn More buttons and Quick Links
- [ ] T090 [P] Add ARIA labels to NOW badge, UP NEXT divider, and expandable content
- [ ] T091 [P] Verify responsive layout: mobile (<768px) single column, desktop (≥768px) two column
- [ ] T092 Run full test suite: `npm test`
- [ ] T093 Manual validation against Figma designs (mobile: node-id=97-1199, desktop: node-id=97-958)
- [ ] T094 Update quickstart.md checklist and validate all new items

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 7 (Enhanced Foundational)**: No dependencies on new tasks - can start immediately
- **Phase 8 (US1 Enhancement)**: Depends on Phase 7 (needs useScheduleStatus, scheduleUtils)
- **Phase 9 (US3 Enhancement)**: No dependencies on new tasks - can start immediately, parallel with Phase 7/8
- **Phase 10 (US4 Quick Links)**: No dependencies on new tasks - can start immediately, parallel with Phase 7/8/9
- **Phase 11 (Polish)**: Depends on all enhancement phases complete

### User Story Independence

- **US1 Enhancement (Schedule)**: Independent after Phase 7
- **US3 Enhancement (Announcements)**: Fully independent - can start immediately
- **US4 (Quick Links)**: Fully independent - can start immediately

### Parallel Opportunities

**Phase 7 (Enhanced Foundational)**:
- T056, T057 can run in parallel (different test files)
- T058, T059 can run in parallel after tests
- T060 runs after T058 completes (depends on scheduleUtils)

**Phase 8 (US1 Enhancement)**:
- T061, T062 can run in parallel (different test files)
- T063, T064, T065 can run in parallel (different files)
- T066, T067, T068, T069 are sequential (same components)

**Phase 9 (US3 Enhancement)**:
- Can run entirely in parallel with Phase 7 and 8
- T070 first, then T071-T074 can partially parallelize

**Phase 10 (US4 Quick Links)**:
- Can run entirely in parallel with Phases 7, 8, 9
- T075, T076, T077 can run in parallel
- T078-T085 can run in parallel
- T086, T087 are sequential

**Cross-Phase Parallelism**:
```
Phase 7 ─────────────────> [T056-T060]
         ╲
Phase 8 ──╲─────────────────────────> [T061-T069]
           ╲
Phase 9 ────╲─────────────> [T070-T074]
             ╲
Phase 10 ─────╲──────────> [T075-T087]
               ╲
                ╲────────> Phase 11 [T088-T094]
```

---

## Parallel Example: All Enhancement Phases

```bash
# Start all independent work streams simultaneously:

# Stream 1: Schedule status utilities (required for US1)
Task: "Write failing test for scheduleUtils"
Task: "Write failing test for useScheduleStatus hook"

# Stream 2: Announcement Learn More (independent)
Task: "Update test for AnnouncementCard with Learn More"

# Stream 3: Quick Links (independent)
Task: "Write failing test for QuickLinkItem"
Task: "Write failing test for QuickLinks"
Task: "Update test for TodayPage with two-column layout"
```

---

## Implementation Strategy

### Recommended Order (Sequential)

1. Complete Phase 7: Enhanced Foundational (scheduleUtils, useScheduleStatus)
2. Complete Phase 8: US1 Enhancement (NOW badge, UP NEXT, icons)
3. Complete Phase 9: US3 Enhancement (Learn More)
4. Complete Phase 10: US4 (Quick Links, two-column)
5. Complete Phase 11: Polish
6. **VALIDATE**: Run full test suite, manual Figma comparison

### Parallel Team Strategy

With multiple developers:
1. Developer A: Phase 7 + Phase 8 (schedule enhancements)
2. Developer B: Phase 9 (announcement enhancements)
3. Developer C: Phase 10 (Quick Links)
4. All: Phase 11 (polish and integration)

### TDD Workflow for Each Task

1. Write test that describes expected behavior
2. Run test - confirm it FAILS (RED)
3. Implement minimum code to pass
4. Run test - confirm it PASSES (GREEN)
5. Refactor if needed while tests pass
6. Commit

---

## Summary

| Phase | Tasks | Purpose |
|-------|-------|---------|
| 7 | T056-T060 (5) | Enhanced Foundational - schedule status utilities |
| 8 | T061-T069 (9) | US1 Enhancement - NOW badge, UP NEXT, icons |
| 9 | T070-T074 (5) | US3 Enhancement - Learn More expand |
| 10 | T075-T087 (13) | US4 - Quick Links, two-column layout |
| 11 | T088-T094 (7) | Polish & Validation |
| **Total** | **39 new tasks** | |

### Task Count by User Story

- US1 (Schedule Enhancement): 9 tasks
- US3 (Announcement Enhancement): 5 tasks
- US4 (Quick Links): 13 tasks
- Foundational/Polish: 12 tasks

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks
- [US#] label maps task to specific user story for traceability
- All tests must FAIL before implementation begins (TDD discipline)
- Mock data uses USE_DEMO_MODE flag for consistent NOW/UP NEXT display
- Styles in separate .styles.ts files per component
- Commit after each task or logical group
