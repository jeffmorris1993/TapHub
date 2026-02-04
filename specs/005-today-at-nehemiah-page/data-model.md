# Data Model: Today at Nehemiah Page (Enhanced)

**Feature**: 005-today-at-nehemiah-page
**Date**: 2026-02-01
**Updated**: 2026-02-03

## Overview

This document defines the TypeScript interfaces and data structures for the Today at Nehemiah page. All types will be defined in `frontend/src/types/today.ts`.

**2026-02-03 Update**: Added new fields for schedule status indicators (NOW/UP NEXT), announcement Learn More expansion, and Quick Links entity.

---

## Core Entities

### ScheduleEvent

Represents a single event on the daily schedule. **Aligned with new `daily_schedule` table in Cloud SQL.**

```typescript
/**
 * A scheduled event for the current day.
 * Events are displayed in chronological order by time.
 *
 * NOTE: This interface aligns with the backend database schema from
 * architecture-c4-diagrams.md for seamless API integration.
 *
 * UPDATED 2026-02-03: Added startTime, endTime, locationType for
 * NOW/UP NEXT status indicators and location type icons.
 */
export interface ScheduleEvent {
  /** Unique identifier (UUID from backend) */
  id: string;

  /** Event name (e.g., "Sunday School") */
  name: string;

  /** Location within the church (e.g., "Sanctuary", "Fellowship Hall") */
  location: string;

  /** Location type for icon display (NEW) */
  locationType: 'in-person' | 'online';

  /** Display time in 12-hour format (e.g., "10:00 AM") - pre-formatted */
  time: string;

  /** Event start time in ISO format for status calculation (NEW) */
  startTime: string;

  /** Event end time in ISO format for status calculation (NEW) */
  endTime: string;

  /** Sort order for display (lower = earlier in day) */
  order: number;

  /** Optional URL for online events (NEW) */
  onlineUrl?: string;
}
```

**Database Schema Reference** (from `architecture-c4-diagrams.md`):
```sql
CREATE TABLE daily_schedule (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    location VARCHAR(50) NOT NULL,
    time_display VARCHAR(20) NOT NULL,  -- e.g., "10:00 AM"
    day_of_week INTEGER,                -- 0=Sunday, 1=Monday, etc.
    specific_date DATE,                 -- For one-time events
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

**Validation Rules**:
- `id`: Required, UUID string
- `name`: Required, max 100 characters
- `location`: Required, max 50 characters
- `time`: Required, format "H:MM AM/PM" or "HH:MM AM/PM" (maps to `time_display`)
- `order`: Required, positive integer (maps to `display_order`)

**Frontend Note**: The API filters `daily_schedule` by current day of week (or specific_date) and `is_active = true`, returning only today's relevant items.

**Source**: Figma design shows 5 sample events:
| Time | Name | Location |
|------|------|----------|
| 10:00 AM | Sunday School | Sanctuary |
| 11:30 AM | Coffee & Fellowship | Fellowship Hall |
| 12:00 PM | Afternoon Service | Sanctuary |
| 2:00 PM | Dinner | Fellowship Hall |
| 4:00 PM | Youth Service | Youth Room |

---

### Announcement

Represents a church announcement displayed on the Today page. **Aligned with existing `announcements` table in Cloud SQL.**

```typescript
/**
 * A church announcement with icon, title, and description.
 * Announcements are time-sensitive communications to members.
 *
 * NOTE: This interface matches the backend database schema from
 * architecture-c4-diagrams.md for seamless API integration.
 *
 * UPDATED 2026-02-03: Added fullDescription for Learn More expansion,
 * and actionUrl for optional call-to-action link.
 */
export interface Announcement {
  /** Unique identifier (UUID from backend) */
  id: string;

  /** Announcement title (e.g., "Individual Spiritual Growth Plan") */
  title: string;

  /** Summary text shown initially (truncated) */
  description: string;

  /** Full description text shown when "Learn More" is clicked (NEW) */
  fullDescription: string;

  /** Icon name from lucide-react icon set (e.g., "users", "calendar", "bell") */
  icon: string | null;

  /** Optional color for icon background styling (e.g., "#c4956c") */
  color: string | null;

  /** Date when announcement should be published (ISO format) */
  publishDate: string | null;

  /** Announcement status */
  status: 'draft' | 'pending' | 'changes_requested' | 'approved' | 'rejected' | 'published';

  /** Timestamp when created (ISO format) */
  createdAt: string;

  /** Timestamp when last updated (ISO format) */
  updatedAt: string;

  /** Optional URL for call-to-action button in expanded view (NEW) */
  actionUrl?: string;
}
```

**Database Schema Reference** (from `architecture-c4-diagrams.md`):
```sql
CREATE TABLE announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(50),
    color VARCHAR(50),
    publish_date DATE,
    status VARCHAR(50) DEFAULT 'draft',
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

**Validation Rules**:
- `id`: Required, UUID string
- `title`: Required, max 255 characters
- `description`: Required, TEXT (no limit)
- `icon`: Optional, max 50 characters, maps to lucide-react icon name
- `color`: Optional, max 50 characters (hex color or CSS color name)
- `publishDate`: Optional, ISO date string
- `status`: Required, one of the defined status values

**Frontend Display Note**: For the Today page, we filter to show only announcements with `status: 'published'` and `publishDate <= today`.

**Source**: Figma design shows sample announcement:
- Icon: "users" (group icon)
- Title: "Individual Spiritual Growth Plan"
- Description: "The ISGP has been released! Please make sure to fill in your intake form by Jan 31st 2026. Reach out to the support team for help!"

---

## API Response Types

### TodayPageData

Combined data structure for the entire Today page.

```typescript
/**
 * Complete data for the Today page, returned by todayService.
 */
export interface TodayPageData {
  /** Today's scheduled events */
  schedule: ScheduleEvent[];

  /** Current announcements */
  announcements: Announcement[];

  /** The date this data is for (ISO format) */
  date: string;

  /** Quick links for desktop sidebar (optional, desktop-only) */
  quickLinks?: QuickLink[];
}
```

---

### API Response Wrapper

Follows existing `ApiResponse<T>` pattern from `types/visitor.ts`.

```typescript
/**
 * Standard API response structure.
 * Already defined in types/visitor.ts - reuse.
 */
export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
  meta: {
    timestamp: string;
  };
}

export interface ApiError {
  code: string;
  message: string;
}
```

---

## Hook State Types

### UseTodayDataState

State shape for the `useTodayData` hook.

```typescript
/**
 * State returned by useTodayData hook.
 */
export interface UseTodayDataState {
  /** Schedule events for today */
  schedule: ScheduleEvent[];

  /** Current announcements */
  announcements: Announcement[];

  /** Whether data is currently loading */
  isLoading: boolean;

  /** Error message if fetch failed */
  error: string | null;

  /** Retry function to refetch data */
  retry: () => void;
}
```

---

## Component Props Types

### ScheduleItemProps

```typescript
export interface ScheduleItemProps {
  /** The schedule event to display */
  event: ScheduleEvent;

  /** Whether this event is currently happening */
  isNow?: boolean;

  /** Whether this is the "Up Next" event */
  isUpNext?: boolean;
}
```

### ScheduleListProps

```typescript
export interface ScheduleListProps {
  /** List of schedule events */
  events: ScheduleEvent[];

  /** Whether data is loading */
  isLoading: boolean;

  /** Error message if any */
  error: string | null;

  /** Callback to retry fetching */
  onRetry: () => void;
}
```

### AnnouncementCardProps

```typescript
export interface AnnouncementCardProps {
  /** The announcement to display */
  announcement: Announcement;

  /** Whether to show in expanded state initially (optional) */
  defaultExpanded?: boolean;
}
```

### CardProps

```typescript
export interface CardProps {
  /** Optional card heading */
  heading?: string;

  /** Card content */
  children: React.ReactNode;

  /** Optional additional className */
  className?: string;
}
```

### EmptyStateProps

```typescript
export interface EmptyStateProps {
  /** Message to display */
  message: string;

  /** Optional icon component */
  icon?: React.ReactNode;
}
```

### ErrorStateProps

```typescript
export interface ErrorStateProps {
  /** Error message to display */
  message: string;

  /** Callback when retry button is clicked */
  onRetry: () => void;
}
```

---

## NEW TYPES (2026-02-03 Update)

### QuickLink

Represents a navigation shortcut shown in the desktop sidebar.

```typescript
/**
 * A quick link shown in the desktop sidebar.
 * Links to common resources like Live Stream, Prayer Requests, etc.
 */
export interface QuickLink {
  /** Unique identifier */
  id: string;

  /** Display text for the link */
  label: string;

  /** URL or route to navigate to */
  destinationUrl: string;

  /** Sort order for display */
  displayOrder: number;
}
```

### ScheduleStatus

Represents the current status of schedule items (NOW/UP NEXT).

```typescript
/**
 * Schedule status calculation result.
 * Used to determine which events show NOW badge and UP NEXT divider.
 */
export interface ScheduleStatus {
  /** IDs of events currently happening (can be multiple if overlapping) */
  nowEventIds: string[];

  /** ID of the next upcoming event, or null if none */
  upNextEventId: string | null;
}
```

### QuickLinksProps

```typescript
export interface QuickLinksProps {
  /** List of quick links to display */
  links: QuickLink[];
}
```

### QuickLinkItemProps

```typescript
export interface QuickLinkItemProps {
  /** The quick link to display */
  link: QuickLink;
}
```

---

## Type File Location

All types defined in: `frontend/src/types/today.ts`

Export from `frontend/src/types/index.ts`:
```typescript
export * from './today';
```

---

## Relationships

```
TodayPageData
├── schedule: ScheduleEvent[]
│   └── ScheduleEvent { id, name, location, locationType, time, startTime, endTime, order, onlineUrl? }
├── announcements: Announcement[]
│   └── Announcement { id, title, description, fullDescription, icon, color, publishDate, status, createdAt, updatedAt, actionUrl? }
└── quickLinks: QuickLink[]  (NEW - desktop only)
    └── QuickLink { id, label, destinationUrl, displayOrder }

ScheduleStatus (derived at runtime)
├── nowEventIds: string[]    (events where currentTime is between startTime and endTime)
└── upNextEventId: string    (first event starting after current time)
```

---

## Mock Data Location

Mock data for development: `frontend/src/data/todayMockData.ts`

### Demo Mode Strategy (NEW)

To consistently show NOW and UP NEXT badges during development, use relative time-based mock data:

```typescript
/**
 * Demo mode flag - set to false when integrating with backend.
 * When true, mock data uses relative times so NOW/UP NEXT are always visible.
 */
const USE_DEMO_MODE = true;

/**
 * Generate schedule with times relative to current time.
 * Event 2 is always "NOW", Event 3 is always "UP NEXT".
 */
const generateRelativeSchedule = (): ScheduleEvent[] => {
  const now = new Date();

  // Helper to create ISO time strings
  const toISO = (date: Date) => date.toISOString();
  const addMinutes = (date: Date, mins: number) =>
    new Date(date.getTime() + mins * 60000);

  return [
    {
      id: '1',
      name: 'Sunday School',
      location: 'Sanctuary',
      locationType: 'in-person',
      time: '10:00 AM',
      startTime: toISO(addMinutes(now, -120)), // 2 hours ago
      endTime: toISO(addMinutes(now, -60)),    // 1 hour ago
      order: 1,
    },
    {
      id: '2',
      name: 'Coffee & Fellowship',
      location: 'Fellowship Hall',
      locationType: 'in-person',
      time: '11:30 AM',
      startTime: toISO(addMinutes(now, -30)),  // 30 min ago (NOW)
      endTime: toISO(addMinutes(now, 30)),     // 30 min from now
      order: 2,
    },
    {
      id: '3',
      name: 'Afternoon Service',
      location: 'Sanctuary',
      locationType: 'in-person',
      time: '12:00 PM',
      startTime: toISO(addMinutes(now, 45)),   // 45 min from now (UP NEXT)
      endTime: toISO(addMinutes(now, 105)),    // 1h45m from now
      order: 3,
    },
    {
      id: '4',
      name: 'Dinner',
      location: 'Fellowship Hall',
      locationType: 'in-person',
      time: '2:00 PM',
      startTime: toISO(addMinutes(now, 120)),
      endTime: toISO(addMinutes(now, 180)),
      order: 4,
    },
    {
      id: '5',
      name: 'Youth Service',
      location: 'Online via Zoom',
      locationType: 'online',
      time: '4:00 PM',
      startTime: toISO(addMinutes(now, 240)),
      endTime: toISO(addMinutes(now, 300)),
      order: 5,
      onlineUrl: 'https://zoom.us/j/123456789',
    },
  ];
};

export const mockScheduleEvents: ScheduleEvent[] = USE_DEMO_MODE
  ? generateRelativeSchedule()
  : fixedTimeSchedule; // Use fixed times for realistic testing
```

### Announcements Mock Data (Updated)

```typescript
export const mockAnnouncements: Announcement[] = [
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    title: 'Individual Spiritual Growth Plan',
    description: 'The ISGP has been released! Fill in your intake form by Jan 31st.',
    fullDescription: 'The ISGP has been released! Please make sure to fill in your intake form by Jan 31st 2026. This program is designed to help you grow in your faith journey with personalized goals and mentorship. Reach out to the support team for help getting started!',
    icon: 'users',
    color: '#c4956c',
    publishDate: '2026-01-15',
    status: 'published',
    createdAt: '2026-01-10T10:00:00.000Z',
    updatedAt: '2026-01-15T08:00:00.000Z',
    actionUrl: '/isgp-signup',
  },
  {
    id: 'b2c3d4e5-f6g7-8901-bcde-f12345678901',
    title: 'Community Outreach Day',
    description: 'Join us next Saturday for community service projects throughout the city.',
    fullDescription: 'Join us next Saturday for community service projects throughout the city. We will be partnering with local organizations to serve meals, clean parks, and visit nursing homes. Sign up at the welcome desk or contact ministry@nehtemple.org.',
    icon: 'heart',
    color: '#e07a5f',
    publishDate: '2026-01-20',
    status: 'published',
    createdAt: '2026-01-18T10:00:00.000Z',
    updatedAt: '2026-01-20T08:00:00.000Z',
  },
  {
    id: 'c3d4e5f6-g7h8-9012-cdef-123456789012',
    title: 'Youth Winter Retreat',
    description: 'Registration is now open for our annual youth winter retreat, Feb 21-23.',
    fullDescription: 'Registration is now open for our annual youth winter retreat, Feb 21-23. This year we are heading to Camp Summit for a weekend of worship, fellowship, and adventure. Cost is $150 per student, scholarships available. See Pastor Mike for details.',
    icon: 'mountain',
    color: '#8b6f47',
    publishDate: '2026-01-25',
    status: 'published',
    createdAt: '2026-01-22T10:00:00.000Z',
    updatedAt: '2026-01-25T08:00:00.000Z',
    actionUrl: '/events/youth-retreat',
  },
];
```

### Quick Links Mock Data (NEW)

```typescript
export const mockQuickLinks: QuickLink[] = [
  { id: '1', label: 'Live Stream', destinationUrl: '/live', displayOrder: 1 },
  { id: '2', label: 'Prayer Requests', destinationUrl: '/prayer', displayOrder: 2 },
  { id: '3', label: 'Contact Staff', destinationUrl: '/contact', displayOrder: 3 },
];
```
