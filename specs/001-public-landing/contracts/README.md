# API Contracts: Public Landing Page

**Feature**: 001-public-landing
**Date**: 2026-01-25
**Status**: Mock Contracts (Frontend-Only MVP)

## Overview

This directory contains JSON Schema contracts for API endpoints used by the public landing page. Since this is a **frontend-only MVP**, these contracts define the shape of **mocked data** that will be hardcoded in the frontend application.

When the backend API is implemented, these schemas will serve as the contract between frontend and backend teams.

---

## Contracts

### `landing-page.contract.json`

**Endpoint**: `GET /api/v1/public/landing-page`

**Description**: Returns all data needed to render the public landing page in a single request.

**Response Schema**: JSON Schema (Draft 7) defining:
- `contactInfo`: Church contact information
- `hero`: Hero section content
- `navigationItems`: Array of navigation cards
- `serviceTimes`: Array of service schedules

**Example Response**:
```json
{
  "contactInfo": {
    "churchName": "Nehemiah's Temple of the Apostolic Faith",
    "tagline": "Come As You Are and Change As You Come",
    "address": {
      "street": "27303 Palmer St",
      "cityStateZip": "Madison Heights, MI 48071",
      "full": "27303 Palmer St, Madison Heights, MI 48071"
    },
    "phone": "(555) 123-4567",
    "email": "info@nehtemple.org",
    "website": "https://nehtemple.org"
  },
  "hero": {
    "imageUrl": "/hero-image.jpg",
    "imageAlt": "Church leadership welcoming visitors",
    "heading": "Welcome! 👋",
    "subtitle": "Choose an option below to get started",
    "showOverlay": true
  },
  "navigationItems": [
    {
      "id": "new-here",
      "icon": "user",
      "title": "I'm New Here",
      "subtitle": "Connect with us",
      "route": "/new-visitor",
      "order": 1,
      "enabled": true
    }
    // ... more items
  ],
  "serviceTimes": [
    {
      "id": "sunday-morning",
      "day": "Sunday",
      "time": "10:00 AM",
      "serviceName": "Main Worship Service",
      "order": 1
    }
    // ... more times
  ]
}
```

**Validation Rules**:
- All required fields must be present
- `navigationItems` must have at least 1 item
- `serviceTimes` must have at least 1 item
- `phone` must match pattern: `(XXX) XXX-XXXX`
- `time` must match pattern: `HH:MM AM|PM`
- `route` must start with `/`

---

## Future Endpoints (Not Implemented in MVP)

These endpoints are planned for future backend implementation but are **not required for MVP**:

### `GET /api/v1/public/navigation`
Returns only navigation items (subset of landing page data).

### `GET /api/v1/public/service-times`
Returns only service times (subset of landing page data).

### `GET /api/v1/public/contact`
Returns only contact information (subset of landing page data).

---

## Mock Implementation Strategy

For the frontend-only MVP, implement mocked data using the contract schema:

```typescript
// frontend/src/mocks/landingPageData.ts
import type { PublicLandingPageData } from '@/types';

export const mockLandingPageData: PublicLandingPageData = {
  // ... data matching landing-page.contract.json example
};
```

Use a mock service or context to provide this data:

```typescript
// Option 1: Direct import (simplest for MVP)
import { mockLandingPageData } from '@/mocks/landingPageData';

// Option 2: Mock API service (more realistic, easier to swap later)
const landingPageService = {
  async getLandingPageData(): Promise<PublicLandingPageData> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockLandingPageData;
  }
};
```

---

## Contract Validation

To validate that mock data matches the contract schema:

```bash
# Install ajv-cli for JSON Schema validation
npm install -g ajv-cli

# Validate mock data against contract
ajv validate -s landing-page.contract.json -d ../mocks/landing-page-data.json
```

---

## Error Responses (Future Backend)

When backend is implemented, error responses should follow this structure:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {}
  }
}
```

**Common Error Codes**:
- `INTERNAL_SERVER_ERROR`: 500 - Server error
- `NOT_FOUND`: 404 - Resource not found
- `VALIDATION_ERROR`: 400 - Request validation failed

---

## TypeScript Type Generation

Generate TypeScript types from JSON Schema (future enhancement):

```bash
# Using json-schema-to-typescript
npx json-schema-to-typescript landing-page.contract.json > ../types/LandingPageData.ts
```

For MVP, types are manually defined in `data-model.md` and `frontend/src/types/`.

---

## Contract Versioning

All contracts use **API version v1** (`/api/v1/`).

When breaking changes are needed:
1. Create new version: `/api/v2/`
2. Maintain backward compatibility for v1
3. Update contracts in new directory: `contracts/v2/`

For MVP, only v1 contracts are defined.

---

## References

- JSON Schema Specification: https://json-schema.org/
- Data Model: [../data-model.md](../data-model.md)
- Feature Spec: [../spec.md](../spec.md)
