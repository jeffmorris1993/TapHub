# Feature Specification: Public Landing Page

**Feature Branch**: `001-public-landing`
**Created**: 2026-01-25
**Status**: Draft
**Input**: User description: "create a spec for the public landing page of Tap Hub. this would be the Public Landing page - Light Mode layer in the Public page of figma, refer to that to understand what is needed for the spec"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - First-Time Visitor Orientation (Priority: P1)

A first-time visitor scans an NFC tag or QR code at the church entrance and immediately sees a welcoming landing page that clearly presents the church's identity and primary navigation options to help them get started.

**Why this priority**: This is the critical first impression for new visitors arriving via NFC/QR scan. Without this foundational page, visitors cannot access any other features. This is the entry point to the entire public experience.

**Independent Test**: Can be fully tested by scanning an NFC tag or QR code and verifying the landing page loads with church branding, hero image, welcome message, and all six navigation cards clickable and leading to correct destinations.

**Acceptance Scenarios**:

1. **Given** a visitor scans the church NFC tag or QR code, **When** the page loads, **Then** they see the church name "Nehemiah's Temple of the Apostolic Faith", tagline "Come As You Are and Change As You Come", and hero image
2. **Given** the landing page is displayed, **When** the visitor scrolls down, **Then** they see a "Welcome! 👋" heading with subtitle "Choose an option below to get started"
3. **Given** the landing page is displayed, **When** the visitor views the page, **Then** they see six clearly labeled navigation cards: "I'm New Here", "Today at Nehemiah", "Events & Signups", "Kids + Youth Hub", "Give", and "Feedback / Prayer"
4. **Given** the visitor is viewing navigation cards, **When** they tap any card, **Then** they navigate to the corresponding section
5. **Given** the page is fully scrolled, **When** the visitor views the bottom section, **Then** they see service times (Sunday Morning 10:00 AM, Sunday Evening 6:00 PM, Wednesday 7:00 PM) with service names
6. **Given** the service times are visible, **When** the visitor scrolls to the very bottom, **Then** they see the church address "27303 Palmer St, Madison Heights, MI 48071" and phone number "(555) 123-4567"

---

### User Story 2 - Header Navigation Access (Priority: P2)

Visitors who prefer traditional navigation can use the header menu to quickly jump to specific sections without scrolling through the landing page.

**Why this priority**: Provides an alternative navigation method for users familiar with web conventions. Enhances usability but not required for MVP since card navigation covers primary use cases.

**Independent Test**: Can be tested by loading the landing page and clicking header navigation links (Home, Today, Events, Kids, Give) to verify they navigate to correct pages.

**Acceptance Scenarios**:

1. **Given** the landing page is loaded, **When** the visitor views the top of the page, **Then** they see a header with church logo "NT", church name "Nehemiah's Temple", and "Tap Hub" subtitle
2. **Given** the header is visible on desktop/tablet view, **When** the visitor views the right side of the header, **Then** they see navigation links for "Home", "Today", "Events", "Kids", "Give"
3. **Given** the visitor sees the header navigation, **When** they click any navigation link, **Then** they are taken to the corresponding page
4. **Given** the header is visible, **When** the visitor clicks "Admin" button, **Then** they are directed to the admin login page

---

### User Story 3 - Help Access (Priority: P3)

Visitors who need assistance can access help resources through a footer link.

**Why this priority**: Nice-to-have feature that provides additional support avenue. Lower priority as phone number and address are already visible on landing page.

**Independent Test**: Can be tested by scrolling to footer and clicking "Need help?" link to verify help resource appears.

**Acceptance Scenarios**:

1. **Given** the visitor scrolls to the bottom of the landing page, **When** they view the footer, **Then** they see a "Need help?" link
2. **Given** the "Need help?" link is visible, **When** the visitor clicks it, **Then** they see help resources or contact options

---

### Edge Cases

- What happens when the hero image fails to load? (Display church name and tagline with fallback background color)
- What happens when visitor clicks navigation card for a section not yet built? (Display "Coming soon" message or redirect to contact form)
- How does the page handle slow network connections from mobile devices? (Progressive loading with content skeleton/placeholders)
- What happens when JavaScript is disabled? (All navigation links still function as standard HTML links)
- How does the page adapt to various screen sizes (mobile phones, tablets, desktops)? (Responsive design with mobile-first approach)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Page MUST display church branding including logo with "NT" initials, full church name "Nehemiah's Temple of the Apostolic Faith", and tagline "Come As You Are and Change As You Come"
- **FR-002**: Page MUST display a hero image showing church leadership/building with dark overlay for text readability
- **FR-003**: Page MUST display six navigation cards in the following order: "I'm New Here", "Today at Nehemiah", "Events & Signups", "Kids + Youth Hub", "Give", "Feedback / Prayer"
- **FR-004**: Each navigation card MUST include an icon, primary heading, descriptive subtitle, and visual indicator (arrow/chevron) for interactivity
- **FR-005**: Page MUST display service times section with heading "Service Times" preceded by a clock icon
- **FR-006**: Service times MUST show three services: "Sunday Morning - Main Worship Service - 10:00 AM", "Sunday Evening - Evening Service - 6:00 PM", "Wednesday - Bible Study - 7:00 PM"
- **FR-007**: Page MUST display church contact information: address "27303 Palmer St, Madison Heights, MI 48071" and phone "(555) 123-4567"
- **FR-008**: Header MUST display church logo, church name, "Tap Hub" subtitle, and "Admin" button
- **FR-009**: Header navigation (desktop/tablet only) MUST display links for "Home", "Today", "Events", "Kids", "Give"
- **FR-010**: Footer MUST display "Need help?" link
- **FR-011**: Page MUST load within 2 seconds on 3G mobile connections
- **FR-012**: All interactive elements (cards, buttons, links) MUST provide visual feedback on tap/click
- **FR-013**: Page MUST be fully responsive and mobile-first, optimized for tap targets
- **FR-014**: Page MUST be accessible via both NFC tag scan and QR code scan
- **FR-015**: Navigation cards MUST route to corresponding pages: "I'm New Here" → new visitor form, "Today at Nehemiah" → today's schedule, "Events & Signups" → events listing, "Kids + Youth Hub" → kids ministry info, "Give" → giving page, "Feedback / Prayer" → feedback/prayer form

### Key Entities

- **Landing Page Content**: Static content including church name, tagline, hero image, navigation cards, service times, contact information
- **Navigation Item**: Represents each clickable card with properties: icon, title, subtitle, destination route
- **Service Time**: Represents each service with properties: day/time, service name, time display

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Visitors can access the landing page within 2 seconds of scanning NFC tag or QR code on mobile devices
- **SC-002**: 95% of first-time visitors successfully navigate to at least one section within 30 seconds of landing page load
- **SC-003**: All tap targets meet minimum accessibility size of 44x44 pixels for comfortable mobile interaction
- **SC-004**: Landing page renders correctly on screens ranging from 320px (small phones) to 1920px (desktop) width
- **SC-005**: Page achieves Google Lighthouse performance score of 90+ on mobile devices
- **SC-006**: Zero navigation errors when visitors tap any of the six primary navigation cards
- **SC-007**: Church contact information (address and phone) is visible without scrolling on 50%+ of mobile devices in portrait mode
