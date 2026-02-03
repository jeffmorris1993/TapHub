import type { ApiResponse, VisitorFormData, VisitorRegistration } from '@/types/visitor';
import { mockScheduleEvents, mockAnnouncements } from '@/data/todayMockData';

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== 'false';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Mock implementation for visitor registration
 */
const mockVisitorPost = async (
  data: unknown
): Promise<ApiResponse<VisitorRegistration>> => {
  const visitorData = data as VisitorFormData;
  const visitor: VisitorRegistration = {
    ...visitorData,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  const existing = JSON.parse(localStorage.getItem('visitors') || '[]');
  localStorage.setItem('visitors', JSON.stringify([...existing, visitor]));

  return {
    data: visitor,
    error: null,
    meta: { timestamp: new Date().toISOString() },
  };
};

/**
 * Mock POST handler with endpoint routing
 */
const mockPost = async <T>(
  url: string,
  data: unknown
): Promise<ApiResponse<T>> => {
  await delay(300); // Simulate network latency

  if (url === '/api/v1/visitors') {
    return mockVisitorPost(data) as Promise<ApiResponse<T>>;
  }

  throw new Error(`Unknown mock endpoint: ${url}`);
};

/**
 * Mock GET handler with endpoint routing
 */
const mockGet = async <T>(url: string): Promise<ApiResponse<T>> => {
  await delay(300); // Simulate network latency

  if (url === '/api/v1/today/schedule') {
    return {
      data: mockScheduleEvents as T,
      error: null,
      meta: { timestamp: new Date().toISOString() },
    };
  }

  if (url === '/api/v1/today/announcements') {
    return {
      data: mockAnnouncements as T,
      error: null,
      meta: { timestamp: new Date().toISOString() },
    };
  }

  throw new Error(`Unknown mock endpoint: ${url}`);
};

/**
 * API client with mock support for MVP development.
 * Set VITE_USE_MOCK_API=false to use real backend.
 */
export const apiClient = {
  post: async <T>(url: string, data: unknown): Promise<ApiResponse<T>> => {
    if (USE_MOCK_API) {
      return mockPost<T>(url, data);
    }
    // Future: Real API implementation with axios
    throw new Error('Real API not implemented');
  },

  get: async <T>(url: string): Promise<ApiResponse<T>> => {
    if (USE_MOCK_API) {
      return mockGet<T>(url);
    }
    // Future: Real API implementation with axios
    throw new Error('Real API not implemented');
  },
};
