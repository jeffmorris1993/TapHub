# Feature Specification: I'm New Here Page

**Feature Branch**: `004-im-new-here-page`
**Created**: 2026-01-30
**Status**: Draft
**Input**: User description: "we need to create the I'm New Here page, that page should look like the design in figma"
**Design Reference**: [Figma Design](https://www.figma.com/design/4KpDlaCF5l1Y85ZQzi4Obg/Tap-Hub?node-id=3-177)

**Layout Redesign References** (Phase 8):
- Mobile Form: [node 86:524](https://www.figma.com/design/4KpDlaCF5l1Y85ZQzi4Obg/Tap-Hub?node-id=86-524)
- Mobile Confirmation: [node 87:755](https://www.figma.com/design/4KpDlaCF5l1Y85ZQzi4Obg/Tap-Hub?node-id=87-755)
- Desktop Form: [node 84:358](https://www.figma.com/design/4KpDlaCF5l1Y85ZQzi4Obg/Tap-Hub?node-id=84-358)
- Desktop Confirmation: [node 84:463](https://www.figma.com/design/4KpDlaCF5l1Y85ZQzi4Obg/Tap-Hub?node-id=84-463)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - New Visitor Registration (Priority: P1)

A first-time visitor to Nehemiah's Temple wants to introduce themselves and let the church know they're interested in connecting. They navigate to the "I'm New Here" page and fill out their name and email so the church can follow up appropriately.

**Why this priority**: This is the core purpose of the page - capturing visitor information is essential for the church to welcome and connect with new attendees. Without this, the page serves no purpose.

**Independent Test**: Can be fully tested by navigating to the page, filling out all required fields, selecting interests, and submitting the form. Delivers value by capturing visitor information for church follow-up.

**Acceptance Scenarios**:

1. **Given** a visitor is on the I'm New Here page, **When** they enter their name and email and submit, **Then** the system accepts their registration and confirms submission
2. **Given** a visitor has filled out the form, **When** they click Submit without entering required fields (name or email), **Then** the system displays appropriate validation messages
3. **Given** a visitor is filling out the form, **When** they enter an invalid email format, **Then** the system indicates the email is invalid before submission

---

### User Story 2 - Indicate Visit Status (Priority: P2)

A visitor wants to indicate whether this is their first time visiting or if they've been to the church before, so the church can tailor their follow-up appropriately.

**Why this priority**: Understanding if someone is a first-time visitor vs. a returning guest helps the church provide the right type of welcome and follow-up communication.

**Independent Test**: Can be tested by selecting either "Yes, first time" or "I've been before" options and verifying the selection is captured with the submission.

**Acceptance Scenarios**:

1. **Given** a visitor is on the form, **When** they select "Yes, first time", **Then** that option appears selected (highlighted) and the other option appears unselected
2. **Given** a visitor is on the form, **When** they select "I've been before", **Then** that option appears selected and "Yes, first time" appears unselected
3. **Given** a visitor has not made a selection, **When** they try to submit, **Then** the system requires them to indicate their visit status

---

### User Story 3 - Express Interests (Priority: P2)

A visitor wants to indicate what they're interested in learning more about so the church can connect them with relevant ministries and opportunities.

**Why this priority**: Interest selection enables personalized follow-up and helps visitors connect with specific ministries they care about.

**Independent Test**: Can be tested by selecting one or more interest checkboxes and verifying selections are captured with submission.

**Acceptance Scenarios**:

1. **Given** a visitor is on the form, **When** they click an interest option, **Then** that option becomes selected (checkbox checked)
2. **Given** a visitor has selected an interest, **When** they click it again, **Then** the option becomes unselected
3. **Given** a visitor is on the form, **When** they select multiple interests, **Then** all selected interests are captured when they submit

---

### User Story 4 - Optional Phone Contact (Priority: P3)

A visitor wants to provide their phone number so the church can contact them via phone in addition to email.

**Why this priority**: Phone contact is optional and provides an additional communication channel, but is not required for basic follow-up.

**Independent Test**: Can be tested by entering a phone number and verifying it's captured with submission, or leaving it blank and confirming form still submits.

**Acceptance Scenarios**:

1. **Given** a visitor is on the form, **When** they enter a phone number and submit, **Then** the phone number is captured with their registration
2. **Given** a visitor is on the form, **When** they leave phone number blank and submit with other required fields, **Then** the form submits successfully

---

### Edge Cases

- What happens when a visitor submits the form with no interests selected? (Form should still submit - interests are optional)
- How does the system handle very long names or email addresses? (Accept reasonable lengths, display appropriately)
- What happens if submission fails due to network issues? (Display user-friendly error message with retry option)
- What happens if visitor navigates away before completing? (No data saved - standard browser behavior)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a registration form with the following fields: Name (required), Email (required), Phone Number (optional)
- **FR-002**: System MUST validate that Name and Email fields are completed before allowing submission
- **FR-003**: System MUST validate email format (contains @ and valid domain structure)
- **FR-004**: System MUST display a required "Is this your first time visiting?" question with two mutually exclusive options: "Yes, first time" and "I've been before"
- **FR-005**: System MUST display the following interest options as multi-select checkboxes:
  - Connect with a small group
  - Learn about membership
  - Volunteer opportunities
  - Kids ministry info
  - Youth ministry info
  - Get baptized
- **FR-006**: System MUST allow visitors to select zero or more interest options
- **FR-007**: System MUST display a Submit button that captures all form data
- **FR-008**: System MUST display confirmation to the user after successful form submission (see FR-011 for details)
- **FR-009**: System MUST display the page header with navigation consistent with other TapHub pages
- **FR-010**: System MUST visually highlight the selected option for the first-time visitor question (selected state with brand color)
- **FR-011**: System MUST display a success confirmation after form submission with:
  - Page header changes to "Welcome!" with subtitle "We're excited to connect with you"
  - Success card with green border (#00c950)
  - Green circle with white checkmark icon
  - "Thank you!" heading
  - Message: "Someone from our team will reach out to you this week. We can't wait to meet you in person!"
  - "Submit Another" button to reset and show form again
- **FR-012**: System MUST implement a fixed-header/scrollable-form layout structure:
  - **Mobile**: Fixed app header at top, fixed hero section with church image and overlay text below header, scrollable form area in the middle, fixed submit button footer at bottom
  - **Desktop**: Split-panel layout with left side (title, subtitle, scrollable form area) and right side (decorative image panel with gradient overlay, icon, "Let's get you connected" heading, and church quote)
  - Form MUST be the ONLY scrollable element; header/hero and submit button remain fixed/sticky
  - Layout per Figma designs: nodes 86:524, 87:755 (mobile), 84:358, 84:463 (desktop)

### Key Entities

- **Visitor Registration**: Represents a submitted visitor form containing:
  - Name (required)
  - Email (required)
  - Phone number (optional)
  - First time visitor flag (boolean, required)
  - List of selected interests (zero or more)
  - Submission timestamp
  - Storage: Browser local storage (frontend-only MVP)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Visitors can complete the registration form in under 2 minutes
- **SC-002**: 95% of form submissions capture all required information correctly
- **SC-003**: Form validation errors are displayed immediately and clearly to users
- **SC-004**: Page loads and is fully interactive within 2 seconds on 3G mobile connections
- **SC-005**: Form is fully accessible via keyboard navigation
- **SC-006**: Page displays correctly on both desktop and mobile devices

## Clarifications

### Session 2026-01-30

- Q: Where should submitted visitor registration data be stored/sent? → A: Store in app state/local storage (frontend-only MVP)
- Q: How should church staff view submitted visitor registrations? → A: MVP shows confirmation only; staff access deferred to future iteration

## Out of Scope (MVP)

- Admin/staff view to access submitted registrations (deferred to future iteration)
- Backend API or database integration
- Email notifications to church staff
- Integration with church management systems

## Assumptions

- The existing TapHub header/navigation component will be reused for consistency
- Success confirmation design per Figma: [Confirmation State](https://www.figma.com/design/4KpDlaCF5l1Y85ZQzi4Obg/Tap-Hub?node-id=64-207)
- Phone number format validation is not required (accepts any input)
- Form data will be stored in browser local storage as a frontend-only MVP; backend integration can be added in a future iteration
- This MVP focuses on the visitor experience; staff access to submissions is a future enhancement
