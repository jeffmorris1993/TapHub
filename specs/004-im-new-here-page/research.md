# Research: I'm New Here Page

**Feature**: 004-im-new-here-page
**Date**: 2026-01-30

## 1. react-hook-form Integration with Emotion

### Decision
Use react-hook-form v7 with `Controller` component for Emotion styled components, leveraging `register` for native inputs and `Controller` for custom components.

### Rationale
- react-hook-form provides uncontrolled form management with minimal re-renders
- `Controller` wrapper enables integration with any UI library including Emotion styled components
- Built-in validation with native HTML5 validation + custom validation rules
- TypeScript support with `useForm<FormData>` generic typing
- Small bundle size (~9KB) compared to alternatives

### Alternatives Considered
| Option | Rejected Because |
|--------|------------------|
| Formik | Larger bundle, more boilerplate, uses controlled components (more re-renders) |
| React Final Form | Less active maintenance, smaller community |
| Native useState | Manual validation, no form state management, more code |

### Integration Pattern
```typescript
// With Emotion styled input
import { useForm, Controller } from 'react-hook-form';
import { StyledInput } from './TextInput.styles';

const { control, handleSubmit, formState: { errors } } = useForm<VisitorFormData>();

<Controller
  name="email"
  control={control}
  rules={{ required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }}
  render={({ field }) => (
    <StyledInput {...field} hasError={!!errors.email} />
  )}
/>
```

## 2. Mocked API Architecture

### Decision
Create an `apiClient` module with environment-based switching between mock and real implementations using a simple flag.

### Rationale
- Single point of change when backend is ready
- Mock implementation returns Promises to match real API behavior
- localStorage persistence in mock mode for MVP demo purposes
- Type-safe response contracts ensure consistent structure
- No runtime overhead when switching to real API

### Architecture Pattern
```typescript
// services/api/apiClient.ts
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== 'false';

export const apiClient = {
  post: async <T>(url: string, data: unknown): Promise<ApiResponse<T>> => {
    if (USE_MOCK_API) {
      return mockPost<T>(url, data);
    }
    return axios.post<ApiResponse<T>>(url, data).then(res => res.data);
  }
};

// Mock implementation stores to localStorage
const mockPost = async <T>(url: string, data: unknown): Promise<ApiResponse<T>> => {
  await delay(300); // Simulate network latency

  if (url === '/api/v1/visitors') {
    const visitor = { ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
    const existing = JSON.parse(localStorage.getItem('visitors') || '[]');
    localStorage.setItem('visitors', JSON.stringify([...existing, visitor]));
    return { data: visitor as T, error: null, meta: { timestamp: new Date().toISOString() } };
  }

  throw new Error(`Unknown mock endpoint: ${url}`);
};
```

### Alternatives Considered
| Option | Rejected Because |
|--------|------------------|
| MSW (Mock Service Worker) | Overkill for MVP, adds complexity, requires service worker setup |
| JSON Server | Requires separate process, external dependency |
| Hardcoded responses only | No persistence, can't demo submission list later |

## 3. Reusable Form Components Design

### Decision
Create atomic form components that work standalone and with react-hook-form via `Controller` or `register`.

### Component Inventory

| Component | Purpose | Props |
|-----------|---------|-------|
| `FormField` | Label + input wrapper with error display | label, error, required, children |
| `TextInput` | Text/email/tel input | type, placeholder, hasError, ...input props |
| `RadioGroup` | Mutually exclusive options (button style) | name, options, value, onChange, error |
| `CheckboxGroup` | Multi-select checkboxes | name, options, values, onChange |
| `SubmitButton` | Form submit with loading state | children, isLoading, disabled |

### Design Principles
1. **Composition over configuration**: `FormField` wraps any input type
2. **Controlled externally**: Components receive value/onChange, react-hook-form controls state
3. **Accessibility built-in**: Labels linked to inputs, ARIA attributes, focus states
4. **Error states visual**: Border color, error message display via FormField
5. **Theme integration**: All styles use Emotion theme tokens

### Usage Example
```typescript
<FormField label="Email" required error={errors.email?.message}>
  <Controller
    name="email"
    control={control}
    render={({ field }) => (
      <TextInput type="email" placeholder="your.email@example.com" {...field} hasError={!!errors.email} />
    )}
  />
</FormField>
```

## 4. Testing Strategy (TDD)

### Decision
Follow red-green-refactor cycle with co-located tests using Vitest + React Testing Library.

### Test Categories

| Category | Location | What to Test |
|----------|----------|--------------|
| Unit | `components/forms/*/__tests__/` | Component rendering, props, events |
| Integration | `pages/ImNewHere/__tests__/` | Form submission flow, validation |
| Service | `services/__tests__/` | API calls, mock responses, error handling |

### Test Patterns

**Component Tests**:
```typescript
describe('TextInput', () => {
  it('renders with placeholder', () => {
    render(<TextInput placeholder="Enter name" />);
    expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument();
  });

  it('shows error state styling when hasError is true', () => {
    const { container } = render(<TextInput hasError />);
    expect(container.firstChild).toHaveStyle({ borderColor: expect.stringContaining('error') });
  });

  it('calls onChange when user types', async () => {
    const handleChange = vi.fn();
    render(<TextInput onChange={handleChange} />);
    await userEvent.type(screen.getByRole('textbox'), 'John');
    expect(handleChange).toHaveBeenCalled();
  });
});
```

**Form Integration Tests**:
```typescript
describe('VisitorForm', () => {
  it('shows validation errors when submitting empty required fields', async () => {
    render(<VisitorForm />);
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
  });

  it('submits successfully with valid data', async () => {
    const mockSubmit = vi.fn();
    render(<VisitorForm onSubmit={mockSubmit} />);

    await userEvent.type(screen.getByLabelText(/your name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    await userEvent.click(screen.getByText(/yes, first time/i));
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(mockSubmit).toHaveBeenCalledWith(expect.objectContaining({
      name: 'John Doe',
      email: 'john@example.com',
      isFirstTime: true
    })));
  });
});
```

## 5. Styling Architecture

### Decision
Separate `.styles.ts` files per component using Emotion `styled` with theme access.

### Rationale
- Matches existing codebase pattern (Header.styles.ts, MobileMenu.styles.ts, etc.)
- User explicitly requested style separation from components
- Enables style reuse and easier maintenance
- Theme tokens ensure visual consistency

### Style File Pattern
```typescript
// TextInput.styles.ts
import styled from '@emotion/styled';

interface StyledInputProps {
  hasError?: boolean;
}

export const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: 2px solid ${({ theme, hasError }) =>
    hasError ? theme.colors.error : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.body};
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme, hasError }) =>
      hasError ? theme.colors.error : theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;
```

## 6. Form Submission UX

### Decision
Show inline validation on blur, loading state during submission, and success confirmation message.

### Flow
1. **Validation**: On blur for individual fields, on submit for all fields
2. **Submit**: Button shows loading spinner, form disabled
3. **Success**: Replace form with confirmation message + "Submit another" option
4. **Error**: Toast or inline error message with retry capability

### Confirmation Design (per Figma)
After successful submission, show:
- Success icon (CheckCircle from lucide-react)
- "Thank you for connecting with us!"
- "We'll be in touch soon."
- Button to return to home or submit another

## 7. Accessibility Requirements

### Decision
WCAG 2.1 AA compliance with keyboard navigation, screen reader support, and focus management.

### Checklist
- [x] All inputs have associated labels (htmlFor/id linkage)
- [x] Error messages linked via aria-describedby
- [x] Required fields marked with aria-required
- [x] Form validation errors announced to screen readers
- [x] Submit button disabled state has aria-disabled
- [x] Tab order follows visual order
- [x] Focus visible on all interactive elements
- [x] Color contrast meets 4.5:1 ratio (using theme colors)
- [x] Touch targets minimum 44x44px

## 8. Route Configuration

### Decision
Add `/new-here` route to React Router configuration.

### Implementation
```typescript
// App.tsx
import { ImNewHerePage } from './pages/ImNewHere';

<Routes>
  <Route path="/" element={<PublicLanding />} />
  <Route path="/new-here" element={<ImNewHerePage />} />
</Routes>
```

### Navigation
- Add route to mobile menu items (mobileMenuItems.ts)
- Card on landing page links to /new-here

---

**All NEEDS CLARIFICATION items resolved. Ready for Phase 1: Design & Contracts.**
