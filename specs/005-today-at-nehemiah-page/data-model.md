# Data Model: Today at Nehemiah Page

**Feature**: 005-today-at-nehemiah-page
**Date**: 2026-02-01

## Overview

This document defines the TypeScript interfaces and data structures for the Today at Nehemiah page. All types will be defined in `frontend/src/types/today.ts`.

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
 */
export interface ScheduleEvent {
  /** Unique identifier (UUID from backend) */
  id: string;

  /** Event name (e.g., "Sunday School") */
  name: string;

  /** Location within the church (e.g., "Sanctuary", "Fellowship Hall") */
  location: string;

  /** Display time in 12-hour format (e.g., "10:00 AM") - pre-formatted */
  time: string;

  /** Sort order for display (lower = earlier in day) */
  order: number;
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
 */
export interface Announcement {
  /** Unique identifier (UUID from backend) */
  id: string;

  /** Announcement title (e.g., "Individual Spiritual Growth Plan") */
  title: string;

  /** Full description text with call-to-action */
  description: string;

  /** Icon name from lucide-react icon set (e.g., "users", "calendar", "bell") */
  icon: string | null;

  /** Optional color for styling (e.g., "#c4956c") */
  color: string | null;

  /** Date when announcement should be published (ISO format) */
  publishDate: string | null;

  /** Announcement status */
  status: 'draft' | 'pending' | 'changes_requested' | 'approved' | 'rejected' | 'published';

  /** Timestamp when created (ISO format) */
  createdAt: string;

  /** Timestamp when last updated (ISO format) */
  updatedAt: string;
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
│   └── ScheduleEvent { id, time, name, location, order }
└── announcements: Announcement[]
    └── Announcement { id, title, description, icon, color, publishDate, status, createdAt, updatedAt }
```

---

## Mock Data Location

Mock data for development: `frontend/src/data/todayMockData.ts`

```typescript
export const mockScheduleEvents: ScheduleEvent[] = [
  { id: '1', time: '10:00 AM', name: 'Sunday School', location: 'Sanctuary', order: 1 },
  { id: '2', time: '11:30 AM', name: 'Coffee & Fellowship', location: 'Fellowship Hall', order: 2 },
  { id: '3', time: '12:00 PM', name: 'Afternoon Service', location: 'Sanctuary', order: 3 },
  { id: '4', time: '2:00 PM', name: 'Dinner', location: 'Fellowship Hall', order: 4 },
  { id: '5', time: '4:00 PM', name: 'Youth Service', location: 'Youth Room', order: 5 },
];

export const mockAnnouncements: Announcement[] = [
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    title: 'Individual Spiritual Growth Plan',
    description: 'The ISGP has been released! Please make sure to fill in your intake form by Jan 31st 2026. Reach out to the support team for help!',
    icon: 'users',
    color: '#c4956c',
    publishDate: '2026-01-15',
    status: 'published',
    createdAt: '2026-01-10T10:00:00.000Z',
    updatedAt: '2026-01-15T08:00:00.000Z',
  },
];
```
