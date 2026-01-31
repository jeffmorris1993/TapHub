import { apiClient } from './api';
import type { ApiResponse, VisitorFormData, VisitorRegistration } from '@/types/visitor';

/**
 * Service for visitor registration operations.
 * Uses mocked API in development, ready for backend integration.
 */
export const visitorService = {
  /**
   * Registers a new visitor with the provided form data.
   * @param formData - The visitor's form data
   * @returns Promise with the created registration or error
   */
  registerVisitor: async (
    formData: VisitorFormData
  ): Promise<ApiResponse<VisitorRegistration>> => {
    return apiClient.post<VisitorRegistration>('/api/v1/visitors', formData);
  },
};
