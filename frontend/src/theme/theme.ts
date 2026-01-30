export const lightTheme = {
  colors: {
    // Brand colors from Figma
    primary: '#c4956c', // Church tan/brown
    primaryDark: '#8b6f47',
    secondary: '#FFFFFF',
    surface: '#FFFFFF',
    background: '#fafafa',
    backgroundGradient: 'linear-gradient(to bottom, #f9fafb, #ffffff)',
    cardBackground: '#f9fafb',

    // Text colors from Figma
    textPrimary: '#101828',
    textSecondary: '#4a5565',
    textTertiary: '#6a7282',
    textOnPrimary: '#FFFFFF',

    // UI elements
    border: '#e5e7eb',
    borderLight: '#f3f4f6',

    // Interactive states
    interactive: '#c4956c',
    interactiveHover: '#8b6f47',
    interactiveActive: '#6b5635',

    // Semantic
    error: '#D32F2F',
    success: '#388E3C',
    warning: '#F57C00',
    info: '#1976D2',

    // Icon gradients (from Figma)
    gradients: {
      icon1: 'linear-gradient(to bottom, #8b6f47, #6b5635)',
      icon2: 'linear-gradient(to bottom, #c4956c, #8b6f47)',
      icon3: 'linear-gradient(to bottom, #6b4423, #4a2f18)',
      icon4: 'linear-gradient(to bottom, #9b7d54, #7b5d34)',
      icon5: 'linear-gradient(to bottom, #a37e5a, #836342)',
      icon6: 'linear-gradient(to bottom, #d4a574, #b48a5c)',
    },
  },

  typography: {
    fontFamily: {
      body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      heading: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    fontSize: {
      xs: '0.75rem', // 12px
      sm: '0.875rem', // 14px
      base: '1rem', // 16px
      lg: '1.125rem', // 18px
      xl: '1.25rem', // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
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
    xs: '0.25rem', // 4px
    sm: '0.5rem', // 8px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
    '2xl': '3rem', // 48px
    '3xl': '4rem', // 64px
  },

  radii: {
    sm: '0.25rem', // 4px
    md: '0.5rem', // 8px
    lg: '0.75rem', // 12px
    xl: '1rem', // 16px
    '2xl': '1.5rem', // 24px
    full: '9999px',
  },

  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px 0 rgba(0, 0, 0, 0.1), 0 8px 10px 0 rgba(0, 0, 0, 0.1)',
    hero: '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
    card: '0px 10px 15px 0px rgba(0, 0, 0, 0.1), 0px 4px 6px 0px rgba(0, 0, 0, 0.1)',
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
