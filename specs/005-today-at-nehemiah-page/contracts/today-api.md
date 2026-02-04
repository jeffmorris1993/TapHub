# API Contract: Today at Nehemiah (Enhanced)

**Feature**: 005-today-at-nehemiah-page
**Date**: 2026-02-01
**Updated**: 2026-02-03
**Base URL**: `/api/v1`

## Overview

This document defines the API contracts for the Today at Nehemiah page. For MVP, these endpoints are mocked in `apiClient.ts`. The contract ensures easy migration to a real backend.

**2026-02-03 Update**: Added new fields for schedule status (startTime, endTime, locationType), announcement expansion (fullDescription), and Quick Links endpoint.

---

## Endpoints

### GET /api/v1/today/schedule

Retrieves the schedule of events for the current day. Returns items from `daily_schedule` table filtered by current day of week or specific date.

**Note**: This endpoint aligns with the `daily_schedule` table schema from `architecture-c4-diagrams.md`.

**Request**:
```http
GET /api/v1/today/schedule HTTP/1.1
Host: api.nehtemple.org
Accept: application/json
```

**Query Parameters**: None (backend filters by current day of week and `is_active = true`)

**Response (200 OK)** - Updated with new fields:
```json
{
  "data": [
    {
      "id": "1",
      "time": "10:00 AM",
      "name": "Sunday School",
      "location": "Sanctuary",
      "locationType": "in-person",
      "startTime": "2026-01-19T10:00:00.000Z",
      "endTime": "2026-01-19T11:00:00.000Z",
      "order": 1
    },
    {
      "id": "2",
      "time": "11:30 AM",
      "name": "Coffee & Fellowship",
      "location": "Fellowship Hall",
      "locationType": "in-person",
      "startTime": "2026-01-19T11:30:00.000Z",
      "endTime": "2026-01-19T12:00:00.000Z",
      "order": 2
    },
    {
      "id": "3",
      "time": "12:00 PM",
      "name": "Afternoon Service",
      "location": "Sanctuary",
      "locationType": "in-person",
      "startTime": "2026-01-19T12:00:00.000Z",
      "endTime": "2026-01-19T13:30:00.000Z",
      "order": 3
    },
    {
      "id": "4",
      "time": "2:00 PM",
      "name": "Dinner",
      "location": "Fellowship Hall",
      "locationType": "in-person",
      "startTime": "2026-01-19T14:00:00.000Z",
      "endTime": "2026-01-19T15:30:00.000Z",
      "order": 4
    },
    {
      "id": "5",
      "time": "4:00 PM",
      "name": "Youth Service",
      "location": "Online via Zoom",
      "locationType": "online",
      "startTime": "2026-01-19T16:00:00.000Z",
      "endTime": "2026-01-19T17:30:00.000Z",
      "order": 5,
      "onlineUrl": "https://zoom.us/j/123456789"
    }
  ],
  "error": null,
  "meta": {
    "timestamp": "2026-01-19T10:00:00.000Z"
  }
}
```

**Response (Empty Schedule - 200 OK)**:
```json
{
  "data": [],
  "error": null,
  "meta": {
    "timestamp": "2026-01-19T10:00:00.000Z"
  }
}
```

**Response (500 Server Error)**:
```json
{
  "data": null,
  "error": {
    "code": "SCHEDULE_FETCH_ERROR",
    "message": "Unable to load schedule. Please try again."
  },
  "meta": {
    "timestamp": "2026-01-19T10:00:00.000Z"
  }
}
```

---

### GET /api/v1/today/announcements

Retrieves current church announcements. Returns only published announcements with `publish_date <= today`.

**Note**: This endpoint aligns with the existing `announcements` table schema from `architecture-c4-diagrams.md`.

**Request**:
```http
GET /api/v1/today/announcements HTTP/1.1
Host: api.nehtemple.org
Accept: application/json
```

**Query Parameters**: None (backend filters to published announcements for today)

**Response (200 OK)** - Updated with new fields:
```json
{
  "data": [
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "title": "Individual Spiritual Growth Plan",
      "description": "The ISGP has been released! Fill in your intake form by Jan 31st.",
      "fullDescription": "The ISGP has been released! Please make sure to fill in your intake form by Jan 31st 2026. This program is designed to help you grow in your faith journey with personalized goals and mentorship. Reach out to the support team for help getting started!",
      "icon": "users",
      "color": "#c4956c",
      "publishDate": "2026-01-15",
      "status": "published",
      "createdAt": "2026-01-10T10:00:00.000Z",
      "updatedAt": "2026-01-15T08:00:00.000Z",
      "actionUrl": "/isgp-signup"
    }
  ],
  "error": null,
  "meta": {
    "timestamp": "2026-01-19T10:00:00.000Z"
  }
}
```

**Response (Empty Announcements - 200 OK)**:
```json
{
  "data": [],
  "error": null,
  "meta": {
    "timestamp": "2026-01-19T10:00:00.000Z"
  }
}
```

**Response (500 Server Error)**:
```json
{
  "data": null,
  "error": {
    "code": "ANNOUNCEMENTS_FETCH_ERROR",
    "message": "Unable to load announcements. Please try again."
  },
  "meta": {
    "timestamp": "2026-01-19T10:00:00.000Z"
  }
}
```

---

## TypeScript Types

```typescript
// Request: No body (GET requests)

// Response
interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
  meta: {
    timestamp: string; // ISO 8601 format
  };
}

interface ApiError {
  code: string;
  message: string;
}

// UPDATED 2026-02-03: Added startTime, endTime, locationType, onlineUrl
interface ScheduleEvent {
  id: string;
  time: string;           // Format: "H:MM AM" or "HH:MM AM/PM" (display)
  name: string;           // Max 100 chars
  location: string;       // Max 50 chars
  locationType: 'in-person' | 'online';  // NEW: For location icon
  startTime: string;      // NEW: ISO timestamp for status calculation
  endTime: string;        // NEW: ISO timestamp for status calculation
  order: number;          // Positive integer for sorting
  onlineUrl?: string;     // NEW: Optional URL for online events
}

// UPDATED 2026-02-03: Added fullDescription, actionUrl
interface Announcement {
  id: string;            // UUID from backend
  title: string;         // Max 255 chars
  description: string;   // Summary text (shown initially)
  fullDescription: string; // NEW: Full text (shown on "Learn More")
  icon: string | null;   // lucide-react icon name (max 50 chars)
  color: string | null;  // Hex color or CSS color name (max 50 chars)
  publishDate: string | null;  // ISO date string
  status: 'draft' | 'pending' | 'changes_requested' | 'approved' | 'rejected' | 'published';
  createdAt: string;     // ISO timestamp
  updatedAt: string;     // ISO timestamp
  actionUrl?: string;    // NEW: Optional link for call-to-action
}

// NEW 2026-02-03: Quick Links (hardcoded for MVP, API in future)
interface QuickLink {
  id: string;
  label: string;
  destinationUrl: string;
  displayOrder: number;
}
```

---

## Mock Implementation

Located in: `frontend/src/services/api/apiClient.ts`

```typescript
const mockScheduleData: ScheduleEvent[] = [...]; // From todayMockData.ts
const mockAnnouncementsData: Announcement[] = [...];

const mockGet = async <T>(url: string): Promise<ApiResponse<T>> => {
  await delay(300); // Simulate network latency

  if (url === '/api/v1/today/schedule') {
    return {
      data: mockScheduleData as T,
      error: null,
      meta: { timestamp: new Date().toISOString() },
    };
  }

  if (url === '/api/v1/today/announcements') {
    return {
      data: mockAnnouncementsData as T,
      error: null,
      meta: { timestamp: new Date().toISOString() },
    };
  }

  throw new Error(`Unknown mock endpoint: ${url}`);
};
```

---

## Future Backend Migration

When implementing real backend:

1. Set `VITE_USE_MOCK_API=false` in `.env`
2. Implement real GET handler in `apiClient.ts`:
   ```typescript
   get: async <T>(url: string): Promise<ApiResponse<T>> => {
     if (USE_MOCK_API) {
       return mockGet<T>(url);
     }
     // Real implementation with axios
     const response = await axios.get(url);
     return response.data;
   },
   ```
3. Backend endpoints should follow this contract exactly
4. Response format must match `ApiResponse<T>` structure

---

## Error Handling

| HTTP Status | Error Code | User-Facing Message |
|-------------|------------|---------------------|
| 500 | SCHEDULE_FETCH_ERROR | "Unable to load schedule. Please try again." |
| 500 | ANNOUNCEMENTS_FETCH_ERROR | "Unable to load announcements. Please try again." |
| 503 | SERVICE_UNAVAILABLE | "Service temporarily unavailable. Please try again later." |

**Frontend Handling**:
- Display error state with retry button
- Log error details to console (dev) / monitoring (prod)
- Show skeleton → error transition (not loading spinner)

---

## Future Endpoint: Quick Links (Not Implemented in MVP)

For future backend integration, Quick Links would have this contract:

### GET /api/v1/today/quick-links

**Response (200 OK)**:
```json
{
  "data": [
    {
      "id": "1",
      "label": "Live Stream",
      "destinationUrl": "/live",
      "displayOrder": 1
    },
    {
      "id": "2",
      "label": "Prayer Requests",
      "destinationUrl": "/prayer",
      "displayOrder": 2
    },
    {
      "id": "3",
      "label": "Contact Staff",
      "destinationUrl": "/contact",
      "displayOrder": 3
    }
  ],
  "error": null,
  "meta": {
    "timestamp": "2026-01-19T10:00:00.000Z"
  }
}
```

**MVP Implementation**: Hardcoded in `QuickLinks.tsx` component. No API call needed.
