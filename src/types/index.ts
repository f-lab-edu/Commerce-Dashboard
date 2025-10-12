export interface KPI {
  annualRevenue: number;
  totalOrders: number;
  averageOrderAmount: number;
  refundCount: number;
  refundAmount: number;
}

export interface CategoryInsight {
  id: number;
  name: string;
  revenue: number;
  percentage: number;
}

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'SHIPPING'
  | 'DELIVERED'
  | 'REFUNDED';

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  PENDING: '대기',
  CONFIRMED: '확인',
  SHIPPING: '배송중',
  DELIVERED: '배송완료',
  REFUNDED: '환불',
};

export const CATEGORIES = [
  '전자기기',
  '의류',
  '식품',
  '가구',
  '도서',
  '스포츠',
  '뷰티',
  '완구',
  '주방용품',
  '기타',
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Order {
  id: string;
  productId: string;
  productName: string;
  category: string;
  amount: number;
  status: OrderStatus;
  orderDate: Date;
  customerName: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CalendarDay {
  date: Date;
  revenue: number;
  orderCount: number;
  refundCount: number;
  memo: string | null;
}

export interface CalendarMemo {
  date: Date;
  memo: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderFilter {
  query?: string;
  status?: OrderStatus;
  minAmount?: number;
  maxAmount?: number;
  startDate?: Date;
  endDate?: Date;
  orderNumber?: string;
  page?: number;
  limit?: number;
}

export interface ProductFilter {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}
