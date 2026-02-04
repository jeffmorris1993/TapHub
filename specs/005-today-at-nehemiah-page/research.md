# Research: Today at Nehemiah Page (Enhanced)

**Feature**: 005-today-at-nehemiah-page
**Date**: 2026-02-01
**Updated**: 2026-02-03

## Research Summary

Original technical unknowns resolved. This update adds research for new features:
- Schedule status indicators (NOW badge, UP NEXT divider)
- Auto-refresh every 1 minute
- Announcement Learn More expand/collapse
- Desktop-only Quick Links sidebar
- Mock data strategy for consistent NOW/UP NEXT display

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

---

## NEW DECISIONS (2026-02-03 Update)

---

## Decision 9: Mock Data Strategy for NOW/UP NEXT Badges

**Decision**: Use relative time-based mock data with a `USE_DEMO_MODE` flag

**Rationale**:
- During development/testing, we need predictable data that always shows the NOW badge and UP NEXT divider
- Production mock data should still use fixed times for realistic testing
- A simple flag allows toggling between demo mode (relative times) and realistic mode (fixed times)
- Easy to remove flag when backend integration happens

**Implementation Pattern**:
```typescript
// In todayMockData.ts
const USE_DEMO_MODE = true; // Set false for backend integration

const getRelativeSchedule = (): ScheduleEvent[] => {
  const now = new Date();

  // Past event (completed)
  const pastStart = new Date(now.getTime() - 2 * 60 * 60000); // 2 hours ago
  const pastEnd = new Date(now.getTime() - 1 * 60 * 60000);   // 1 hour ago

  // Current event (NOW)
  const currentStart = new Date(now.getTime() - 30 * 60000);  // 30 min ago
  const currentEnd = new Date(now.getTime() + 30 * 60000);    // 30 min from now

  // Next event (UP NEXT)
  const nextStart = new Date(now.getTime() + 45 * 60000);     // 45 min from now
  const nextEnd = new Date(now.getTime() + 105 * 60000);      // 1h45m from now

  // Future events
  const futureStart = new Date(now.getTime() + 2 * 60 * 60000); // 2 hours from now
  ...
};
```

**Alternatives Considered**:
- **Mocking Date.now()**: Rejected - affects all date operations, harder to maintain
- **Test-only time manipulation**: Rejected - wouldn't work for manual testing/demos
- **Server-side time offset**: Rejected - adds unnecessary complexity for MVP

---

## Decision 10: Auto-Refresh Implementation Pattern

**Decision**: Use `setInterval` in a custom `useScheduleStatus` hook with cleanup

**Rationale**:
- Separating data fetching from status calculation allows the status to update without refetching data
- The schedule status only depends on current time vs event times, not new data
- This minimizes network requests while keeping the UI responsive
- Clean separation of concerns

**Implementation Pattern**:
```typescript
// useScheduleStatus.ts - recalculates every minute
export const useScheduleStatus = (events: ScheduleEvent[]) => {
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 1 minute

    return () => clearInterval(interval);
  }, []);

  return useMemo(() =>
    calculateScheduleStatus(events, currentTime),
    [events, currentTime]
  );
};

// Returns: { nowEventIds: string[], upNextEventId: string | null }
```

**Alternatives Considered**:
- **Refetch all data every minute**: Rejected - wasteful network calls
- **WebSocket for real-time updates**: Rejected - over-engineering for MVP
- **Manual refresh button only**: Rejected - doesn't meet spec requirement for auto-update

---

## Decision 11: Learn More Expand/Collapse Pattern

**Decision**: Inline expand with CSS max-height transition (accordion pattern)

**Rationale**:
- Keeps user in context without disrupting flow
- Works well on mobile where modals can feel intrusive
- Simpler implementation than modal state management
- Matches common UX pattern for FAQ-style content

**Implementation Pattern**:
```typescript
// AnnouncementCard.tsx
const [isExpanded, setIsExpanded] = useState(false);

return (
  <Card>
    <Summary>...</Summary>
    <LearnMoreButton onClick={() => setIsExpanded(!isExpanded)}>
      Learn More <ChevronRight rotate={isExpanded ? 90 : 0} />
    </LearnMoreButton>
    <ExpandableContent isExpanded={isExpanded}>
      {announcement.fullDescription}
    </ExpandableContent>
  </Card>
);

// AnnouncementCard.styles.ts
export const ExpandableContent = styled.div<{ isExpanded: boolean }>`
  max-height: ${({ isExpanded }) => (isExpanded ? '500px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  opacity: ${({ isExpanded }) => (isExpanded ? 1 : 0)};
  transition: max-height 0.3s ease-out, opacity 0.2s ease-out;
`;
```

**Alternatives Considered**:
- **Modal dialog**: Rejected - more complex, worse mobile UX
- **Navigate to detail page**: Rejected - over-engineering for short content
- **Tooltip/popover**: Rejected - poor mobile support, limited content space

---

## Decision 12: Responsive Two-Column Layout Strategy

**Decision**: CSS Grid with media query for Quick Links visibility

**Rationale**:
- CSS Grid provides clean two-column layout with automatic spacing
- Simple media query hides Quick Links on mobile
- No JavaScript needed for responsive behavior
- Matches existing Emotion styling patterns in codebase

**Implementation Pattern**:
```typescript
// TodayPage.styles.ts
export const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 2fr 1fr;
  }
`;

export const QuickLinksContainer = styled.aside`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;
```

**Alternatives Considered**:
- **Flexbox**: Works but Grid is cleaner for this two-column use case
- **JavaScript-based responsive**: Rejected - unnecessary complexity
- **Separate mobile/desktop components**: Rejected - code duplication

---

## Decision 13: Location Type Icon Mapping

**Decision**: Use lucide-react icons with type-safe mapping object

**Rationale**:
- lucide-react already used throughout the project
- Simple object map is maintainable and type-safe
- Icons match Figma design: `Building2` for in-person, `Video` for online

**Implementation Pattern**:
```typescript
// scheduleUtils.ts
import { Building2, Video, type LucideIcon } from 'lucide-react';

export type LocationType = 'in-person' | 'online';

export const locationIcons: Record<LocationType, LucideIcon> = {
  'in-person': Building2,
  'online': Video,
};

// Usage in ScheduleItem.tsx
const LocationIcon = locationIcons[event.locationType];
return <LocationIcon size={14} />;
```

---

## Decision 14: Quick Links Data Strategy

**Decision**: Hardcode as data array in component for MVP

**Rationale**:
- Per spec clarification: hardcode for MVP
- Structuring as typed array makes future API integration trivial
- No loading states needed since data is static
- Can easily convert to API fetch later

**Implementation Pattern**:
```typescript
// QuickLinks.tsx
import type { QuickLink } from '@/types/today';

const quickLinks: QuickLink[] = [
  { id: '1', label: 'Live Stream', destinationUrl: '/live', displayOrder: 1 },
  { id: '2', label: 'Prayer Requests', destinationUrl: '/prayer', displayOrder: 2 },
  { id: '3', label: 'Contact Staff', destinationUrl: '/contact', displayOrder: 3 },
];

// Future migration: replace with API call
// const quickLinks = await todayService.getQuickLinks();
```

---

## Decision 15: Schedule Status Calculation Logic

**Decision**: Create pure utility function for testability, handle overlapping events

**Rationale**:
- Pure function is easy to unit test with various time scenarios
- Handles edge cases: no current event, multiple overlapping events, all events passed
- Returns simple data structure that components can consume

**Implementation Pattern**:
```typescript
// scheduleUtils.ts
export interface ScheduleStatus {
  nowEventIds: string[];      // Events currently happening (can be multiple)
  upNextEventId: string | null; // First event starting after all NOW events end
}

export const calculateScheduleStatus = (
  events: ScheduleEvent[],
  currentTime: Date
): ScheduleStatus => {
  const now = currentTime.getTime();

  // Find all events where now is between start and end
  const nowEventIds = events
    .filter(e => {
      const start = new Date(e.startTime).getTime();
      const end = new Date(e.endTime).getTime();
      return now >= start && now < end;
    })
    .map(e => e.id);

  // Find next upcoming event (not currently happening)
  const upcomingEvents = events
    .filter(e => new Date(e.startTime).getTime() > now)
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

  const upNextEventId = upcomingEvents[0]?.id ?? null;

  return { nowEventIds, upNextEventId };
};
```

---

## Updated Type Definitions

```typescript
// types/today.ts - Updates needed

export interface ScheduleEvent {
  id: string;
  name: string;
  location: string;
  locationType: 'in-person' | 'online';  // NEW
  time: string;           // Display format "10:00 AM"
  startTime: string;      // NEW: ISO timestamp for status calc
  endTime: string;        // NEW: ISO timestamp for status calc
  order: number;
  onlineUrl?: string;     // NEW: Optional for online events
}

export interface Announcement {
  id: string;
  title: string;
  description: string;      // Summary text
  fullDescription: string;  // NEW: Expanded content for Learn More
  icon: string | null;
  color: string | null;     // Renamed from iconColor for DB alignment
  publishDate: string | null;
  status: 'draft' | 'pending' | 'changes_requested' | 'approved' | 'rejected' | 'published';
  createdAt: string;
  updatedAt: string;
  actionUrl?: string;       // NEW: Optional link in expanded content
}

export interface QuickLink {    // NEW
  id: string;
  label: string;
  destinationUrl: string;
  displayOrder: number;
}
```
