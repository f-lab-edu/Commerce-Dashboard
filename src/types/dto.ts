export interface KPIDTO {
  annualRevenue: number;
  totalOrders: number;
  averageOrderAmount: number;
  refundCount: number;
  refundAmount: number;
}

export interface CategoryInsightDTO {
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

export interface OrderDTO {
  id: string;
  productId: string;
  productName: string;
  category: string;
  amount: number;
  status: OrderStatus;
  orderDate: string;
  customerName: string;
}

export interface ProductDTO {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CalendarDayDTO {
  date: string;
  revenue: number;
  orderCount: number;
  refundCount: number;
  memo: string | null;
}

export interface CalendarMemoDTO {
  date: string;
  memo: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderDTO {
  productId: string;
  amount: number;
  customerName: string;
}

export interface UpdateOrderDTO {
  status?: OrderStatus;
}

export interface UpsertMemoDTO {
  date: string;
  memo: string;
}
