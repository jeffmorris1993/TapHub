# Data Model: Public Landing Page

**Feature**: 001-public-landing
**Date**: 2026-01-25
**Type**: Frontend Static Data Structures

## Overview

This document defines TypeScript interfaces and types for the public landing page. For this single-church deployment, landing page content (service times, contact info, navigation items) **rarely changes** and will be stored as **static data files** in the frontend codebase.

**Rationale for Static Data:**
- Service times change infrequently (maybe once a year)
- Contact info rarely changes (only if moving locations)
- Navigation items are a fixed set of 6 cards
- Single church deployment (not multi-tenant)
- Better performance (no API calls for static content)
- Simpler architecture (follows "Simplicity and Pragmatism" principle)

If content needs updating, developers edit the static data files and redeploy the frontend. This is pragmatic for a single church with infrequent changes.

---

## Core Entities

### NavigationItem

Represents a clickable navigation card on the landing page.

```typescript
interface NavigationItem {
  /**
   * Unique identifier for the navigation item
   * @example "new-here"
   */
  id: string;

  /**
   * Icon identifier (maps to icon component or icon font)
   * @example "user" | "calendar" | "gift" | "users" | "message-circle"
   */
  icon: string;

  /**
   * Primary heading displayed on the card
   * @example "I'm New Here"
   */
  title: string;

  /**
   * Descriptive subtitle providing context
   * @example "Connect with us"
   */
  subtitle: string;

  /**
   * Route path for navigation
   * @example "/new-visitor"
   */
  route: string;

  /**
   * Display order (lower numbers appear first)
   * @example 1
   */
  order: number;

  /**
   * Whether this item is currently active/enabled
   * @default true
   */
  enabled: boolean;
}
```

**Sample Data**:
```typescript
const navigationItems: NavigationItem[] = [
  {
    id: 'new-here',
    icon: 'user',
    title: "I'm New Here",
    subtitle: 'Connect with us',
    route: '/new-visitor',
    order: 1,
    enabled: true,
  },
  {
    id: 'today',
    icon: 'calendar',
    title: 'Today at Nehemiah',
    subtitle: "See what's happening",
    route: '/today',
    order: 2,
    enabled: true,
  },
  {
    id: 'events',
    icon: 'calendar-check',
    title: 'Events & Signups',
    subtitle: 'View upcoming events',
    route: '/events',
    order: 3,
    enabled: true,
  },
  {
    id: 'kids-youth',
    icon: 'users',
    title: 'Kids + Youth Hub',
    subtitle: 'Programs for families',
    route: '/kids-youth',
    order: 4,
    enabled: true,
  },
  {
    id: 'give',
    icon: 'gift',
    title: 'Give',
    subtitle: 'Support our mission',
    route: '/give',
    order: 5,
    enabled: true,
  },
  {
    id: 'feedback',
    icon: 'message-circle',
    title: 'Feedback / Prayer',
    subtitle: 'Share with us',
    route: '/feedback',
    order: 6,
    enabled: true,
  },
];
```

---

### ServiceTime

Represents a church service schedule entry.

```typescript
interface ServiceTime {
  /**
   * Unique identifier for the service
   * @example "sunday-morning"
   */
  id: string;

  /**
   * Day of week the service occurs
   * @example "Sunday" | "Wednesday"
   */
  day: string;

  /**
   * Time the service starts (12-hour format)
   * @example "10:00 AM"
   */
  time: string;

  /**
   * Name/type of service
   * @example "Main Worship Service"
   */
  serviceName: string;

  /**
   * Display order (lower numbers appear first)
   * @example 1
   */
  order: number;
}
```

**Sample Data**:
```typescript
const serviceTimes: ServiceTime[] = [
  {
    id: 'sunday-morning',
    day: 'Sunday',
    time: '10:00 AM',
    serviceName: 'Main Worship Service',
    order: 1,
  },
  {
    id: 'sunday-evening',
    day: 'Sunday',
    time: '6:00 PM',
    serviceName: 'Evening Service',
    order: 2,
  },
  {
    id: 'wednesday',
    day: 'Wednesday',
    time: '7:00 PM',
    serviceName: 'Bible Study',
    order: 3,
  },
];
```

---

### ContactInfo

Represents church contact information.

```typescript
interface ContactInfo {
  /**
   * Church full name
   * @example "Nehemiah's Temple of the Apostolic Faith"
   */
  churchName: string;

  /**
   * Church tagline/motto
   * @example "Come As You Are and Change As You Come"
   */
  tagline: string;

  /**
   * Physical address
   */
  address: {
    /**
     * Street address
     * @example "27303 Palmer St"
     */
    street: string;

    /**
     * City, State ZIP
     * @example "Madison Heights, MI 48071"
     */
    cityStateZip: string;

    /**
     * Full formatted address (for display)
     * @example "27303 Palmer St, Madison Heights, MI 48071"
     */
    full: string;
  };

  /**
   * Primary phone number (formatted for display)
   * @example "(555) 123-4567"
   */
  phone: string;

  /**
   * Primary email address
   * @example "info@nehtemple.org"
   */
  email?: string;

  /**
   * Website URL
   * @example "https://nehtemple.org"
   */
  website?: string;
}
```

**Sample Data**:
```typescript
const contactInfo: ContactInfo = {
  churchName: "Nehemiah's Temple of the Apostolic Faith",
  tagline: 'Come As You Are and Change As You Come',
  address: {
    street: '27303 Palmer St',
    cityStateZip: 'Madison Heights, MI 48071',
    full: '27303 Palmer St, Madison Heights, MI 48071',
  },
  phone: '(555) 123-4567',
  email: 'info@nehtemple.org',
  website: 'https://nehtemple.org',
};
```

---

### HeroContent

Represents hero section content (image, overlay text).

```typescript
interface HeroContent {
  /**
   * Path to hero image
   * @example "/hero-image.jpg"
   */
  imageUrl: string;

  /**
   * Alt text for accessibility
   * @example "Church leadership welcoming visitors"
   */
  imageAlt: string;

  /**
   * Heading text displayed over image
   * @example "Welcome! 👋"
   */
  heading: string;

  /**
   * Subtitle text displayed under heading
   * @example "Choose an option below to get started"
   */
  subtitle: string;

  /**
   * Whether to show dark overlay for text readability
   * @default true
   */
  showOverlay: boolean;
}
```

**Sample Data**:
```typescript
const heroContent: HeroContent = {
  imageUrl: '/hero-image.jpg',
  imageAlt: 'Church leadership welcoming visitors',
  heading: 'Welcome! 👋',
  subtitle: 'Choose an option below to get started',
  showOverlay: true,
};
```

---

## Theme Definition

Theme structure is defined in `frontend/src/theme/theme.ts` (see research.md section 2).

```typescript
export type Theme = {
  colors: {
    primary: string;
    secondary: string;
    surface: string;
    background: string;
    textPrimary: string;
    textSecondary: string;
    textOnPrimary: string;
    interactive: string;
    interactiveHover: string;
    interactiveActive: string;
    error: string;
    success: string;
    warning: string;
    info: string;
  };
  typography: {
    fontFamily: {
      body: string;
      heading: string;
    };
    fontSize: Record<string, string>;
    fontWeight: Record<string, number>;
    lineHeight: Record<string, number>;
  };
  spacing: Record<string, string>;
  radii: Record<string, string>;
  shadows: Record<string, string>;
  breakpoints: Record<string, string>;
  transitions: Record<string, string>;
};
```

---

## Aggregate Types

### PublicLandingPageData

Complete data structure for the public landing page.

```typescript
interface PublicLandingPageData {
  /**
   * Contact information for the church
   */
  contactInfo: ContactInfo;

  /**
   * Hero section content
   */
  hero: HeroContent;

  /**
   * List of navigation cards
   */
  navigationItems: NavigationItem[];

  /**
   * Service schedule
   */
  serviceTimes: ServiceTime[];
}
```

---

## Static Data Location

All static data will be stored in:
- `frontend/src/data/navigationItems.ts`
- `frontend/src/data/serviceTimes.ts`
- `frontend/src/data/contactInfo.ts`
- `frontend/src/data/heroContent.ts`
- `frontend/src/data/index.ts` (barrel export)

**Why `data/` not `mocks/`?**
This is real, production data for the church, not test mocks. The data is static because it changes infrequently, not because it's fake.

---

## Service Layer Pattern

To keep data access flexible and testable, use a service layer that abstracts where data comes from:

```typescript
// frontend/src/services/landingPageService.ts
import { navigationItems } from '@/data/navigationItems';
import { serviceTimes } from '@/data/serviceTimes';
import { contactInfo } from '@/data/contactInfo';
import { heroContent } from '@/data/heroContent';
import type { PublicLandingPageData } from '@/types';

export const landingPageService = {
  /**
   * Get all landing page data
   * Currently returns static data from local files
   * Can be swapped to API call later without changing components
   */
  async getLandingPageData(): Promise<PublicLandingPageData> {
    return {
      contactInfo,
      hero: heroContent,
      navigationItems,
      serviceTimes,
    };
  },
};
```

**Benefits:**
- Components use the service, not direct imports
- Easy to swap to API later by changing just this file
- Testable (can mock the service in tests)
- Consistent async interface (even though static data is synchronous)

**Future API Migration (if needed):**
```typescript
// If you ever need to fetch from API instead of static data:
export const landingPageService = {
  async getLandingPageData(): Promise<PublicLandingPageData> {
    const response = await axios.get('/api/v1/public/landing-page');
    return response.data;
  },
};
// Components don't need to change - they already use async/await
```

---

## Validation Rules

### NavigationItem
- `id`: Required, unique, lowercase-kebab-case
- `title`: Required, 1-50 characters
- `subtitle`: Required, 1-100 characters
- `route`: Required, must start with `/`
- `order`: Required, positive integer

### ServiceTime
- `id`: Required, unique, lowercase-kebab-case
- `day`: Required, one of ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
- `time`: Required, valid 12-hour format with AM/PM
- `serviceName`: Required, 1-100 characters

### ContactInfo
- `churchName`: Required, 1-200 characters
- `address.street`: Required
- `address.cityStateZip`: Required
- `phone`: Required, valid phone format
- `email`: Optional, valid email format
- `website`: Optional, valid URL format

---

## Type Exports

All types will be exported from a central location:

```typescript
// frontend/src/types/index.ts
export type {
  NavigationItem,
  ServiceTime,
  ContactInfo,
  HeroContent,
  PublicLandingPageData,
  Theme,
};
```

This allows consistent imports across the application:

```typescript
import type { NavigationItem, ServiceTime } from '@/types';
```
