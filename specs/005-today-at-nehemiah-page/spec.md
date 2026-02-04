# Feature Specification: Today at Nehemiah Page

**Feature Branch**: `005-today-at-nehemiah-page`
**Created**: 2026-02-01
**Updated**: 2026-02-03
**Status**: Draft
**Input**: User description: "create the Today at Nehemiah page following this design in figma: https://www.figma.com/design/4KpDlaCF5l1Y85ZQzi4Obg/Tap-Hub?node-id=5-277&t=CoV2irAbRnOJGNvV-4"
**Design Update**: Enhanced mobile (node-id=97-1199) and desktop (node-id=97-958) designs with schedule status indicators, announcement details, and desktop two-column layout

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Today's Schedule with Status Indicators (Priority: P1)

As a church member or visitor, I want to see the schedule of events happening today at Nehemiah's Temple with clear indicators showing what is happening now and what is coming up next, so that I can quickly understand the current state of today's activities.

**Why this priority**: The schedule is the primary purpose of this page. Users need to quickly see what's happening NOW and what's NEXT to plan their immediate participation.

**Independent Test**: Can be fully tested by navigating to the Today page and verifying all schedule items display with correct time, event name, location with icon, and status indicators ("NOW" badge for current event, "UP NEXT" divider for upcoming events).

**Acceptance Scenarios**:

1. **Given** a user navigates to the Today page, **When** the page loads, **Then** they see a "Today's Schedule" section with a list of all events for the current day
2. **Given** a user is viewing the Today page, **When** they look at any schedule item, **Then** they see the event time (formatted as HH:MM AM/PM), event name, and location displayed with a location icon
3. **Given** an event is currently happening based on the current time, **When** the user views the schedule, **Then** that event is visually highlighted with a "NOW" badge and distinct styling (gradient background, border)
4. **Given** an event is the next upcoming event after the current one, **When** the user views the schedule, **Then** they see an "UP NEXT" divider label above that event
5. **Given** a user is viewing the Today page, **When** the date changes (new day), **Then** the schedule updates to reflect the current day's events

---

### User Story 2 - View Current Date Context (Priority: P1)

As a church member or visitor, I want to see the current date prominently displayed so that I have context for which day's schedule I am viewing.

**Why this priority**: Date context is essential for users to understand what they're viewing. Without the date, the schedule could be confusing.

**Independent Test**: Can be fully tested by loading the page and verifying the page header shows the correct current date in the expected format.

**Acceptance Scenarios**:

1. **Given** a user navigates to the Today page, **When** the page loads, **Then** they see the page title "Today at Nehemiah's Temple" at the top
2. **Given** a user is viewing the Today page, **When** they look below the title, **Then** they see the current date formatted as "Weekday, Month Day, Year" (e.g., "Sunday, January 19, 2026")

---

### User Story 3 - View and Expand Announcements (Priority: P2)

As a church member, I want to see current announcements and click "Learn More" to get additional details, so that I stay informed about important church communications and can take action when needed.

**Why this priority**: Announcements keep members informed about important updates, deadlines, and church activities. The "Learn More" feature allows users to get full details without cluttering the initial view.

**Independent Test**: Can be fully tested by navigating to the Today page, viewing announcements with their summary text, and clicking "Learn More" to see expanded details.

**Acceptance Scenarios**:

1. **Given** a user navigates to the Today page, **When** the page loads, **Then** they see an "Announcements" section below the schedule
2. **Given** there are active announcements, **When** the user views the Announcements section, **Then** each announcement displays with a colored icon, title, and summary description text
3. **Given** a user is viewing an announcement, **When** they want more details, **Then** they see a "Learn More" link with an arrow/chevron icon
4. **Given** a user clicks the "Learn More" link on an announcement, **When** the action completes, **Then** they see expanded details about that announcement (expanded content, links, or navigation to full details)
5. **Given** a user is viewing an announcement, **When** they read the content, **Then** they understand the call-to-action and any relevant deadlines

---

### User Story 4 - Access Quick Links on Desktop (Priority: P2)

As a church member on a desktop device, I want to see quick links to common resources (Live Stream, Prayer Requests, Contact Staff) in a sidebar, so that I can easily access frequently used features from the Today page.

**Why this priority**: Desktop users have more screen real estate, and quick links improve navigation efficiency to commonly used features.

**Independent Test**: Can be fully tested on desktop viewport by verifying the Quick Links section appears in a right sidebar with clickable links.

**Acceptance Scenarios**:

1. **Given** a user is viewing the Today page on a desktop viewport (≥768px), **When** the page loads, **Then** they see a two-column layout with schedule/announcements on the left and a Quick Links section on the right
2. **Given** a user is viewing the Quick Links section, **When** they look at the available links, **Then** they see at least: "Live Stream", "Prayer Requests", and "Contact Staff" with arrow icons
3. **Given** a user clicks on a Quick Link, **When** the action completes, **Then** they are navigated to the appropriate destination or modal
4. **Given** a user is viewing the Today page on a mobile viewport (<768px), **When** the page loads, **Then** the Quick Links section is NOT displayed (single column layout)

---

### Edge Cases

- What happens when there are no events scheduled for today? Display an empty state message indicating "No events scheduled for today"
- What happens when there are no active announcements? Display the Announcements section with an empty state message (e.g., "No announcements today")
- How does the page handle very long event names or descriptions? Text should truncate or wrap appropriately without breaking the layout
- What happens if event data fails to load? Display a user-friendly error message with a retry option
- What happens when no event is currently in progress? No "NOW" badge is displayed; the first upcoming event shows the "UP NEXT" divider
- What happens when all events for the day have passed? Events are displayed in their past state without "NOW" or "UP NEXT" indicators
- What happens if the user clicks "Learn More" and no additional content exists? Display the announcement details inline or show a message that full details are not available

## Requirements *(mandatory)*

### Functional Requirements

#### Page Header & Layout
- **FR-001**: System MUST display the page title "Today at Nehemiah's Temple" in the page header
- **FR-002**: System MUST display the current date below the page title, formatted as "Weekday, Month Day, Year"
- **FR-003**: System MUST integrate with the existing header navigation (Home, Today, Events, Kids, Give)
- **FR-004**: The "Today" navigation link MUST be visually indicated as the active page
- **FR-005**: System MUST support responsive layout: single-column for mobile (<768px), two-column for desktop (≥768px)

#### Today's Schedule (Mobile & Desktop)
- **FR-006**: System MUST display a "Today's Schedule" card containing all events for the current day
- **FR-007**: System MUST display each schedule item with: time (12-hour format with AM/PM), event name, and location with a location icon
- **FR-008**: Schedule items MUST be displayed in chronological order by time
- **FR-009**: System MUST display a "NOW" badge on the currently active event based on the current time
- **FR-010**: The currently active event MUST have distinct visual styling (gradient background #fef7f0 to #fef9f3, border with accent color)
- **FR-011**: System MUST display an "UP NEXT" divider/label between the current event and the next upcoming event
- **FR-012**: Schedule items MUST display a location type icon (building icon for in-person, video/monitor icon for online/Zoom events)
- **FR-013**: Schedule card MUST have visual styling consistent with the design (rounded corners, shadows)

#### Announcements (Mobile & Desktop)
- **FR-014**: System MUST display an "Announcements" section with current church announcements
- **FR-015**: Each announcement MUST display a colored icon, title, and summary description text
- **FR-016**: Each announcement MUST include a "Learn More" link with a chevron/arrow icon
- **FR-017**: When user clicks "Learn More", system MUST display expanded details for that announcement
- **FR-018**: Announcement icons MUST support different background colors to categorize announcement types
- **FR-019**: Announcement cards MUST have visual styling consistent with the design (rounded corners, shadows)

#### Quick Links (Desktop Only)
- **FR-020**: On desktop viewports (≥768px), system MUST display a "Quick Links" section in the right column
- **FR-021**: Quick Links section MUST include at minimum: "Live Stream", "Prayer Requests", and "Contact Staff" links
- **FR-022**: Each Quick Link MUST display the link text and a chevron/arrow icon indicating it is clickable
- **FR-023**: Quick Links section MUST NOT be displayed on mobile viewports (<768px)

#### Data & Loading
- **FR-024**: System MUST fetch schedule and announcement data from mock API endpoints
- **FR-025**: System MUST display a loading state while data is being fetched

### Key Entities

- **Schedule Event**: Represents a single event on the schedule with attributes: id, startTime, endTime, name, location, locationType (in-person or online), and optional onlineUrl
- **Announcement**: Represents a church announcement with attributes: id, iconType, iconColor, title, summary, fullDescription, and optional actionUrl
- **Quick Link**: Represents a navigation shortcut with attributes: id, label, destinationUrl, and displayOrder

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can identify the current date and all scheduled events within 5 seconds of page load
- **SC-002**: Users can identify what is happening "NOW" and what is "UP NEXT" within 3 seconds of viewing the schedule
- **SC-003**: Page loads and displays all content within 2 seconds on standard connections
- **SC-004**: 100% of schedule items display the required information (time, name, location with icon) without truncation issues
- **SC-005**: Page maintains proper layout and readability across viewport widths from 320px to 1440px
- **SC-006**: All interactive elements (navigation links, Learn More buttons, Quick Links) are accessible via keyboard and screen readers
- **SC-007**: Desktop users (≥768px viewport) see the two-column layout with Quick Links on first load
- **SC-008**: 100% of announcement "Learn More" interactions successfully reveal additional content

## Clarifications

### Session 2026-02-01

- Q: What is the data source strategy for schedule and announcements? → A: Fetch from mock API endpoint (simulates future integration)
- Q: What should happen when there are no announcements? → A: Show section with empty state message (e.g., "No announcements today")
- Q: What should the "Need help?" link do? → A: Remove the "Need help?" link from the feature scope

### Session 2026-02-03

- Q: How does the "NOW" badge determine which event is current? → A: Compare current time against event start and end times; the event whose time range includes the current time shows the "NOW" badge
- Q: What should "Learn More" do when clicked? → A: Expand inline to show the full announcement description/details, or navigate to a detail modal (implementation can choose the UX pattern)
- Q: Should Quick Links be configurable or hardcoded? → A: For MVP, hardcode the three links (Live Stream, Prayer Requests, Contact Staff); future iterations may make them configurable

## Assumptions

- Schedule data and announcements will be fetched from mock API endpoints that simulate future backend integration
- The application already has the header and footer components from previous features that can be reused
- The page follows the existing light mode design with the gold/tan accent color (#c4956c) from the design system
- Dark mode toggle exists but the dark mode implementation is out of scope for this feature
- Schedule events include start and end times to determine which event is currently active
- Announcements include both a summary (shown initially) and a full description (shown on "Learn More")
- Quick Links destinations will initially be placeholder URLs or stub routes until those features are implemented
- The breakpoint for desktop two-column layout is 768px (standard tablet/desktop breakpoint)
