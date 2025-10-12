export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SearchResponse<T> {
  data: T[];
  total: number;
  query: string;
}

export interface SuccessResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface ErrorResponse {
  error: string;
  message?: string;
  statusCode?: number;
}

export interface CalendarMonthResponse<T> {
  year: string;
  month: string;
  data: T[];
}
