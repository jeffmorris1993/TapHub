import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useTodayData } from '../useTodayData';
import { todayService } from '@/services/todayService';
import type { ScheduleEvent, Announcement } from '@/types/today';

vi.mock('@/services/todayService', () => ({
  todayService: {
    getSchedule: vi.fn(),
    getAnnouncements: vi.fn(),
  },
}));

const mockTodayService = vi.mocked(todayService);

const mockSchedule: ScheduleEvent[] = [
  { id: '1', time: '10:00 AM', name: 'Sunday School', location: 'Sanctuary', order: 1 },
];

const mockAnnouncements: Announcement[] = [
  {
    id: 'a1',
    title: 'Test Announcement',
    description: 'Test description',
    icon: 'users',
    color: '#c4956c',
    publishDate: '2026-01-15',
    status: 'published',
    createdAt: '2026-01-10T10:00:00.000Z',
    updatedAt: '2026-01-15T08:00:00.000Z',
  },
];

describe('useTodayData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns loading state initially', () => {
    mockTodayService.getSchedule.mockImplementation(() => new Promise(() => {}));
    mockTodayService.getAnnouncements.mockImplementation(() => new Promise(() => {}));

    const { result } = renderHook(() => useTodayData());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.schedule).toEqual([]);
    expect(result.current.announcements).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('fetches and returns schedule and announcements', async () => {
    mockTodayService.getSchedule.mockResolvedValueOnce({
      data: mockSchedule,
      error: null,
      meta: { timestamp: '2026-01-19T10:00:00.000Z' },
    });
    mockTodayService.getAnnouncements.mockResolvedValueOnce({
      data: mockAnnouncements,
      error: null,
      meta: { timestamp: '2026-01-19T10:00:00.000Z' },
    });

    const { result } = renderHook(() => useTodayData());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.schedule).toEqual(mockSchedule);
    expect(result.current.announcements).toEqual(mockAnnouncements);
    expect(result.current.error).toBeNull();
  });

  it('returns error state when fetch fails', async () => {
    mockTodayService.getSchedule.mockResolvedValueOnce({
      data: null,
      error: { code: 'SCHEDULE_FETCH_ERROR', message: 'Unable to load schedule' },
      meta: { timestamp: '2026-01-19T10:00:00.000Z' },
    });
    mockTodayService.getAnnouncements.mockResolvedValueOnce({
      data: mockAnnouncements,
      error: null,
      meta: { timestamp: '2026-01-19T10:00:00.000Z' },
    });

    const { result } = renderHook(() => useTodayData());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe('Unable to load schedule');
  });

  it('provides retry function that refetches data', async () => {
    mockTodayService.getSchedule
      .mockResolvedValueOnce({
        data: null,
        error: { code: 'SCHEDULE_FETCH_ERROR', message: 'Failed' },
        meta: { timestamp: '2026-01-19T10:00:00.000Z' },
      })
      .mockResolvedValueOnce({
        data: mockSchedule,
        error: null,
        meta: { timestamp: '2026-01-19T10:00:00.000Z' },
      });
    mockTodayService.getAnnouncements.mockResolvedValue({
      data: mockAnnouncements,
      error: null,
      meta: { timestamp: '2026-01-19T10:00:00.000Z' },
    });

    const { result } = renderHook(() => useTodayData());

    await waitFor(() => {
      expect(result.current.error).toBe('Failed');
    });

    act(() => {
      result.current.retry();
    });

    await waitFor(() => {
      expect(result.current.schedule).toEqual(mockSchedule);
      expect(result.current.error).toBeNull();
    });
  });
});
