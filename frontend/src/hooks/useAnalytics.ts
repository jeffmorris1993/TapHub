import { useCallback } from 'react';

export interface AnalyticsEvent {
  type: 'page_view' | 'navigation_card_click';
  data?: {
    cardTitle?: string;
    timestamp: number;
  };
}

/**
 * Hook for privacy-respecting analytics
 * Uses navigator.sendBeacon for reliable delivery
 *
 * @returns Object with trackEvent function
 */
export const useAnalytics = () => {
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    const payload = JSON.stringify({
      ...event,
      timestamp: event.data?.timestamp || Date.now(),
    });

    // Use sendBeacon for reliable delivery even on page unload
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/v1/analytics', payload);
    } else {
      // Fallback for older browsers
      fetch('/api/v1/analytics', {
        method: 'POST',
        body: payload,
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
      }).catch(err => {
        // Silently fail - analytics should not break user experience
        console.warn('Analytics failed:', err);
      });
    }
  }, []);

  return { trackEvent };
};
