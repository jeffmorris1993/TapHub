<!--
  ============================================================================
  SYNC IMPACT REPORT
  ============================================================================
  Version Change: 1.0.0 → 1.0.1

  Modified Principles:
  - Corrected domain from nehemiahstemple.org to nehtemple.org
  - Clarified test location: __tests__ folders co-located with source code
  - Confirmed Vitest for React TypeScript testing

  Added Sections:
  - None

  Removed Sections:
  - None

  Templates Requiring Updates:
  ✅ .specify/templates/plan-template.md - Test structure guidance updated
  ✅ .specify/templates/spec-template.md - No changes needed
  ✅ .specify/templates/tasks-template.md - Test path conventions updated

  Follow-up TODOs:
  - None
  ============================================================================
-->

# TapHub Constitution

## Core Principles

### I. Test-Driven Development (TDD)

**Principle**: All code MUST be developed using Test-Driven Development methodology. Tests are written FIRST, verified to FAIL, then implementation follows to make them pass.

**Rules**:
- Unit tests MUST be written before implementation code
- Integration tests MUST be written for all API endpoints and external service interactions
- Tests MUST fail initially (Red phase) before implementation begins
- Implementation proceeds only after test failure is confirmed (Green phase)
- Refactoring occurs only after tests pass (Refactor phase)
- No code ships without corresponding tests
- Test coverage MUST be maintained above 80% for all new code

**Rationale**: TDD ensures code correctness from the start, provides living documentation, enables confident refactoring, and catches regressions early. For a church communication platform handling sensitive event data and approval workflows, reliability is non-negotiable.

---

### II. Compelling User Experience

**Principle**: User experience is paramount. The system MUST provide intuitive, fast, and delightful interactions for both public visitors and admin users.

**Rules**:
- Mobile-first design: All interfaces optimized for tap-to-engage via NFC/QR
- Performance targets MUST be met:
  - Public Hub: Initial load < 2 seconds on 3G
  - Admin Hub: API response times < 200ms (p95)
  - Background jobs: Calendar sync within 10 seconds of approval
- Error messages MUST be user-friendly and actionable
- Loading states MUST provide clear feedback
- Forms MUST validate inline with helpful guidance
- Accessibility: WCAG 2.1 AA compliance required
- Visual consistency: Follow Figma designs exactly for initial implementation

**Rationale**: Church members and visitors expect a seamless experience. Slow or confusing interfaces create barriers to engagement. The platform's success depends on adoption, which requires excellence in UX.

---

### III. Comprehensive Error Handling and Logging

**Principle**: All error conditions MUST be anticipated, handled gracefully, and logged comprehensively. The system MUST never leave users in undefined states.

**Rules**:
- All external API calls (Google Calendar, SendGrid, Google OAuth) MUST have error handling
- Database operations MUST be wrapped in try-catch with rollback mechanisms
- All errors MUST be logged with:
  - Timestamp
  - User context (if applicable)
  - Error type and message
  - Stack trace
  - Request ID for tracing
- User-facing errors MUST be friendly; technical details logged server-side only
- Critical errors (auth failures, data corruption) MUST trigger alerts
- Use GCP Cloud Logging and Error Reporting for centralized monitoring
- Implement structured logging (JSON format) for easy parsing
- Rate limiting errors MUST be handled with exponential backoff

**Rationale**: Church leadership relies on this platform for weekly communication. Silent failures or cryptic errors undermine trust. Comprehensive logging enables rapid diagnosis and resolution, maintaining platform reliability.

---

### IV. Security and Privacy First

**Principle**: Security and privacy MUST be built into every layer. User data protection is a moral and legal obligation.

**Rules**:
- Authentication: Google Workspace SSO ONLY (no password storage)
- Authorization: Role-Based Access Control (RBAC) enforced at API layer
  - Pastors: Full approve/reject authority
  - Ministry Leaders: Create/edit/submit for own ministry
  - Volunteers: View-only access
- Email domain restriction: `@nehtemple.org` enforced server-side
- Secrets management: ALL credentials stored in GCP Secret Manager
- Database: Private IP only (no public access), encrypted at rest
- API: HTTPS only, rate limiting (100 req/min per IP)
- Input validation: All user inputs sanitized to prevent XSS, SQL injection
- CORS: Restricted to approved domains only
- Audit logging: All approval actions logged with user ID and timestamp
- GDPR compliance: User data deletion capability required

**Rationale**: Churches handle sensitive personal information (emails, phone numbers, prayer requests). Security breaches damage trust irreparably. Defense-in-depth protects both users and the organization.

---

### V. Simplicity and Pragmatism

**Principle**: Solutions MUST be as simple as possible while meeting requirements. Avoid over-engineering and premature optimization.

**Rules**:
- Architecture: Modular monolith preferred over microservices for single-church use case
- Background jobs: Cloud Tasks preferred over Celery (simpler, serverless, no Redis)
- Database: Start with db-f1-micro, scale only when metrics demand it
- State management: React Context + Hooks sufficient; avoid Redux unless complexity warrants
- No abstractions for single-use cases
- No feature flags or backwards-compatibility for greenfield code
- Delete unused code completely (no commented-out code)
- Write code for 80% use case; handle 20% edge cases only when encountered
- YAGNI (You Aren't Gonna Need It): Build what's needed NOW, not what MIGHT be needed

**Rationale**: Complexity is the enemy of maintainability. A small church platform doesn't need enterprise patterns. Simple code is easier to understand, test, and debug. Over-engineering wastes time and introduces unnecessary failure points.

---

## Technical Standards

### Technology Stack (Non-Negotiable)

**Backend**:
- Language: Python 3.11+
- Framework: FastAPI 0.104+
- ORM: SQLAlchemy 2.0
- Database: PostgreSQL 15 (Cloud SQL)
- Testing: pytest + pytest-asyncio

**Frontend**:
- Language: TypeScript 5+
- Framework: React 18+
- Styling: Emotion 11 (CSS-in-JS)
- State: React Context + Hooks
- HTTP: Axios
- Testing: Vitest + React Testing Library

**Infrastructure**:
- Platform: Google Cloud Platform (GCP)
- Compute: Cloud Run (serverless containers)
- Background Jobs: Cloud Tasks
- Storage: Cloud Storage (static files)
- Monitoring: Cloud Logging + Cloud Monitoring
- Secrets: Secret Manager

**Rationale**: GCP provides native Google Workspace integration, cost-effective serverless options, and managed services that reduce operational overhead. The stack is modern, well-supported, and appropriate for the scale.

---

### Code Quality Standards

**Rules**:
- Type hints required for all Python functions
- TypeScript strict mode enabled
- Linting: Ruff (Python), ESLint (TypeScript)
- Formatting: Black (Python), Prettier (TypeScript)
- No `any` types in TypeScript without justification
- Function length: < 50 lines (extract if longer)
- File length: < 500 lines (split if longer)
- Cyclomatic complexity: < 10 per function
- All public functions MUST have docstrings (Python) or JSDoc (TypeScript)
- Commit messages: Conventional Commits format (feat:, fix:, docs:, etc.)

---

### API Design Standards

**Rules**:
- RESTful conventions: GET (read), POST (create), PUT (update), DELETE (delete)
- Versioning: `/api/v1/` prefix for all endpoints
- Response format: JSON with consistent structure:
  ```json
  {
    "data": { ... },
    "error": null,
    "meta": { "timestamp": "ISO8601" }
  }
  ```
- Error responses: HTTP status codes + descriptive messages
- Authentication: Bearer token (JWT) in `Authorization` header
- Pagination: Use `?page=1&limit=20` query params
- Filtering: Use query params (e.g., `?status=approved`)
- Field selection: Support `?fields=id,title` for sparse fieldsets
- Rate limiting: 100 requests/minute per IP

---

## Development Workflow

### Branch Strategy

**Rules**:
- Main branch: `main` (protected, requires PR)
- Feature branches: `###-feature-name` format (e.g., `001-events-crud`)
- Commit frequency: Atomic commits after each logical unit
- PR size: < 400 lines changed (split larger features)
- PR reviews: 1 approval required before merge
- CI checks MUST pass before merge

---

### Test Requirements

**Test Categories** (all required per TDD principle):

1. **Unit Tests**: Test individual functions/methods in isolation
   - Location: `__tests__/` folder co-located with source code
   - Mock all external dependencies
   - Fast execution (< 1ms per test)

2. **Integration Tests**: Test API endpoints and database interactions
   - Location: `__tests__/` folder in relevant module/feature directory
   - Use test database
   - Test full request/response cycle

3. **Contract Tests**: Verify API contracts match specifications
   - Location: `__tests__/` folder at API route level
   - Validate request/response schemas
   - Ensure backwards compatibility

**Test Structure**:
```
# Backend (Python)
backend/src/
├── domains/
│   └── events/
│       ├── __tests__/
│       │   ├── test_events_unit.py
│       │   └── test_events_integration.py
│       ├── models.py
│       └── service.py

# Frontend (React TypeScript - using Vitest)
frontend/src/
├── components/
│   └── EventCard/
│       ├── __tests__/
│       │   └── EventCard.test.tsx
│       └── EventCard.tsx
```

**Test Execution**:
- Backend: `pytest` (discovers all `test_*.py` files)
- Frontend: `vitest` (discovers all `*.test.ts` and `*.test.tsx` files)
- Run before every commit: Unit tests only
- Run before every PR: Full test suite
- CI pipeline MUST run full test suite

---

### Deployment Process

**Environments**:
- **Local**: Docker Compose (PostgreSQL + Redis optional)
- **Staging**: GCP Cloud Run (auto-deploy from `main` branch)
- **Production**: GCP Cloud Run (manual deploy after staging validation)

**Deployment Checklist**:
- [ ] All tests passing
- [ ] Database migrations tested
- [ ] Environment variables configured in Secret Manager
- [ ] Monitoring alerts configured
- [ ] Rollback plan documented
- [ ] Deployment announced to stakeholders

---

## Governance

### Constitution Authority

This constitution supersedes all other development practices. When conflicts arise between this constitution and other guidance, **the constitution prevails**.

### Amendment Process

**Rules**:
1. Proposed amendments MUST be documented in writing
2. Amendments require approval from project maintainer
3. Version number MUST be updated per semantic versioning:
   - **MAJOR**: Backward-incompatible changes (e.g., removing a principle)
   - **MINOR**: New principles or sections added
   - **PATCH**: Clarifications, typo fixes, wording improvements
4. All dependent templates (plan, spec, tasks) MUST be updated to reflect amendments
5. Migration plan MUST be provided for breaking changes

### Compliance Enforcement

**Rules**:
- All PRs MUST be reviewed for constitutional compliance
- CI pipeline MAY include automated compliance checks
- Violations MUST be justified or fixed before merge
- Complexity violations require written justification in plan.md
- Review checklist includes:
  - [ ] TDD followed (tests written first)?
  - [ ] Error handling comprehensive?
  - [ ] Logging statements included?
  - [ ] Security considerations addressed?
  - [ ] Simplicity maintained (no over-engineering)?

### Continuous Improvement

This constitution is a living document. As the project evolves, principles may be refined based on lessons learned. Feedback is encouraged through:
- Retrospectives after major features
- Documentation of pain points
- Proposed amendments via pull requests

---

**Version**: 1.0.1 | **Ratified**: 2026-01-25 | **Last Amended**: 2026-01-25
