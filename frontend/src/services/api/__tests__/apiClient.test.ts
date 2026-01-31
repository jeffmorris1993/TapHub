import { describe, it, expect, beforeEach, vi } from 'vitest';
import { apiClient } from '../apiClient';
import type { VisitorFormData, VisitorRegistration } from '@/types/visitor';

describe('apiClient', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('post', () => {
    it('returns successful response for /api/v1/visitors endpoint', async () => {
      const visitorData: VisitorFormData = {
        name: 'John Doe',
        email: 'john@example.com',
        isFirstTime: true,
        interests: ['small-group'],
      };

      const responsePromise = apiClient.post<VisitorRegistration>(
        '/api/v1/visitors',
        visitorData
      );

      // Advance timer to resolve delay
      vi.advanceTimersByTime(300);

      const response = await responsePromise;

      expect(response.data).not.toBeNull();
      expect(response.data?.name).toBe('John Doe');
      expect(response.data?.email).toBe('john@example.com');
      expect(response.data?.id).toBeDefined();
      expect(response.data?.createdAt).toBeDefined();
      expect(response.error).toBeNull();
      expect(response.meta.timestamp).toBeDefined();
    });

    it('stores visitor data in localStorage', async () => {
      const visitorData: VisitorFormData = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        isFirstTime: false,
        interests: [],
      };

      const responsePromise = apiClient.post<VisitorRegistration>(
        '/api/v1/visitors',
        visitorData
      );

      vi.advanceTimersByTime(300);
      await responsePromise;

      const stored = JSON.parse(localStorage.getItem('visitors') || '[]');
      expect(stored).toHaveLength(1);
      expect(stored[0].name).toBe('Jane Doe');
    });

    it('appends to existing visitors in localStorage', async () => {
      // Pre-populate localStorage
      const existing = [{ id: '1', name: 'Existing', email: 'existing@test.com' }];
      localStorage.setItem('visitors', JSON.stringify(existing));

      const visitorData: VisitorFormData = {
        name: 'New Visitor',
        email: 'new@example.com',
        isFirstTime: true,
        interests: [],
      };

      const responsePromise = apiClient.post<VisitorRegistration>(
        '/api/v1/visitors',
        visitorData
      );

      vi.advanceTimersByTime(300);
      await responsePromise;

      const stored = JSON.parse(localStorage.getItem('visitors') || '[]');
      expect(stored).toHaveLength(2);
    });

    it('throws error for unknown endpoints', async () => {
      const responsePromise = apiClient.post('/api/v1/unknown', {});

      vi.advanceTimersByTime(300);

      await expect(responsePromise).rejects.toThrow('Unknown mock endpoint');
    });

    it('includes optional phone field when provided', async () => {
      const visitorData: VisitorFormData = {
        name: 'Test User',
        email: 'test@example.com',
        phone: '555-123-4567',
        isFirstTime: true,
        interests: [],
      };

      const responsePromise = apiClient.post<VisitorRegistration>(
        '/api/v1/visitors',
        visitorData
      );

      vi.advanceTimersByTime(300);
      const response = await responsePromise;

      expect(response.data?.phone).toBe('555-123-4567');
    });
  });
});
