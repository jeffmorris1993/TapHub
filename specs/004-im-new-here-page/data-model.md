# Data Model: I'm New Here Page

**Feature**: 004-im-new-here-page
**Date**: 2026-01-30

## Entities

### VisitorRegistration

Represents a submitted visitor registration form.

| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| id | string (UUID) | Yes | Generated on submission | Unique identifier |
| name | string | Yes | Min 1 char, max 100 chars | Visitor's full name |
| email | string | Yes | Valid email format | Contact email address |
| phone | string | No | Any format accepted | Optional phone number |
| isFirstTime | boolean | Yes | Must be true or false | Whether this is visitor's first visit |
| interests | string[] | No | Valid interest IDs only | Selected ministry interests |
| createdAt | string (ISO 8601) | Yes | Auto-generated | Submission timestamp |

### Interest

Represents a selectable ministry interest option.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique identifier (e.g., "small-group") |
| label | string | Yes | Display text (e.g., "Connect with a small group") |

## Static Data

### Interest Options

```typescript
// data/interests.ts
export const INTEREST_OPTIONS: Interest[] = [
  { id: 'small-group', label: 'Connect with a small group' },
  { id: 'membership', label: 'Learn about membership' },
  { id: 'volunteer', label: 'Volunteer opportunities' },
  { id: 'kids-ministry', label: 'Kids ministry info' },
  { id: 'youth-ministry', label: 'Youth ministry info' },
  { id: 'baptism', label: 'Get baptized' },
];
```

## TypeScript Types

```typescript
// types/visitor.ts

/**
 * Selectable ministry interest option
 */
export interface Interest {
  id: string;
  label: string;
}

/**
 * Form data submitted by visitor (before API processing)
 */
export interface VisitorFormData {
  name: string;
  email: string;
  phone?: string;
  isFirstTime: boolean;
  interests: string[];
}

/**
 * Complete visitor registration record (after API processing)
 */
export interface VisitorRegistration extends VisitorFormData {
  id: string;
  createdAt: string;
}

/**
 * API response wrapper (matches constitution API standards)
 */
export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
  meta: {
    timestamp: string;
  };
}

/**
 * API error structure
 */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string>;
}
```

## Validation Rules

### Name Field
- Required: Yes
- Minimum length: 1 character
- Maximum length: 100 characters
- Validation message: "Please enter your name"

### Email Field
- Required: Yes
- Format: Must match email pattern (`^[^\s@]+@[^\s@]+\.[^\s@]+$`)
- Validation messages:
  - Empty: "Please enter your email"
  - Invalid format: "Please enter a valid email address"

### Phone Field
- Required: No
- Format: Any (no validation)
- Note: Accepts any input per spec assumptions

### First Time Visitor
- Required: Yes
- Type: Boolean selection (radio-style buttons)
- Validation message: "Please indicate if this is your first visit"

### Interests
- Required: No
- Type: Multi-select (checkboxes)
- Constraint: Only valid interest IDs accepted

## State Transitions

```
┌─────────────┐    Submit    ┌─────────────┐    Success    ┌─────────────┐
│   Empty     │ ──────────►  │  Submitting │ ───────────►  │  Confirmed  │
│   Form      │              │   (loading) │               │   (done)    │
└─────────────┘              └─────────────┘               └─────────────┘
                                    │
                                    │ Error
                                    ▼
                             ┌─────────────┐
                             │   Error     │
                             │  (retry)    │
                             └─────────────┘
```

### Form States

| State | Description | UI |
|-------|-------------|-----|
| Empty | Initial form state, no data entered | Form with empty fields |
| Filling | User is entering data | Form with partial data, validation on blur |
| Invalid | Validation errors present | Error messages displayed, submit disabled |
| Submitting | Form submitted, awaiting response | Loading spinner, form disabled |
| Confirmed | Submission successful | SuccessConfirmation component with "Thank you!" message and "Submit Another" button |
| Error | Submission failed | Error message, retry button |

## Storage (MVP)

### localStorage Schema

```typescript
// Key: 'visitors'
// Value: VisitorRegistration[]

// Example:
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "(555) 123-4567",
    "isFirstTime": true,
    "interests": ["small-group", "membership"],
    "createdAt": "2026-01-30T10:30:00.000Z"
  }
]
```

### Storage Operations

| Operation | Description |
|-----------|-------------|
| Create | Append new registration to array |
| Read | Retrieve all registrations (future admin feature) |
| Clear | Remove all registrations (development/testing) |

Note: No update or delete operations needed for MVP.
