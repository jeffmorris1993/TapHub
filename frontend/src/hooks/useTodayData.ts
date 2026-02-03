import { useState, useEffect, useCallback } from 'react';
import { todayService } from '@/services/todayService';
import type { ScheduleEvent, Announcement, UseTodayDataState } from '@/types/today';

/**
 * Hook for fetching Today page data (schedule and announcements).
 * Handles loading, error states, and retry functionality.
 */
export const useTodayData = (): UseTodayDataState => {
  const [schedule, setSchedule] = useState<ScheduleEvent[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [scheduleResponse, announcementsResponse] = await Promise.all([
        todayService.getSchedule(),
        todayService.getAnnouncements(),
      ]);

      if (scheduleResponse.error) {
        setError(scheduleResponse.error.message);
        return;
      }

      if (announcementsResponse.error) {
        setError(announcementsResponse.error.message);
        return;
      }

      setSchedule(scheduleResponse.data ?? []);
      setAnnouncements(announcementsResponse.data ?? []);
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    schedule,
    announcements,
    isLoading,
    error,
    retry: fetchData,
  };
};
