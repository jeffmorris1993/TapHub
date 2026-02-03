import { apiClient } from './api/apiClient';
import type { ApiResponse } from '@/types/visitor';
import type { ScheduleEvent, Announcement } from '@/types/today';

/**
 * Service layer for Today page data fetching.
 * Abstracts API calls for easy backend migration.
 */
export const todayService = {
  /**
   * Fetches today's schedule events
   */
  getSchedule: (): Promise<ApiResponse<ScheduleEvent[]>> => {
    return apiClient.get<ScheduleEvent[]>('/api/v1/today/schedule');
  },

  /**
   * Fetches current announcements
   */
  getAnnouncements: (): Promise<ApiResponse<Announcement[]>> => {
    return apiClient.get<Announcement[]>('/api/v1/today/announcements');
  },
};
