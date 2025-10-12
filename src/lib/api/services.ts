import {
  CalendarDayDTO,
  CalendarMemoDTO,
  CategoryInsightDTO,
  KPIDTO,
  OrderDTO,
  ProductDTO,
  UpdateOrderDTO,
  UpsertMemoDTO,
} from '@/types/dto';
import { api } from './client';
import {
  CalendarMonthResponse,
  PaginatedResponse,
  SearchResponse,
  SuccessResponse,
} from '@/types/api';

export const fetchKPI = () => api.get<KPIDTO>('kpi');

export const fetchCategoryInsights = () =>
  api.get<CategoryInsightDTO[]>('insights/categories');

export const fetchOrders = (params?: {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
}) =>
  api.get<PaginatedResponse<OrderDTO>>('orders', {
    searchParams: params,
  });

export const searchOrders = (params?: {
  q?: string;
  status?: string;
  minAmount?: number;
  maxAmount?: number;
  startDate?: string;
  endDate?: string;
  orderNumber?: string;
}) =>
  api.get<SearchResponse<OrderDTO>>('orders/search', {
    searchParams: params,
  });

export const fetchOrderById = (id: string) => api.get<OrderDTO>(`orders/${id}`);

export const updateOrder = (id: string, data: UpdateOrderDTO) =>
  api.put<SuccessResponse<OrderDTO>>(`orders/${id}`, data);

export const fetchCalendar = (params: { year: string; month: string }) =>
  api.get<CalendarMonthResponse<CalendarDayDTO>>('calendar', {
    searchParams: params,
  });

export const fetchDailyOrders = (date: string) =>
  api.get<OrderDTO[]>('orders/daily', {
    searchParams: { date },
  });

export const fetchMemo = (date: string) =>
  api.get<CalendarMemoDTO>(`calendar/memo/${date}`);

export const createMemo = (data: UpsertMemoDTO) =>
  api.post<SuccessResponse<CalendarMemoDTO>>('calendar/memo', data);

export const updateMemo = (data: UpsertMemoDTO) =>
  api.put<SuccessResponse<CalendarMemoDTO>>('calendar/memo', data);

export const fetchProducts = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}) =>
  api.get<PaginatedResponse<ProductDTO>>('products', {
    searchParams: params,
  });

export const fetchProductById = (id: string) =>
  api.get<ProductDTO>(`products/${id}`);

export const fetchProductOrders = (id: string) =>
  api.get<OrderDTO[]>(`products/${id}/orders`);
