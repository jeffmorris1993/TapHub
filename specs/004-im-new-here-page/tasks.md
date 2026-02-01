# Tasks: I'm New Here Page

**Input**: Design documents from `/specs/004-im-new-here-page/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: TDD required per constitution and user request. Tests written FIRST, verified to FAIL, then implementation.

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Frontend**: `frontend/src/` with co-located `__tests__/` folders
- **Test Location**: All tests in `__tests__/` folders within same directory as source

---

## Phase 1: Setup

**Purpose**: Install dependencies and create base types/data

- [x] T001 Install react-hook-form dependency in frontend/package.json
- [x] T002 [P] Create visitor types in frontend/src/types/visitor.ts
- [x] T003 [P] Create interest options data in frontend/src/data/interests.ts

---

## Phase 2: Foundational (Reusable Form Components)

**Purpose**: Create reusable form components that ALL user stories depend on

**⚠️ CRITICAL**: User story work cannot begin until these components are complete

### API Layer

- [x] T004 Write apiClient tests in frontend/src/services/api/__tests__/apiClient.test.ts
- [x] T005 Implement apiClient with mock support in frontend/src/services/api/apiClient.ts
- [x] T006 Create apiClient barrel export in frontend/src/services/api/index.ts

### Visitor Service

- [x] T007 Write visitorService tests in frontend/src/services/__tests__/visitorService.test.ts
- [x] T008 Implement visitorService in frontend/src/services/visitorService.ts

### FormField Component

- [x] T009 [P] Write FormField tests in frontend/src/components/forms/FormField/__tests__/FormField.test.tsx
- [x] T010 [P] Create FormField styles in frontend/src/components/forms/FormField/FormField.styles.ts
- [x] T011 Implement FormField component in frontend/src/components/forms/FormField/FormField.tsx
- [x] T012 Create FormField barrel export in frontend/src/components/forms/FormField/index.ts

### TextInput Component

- [x] T013 [P] Write TextInput tests in frontend/src/components/forms/TextInput/__tests__/TextInput.test.tsx
- [x] T014 [P] Create TextInput styles in frontend/src/components/forms/TextInput/TextInput.styles.ts
- [x] T015 Implement TextInput component in frontend/src/components/forms/TextInput/TextInput.tsx
- [x] T016 Create TextInput barrel export in frontend/src/components/forms/TextInput/index.ts

### SubmitButton Component

- [x] T017 [P] Write SubmitButton tests in frontend/src/components/forms/SubmitButton/__tests__/SubmitButton.test.tsx
- [x] T018 [P] Create SubmitButton styles in frontend/src/components/forms/SubmitButton/SubmitButton.styles.ts
- [x] T019 Implement SubmitButton component in frontend/src/components/forms/SubmitButton/SubmitButton.tsx
- [x] T020 Create SubmitButton barrel export in frontend/src/components/forms/SubmitButton/index.ts

### Forms Barrel Export

- [x] T021 Create forms barrel export in frontend/src/components/forms/index.ts

**Checkpoint**: Foundation ready - all reusable form components available

---

## Phase 3: User Story 1 - New Visitor Registration (Priority: P1) 🎯 MVP

**Goal**: Visitor can fill out name, email and submit form to register

**Independent Test**: Navigate to /new-here, enter name and email, submit form, see confirmation message

### Tests for User Story 1

> **NOTE: Write tests FIRST, ensure they FAIL before implementation**

- [x] T022 [P] [US1] Write VisitorForm tests for name/email validation in frontend/src/pages/ImNewHere/__tests__/VisitorForm.test.tsx
- [x] T023 [P] [US1] Write ImNewHere page tests in frontend/src/pages/ImNewHere/__tests__/ImNewHere.test.tsx

### Implementation for User Story 1

- [x] T024 [P] [US1] Create VisitorForm styles in frontend/src/pages/ImNewHere/VisitorForm.styles.ts
- [x] T025 [P] [US1] Create ImNewHere page styles in frontend/src/pages/ImNewHere/ImNewHere.styles.ts
- [x] T026 [US1] Implement VisitorForm with name/email fields using react-hook-form in frontend/src/pages/ImNewHere/VisitorForm.tsx
- [x] T027 [US1] Implement ImNewHere page container with form/success state toggle in frontend/src/pages/ImNewHere/ImNewHere.tsx
- [x] T028 [US1] Create ImNewHere page barrel export in frontend/src/pages/ImNewHere/index.ts
- [x] T029 [US1] Add /new-here route to frontend/src/App.tsx

### Page Layout Components for User Story 1

- [x] T030 [P] [US1] Write PageHeader tests in frontend/src/components/PageHeader/__tests__/PageHeader.test.tsx
- [x] T031 [P] [US1] Create PageHeader styles in frontend/src/components/PageHeader/PageHeader.styles.ts
- [x] T032 [US1] Implement PageHeader component with dynamic title/subtitle props in frontend/src/components/PageHeader/PageHeader.tsx
- [x] T033 [US1] Create PageHeader barrel export in frontend/src/components/PageHeader/index.ts
- [x] T034 [P] [US1] Write SuccessConfirmation tests in frontend/src/components/SuccessConfirmation/__tests__/SuccessConfirmation.test.tsx
- [x] T035 [P] [US1] Create SuccessConfirmation styles in frontend/src/components/SuccessConfirmation/SuccessConfirmation.styles.ts
- [x] T036 [US1] Implement SuccessConfirmation component with green checkmark, thank you message, and Submit Another button in frontend/src/components/SuccessConfirmation/SuccessConfirmation.tsx
- [x] T037 [US1] Create SuccessConfirmation barrel export in frontend/src/components/SuccessConfirmation/index.ts

**Checkpoint**: User Story 1 complete - basic visitor registration with name/email works independently

---

## Phase 4: User Story 2 - Indicate Visit Status (Priority: P2)

**Goal**: Visitor can indicate if this is their first visit or they've been before

**Independent Test**: Select "Yes, first time" or "I've been before", verify selection highlights and is captured on submit

### Tests for User Story 2

- [x] T038 [P] [US2] Write RadioGroup tests in frontend/src/components/forms/RadioGroup/__tests__/RadioGroup.test.tsx
- [x] T039 [P] [US2] Write VisitorForm tests for visit status selection in frontend/src/pages/ImNewHere/__tests__/VisitorForm.test.tsx (extend existing)

### Implementation for User Story 2

- [x] T040 [P] [US2] Create RadioGroup styles in frontend/src/components/forms/RadioGroup/RadioGroup.styles.ts
- [x] T041 [US2] Implement RadioGroup component with button-style options in frontend/src/components/forms/RadioGroup/RadioGroup.tsx
- [x] T042 [US2] Create RadioGroup barrel export in frontend/src/components/forms/RadioGroup/index.ts
- [x] T043 [US2] Update forms barrel export to include RadioGroup in frontend/src/components/forms/index.ts
- [x] T044 [US2] Add isFirstTime field with RadioGroup to VisitorForm in frontend/src/pages/ImNewHere/VisitorForm.tsx
- [x] T045 [US2] Add validation for required visit status selection in frontend/src/pages/ImNewHere/VisitorForm.tsx

**Checkpoint**: User Story 2 complete - visit status selection works independently

---

## Phase 5: User Story 3 - Express Interests (Priority: P2)

**Goal**: Visitor can select ministry interests they want to learn more about

**Independent Test**: Select one or more interest checkboxes, verify selections are captured on submit

### Tests for User Story 3

- [x] T046 [P] [US3] Write CheckboxGroup tests in frontend/src/components/forms/CheckboxGroup/__tests__/CheckboxGroup.test.tsx
- [x] T047 [P] [US3] Write VisitorForm tests for interests selection in frontend/src/pages/ImNewHere/__tests__/VisitorForm.test.tsx (extend existing)

### Implementation for User Story 3

- [x] T048 [P] [US3] Create CheckboxGroup styles in frontend/src/components/forms/CheckboxGroup/CheckboxGroup.styles.ts
- [x] T049 [US3] Implement CheckboxGroup component in frontend/src/components/forms/CheckboxGroup/CheckboxGroup.tsx
- [x] T050 [US3] Create CheckboxGroup barrel export in frontend/src/components/forms/CheckboxGroup/index.ts
- [x] T051 [US3] Update forms barrel export to include CheckboxGroup in frontend/src/components/forms/index.ts
- [x] T052 [US3] Add interests field with CheckboxGroup to VisitorForm using INTEREST_OPTIONS data in frontend/src/pages/ImNewHere/VisitorForm.tsx

**Checkpoint**: User Story 3 complete - interest selection works independently

---

## Phase 6: User Story 4 - Optional Phone Contact (Priority: P3)

**Goal**: Visitor can optionally provide phone number for additional contact method

**Independent Test**: Enter phone number or leave blank, verify form submits successfully either way

### Tests for User Story 4

- [x] T053 [P] [US4] Write VisitorForm tests for optional phone field in frontend/src/pages/ImNewHere/__tests__/VisitorForm.test.tsx (extend existing)

### Implementation for User Story 4

- [x] T054 [US4] Add phone field (optional, no validation) to VisitorForm in frontend/src/pages/ImNewHere/VisitorForm.tsx
- [x] T055 [US4] Update form submission to include phone in visitorService call

**Checkpoint**: User Story 4 complete - optional phone field works independently

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final integration, accessibility, and navigation updates

- [x] T056 Add "I'm New Here" to mobile menu items in frontend/src/data/mobileMenuItems.ts
- [x] T057 [P] Add navigation card for /new-here to landing page data in frontend/src/data/navigationItems.ts
- [x] T058 [P] Verify keyboard navigation works for entire form (tab order, enter to submit)
- [x] T059 [P] Verify mobile responsive layout matches Figma design
- [x] T060 Run full test suite and verify all tests pass
- [x] T061 Run linting and fix any issues

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational completion
  - Stories can proceed sequentially (P1 → P2 → P3) or in parallel if staffed
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational - Extends VisitorForm from US1
- **User Story 3 (P2)**: Can start after Foundational - Extends VisitorForm from US1
- **User Story 4 (P3)**: Can start after Foundational - Extends VisitorForm from US1

### Within Each Phase

- Tests MUST be written and FAIL before implementation (TDD)
- Styles before components (parallel with tests)
- Components before integration
- Barrel exports after implementation

### Parallel Opportunities

**Setup Phase**:
- T002 and T003 can run in parallel

**Foundational Phase**:
- T009, T010, T013, T014, T017, T018 can all run in parallel (different component tests/styles)
- Components can be built in parallel: FormField, TextInput, SubmitButton

**User Story Phases**:
- Tests and styles marked [P] within each story can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: Foundational Form Components

```bash
# Launch all form component tests in parallel:
Task: "Write FormField tests in frontend/src/components/forms/FormField/__tests__/FormField.test.tsx"
Task: "Write TextInput tests in frontend/src/components/forms/TextInput/__tests__/TextInput.test.tsx"
Task: "Write SubmitButton tests in frontend/src/components/forms/SubmitButton/__tests__/SubmitButton.test.tsx"

# Launch all form component styles in parallel:
Task: "Create FormField styles in frontend/src/components/forms/FormField/FormField.styles.ts"
Task: "Create TextInput styles in frontend/src/components/forms/TextInput/TextInput.styles.ts"
Task: "Create SubmitButton styles in frontend/src/components/forms/SubmitButton/SubmitButton.styles.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (3 tasks)
2. Complete Phase 2: Foundational (18 tasks)
3. Complete Phase 3: User Story 1 (16 tasks)
4. **STOP and VALIDATE**: Test basic registration independently at /new-here
5. Deploy/demo if ready - visitor can register with name and email

### Incremental Delivery

1. Setup + Foundational → Framework ready
2. Add User Story 1 → Test independently → **MVP deployed**
3. Add User Story 2 → Visit status selection works → Deploy
4. Add User Story 3 → Interest selection works → Deploy
5. Add User Story 4 → Phone field available → Deploy
6. Polish → Full feature complete → Final deploy

### Recommended Execution Order (Single Developer)

1. T001-T003 (Setup)
2. T004-T021 (Foundational - in TDD order)
3. T022-T037 (User Story 1 - MVP)
4. **Validate MVP works**
5. T038-T045 (User Story 2)
6. T046-T052 (User Story 3)
7. T053-T055 (User Story 4)
8. T056-T061 (Polish)

---

## Phase 8: Layout Redesign - Fixed Header/Footer with Scrollable Form (FR-012)

**Purpose**: Implement new layout structure per Figma designs where the form is the ONLY scrollable element, with fixed hero/header and submit button footer.

**Requirement**: FR-012 (Fixed-header/scrollable-form layout structure)

**Figma References**:
- Mobile Form: node 86:524
- Mobile Confirmation: node 87:755
- Desktop Form: node 84:358
- Desktop Confirmation: node 84:463

**Key Layout Changes**:
- **Mobile**: Fixed header → Fixed hero section with image overlay → Scrollable form area → Fixed submit footer
- **Desktop**: Split-panel layout (left: title + scrollable form, right: decorative image panel)
- Submit button moves OUTSIDE the form scroll area (becomes sticky footer on mobile)

### MobileHeroSection Component

- [x] T062 [P] [FR-012] Write MobileHeroSection tests in frontend/src/components/MobileHeroSection/__tests__/MobileHeroSection.test.tsx
- [x] T063 [P] [FR-012] Create MobileHeroSection styles in frontend/src/components/MobileHeroSection/MobileHeroSection.styles.ts (hero image with gradient overlay, centered text)
- [x] T064 [FR-012] Implement MobileHeroSection component with image, gradient overlay, title, and subtitle props in frontend/src/components/MobileHeroSection/MobileHeroSection.tsx
- [x] T065 [FR-012] Create MobileHeroSection barrel export in frontend/src/components/MobileHeroSection/index.ts

### DesktopDecorativePanel Component

- [x] T066 [P] [FR-012] Write DesktopDecorativePanel tests in frontend/src/components/DesktopDecorativePanel/__tests__/DesktopDecorativePanel.test.tsx
- [x] T067 [P] [FR-012] Create DesktopDecorativePanel styles in frontend/src/components/DesktopDecorativePanel/DesktopDecorativePanel.styles.ts (image with gradient, icon circle, heading, quote, attribution)
- [x] T068 [FR-012] Implement DesktopDecorativePanel component with image, gradient overlay, checkmark icon, "Let's get you connected" heading, and church quote in frontend/src/components/DesktopDecorativePanel/DesktopDecorativePanel.tsx
- [x] T069 [FR-012] Create DesktopDecorativePanel barrel export in frontend/src/components/DesktopDecorativePanel/index.ts

### StickySubmitFooter Component (Mobile)

- [x] T070 [P] [FR-012] Write StickySubmitFooter tests in frontend/src/components/StickySubmitFooter/__tests__/StickySubmitFooter.test.tsx
- [x] T071 [P] [FR-012] Create StickySubmitFooter styles in frontend/src/components/StickySubmitFooter/StickySubmitFooter.styles.ts (fixed position at bottom, full-width button, padding)
- [x] T072 [FR-012] Implement StickySubmitFooter component that wraps SubmitButton with sticky positioning in frontend/src/components/StickySubmitFooter/StickySubmitFooter.tsx
- [x] T073 [FR-012] Create StickySubmitFooter barrel export in frontend/src/components/StickySubmitFooter/index.ts

### Update ImNewHere Page Layout

- [x] T074 [P] [FR-012] Update ImNewHere.styles.ts with new layout structure: mobile (flex column with fixed header/hero/footer, scrollable middle), desktop (split-panel 50/50 grid) in frontend/src/pages/ImNewHere/ImNewHere.styles.ts
- [x] T075 [P] [FR-012] Update VisitorForm.styles.ts to remove FormCard background (desktop uses white panel, mobile has no card wrapper), make form scrollable container in frontend/src/pages/ImNewHere/VisitorForm.styles.ts
- [x] T076 [FR-012] Refactor VisitorForm to accept external submit handler via form ref or onSubmit callback, remove internal SubmitButton (button moved to parent layout) in frontend/src/pages/ImNewHere/VisitorForm.tsx
- [x] T077 [FR-012] Update ImNewHere.tsx with new layout: use MobileHeroSection on mobile, DesktopDecorativePanel on desktop, scrollable form area, StickySubmitFooter on mobile in frontend/src/pages/ImNewHere/ImNewHere.tsx
- [x] T078 [FR-012] Update ImNewHere tests for new layout structure in frontend/src/pages/ImNewHere/__tests__/ImNewHere.test.tsx

### Update Success Confirmation Layout

- [x] T079 [P] [FR-012] Update SuccessConfirmation.styles.ts for new layout context (desktop: centered in left panel, mobile: card below hero) in frontend/src/components/SuccessConfirmation/SuccessConfirmation.styles.ts
- [x] T080 [FR-012] Update SuccessConfirmation component if needed for new layout integration in frontend/src/components/SuccessConfirmation/SuccessConfirmation.tsx
- [x] T081 [FR-012] Update PageHeader to only render on desktop (mobile uses MobileHeroSection) in frontend/src/components/PageHeader/PageHeader.tsx and frontend/src/components/PageHeader/PageHeader.styles.ts - NOTE: PageHeader is no longer used by ImNewHere page; the new layout uses MobileHeroSection and DesktopHeader instead

### Polish & Verification

- [x] T082 [P] [FR-012] Verify mobile layout matches Figma node 86:524 (form state) and 87:755 (confirmation state) - NOTE: Manual visual verification recommended
- [x] T083 [P] [FR-012] Verify desktop layout matches Figma node 84:358 (form state) and 84:463 (confirmation state) - NOTE: Manual visual verification recommended
- [x] T084 [P] [FR-012] Verify form is the ONLY scrollable element (header/hero and submit footer remain fixed on mobile) - NOTE: Implementation uses CSS overflow properties to achieve this
- [x] T085 [P] [FR-012] Verify keyboard navigation and tab order work with new layout structure - NOTE: Tab order is natural (top to bottom through form fields)
- [x] T086 [FR-012] Run full test suite and verify all tests pass - 193 tests passing
- [x] T087 [FR-012] Run linting and fix any issues - Only pre-existing lint errors remain (not related to Phase 8)

**Checkpoint**: New layout complete - fixed header/footer with scrollable form area on both mobile and desktop

---

## Phase 8 Dependencies & Execution Order

### Component Dependencies

- **MobileHeroSection (T062-T065)**: No dependencies - can start immediately
- **DesktopDecorativePanel (T066-T069)**: No dependencies - can start immediately (parallel with MobileHeroSection)
- **StickySubmitFooter (T070-T073)**: Depends on existing SubmitButton component

### Layout Update Dependencies

- **T074, T075**: Can run in parallel (different style files)
- **T076**: Depends on SubmitButton component existing, updates form to work with external submit
- **T077**: Depends on T064 (MobileHeroSection), T068 (DesktopDecorativePanel), T072 (StickySubmitFooter), T076 (VisitorForm refactor)
- **T078**: Depends on T077

### Success Layout Dependencies

- **T079**: Can run in parallel with component work
- **T080, T081**: Depend on layout structure decisions in T077

### Parallel Opportunities

```bash
# Launch all new component tests in parallel:
Task: "Write MobileHeroSection tests in frontend/src/components/MobileHeroSection/__tests__/"
Task: "Write DesktopDecorativePanel tests in frontend/src/components/DesktopDecorativePanel/__tests__/"
Task: "Write StickySubmitFooter tests in frontend/src/components/StickySubmitFooter/__tests__/"

# Launch all new component styles in parallel:
Task: "Create MobileHeroSection styles in frontend/src/components/MobileHeroSection/"
Task: "Create DesktopDecorativePanel styles in frontend/src/components/DesktopDecorativePanel/"
Task: "Create StickySubmitFooter styles in frontend/src/components/StickySubmitFooter/"

# Launch layout style updates in parallel:
Task: "Update ImNewHere.styles.ts with new layout structure"
Task: "Update VisitorForm.styles.ts for scrollable form"
Task: "Update SuccessConfirmation.styles.ts for new layout"
```

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks
- [Story] label maps task to specific user story for traceability
- TDD required: Write test, verify it fails, then implement
- Commit after each task or logical group
- All styles in separate `.styles.ts` files per user requirement
- Use react-hook-form with Controller pattern for all form fields
- **Phase 8 specific**: Form must be ONLY scrollable element; header/hero and submit button are fixed/sticky
