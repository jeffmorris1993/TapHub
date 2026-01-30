# Research: Public Landing Page (Frontend)

**Feature**: 001-public-landing
**Date**: 2026-01-25
**Focus**: Frontend tooling, Emotion styled-components, Theme system, Offline caching

## Executive Summary

Frontend-only implementation using React 18+ with TypeScript, Emotion for styling, and Vite for build tooling. All decisions prioritize mobile-first performance, accessibility (WCAG 2.1 AA), and maintainability with TDD approach.

---

## 1. Emotion Styled-Components Pattern

**Decision**: Use Emotion 11 with styled-components API (`@emotion/styled`)

**Rationale**:
- **CSS-in-JS**: Type-safe styling with TypeScript
- **Theme support**: Built-in theme context for light/dark mode
- **Performance**: CSS extraction at build time, minimal runtime overhead
- **Developer experience**: Tagged template literals, props-based styling

**Implementation Pattern**:
```typescript
// Component.styles.ts
import styled from '@emotion/styled';

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
  }
`;

// Usage in Component.tsx
import { CardContainer } from './Component.styles';

export const Component = () => <CardContainer>...</CardContainer>;
```

**Alternatives Considered**:
- **Tailwind CSS**: Rejected - Less TypeScript integration, harder to theme dynamically
- **Styled System**: Rejected - Over-engineering for this scope
- **Plain CSS Modules**: Rejected - No theme context, less type safety

---

## 2. Theme System Architecture

**Decision**: React Context + TypeScript theme object

**Theme Structure**:
```typescript
// theme/theme.ts
export const lightTheme = {
  colors: {
    // Brand colors from Figma
    primary: '#8B6F47',        // Church tan/brown
    secondary: '#FFFFFF',
    surface: '#FFFFFF',
    background: '#F5F5F5',

    // Text
    textPrimary: '#1A1A1A',
    textSecondary: '#6B6B6B',
    textOnPrimary: '#FFFFFF',

    // Interactive states
    interactive: '#8B6F47',
    interactiveHover: '#6F5738',
    interactiveActive: '#5A4529',

    // Semantic
    error: '#D32F2F',
    success: '#388E3C',
    warning: '#F57C00',
    info: '#1976D2',
  },

  typography: {
    fontFamily: {
      body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      heading: 'Georgia, "Times New Roman", serif',
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  spacing: {
    xs: '0.25rem',  // 4px
    sm: '0.5rem',   // 8px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem',     // 32px
    '2xl': '3rem',  // 48px
    '3xl': '4rem',  // 64px
  },

  radii: {
    sm: '0.25rem',  // 4px
    md: '0.5rem',   // 8px
    lg: '0.75rem',  // 12px
    full: '9999px',
  },

  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },

  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

export type Theme = typeof lightTheme;

// Future: export const darkTheme: Theme = { ... };
```

**Dark Mode Extension Path**:
```typescript
// Future implementation
const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    surface: '#1E1E1E',
    background: '#121212',
    textPrimary: '#FFFFFF',
    textSecondary: '#B0B0B0',
  },
};

// ThemeProvider.tsx can toggle between themes
const [theme, setTheme] = useState<Theme>(lightTheme);
```

---

## 3. Offline Caching Strategy

**Decision**: Service Worker with Workbox for static content caching

**Rationale**:
- **Progressive Enhancement**: Page works without network after first load
- **Performance**: Instant subsequent loads
- **Vite PWA Plugin**: Zero-config service worker generation

**Implementation**:
```typescript
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: "Nehemiah's Temple Tap Hub",
        short_name: 'Tap Hub',
        theme_color: '#8B6F47',
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
        ],
      },
    }),
  ],
});
```

**Offline Detection Hook**:
```typescript
// hooks/useOffline.ts
export const useOffline = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOffline;
};
```

---

## 4. Analytics Implementation (Privacy-Respecting)

**Decision**: Custom lightweight analytics using `navigator.sendBeacon`

**Rationale**:
- **No PII tracking**: Only aggregate page views and navigation card clicks
- **Privacy-first**: No cookies, no user identification
- **Lightweight**: No third-party SDK overhead

**Implementation**:
```typescript
// hooks/useAnalytics.ts
interface AnalyticsEvent {
  type: 'page_view' | 'navigation_card_click';
  data?: {
    cardTitle?: string;
    timestamp: number;
  };
}

export const useAnalytics = () => {
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    // Mock implementation for now
    // Future: Will POST to /api/v1/analytics endpoint
    const payload = JSON.stringify({
      ...event,
      timestamp: Date.now(),
    });

    // Use sendBeacon for reliable delivery even on page unload
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/v1/analytics', payload);
    } else {
      // Fallback for older browsers
      fetch('/api/v1/analytics', {
        method: 'POST',
        body: payload,
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
      });
    }
  }, []);

  return { trackEvent };
};
```

---

## 5. Accessibility (WCAG 2.1 Level AA)

**Key Requirements**:
- **Color Contrast**: 4.5:1 for normal text, 3:1 for large text
- **Keyboard Navigation**: All interactive elements focusable
- **Screen Readers**: Semantic HTML, ARIA labels
- **Touch Targets**: Minimum 44x44px

**Accessibility Utilities**:
```typescript
// utils/accessibility.ts

/**
 * Calculates contrast ratio between two colors
 * WCAG AA requires 4.5:1 for normal text
 */
export const getContrastRatio = (fg: string, bg: string): number => {
  // Implementation using relative luminance formula
  // Returns ratio (1-21 range)
};

/**
 * Validates minimum touch target size (44x44px WCAG)
 */
export const validateTouchTarget = (element: HTMLElement): boolean => {
  const { width, height } = element.getBoundingClientRect();
  return width >= 44 && height >= 44;
};

/**
 * Generates accessible label for screen readers
 */
export const getAriaLabel = (
  title: string,
  subtitle?: string
): string => {
  return subtitle ? `${title}, ${subtitle}` : title;
};
```

---

## 6. Testing Strategy (TDD with Vitest)

**Test Categories**:

1. **Unit Tests**: Component logic, hooks, utilities
2. **Integration Tests**: User interactions, navigation flows
3. **Accessibility Tests**: ARIA attributes, keyboard navigation

**Vitest Configuration**:
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.test.{ts,tsx}',
        '**/__tests__/**',
      ],
    },
  },
});
```

**Component Test Pattern**:
```typescript
// components/NavigationCard/__tests__/NavigationCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@/theme';
import { NavigationCard } from '../NavigationCard';

describe('NavigationCard', () => {
  it('renders with title and subtitle', () => {
    render(
      <ThemeProvider>
        <NavigationCard
          title="I'm New Here"
          subtitle="Connect with us"
          icon="user"
          onClick={() => {}}
        />
      </ThemeProvider>
    );

    expect(screen.getByText("I'm New Here")).toBeInTheDocument();
    expect(screen.getByText("Connect with us")).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', () => {
    const handleClick = vi.fn();
    render(
      <ThemeProvider>
        <NavigationCard
          title="Test Card"
          subtitle="Subtitle"
          icon="user"
          onClick={handleClick}
        />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('meets minimum touch target size (44x44px)', () => {
    const { container } = render(
      <ThemeProvider>
        <NavigationCard
          title="Test"
          subtitle="Test"
          icon="user"
          onClick={() => {}}
        />
      </ThemeProvider>
    );

    const card = container.firstChild as HTMLElement;
    const { width, height } = card.getBoundingClientRect();
    expect(width).toBeGreaterThanOrEqual(44);
    expect(height).toBeGreaterThanOrEqual(44);
  });
});
```

---

## 7. Build and Development Tools

**Vite Configuration**:
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    VitePWA({ /* config from section 3 */ }),
  ],
  build: {
    target: 'es2020',
    minify: 'terser',
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: true,
  },
});
```

**TypeScript Configuration**:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "jsxImportSource": "@emotion/react",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

---

## 8. Performance Optimization

**Code Splitting Strategy**:
- **Route-based splitting**: Lazy load page components
- **Component-level splitting**: Defer non-critical components
- **Image optimization**: WebP with JPEG/PNG fallbacks

**Lighthouse Targets**:
- Performance: 90+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

**Bundle Size Targets**:
- Initial JS: < 100KB gzipped
- Initial CSS: < 20KB gzipped
- Total First Load: < 150KB gzipped

---

## Summary

All technical decisions prioritize:
1. **Mobile-first performance**: Vite for fast builds, code splitting, offline caching
2. **Type safety**: TypeScript strict mode, Emotion typed themes
3. **Accessibility**: WCAG 2.1 AA compliance utilities and testing
4. **Maintainability**: Styled-components pattern, co-located tests, clear separation of concerns
5. **Future extensibility**: Theme system ready for dark mode, analytics hooks ready for real API

**Next Phase**: Generate data model, mock contracts, and quickstart guide.
