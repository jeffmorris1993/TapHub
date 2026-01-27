import { describe, it, expect } from 'vitest';
import { getContrastRatio, validateTouchTarget, getAriaLabel } from '../accessibility';

describe('accessibility utilities', () => {
  describe('getContrastRatio', () => {
    it('calculates correct contrast ratio for black and white', () => {
      const ratio = getContrastRatio('#000000', '#FFFFFF');
      expect(ratio).toBe(21);
    });

    it('calculates correct contrast ratio for same colors', () => {
      const ratio = getContrastRatio('#000000', '#000000');
      expect(ratio).toBe(1);
    });

    it('calculates contrast ratio for primary color on white', () => {
      const ratio = getContrastRatio('#8B6F47', '#FFFFFF');
      // Primary color should have at least 4.5:1 contrast with white
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('handles 3-digit hex colors', () => {
      const ratio = getContrastRatio('#000', '#FFF');
      expect(ratio).toBe(21);
    });

    it('handles rgb color format', () => {
      const ratio = getContrastRatio('rgb(0, 0, 0)', 'rgb(255, 255, 255)');
      expect(ratio).toBe(21);
    });
  });

  describe('validateTouchTarget', () => {
    it('returns true for element meeting minimum size (44x44px)', () => {
      const element = document.createElement('button');
      element.style.width = '44px';
      element.style.height = '44px';
      document.body.appendChild(element);

      // Mock getBoundingClientRect for jsdom
      element.getBoundingClientRect = vi.fn(() => ({
        width: 44,
        height: 44,
        top: 0,
        right: 44,
        bottom: 44,
        left: 0,
        x: 0,
        y: 0,
        toJSON: () => {},
      }));

      const isValid = validateTouchTarget(element);
      expect(isValid).toBe(true);

      document.body.removeChild(element);
    });

    it('returns true for element larger than minimum size', () => {
      const element = document.createElement('button');
      element.style.width = '100px';
      element.style.height = '50px';
      document.body.appendChild(element);

      // Mock getBoundingClientRect for jsdom
      element.getBoundingClientRect = vi.fn(() => ({
        width: 100,
        height: 50,
        top: 0,
        right: 100,
        bottom: 50,
        left: 0,
        x: 0,
        y: 0,
        toJSON: () => {},
      }));

      const isValid = validateTouchTarget(element);
      expect(isValid).toBe(true);

      document.body.removeChild(element);
    });

    it('returns false for element smaller than minimum width', () => {
      const element = document.createElement('button');
      element.style.width = '40px';
      element.style.height = '44px';
      document.body.appendChild(element);

      // Mock getBoundingClientRect for jsdom
      element.getBoundingClientRect = vi.fn(() => ({
        width: 40,
        height: 44,
        top: 0,
        right: 40,
        bottom: 44,
        left: 0,
        x: 0,
        y: 0,
        toJSON: () => {},
      }));

      const isValid = validateTouchTarget(element);
      expect(isValid).toBe(false);

      document.body.removeChild(element);
    });

    it('returns false for element smaller than minimum height', () => {
      const element = document.createElement('button');
      element.style.width = '44px';
      element.style.height = '40px';
      document.body.appendChild(element);

      // Mock getBoundingClientRect for jsdom
      element.getBoundingClientRect = vi.fn(() => ({
        width: 44,
        height: 40,
        top: 0,
        right: 44,
        bottom: 40,
        left: 0,
        x: 0,
        y: 0,
        toJSON: () => {},
      }));

      const isValid = validateTouchTarget(element);
      expect(isValid).toBe(false);

      document.body.removeChild(element);
    });
  });

  describe('getAriaLabel', () => {
    it('returns title when no subtitle provided', () => {
      const label = getAriaLabel('Home');
      expect(label).toBe('Home');
    });

    it('combines title and subtitle with comma', () => {
      const label = getAriaLabel("I'm New Here", 'Connect with us');
      expect(label).toBe("I'm New Here, Connect with us");
    });

    it('handles empty subtitle', () => {
      const label = getAriaLabel('Events', '');
      expect(label).toBe('Events');
    });
  });
});
