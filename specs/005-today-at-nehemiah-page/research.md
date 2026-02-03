# Research: Today at Nehemiah Page

**Feature**: 005-today-at-nehemiah-page
**Date**: 2026-02-01

## Research Summary

All technical unknowns have been resolved through codebase exploration and alignment with user requirements.

---

## Decision 1: Skeleton Loading Library

**Decision**: Use `react-loading-skeleton` package

**Rationale**:
- User explicitly specified this package
- Well-maintained, 3M+ weekly downloads
- Simple API: `<Skeleton count={5} height={76} />`
- Supports customization (color, border-radius, animation)
- Works seamlessly with Emotion styling

**Alternatives Considered**:
- Custom CSS keyframe animations: More control but more code, not needed
- react-content-loader: SVG-based, heavier for simple use cases

**Implementation Pattern**:
```tsx
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Match theme colors
<Skeleton
  baseColor="#f9fafb"
  highlightColor="#f3f4f6"
  borderRadius={14}
/>
```

---

## Decision 2: Mock API Architecture

**Decision**: Extend existing `apiClient.ts` with GET support, use service layer abstraction

**Rationale**:
- User specified: "design it in a way that it will be easy to switch later"
- Existing pattern (`apiClient.ts`) already supports POST with mock/real switching
- Service layer (`todayService.ts`) provides clean interface for components
- Environment variable `VITE_USE_MOCK_API` controls mock vs. real

**Alternatives Considered**:
- MSW (Mock Service Worker): Overkill for current needs, adds complexity
- Direct localStorage access: No abstraction, harder to migrate

**Implementation Pattern**:
```typescript
// apiClient.ts - add GET support
const mockGet = async <T>(url: string): Promise<ApiResponse<T>> => {
  await delay(300);

  if (url === '/api/v1/today/schedule') {
    return { data: mockScheduleData, error: null, meta: {...} };
  }
  if (url === '/api/v1/today/announcements') {
    return { data: mockAnnouncementsData, error: null, meta: {...} };
  }
  throw new Error(`Unknown mock endpoint: ${url}`);
};

// todayService.ts - service wrapper
export const todayService = {
  getSchedule: () => apiClient.get<ScheduleEvent[]>('/api/v1/today/schedule'),
  getAnnouncements: () => apiClient.get<Announcement[]>('/api/v1/today/announcements'),
};
```

---

## Decision 3: Component Reusability Strategy

**Decision**: Extract generic `Card`, `EmptyState`, and `ErrorState` components

**Rationale**:
- User specified: "if some of the UI elements are elements that have been used before, try to do some refactoring and make them reuseable"
- Figma design shows card pattern (rounded corners, shadows) used for both schedule and announcements
- Empty/error states needed for both data sections - extract once, use twice

**Alternatives Considered**:
- Inline styled divs: Works but duplicates code
- CSS-only approach: Less composable, harder to maintain

**Existing Components to Reuse (No Changes)**:
- `PageHeader` - Perfect fit for title + date subtitle
- `Header` - Already handles navigation including "Today" active state

**New Generic Components**:
1. `Card` - Container with shadow, rounded corners, optional heading
2. `EmptyState` - Message with optional icon
3. `ErrorState` - Error message with retry button

---

## Decision 4: Date Formatting

**Decision**: Use native `Intl.DateTimeFormat` API

**Rationale**:
- No external dependency needed
- Matches Figma format: "Sunday, January 19, 2026"
- Built into all modern browsers
- Locale-aware for future internationalization

**Alternatives Considered**:
- date-fns: Adds dependency for simple formatting
- moment.js: Deprecated, heavy bundle size

**Implementation Pattern**:
```typescript
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};
// Output: "Sunday, January 19, 2026"
```

---

## Decision 5: TDD Test Structure

**Decision**: Follow existing Vitest + RTL patterns with user story organization

**Rationale**:
- User specified TDD approach
- Constitution mandates tests first (Red-Green-Refactor)
- Existing codebase uses `__tests__/` co-located folders
- Test files use descriptive `describe` blocks matching user stories

**Implementation Pattern**:
```typescript
// ScheduleList.test.tsx
describe('ScheduleList', () => {
  describe('US1: View Today\'s Schedule', () => {
    it('displays schedule items with time, name, and location', () => {...});
    it('shows skeleton loading while fetching data', () => {...});
    it('shows empty state when no events scheduled', () => {...});
  });

  describe('Error Handling', () => {
    it('displays error message with retry button on fetch failure', () => {...});
  });
});
```

---

## Decision 6: Announcement Icon Strategy

**Decision**: Use lucide-react icons, map `icon` field string to component

**Rationale**:
- Codebase already uses lucide-react
- Figma shows icon in announcement card (appears to be "Users" or similar)
- Database schema uses `icon VARCHAR(50)` field (aligned with `architecture-c4-diagrams.md`)
- Type-safe icon mapping allows backend to specify icon name

**Database Alignment**:
- Field name is `icon` (not `iconType`) per existing `announcements` table schema
- Icon can be `null`, so component must handle fallback

**Implementation Pattern**:
```typescript
import { Users, Calendar, Bell, Info } from 'lucide-react';

const iconMap: Record<string, React.FC<LucideProps>> = {
  users: Users,
  calendar: Calendar,
  bell: Bell,
  info: Info,
};

// In AnnouncementCard - handle nullable icon
const IconComponent = announcement.icon ? (iconMap[announcement.icon] || Info) : Info;
```

---

## Decision 7: Time Display Format

**Decision**: Store time as string in "HH:MM AM/PM" format (e.g., "10:00 AM")

**Rationale**:
- Matches Figma design exactly
- Existing `ServiceTime` type uses string for time
- No date arithmetic needed (events are always "today")
- Backend can provide pre-formatted strings

**Alternatives Considered**:
- ISO timestamp: Requires parsing and formatting on frontend
- 24-hour format: Doesn't match US church convention

---

## Decision 8: Navigation Active State

**Decision**: Use existing Header component's active state logic

**Rationale**:
- Header already uses `useLocation().pathname` for active detection
- Adding `/today` route will automatically highlight "Today" nav link
- No changes needed to Header component

**Verification**: Checked `navigationItems.ts` - confirms "Today" item exists with `route: '/today'`

---

## Dependencies to Add

| Package | Version | Purpose |
|---------|---------|---------|
| react-loading-skeleton | ^3.4.0 | Skeleton loading components |

**Note**: All other dependencies already present in project (React, Emotion, lucide-react, etc.)
