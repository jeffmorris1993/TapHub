# Quickstart: I'm New Here Page

**Feature**: 004-im-new-here-page
**Date**: 2026-01-30

## Prerequisites

- Node.js 18+ installed
- Git repository cloned
- On feature branch `004-im-new-here-page`

## Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
npm install react-hook-form
```

### 2. Verify Test Setup

```bash
npm test
```

All existing tests should pass before starting development.

## Development Workflow (TDD)

### Step 1: Types First

Create type definitions before any implementation:

```bash
# Create visitor types file
touch src/types/visitor.ts
```

Write types as defined in `data-model.md`.

### Step 2: Red-Green-Refactor Cycle

For each component/service:

1. **RED**: Write failing test
2. **GREEN**: Write minimum code to pass
3. **REFACTOR**: Improve without changing behavior

### Component Development Order

Follow this order to build dependencies first:

1. **Types & Data** (no tests needed for static data)
   - `src/types/visitor.ts`
   - `src/data/interests.ts`

2. **API Layer** (test mocking behavior)
   - `src/services/api/apiClient.ts`
   - `src/services/api/__tests__/apiClient.test.ts`

3. **Visitor Service** (test API calls)
   - `src/services/visitorService.ts`
   - `src/services/__tests__/visitorService.test.ts`

4. **Form Components** (test rendering, events, accessibility)
   - `src/components/forms/TextInput/`
   - `src/components/forms/FormField/`
   - `src/components/forms/RadioGroup/`
   - `src/components/forms/CheckboxGroup/`
   - `src/components/forms/SubmitButton/`

5. **Page Components** (test rendering)
   - `src/components/PageHeader/`
   - `src/components/Footer/`

6. **Page & Form Integration** (test full flow)
   - `src/pages/ImNewHere/VisitorForm.tsx`
   - `src/pages/ImNewHere/ImNewHere.tsx`

7. **Route & Navigation** (integration test)
   - Update `src/App.tsx`
   - Update `src/data/mobileMenuItems.ts`

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (recommended during development)
npm run test:watch

# Run tests for a specific file
npm test -- TextInput

# Run with coverage
npm run test:coverage
```

## File Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Component | PascalCase | `TextInput.tsx` |
| Styles | Component.styles.ts | `TextInput.styles.ts` |
| Test | Component.test.tsx | `TextInput.test.tsx` |
| Service | camelCase | `visitorService.ts` |
| Types | camelCase | `visitor.ts` |
| Data | camelCase | `interests.ts` |

## Test File Template

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/theme/theme';
import { ComponentName } from './ComponentName';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {ui}
    </ThemeProvider>
  );
};

describe('ComponentName', () => {
  it('renders correctly', () => {
    renderWithTheme(<ComponentName />);
    // assertions
  });
});
```

## Component Template

```typescript
// ComponentName.tsx
import { FC } from 'react';
import { StyledComponent } from './ComponentName.styles';

interface ComponentNameProps {
  // props
}

/**
 * Brief description of component purpose
 */
export const ComponentName: FC<ComponentNameProps> = (props) => {
  return (
    <StyledComponent>
      {/* content */}
    </StyledComponent>
  );
};
```

## Styles Template

```typescript
// ComponentName.styles.ts
import styled from '@emotion/styled';

export const StyledComponent = styled.div`
  // styles using theme
  padding: ${({ theme }) => theme.spacing.md};
`;
```

## Useful Commands

```bash
# Start dev server
npm run dev

# Type check
npm run type-check

# Lint
npm run lint

# Format
npm run format

# Build for production
npm run build
```

## Local Testing the Feature

1. Start dev server: `npm run dev`
2. Navigate to `http://localhost:3000/new-here`
3. Test form submission
4. Check localStorage for saved data: `localStorage.getItem('visitors')`

## Common Issues

### Tests failing with theme errors
Ensure components are wrapped in `ThemeProvider` in tests.

### react-hook-form type errors
Use generic typing: `useForm<VisitorFormData>()`

### Styles not applying
Check that styled component is imported from `.styles.ts` file, not defined inline.

## Next Steps

After completing implementation:

1. Run full test suite: `npm test`
2. Check coverage: `npm run test:coverage`
3. Run linting: `npm run lint`
4. Build: `npm run build`
5. Create PR for review
