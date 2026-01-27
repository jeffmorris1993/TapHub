/**
 * Converts a color string to RGB values
 */
const parseColor = (color: string): [number, number, number] => {
  // Handle hex colors
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    const fullHex = hex.length === 3
      ? hex.split('').map(char => char + char).join('')
      : hex;

    const r = parseInt(fullHex.substring(0, 2), 16);
    const g = parseInt(fullHex.substring(2, 4), 16);
    const b = parseInt(fullHex.substring(4, 6), 16);

    return [r, g, b];
  }

  // Handle rgb/rgba colors
  if (color.startsWith('rgb')) {
    const values = color.match(/\d+/g);
    if (values && values.length >= 3) {
      return [
        parseInt(values[0]),
        parseInt(values[1]),
        parseInt(values[2]),
      ];
    }
  }

  // Default to black if parsing fails
  return [0, 0, 0];
};

/**
 * Calculates relative luminance of a color
 * Based on WCAG 2.1 specification
 */
const getRelativeLuminance = (r: number, g: number, b: number): number => {
  const [rs, gs, bs] = [r, g, b].map(val => {
    const sRGB = val / 255;
    return sRGB <= 0.03928
      ? sRGB / 12.92
      : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

/**
 * Calculates contrast ratio between two colors
 * WCAG AA requires:
 * - 4.5:1 for normal text (< 18pt or < 14pt bold)
 * - 3:1 for large text (>= 18pt or >= 14pt bold)
 *
 * @param foreground - Foreground color (text color)
 * @param background - Background color
 * @returns Contrast ratio (1-21)
 */
export const getContrastRatio = (foreground: string, background: string): number => {
  const [r1, g1, b1] = parseColor(foreground);
  const [r2, g2, b2] = parseColor(background);

  const l1 = getRelativeLuminance(r1, g1, b1);
  const l2 = getRelativeLuminance(r2, g2, b2);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Validates minimum touch target size (44x44px per WCAG 2.1)
 *
 * @param element - HTML element to validate
 * @returns True if element meets minimum size requirements
 */
export const validateTouchTarget = (element: HTMLElement): boolean => {
  const { width, height } = element.getBoundingClientRect();
  return width >= 44 && height >= 44;
};

/**
 * Generates accessible label for screen readers
 *
 * @param title - Primary title
 * @param subtitle - Optional subtitle
 * @returns Combined ARIA label
 */
export const getAriaLabel = (
  title: string,
  subtitle?: string
): string => {
  return subtitle && subtitle.trim() !== ''
    ? `${title}, ${subtitle}`
    : title;
};
