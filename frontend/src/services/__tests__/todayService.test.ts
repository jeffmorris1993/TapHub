import { describe, it, expect, vi, beforeEach } from 'vitest';
import { todayService } from '../todayService';
import { apiClient } from '../api/apiClient';
import type { ScheduleEvent, Announcement } from '@/types/today';

vi.mock('../api/apiClient', () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

const mockApiClient = vi.mocked(apiClient);

describe('todayService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getSchedule', () => {
    it('fetches schedule events from the API', async () => {
      const mockSchedule: ScheduleEvent[] = [
        { id: '1', time: '10:00 AM', name: 'Sunday School', location: 'Sanctuary', order: 1 },
      ];

      mockApiClient.get.mockResolvedValueOnce({
        data: mockSchedule,
        error: null,
        meta: { timestamp: '2026-01-19T10:00:00.000Z' },
      });

      const result = await todayService.getSchedule();

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/v1/today/schedule');
      expect(result.data).toEqual(mockSchedule);
    });

    it('returns error when API fails', async () => {
      mockApiClient.get.mockResolvedValueOnce({
        data: null,
        error: { code: 'SCHEDULE_FETCH_ERROR', message: 'Unable to load schedule' },
        meta: { timestamp: '2026-01-19T10:00:00.000Z' },
      });

      const result = await todayService.getSchedule();

      expect(result.error).toBeTruthy();
      expect(result.data).toBeNull();
    });
  });

  describe('getAnnouncements', () => {
    it('fetches announcements from the API', async () => {
      const mockAnnouncements: Announcement[] = [
        {
          id: 'a1',
          title: 'Test',
          description: 'Test description',
          icon: 'users',
          color: '#c4956c',
          publishDate: '2026-01-15',
          status: 'published',
          createdAt: '2026-01-10T10:00:00.000Z',
          updatedAt: '2026-01-15T08:00:00.000Z',
        },
      ];

      mockApiClient.get.mockResolvedValueOnce({
        data: mockAnnouncements,
        error: null,
        meta: { timestamp: '2026-01-19T10:00:00.000Z' },
      });

      const result = await todayService.getAnnouncements();

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/v1/today/announcements');
      expect(result.data).toEqual(mockAnnouncements);
    });

    it('returns error when API fails', async () => {
      mockApiClient.get.mockResolvedValueOnce({
        data: null,
        error: { code: 'ANNOUNCEMENTS_FETCH_ERROR', message: 'Unable to load announcements' },
        meta: { timestamp: '2026-01-19T10:00:00.000Z' },
      });

      const result = await todayService.getAnnouncements();

      expect(result.error).toBeTruthy();
      expect(result.data).toBeNull();
    });
  });
});
