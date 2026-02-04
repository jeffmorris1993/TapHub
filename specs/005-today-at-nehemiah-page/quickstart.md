# Quickstart: Today at Nehemiah Page (Enhanced)

**Feature**: 005-today-at-nehemiah-page
**Date**: 2026-02-01
**Updated**: 2026-02-03

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

### Components to Update (2026-02-03)

| Component | Location | Changes |
|-----------|----------|---------|
| TodayPage | `src/pages/TodayPage/` | Two-column layout, Quick Links |
| ScheduleItem | `src/components/ScheduleItem/` | NOW badge, location type icon |
| ScheduleList | `src/components/ScheduleList/` | UP NEXT divider logic |
| AnnouncementCard | `src/components/AnnouncementCard/` | Learn More expand/collapse |

### New Components (2026-02-03)

| Component | Location | Purpose |
|-----------|----------|---------|
| QuickLinks | `src/components/QuickLinks/` | Desktop sidebar with links |
| QuickLinkItem | `src/components/QuickLinkItem/` | Individual quick link |

### New Hooks & Utils (2026-02-03)

| File | Purpose |
|------|---------|
| `src/hooks/useScheduleStatus.ts` | NOW/UP NEXT calculation with auto-refresh |
| `src/utils/scheduleUtils.ts` | Time comparison utilities |

### Services & Hooks

| File | Purpose |
|------|---------|
| `src/services/todayService.ts` | API wrapper for schedule/announcements |
| `src/services/api/apiClient.ts` | Mock API client (modified) |
| `src/hooks/useTodayData.ts` | Data fetching hook (update for auto-refresh) |
| `src/types/today.ts` | TypeScript interfaces |
| `src/data/todayMockData.ts` | Mock data for dev (update with demo mode) |

### Modified Files

| File | Change |
|------|--------|
| `src/App.tsx` | Add `/today` route |
| `src/services/api/apiClient.ts` | Add GET method support |
| `src/types/index.ts` | Export today types |
| `src/types/today.ts` | Add QuickLink, ScheduleStatus types |
| `src/data/todayMockData.ts` | Add demo mode, new fields |

## Design Reference

**Figma Mobile**: [node-id=97-1199](https://www.figma.com/design/4KpDlaCF5l1Y85ZQzi4Obg/Tap-Hub?node-id=97-1199)
**Figma Desktop**: [node-id=97-958](https://www.figma.com/design/4KpDlaCF5l1Y85ZQzi4Obg/Tap-Hub?node-id=97-958)

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

### NEW Design Specs (2026-02-03)

| Element | Value |
|---------|-------|
| NOW badge bg | `#c4956c` |
| NOW badge text | `white`, uppercase, 10px |
| NOW event gradient | `#fef7f0` to `#fef9f3` |
| NOW event border | `1.909px solid rgba(196,149,108,0.3)` |
| UP NEXT text | `#c4956c`, uppercase, 12px |
| Learn More text | `#c4956c`, semibold, 14-16px |
| Quick Link bg | `#f9fafb` |
| Quick Link radius | `10px` |
| Desktop breakpoint | `768px` |
| Two-column ratio | `2fr 1fr` (main : sidebar) |

## Verify Implementation

### Manual Checklist (Original)

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

### NEW Manual Checklist (2026-02-03)

**Schedule Status Indicators:**
- [ ] "NOW" badge visible on currently active event (demo mode)
- [ ] NOW event has gradient background and border
- [ ] "UP NEXT" divider appears above next upcoming event
- [ ] Location icons: building for in-person, video for online
- [ ] Status updates automatically every 1 minute

**Announcements Learn More:**
- [ ] Each announcement has "Learn More" link with chevron
- [ ] Clicking "Learn More" expands to show full description
- [ ] Expanded content animates smoothly
- [ ] Click again to collapse

**Desktop Quick Links (≥768px):**
- [ ] Two-column layout visible on desktop
- [ ] Quick Links sidebar appears on right
- [ ] Shows: Live Stream, Prayer Requests, Contact Staff
- [ ] Each link has chevron icon
- [ ] Quick Links hidden on mobile (<768px)

### Test Coverage Targets

- [ ] All components have unit tests
- [ ] Service layer has integration tests
- [ ] Hooks have unit tests (useTodayData, useScheduleStatus)
- [ ] scheduleUtils has unit tests
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
