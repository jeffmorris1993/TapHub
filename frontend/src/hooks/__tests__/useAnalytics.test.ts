import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useAnalytics } from '../useAnalytics';

describe('useAnalytics', () => {
  let sendBeaconSpy: ReturnType<typeof vi.fn>;
  let fetchSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    sendBeaconSpy = vi.fn().mockReturnValue(true);
    fetchSpy = vi.fn().mockResolvedValue({ ok: true });

    Object.defineProperty(window.navigator, 'sendBeacon', {
      writable: true,
      value: sendBeaconSpy,
    });

    global.fetch = fetchSpy;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns trackEvent function', () => {
    const { result } = renderHook(() => useAnalytics());
    expect(result.current.trackEvent).toBeDefined();
    expect(typeof result.current.trackEvent).toBe('function');
  });

  it('uses sendBeacon when available', () => {
    const { result } = renderHook(() => useAnalytics());

    result.current.trackEvent({
      type: 'page_view',
      data: { timestamp: Date.now() },
    });

    expect(sendBeaconSpy).toHaveBeenCalledWith(
      '/api/v1/analytics',
      expect.any(String)
    );
  });

  it('includes timestamp in payload', () => {
    const { result } = renderHook(() => useAnalytics());
    const now = Date.now();

    result.current.trackEvent({
      type: 'navigation_card_click',
      data: { cardTitle: 'Test Card', timestamp: now },
    });

    expect(sendBeaconSpy).toHaveBeenCalledWith(
      '/api/v1/analytics',
      expect.stringContaining('"timestamp"')
    );

    const payload = JSON.parse(sendBeaconSpy.mock.calls[0][1]);
    expect(payload.timestamp).toBeDefined();
  });

  it('falls back to fetch when sendBeacon is not available', () => {
    Object.defineProperty(window.navigator, 'sendBeacon', {
      writable: true,
      value: undefined,
    });

    const { result } = renderHook(() => useAnalytics());

    result.current.trackEvent({
      type: 'page_view',
      data: { timestamp: Date.now() },
    });

    expect(fetchSpy).toHaveBeenCalledWith(
      '/api/v1/analytics',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
      })
    );
  });

  it('sends page view event', () => {
    const { result } = renderHook(() => useAnalytics());

    result.current.trackEvent({
      type: 'page_view',
      data: { timestamp: Date.now() },
    });

    const payload = JSON.parse(sendBeaconSpy.mock.calls[0][1]);
    expect(payload.type).toBe('page_view');
  });

  it('sends navigation card click event with card title', () => {
    const { result } = renderHook(() => useAnalytics());

    result.current.trackEvent({
      type: 'navigation_card_click',
      data: { cardTitle: "I'm New Here", timestamp: Date.now() },
    });

    const payload = JSON.parse(sendBeaconSpy.mock.calls[0][1]);
    expect(payload.type).toBe('navigation_card_click');
    expect(payload.data.cardTitle).toBe("I'm New Here");
  });
});
