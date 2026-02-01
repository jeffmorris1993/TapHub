# Implementation Plan: I'm New Here Page

**Branch**: `004-im-new-here-page` | **Date**: 2026-01-30 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-im-new-here-page/spec.md`

## Summary

Create a visitor registration page ("I'm New Here") for Nehemiah's Temple church. The page allows new visitors to submit their contact information (name, email, optional phone), indicate if they're a first-time visitor, and select ministry interests. The implementation uses react-hook-form for form management, with a mocked API service layer designed for easy backend integration. Reusable form components will be created for future form reuse across the application. All development follows TDD with styles separated from components.

## Technical Context

**Language/Version**: TypeScript 5.9.3
**Primary Dependencies**: React 19, React Router v7, Emotion 11, react-hook-form, lucide-react
**Storage**: Browser localStorage (MVP), mocked API calls for future backend integration
**Testing**: Vitest + React Testing Library (TDD)
**Target Platform**: Web (mobile-first responsive)
**Project Type**: Web application (frontend only for this feature)
**Performance Goals**: Page load < 2 seconds, form completion < 2 minutes
**Constraints**: WCAG 2.1 AA accessibility, mobile-first design, keyboard navigation support
**Scale/Scope**: Single page with form, 6 reusable form components + 3 layout components (Phase 8)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Test-Driven Development | ✅ PASS | Tests written first for all components and services |
| II. Compelling User Experience | ✅ PASS | Mobile-first, <2s load, inline validation, WCAG 2.1 AA |
| III. Error Handling & Logging | ✅ PASS | Form validation errors, submission error handling, console logging for MVP |
| IV. Security & Privacy First | ✅ PASS | No sensitive data stored, input sanitization, frontend-only MVP |
| V. Simplicity & Pragmatism | ✅ PASS | Reusable components, no over-engineering, mocked API for easy backend swap |

**Technology Stack Compliance**:
- ✅ TypeScript 5+ with strict mode
- ✅ React 18+ (using React 19)
- ✅ Emotion 11 (CSS-in-JS)
- ✅ Vitest + React Testing Library
- ✅ Styles separated from components (per user requirement)

**Code Quality Standards**:
- ✅ Strict TypeScript (no `any` types)
- ✅ ESLint + Prettier
- ✅ Co-located `__tests__` folders
- ✅ JSDoc for public functions

## Project Structure

### Documentation (this feature)

```text
specs/004-im-new-here-page/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (mocked API contracts)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
frontend/src/
├── components/
│   ├── forms/                          # NEW: Reusable form components
│   │   ├── FormField/
│   │   │   ├── __tests__/
│   │   │   │   └── FormField.test.tsx
│   │   │   ├── FormField.tsx
│   │   │   ├── FormField.styles.ts
│   │   │   └── index.ts
│   │   ├── TextInput/
│   │   │   ├── __tests__/
│   │   │   │   └── TextInput.test.tsx
│   │   │   ├── TextInput.tsx
│   │   │   ├── TextInput.styles.ts
│   │   │   └── index.ts
│   │   ├── RadioGroup/
│   │   │   ├── __tests__/
│   │   │   │   └── RadioGroup.test.tsx
│   │   │   ├── RadioGroup.tsx
│   │   │   ├── RadioGroup.styles.ts
│   │   │   └── index.ts
│   │   ├── CheckboxGroup/
│   │   │   ├── __tests__/
│   │   │   │   └── CheckboxGroup.test.tsx
│   │   │   ├── CheckboxGroup.tsx
│   │   │   ├── CheckboxGroup.styles.ts
│   │   │   └── index.ts
│   │   ├── SubmitButton/
│   │   │   ├── __tests__/
│   │   │   │   └── SubmitButton.test.tsx
│   │   │   ├── SubmitButton.tsx
│   │   │   ├── SubmitButton.styles.ts
│   │   │   └── index.ts
│   │   └── index.ts                    # Barrel export
│   ├── PageHeader/                     # NEW: Reusable page header
│   │   ├── __tests__/
│   │   │   └── PageHeader.test.tsx
│   │   ├── PageHeader.tsx
│   │   ├── PageHeader.styles.ts
│   │   └── index.ts
│   ├── SuccessConfirmation/            # NEW: Success confirmation card
│   │   ├── __tests__/
│   │   │   └── SuccessConfirmation.test.tsx
│   │   ├── SuccessConfirmation.tsx
│   │   ├── SuccessConfirmation.styles.ts
│   │   └── index.ts
│   ├── MobileHeroSection/              # NEW (Phase 8): Hero with image overlay for mobile
│   │   ├── __tests__/
│   │   │   └── MobileHeroSection.test.tsx
│   │   ├── MobileHeroSection.tsx
│   │   ├── MobileHeroSection.styles.ts
│   │   └── index.ts
│   ├── DesktopDecorativePanel/         # NEW (Phase 8): Right-side decorative panel for desktop
│   │   ├── __tests__/
│   │   │   └── DesktopDecorativePanel.test.tsx
│   │   ├── DesktopDecorativePanel.tsx
│   │   ├── DesktopDecorativePanel.styles.ts
│   │   └── index.ts
│   └── StickySubmitFooter/             # NEW (Phase 8): Fixed submit button footer for mobile
│       ├── __tests__/
│       │   └── StickySubmitFooter.test.tsx
│       ├── StickySubmitFooter.tsx
│       ├── StickySubmitFooter.styles.ts
│       └── index.ts
├── pages/
│   └── ImNewHere/                      # NEW: I'm New Here page
│       ├── __tests__/
│       │   └── ImNewHere.test.tsx
│       ├── ImNewHere.tsx
│       ├── ImNewHere.styles.ts
│       ├── VisitorForm.tsx             # Form logic with react-hook-form
│       ├── VisitorForm.styles.ts
│       └── index.ts
├── services/
│   ├── __tests__/
│   │   └── visitorService.test.ts      # NEW: Service tests
│   ├── api/                            # NEW: API abstraction layer
│   │   ├── __tests__/
│   │   │   └── apiClient.test.ts
│   │   ├── apiClient.ts                # Axios wrapper with mocking support
│   │   └── index.ts
│   └── visitorService.ts               # NEW: Visitor registration service
├── types/
│   └── visitor.ts                      # NEW: Visitor-related types
└── data/
    └── interests.ts                    # NEW: Interest options data
```

**Structure Decision**: Following existing codebase patterns:
- Components in `components/` with co-located `__tests__/` folders
- Styles in separate `.styles.ts` files (per user requirement + existing pattern)
- Services in `services/` with API abstraction layer for mocking
- Pages in `pages/` with dedicated folder per page
- Types in `types/` directory
- Static data in `data/` directory

## Complexity Tracking

No constitutional violations. All solutions follow simplicity principle:
- Reusable form components serve immediate need and future forms
- Mocked API layer is minimal abstraction for easy backend swap
- No Redux or complex state management (react-hook-form handles form state)
- localStorage for MVP is simplest persistence option

## Post-Design Constitution Re-Check

*Re-evaluated after Phase 1 design artifacts completed.*

| Principle | Status | Verification |
|-----------|--------|--------------|
| I. TDD | ✅ PASS | Test structure defined in quickstart.md, co-located __tests__ folders in project structure |
| II. UX | ✅ PASS | Mobile-first design, inline validation, success confirmation flow defined in research.md |
| III. Error Handling | ✅ PASS | API error response structure in contracts, form validation patterns in research.md |
| IV. Security | ✅ PASS | No sensitive data, input sanitization via react-hook-form validation |
| V. Simplicity | ✅ PASS | Minimal abstractions, clear component hierarchy, localStorage for MVP |

## Generated Artifacts

| Artifact | Path | Description |
|----------|------|-------------|
| Plan | `specs/004-im-new-here-page/plan.md` | This file |
| Research | `specs/004-im-new-here-page/research.md` | Technology decisions and patterns |
| Data Model | `specs/004-im-new-here-page/data-model.md` | Entity definitions and types |
| API Contract | `specs/004-im-new-here-page/contracts/visitor-api.yaml` | OpenAPI 3.0 specification |
| Quickstart | `specs/004-im-new-here-page/quickstart.md` | Development setup and TDD workflow |

## Next Steps

Run `/speckit.tasks` to generate implementation tasks from this plan.
