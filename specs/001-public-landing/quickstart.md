# Quickstart Guide: Public Landing Page

**Feature**: 001-public-landing
**Date**: 2026-01-25
**Prerequisites**: Node.js 18+, npm 9+, Git

## Overview

This guide walks you through setting up the development environment, running the public landing page locally, and executing tests. Follow steps in order for first-time setup.

---

## 1. Prerequisites Check

Verify you have the required tools installed:

```bash
# Check Node.js version (must be 18+)
node --version
# Expected output: v18.x.x or higher

# Check npm version (must be 9+)
npm --version
# Expected output: 9.x.x or higher

# Check Git
git --version
# Expected output: git version 2.x.x
```

**If any tool is missing**:
- **Node.js**: Download from https://nodejs.org/ (LTS version recommended)
- **npm**: Comes with Node.js installation
- **Git**: Download from https://git-scm.com/downloads

---

## 2. Clone Repository

```bash
# Clone the TapHub repository
git clone <repository-url>
cd TapHub

# Checkout the feature branch
git checkout 001-public-landing
```

---

## 3. Install Dependencies

```bash
# Navigate to frontend directory
cd frontend

# Install all dependencies
npm install

# Expected output: Added XXX packages in XXXs
```

**Key Dependencies Installed**:
- React 18+
- TypeScript 5+
- Vite (build tool)
- Emotion 11 (styled-components)
- React Router 6
- Vitest (testing framework)
- React Testing Library

---

## 4. Environment Configuration

Create environment file for local development:

```bash
# Copy example environment file
cp .env.example .env.local

# Edit .env.local with your preferred editor
# For MVP, default values should work fine
```

**`.env.local` Example**:
```bash
# Application
VITE_APP_NAME="Tap Hub"
VITE_API_BASE_URL="http://localhost:8000/api/v1"

# Feature Flags (for future use)
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_OFFLINE_MODE=true

# Environment
NODE_ENV=development
```

**Note**: For MVP (frontend-only), API calls are mocked, so `VITE_API_BASE_URL` is not actively used.

---

## 5. Start Development Server

```bash
# Start Vite development server
npm run dev

# Expected output:
# VITE v5.x.x  ready in XXX ms
#
# ➜  Local:   http://localhost:3000/
# ➜  Network: use --host to expose
```

Open your browser to **http://localhost:3000/** to view the public landing page.

**Development Server Features**:
- Hot Module Replacement (HMR) - Changes reflect instantly
- TypeScript type checking in terminal
- Fast refresh for React components

---

## 6. Verify Page Loads

Once the dev server is running, you should see:

1. **Header**: Church logo "NT", "Nehemiah's Temple", "Tap Hub" subtitle
2. **Hero Section**: Hero image with "Welcome! 👋" heading
3. **Navigation Cards**: Six cards (I'm New Here, Today at Nehemiah, Events & Signups, Kids + Youth Hub, Give, Feedback / Prayer)
4. **Service Times**: Three services listed (Sunday 10:00 AM, Sunday 6:00 PM, Wednesday 7:00 PM)
5. **Contact Info**: Address and phone number

**If page doesn't load**:
- Check terminal for errors
- Verify `npm install` completed successfully
- Check browser console (F12 → Console tab) for errors

---

## 7. Run Tests

The project uses **Vitest** for unit and integration tests following TDD principles.

### Run All Tests

```bash
# Run all tests once
npm run test

# Expected output:
# ✓ src/components/NavigationCard/__tests__/NavigationCard.test.tsx (X tests)
# ✓ src/components/Header/__tests__/Header.test.tsx (X tests)
# ...
# Test Files  X passed (X)
# Tests  X passed (X)
```

### Run Tests in Watch Mode

```bash
# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Press 'a' to run all tests
# Press 'f' to run only failed tests
# Press 'q' to quit
```

### Run Tests with Coverage

```bash
# Generate test coverage report
npm run test:coverage

# Expected output:
# Coverage report generated in coverage/
#
# File                  | % Stmts | % Branch | % Funcs | % Lines
# ----------------------|---------|----------|---------|--------
# All files             |   85.50 |    78.25 |   82.10 |   86.30
```

View detailed coverage report:
```bash
# Open HTML coverage report in browser
open coverage/index.html
```

### Run Specific Test File

```bash
# Run tests for a specific component
npm run test -- NavigationCard

# Run tests matching a pattern
npm run test -- --grep "renders with title"
```

---

## 8. Code Quality Checks

### Linting (ESLint)

```bash
# Check for linting errors
npm run lint

# Auto-fix linting errors where possible
npm run lint:fix
```

### Type Checking (TypeScript)

```bash
# Run TypeScript type checking
npm run type-check

# Expected output: No errors if all types are correct
```

### Format Code (Prettier)

```bash
# Check code formatting
npm run format:check

# Auto-format all files
npm run format
```

---

## 9. Build for Production

```bash
# Create optimized production build
npm run build

# Expected output:
# vite v5.x.x building for production...
# ✓ XXX modules transformed.
# dist/index.html                  X.XX kB
# dist/assets/index-XXXXX.css     XX.XX kB │ gzip: X.XX kB
# dist/assets/index-XXXXX.js     XXX.XX kB │ gzip: XX.XX kB
```

Build output is saved to `frontend/dist/` directory.

### Preview Production Build

```bash
# Serve production build locally
npm run preview

# Expected output:
# ➜  Local:   http://localhost:4173/
```

Open **http://localhost:4173/** to preview the production build.

---

## 10. Common Tasks

### Add a New Component

```bash
# Create component directory structure
mkdir -p src/components/MyComponent/__tests__

# Create files
touch src/components/MyComponent/MyComponent.tsx
touch src/components/MyComponent/MyComponent.styles.ts
touch src/components/MyComponent/__tests__/MyComponent.test.tsx
touch src/components/MyComponent/index.ts
```

**File Template** (`MyComponent.tsx`):
```typescript
import { MyComponentContainer } from './MyComponent.styles';

export interface MyComponentProps {
  title: string;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title }) => {
  return (
    <MyComponentContainer>
      <h1>{title}</h1>
    </MyComponentContainer>
  );
};
```

**Styles Template** (`MyComponent.styles.ts`):
```typescript
import styled from '@emotion/styled';

export const MyComponentContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.surface};
`;
```

**Test Template** (`__tests__/MyComponent.test.tsx`):
```typescript
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/theme';
import { MyComponent } from '../MyComponent';

describe('MyComponent', () => {
  it('renders with title', () => {
    render(
      <ThemeProvider>
        <MyComponent title="Test Title" />
      </ThemeProvider>
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
});
```

**Barrel Export** (`index.ts`):
```typescript
export { MyComponent } from './MyComponent';
export type { MyComponentProps } from './MyComponent';
```

### Test-Driven Development Workflow

1. **Write failing test first**:
   ```bash
   # Create test file
   touch src/components/MyComponent/__tests__/MyComponent.test.tsx

   # Write test that describes desired behavior
   # Run tests - verify it FAILS
   npm run test:watch
   ```

2. **Implement minimum code to pass test**:
   ```bash
   # Create component file
   touch src/components/MyComponent/MyComponent.tsx

   # Write minimum code to make test pass
   # Verify test now PASSES
   ```

3. **Refactor**:
   ```bash
   # Improve code quality while keeping tests green
   # Add styles, extract logic, improve types
   ```

4. **Repeat**: Add next test for new behavior

### Update Mock Data

Edit mock data files in `src/mocks/`:

```bash
# Edit navigation items
code src/mocks/navigationItems.ts

# Edit service times
code src/mocks/serviceTimes.ts

# Edit contact info
code src/mocks/contactInfo.ts
```

Changes will hot-reload automatically if dev server is running.

---

## 11. Troubleshooting

### Port Already in Use

```bash
# Error: Port 3000 is already in use
# Solution: Use a different port
npm run dev -- --port 3001
```

### Module Not Found Errors

```bash
# Error: Cannot find module '@/components/...'
# Solution: Verify tsconfig.json paths configuration
cat tsconfig.json | grep -A 5 "paths"

# Restart TypeScript server in VS Code
# Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### Tests Failing

```bash
# Error: Tests fail after git pull
# Solution: Re-install dependencies
rm -rf node_modules package-lock.json
npm install

# Clear Vitest cache
npm run test -- --clearCache
```

### Styling Not Applying

```bash
# Error: Emotion styles not rendering
# Solution: Verify Vite config has Emotion plugin
cat vite.config.ts | grep -A 10 "jsxImportSource"

# Should see: jsxImportSource: '@emotion/react'
```

### Type Errors in Tests

```bash
# Error: Property 'toBeInTheDocument' does not exist
# Solution: Ensure @testing-library/jest-dom is in test setup
cat src/test/setup.ts

# Should include: import '@testing-library/jest-dom'
```

---

## 12. Next Steps

Once the development environment is working:

1. **Read Documentation**:
   - [spec.md](./spec.md) - Feature specification
   - [plan.md](./plan.md) - Implementation plan
   - [data-model.md](./data-model.md) - Data structures
   - [research.md](./research.md) - Technical decisions

2. **Review Existing Code**:
   - Explore `src/components/` to understand component structure
   - Check `src/theme/` to see theme configuration
   - Look at `src/mocks/` for mock data examples

3. **Start Contributing**:
   - Pick a task from `tasks.md` (once generated via `/speckit.tasks`)
   - Follow TDD workflow: Write test → See it fail → Implement → See it pass
   - Commit changes with descriptive messages

4. **Run Quality Checks Before Committing**:
   ```bash
   # Full pre-commit checklist
   npm run lint
   npm run type-check
   npm run test
   npm run build
   ```

---

## 13. VS Code Recommended Extensions

Install these extensions for the best development experience:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "vitest.explorer",
    "styled-components.vscode-styled-components"
  ]
}
```

Save this as `.vscode/extensions.json` in the repository root.

---

## 14. Development Commands Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run test` | Run all tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate coverage report |
| `npm run lint` | Check for linting errors |
| `npm run lint:fix` | Auto-fix linting errors |
| `npm run type-check` | Run TypeScript type checking |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |

---

## Support

If you encounter issues not covered in this guide:

1. Check [docs/troubleshooting.md](../../docs/troubleshooting.md)
2. Search existing GitHub issues
3. Ask in team chat
4. Create a new GitHub issue with:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Error messages/screenshots
   - Environment info (`node --version`, `npm --version`)
