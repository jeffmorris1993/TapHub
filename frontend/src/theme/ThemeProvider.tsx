import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { lightTheme } from './theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return <EmotionThemeProvider theme={lightTheme}>{children}</EmotionThemeProvider>;
};
