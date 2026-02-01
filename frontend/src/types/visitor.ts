/**
 * Selectable ministry interest option
 */
export interface Interest {
  id: string;
  label: string;
}

/**
 * Form data submitted by visitor (before API processing)
 */
export interface VisitorFormData {
  name: string;
  email: string;
  phone?: string;
  isFirstTime: boolean;
  interests: string[];
}

/**
 * Complete visitor registration record (after API processing)
 */
export interface VisitorRegistration extends VisitorFormData {
  id: string;
  createdAt: string;
}

/**
 * API response wrapper (matches constitution API standards)
 */
export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
  meta: {
    timestamp: string;
  };
}

/**
 * API error structure
 */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string>;
}
