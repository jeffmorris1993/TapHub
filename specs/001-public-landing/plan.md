# Implementation Plan: Public Landing Page

**Branch**: `001-public-landing` | **Date**: 2026-01-25 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-public-landing/spec.md`

## Summary

Build a mobile-first, responsive public landing page that serves as the primary entry point for church visitors arriving via NFC/QR code scan. The page displays church branding, six navigation cards for key actions, service times, and contact information. This frontend-only implementation uses static data files (no API calls needed) and Emotion styled components with a light theme foundation ready for dark mode extension.

## Technical Context

**Language/Version**: TypeScript 5+
**Primary Dependencies**: React 18+, Emotion 11 (styled-components), React Router 6, Vite, Axios (for future API calls)
**Storage**: N/A (static content only for MVP)
**Testing**: Vitest + React Testing Library
**Target Platform**: Modern browsers (Chrome, Safari, Firefox, Edge); mobile-first responsive design
**Project Type**: Web application (frontend only for this feature)
**Performance Goals**: Initial load < 2 seconds on 3G, Lighthouse score 90+
**Constraints**: HTTPS only, WCAG 2.1 Level AA compliance, offline caching for static content
**Scale/Scope**: Single public landing page with 6 navigation cards, responsive 320px-1920px
**Deployment Requirements** (handled by Cloud Run configuration, not in tasks.md):
- NFC/QR code accessibility (FR-013): URL routing handled by deployment domain configuration
- HTTPS enforcement (FR-015): Automatic HTTPS redirect configured in Cloud Load Balancer
- CSP headers (FR-015): Content Security Policy configured in Cloud Run service settings

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### ✅ TDD (Test-Driven Development)
- **Requirement**: Tests written FIRST, verified to FAIL, then implementation
- **Compliance**: Unit tests for components using Vitest, co-located in `__tests__/` folders
- **Status**: PASS - Will write component tests before implementation

### ✅ Compelling User Experience
- **Requirement**: Mobile-first, < 2s load, WCAG 2.1 AA, follows Figma designs
- **Compliance**: Emotion styled-components for mobile-first design, 44px tap targets, semantic HTML
- **Status**: PASS - Aligns with mobile-first and performance targets

### ✅ Error Handling and Logging
- **Requirement**: Graceful error handling, user-friendly messages
- **Compliance**: Error boundaries for React components, fallback UI for failed image loads
- **Status**: PASS - Will implement React Error Boundaries and fallback states

### ✅ Security and Privacy First
- **Requirement**: HTTPS only, CSP headers, privacy-respecting analytics
- **Compliance**: HTTPS enforced at deployment, aggregate analytics only (no PII tracking)
- **Status**: PASS - Deployment configuration will enforce HTTPS

### ✅ Simplicity and Pragmatism
- **Requirement**: React Context + Hooks (no Redux), simple solutions
- **Compliance**: Using React Context for theme, no over-engineering
- **Status**: PASS - Using simple Context API, avoiding unnecessary abstractions

**Gate Result**: ✅ ALL CHECKS PASSED - Proceed to Phase 0

## Project Structure

### Documentation (this feature)

```text
specs/001-public-landing/
├── plan.md              # This file
├── research.md          # Phase 0 output (frontend tooling research)
├── data-model.md        # Phase 1 output (static data structures)
├── quickstart.md        # Phase 1 output (development guide)
├── contracts/           # Phase 1 output (mock API contracts)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
frontend/
├── public/
│   ├── hero-image.jpg          # Church leadership image
│   └── favicon.ico
├── src/
│   ├── pages/
│   │   └── PublicLanding/
│   │       ├── __tests__/
│   │       │   └── PublicLanding.test.tsx
│   │       ├── PublicLanding.tsx
│   │       └── index.ts
│   ├── components/
│   │   ├── Header/
│   │   │   ├── __tests__/
│   │   │   │   └── Header.test.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Header.styles.ts
│   │   │   └── index.ts
│   │   ├── NavigationCard/
│   │   │   ├── __tests__/
│   │   │   │   └── NavigationCard.test.tsx
│   │   │   ├── NavigationCard.tsx
│   │   │   ├── NavigationCard.styles.ts
│   │   │   └── index.ts
│   │   ├── HeroSection/
│   │   │   ├── __tests__/
│   │   │   │   └── HeroSection.test.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── HeroSection.styles.ts
│   │   │   └── index.ts
│   │   ├── ServiceTimes/
│   │   │   ├── __tests__/
│   │   │   │   └── ServiceTimes.test.tsx
│   │   │   ├── ServiceTimes.tsx
│   │   │   ├── ServiceTimes.styles.ts
│   │   │   └── index.ts
│   │   └── ContactInfo/
│   │       ├── __tests__/
│   │       │   └── ContactInfo.test.tsx
│   │       ├── ContactInfo.tsx
│   │       ├── ContactInfo.styles.ts
│   │       └── index.ts
│   ├── theme/
│   │   ├── __tests__/
│   │   │   └── theme.test.ts
│   │   ├── theme.ts              # Light theme (extensible to dark)
│   │   ├── ThemeProvider.tsx     # React Context provider
│   │   └── index.ts
│   ├── hooks/
│   │   ├── __tests__/
│   │   │   ├── useAnalytics.test.ts
│   │   │   └── useOffline.test.ts
│   │   ├── useAnalytics.ts       # Aggregate analytics hook
│   │   ├── useOffline.ts         # Offline detection
│   │   └── index.ts
│   ├── data/
│   │   ├── navigationItems.ts    # Static navigation card data
│   │   ├── serviceTimes.ts       # Static service times data
│   │   ├── contactInfo.ts        # Static contact information
│   │   ├── heroContent.ts        # Static hero section content
│   │   └── index.ts
│   ├── services/
│   │   ├── landingPageService.ts # Service layer for data access
│   │   └── index.ts
│   ├── utils/
│   │   ├── __tests__/
│   │   │   └── accessibility.test.ts
│   │   ├── accessibility.ts      # WCAG helpers
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
└── .env.example
```

**Structure Decision**: Frontend-only structure with co-located tests in `__tests__/` folders per constitution. Using Emotion styled-components pattern with separate `.styles.ts` files for maintainability. Theme system built with React Context to allow future dark mode extension.

## Complexity Tracking

> **No violations detected** - Implementation follows constitution principles

---

**END OF PLAN TEMPLATE - Phase 0 Research Begins Below**

