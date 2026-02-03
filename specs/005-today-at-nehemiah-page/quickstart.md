# Quickstart: Today at Nehemiah Page

**Feature**: 005-today-at-nehemiah-page
**Date**: 2026-02-01

## Prerequisites

- Node.js 18+
- npm 9+
- Git

## Setup

```bash
# Clone and checkout feature branch
git clone https://github.com/your-org/TapHub.git
cd TapHub
git checkout 005-today-at-nehemiah-page

# Install dependencies (including react-loading-skeleton)
cd frontend
npm install
```

## Development

```bash
# Start dev server
npm run dev

# Navigate to Today page
open http://localhost:5173/today
```

## Testing (TDD Workflow)

```bash
# Run all tests
npm test

# Run tests in watch mode (recommended for TDD)
npm test -- --watch

# Run specific test file
npm test -- src/components/ScheduleList/__tests__/ScheduleList.test.tsx

# Run tests with coverage
npm test -- --coverage
```

### TDD Cycle

1. **Write failing test** in `__tests__/ComponentName.test.tsx`
2. **Run test** - verify it fails (RED)
3. **Implement** minimum code to pass
4. **Run test** - verify it passes (GREEN)
5. **Refactor** while tests pass

## Key Files

### New Components

| Component | Location | Purpose |
|-----------|----------|---------|
| TodayPage | `src/pages/TodayPage/` | Main page component |
| Card | `src/components/Card/` | Generic card container |
| ScheduleItem | `src/components/ScheduleItem/` | Single schedule row |
| ScheduleList | `src/components/ScheduleList/` | Schedule container with states |
| AnnouncementCard | `src/components/AnnouncementCard/` | Announcement display |
| EmptyState | `src/components/EmptyState/` | Generic empty message |
| ErrorState | `src/components/ErrorState/` | Error with retry |
| ScheduleSkeleton | `src/components/skeletons/` | Schedule loading |
| AnnouncementSkeleton | `src/components/skeletons/` | Announcement loading |

### Services & Hooks

| File | Purpose |
|------|---------|
| `src/services/todayService.ts` | API wrapper for schedule/announcements |
| `src/services/api/apiClient.ts` | Mock API client (modified) |
| `src/hooks/useTodayData.ts` | Data fetching hook |
| `src/types/today.ts` | TypeScript interfaces |
| `src/data/todayMockData.ts` | Mock data for dev |

### Modified Files

| File | Change |
|------|--------|
| `src/App.tsx` | Add `/today` route |
| `src/services/api/apiClient.ts` | Add GET method support |
| `src/types/index.ts` | Export today types |

## Design Reference

**Figma**: [Today at Neh Temple - Light Mode](https://www.figma.com/design/4KpDlaCF5l1Y85ZQzi4Obg/Tap-Hub?node-id=5-277)

### Key Design Specs

| Element | Value |
|---------|-------|
| Primary color (times) | `#c4956c` |
| Text primary | `#101828` |
| Text secondary | `#4a5565` |
| Background | `#fafafa` |
| Card background | `#ffffff` |
| Card shadow | `0px 10px 15px rgba(0,0,0,0.1), 0px 4px 6px rgba(0,0,0,0.1)` |
| Card radius | `16px` |
| Schedule item bg | `#f9fafb` |
| Schedule item radius | `14px` |
| Icon container radius | `14px` |
| Font: Inter Bold | Headings, times |
| Font: Inter Semibold | Event names |
| Font: Inter Regular | Descriptions, locations |

## Verify Implementation

### Manual Checklist

- [ ] Page loads at `/today`
- [ ] Header shows "Today" as active nav item
- [ ] Page title: "Today at Nehemiah's Temple"
- [ ] Date shows: "Weekday, Month Day, Year" format
- [ ] Schedule card displays with 5 events
- [ ] Each event shows: time (gold), name, location
- [ ] Events sorted by time
- [ ] Announcements section visible
- [ ] Announcement shows: icon, title, description
- [ ] Skeleton loading visible on initial load
- [ ] Responsive at 320px and 1440px

### Test Coverage Targets

- [ ] All components have unit tests
- [ ] Service layer has integration tests
- [ ] Hook has unit tests
- [ ] Overall coverage > 80%

## Environment Variables

```bash
# .env.local
VITE_USE_MOCK_API=true  # Use mock API (default for dev)
```

## Troubleshooting

### Tests failing after fresh checkout

```bash
npm install
npm test
```

### Skeleton not showing

Ensure `react-loading-skeleton` CSS is imported:
```typescript
import 'react-loading-skeleton/dist/skeleton.css';
```

### Page not found at /today

Check `App.tsx` has the route:
```tsx
<Route path="/today" element={<TodayPage />} />
```

### Today nav link not active

Verify `navigationItems.ts` has entry with `route: '/today'`
