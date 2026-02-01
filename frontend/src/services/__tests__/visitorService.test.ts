import { describe, it, expect, beforeEach, vi } from 'vitest';
import { visitorService } from '../visitorService';
import type { VisitorFormData } from '@/types/visitor';

describe('visitorService', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('registerVisitor', () => {
    it('successfully registers a visitor and returns registration data', async () => {
      const formData: VisitorFormData = {
        name: 'John Doe',
        email: 'john@example.com',
        isFirstTime: true,
        interests: ['small-group', 'membership'],
      };

      const responsePromise = visitorService.registerVisitor(formData);
      vi.advanceTimersByTime(300);
      const result = await responsePromise;

      expect(result.data).not.toBeNull();
      expect(result.data?.name).toBe('John Doe');
      expect(result.data?.email).toBe('john@example.com');
      expect(result.data?.isFirstTime).toBe(true);
      expect(result.data?.interests).toEqual(['small-group', 'membership']);
      expect(result.data?.id).toBeDefined();
      expect(result.data?.createdAt).toBeDefined();
      expect(result.error).toBeNull();
    });

    it('includes optional phone when provided', async () => {
      const formData: VisitorFormData = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        phone: '555-987-6543',
        isFirstTime: false,
        interests: [],
      };

      const responsePromise = visitorService.registerVisitor(formData);
      vi.advanceTimersByTime(300);
      const result = await responsePromise;

      expect(result.data?.phone).toBe('555-987-6543');
    });

    it('handles empty interests array', async () => {
      const formData: VisitorFormData = {
        name: 'Test User',
        email: 'test@example.com',
        isFirstTime: true,
        interests: [],
      };

      const responsePromise = visitorService.registerVisitor(formData);
      vi.advanceTimersByTime(300);
      const result = await responsePromise;

      expect(result.data?.interests).toEqual([]);
    });
  });
});
