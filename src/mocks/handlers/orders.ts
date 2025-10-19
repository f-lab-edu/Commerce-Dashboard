import { OrderDTO, OrderStatus, UpdateOrderDTO } from '@/types/dto';
import { delay, http, HttpResponse } from 'msw';
import { mockOrders } from '../data';
import {
  PaginatedResponse,
  SearchResponse,
  SuccessResponse,
} from '@/types/api';

interface OrderQueryParams {
  q?: string | null;
  status?: string | null;
  minAmount?: string | null;
  maxAmount?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  orderNumber?: string | null;
  page?: string | null;
  limit?: string | null;
}

function extractQueryParams(url: URL): OrderQueryParams {
  const get = (key: string) => {
    const value = url.searchParams.get(key);
    return value === '' || value === null ? undefined : value;
  };

  return {
    q: get('q'),
    status: get('status'),
    minAmount: get('minAmount'),
    maxAmount: get('maxAmount'),
    startDate: get('startDate'),
    endDate: get('endDate'),
    orderNumber: get('orderNumber'),
    page: get('page'),
    limit: get('limit'),
  };
}

function filterOrders(
  orders: OrderDTO[],
  params: OrderQueryParams,
): OrderDTO[] {
  let filtered = [...orders];

  if (params.q) {
    const query = params.q.toLowerCase();
    filtered = filtered.filter(
      (order) =>
        order.productName.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query) ||
        order.id.toLowerCase().includes(query),
    );
  }

  if (params.status && params.status !== 'all') {
    const statusUpper = params.status.toUpperCase() as OrderStatus;
    filtered = filtered.filter((order) => order.status === statusUpper);
  }

  if (params.minAmount) {
    const min = Number(params.minAmount);
    if (!isNaN(min)) {
      filtered = filtered.filter((order) => order.amount >= min);
    }
  }

  if (params.maxAmount) {
    const max = Number(params.maxAmount);
    if (!isNaN(max)) {
      filtered = filtered.filter((order) => order.amount <= max);
    }
  }

  if (params.startDate) {
    filtered = filtered.filter((order) => order.orderDate >= params.startDate!);
  }

  if (params.endDate) {
    const endDateTime = new Date(params.endDate);
    endDateTime.setHours(23, 59, 59, 999);
    const endISO = endDateTime.toISOString();
    filtered = filtered.filter((order) => order.orderDate <= endISO);
  }

  if (params.orderNumber) {
    const orderNum = params.orderNumber.toLowerCase();
    filtered = filtered.filter((order) =>
      order.id.toLowerCase().includes(orderNum),
    );
  }

  return filtered;
}

export const orderHandlers = [
  http.get('/api/orders', async ({ request }) => {
    await delay(300);

    const url = new URL(request.url);
    const params = extractQueryParams(url);

    const page = params.page ? Number(params.page) : 1;
    const limit = params.limit ? Number(params.limit) : 20;

    let filtered = [...mockOrders];

    if (params.q) {
      const query = params.q.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.productName.toLowerCase().includes(query) ||
          order.customerName.toLowerCase().includes(query) ||
          order.id.toLowerCase().includes(query),
      );
    }

    if (params.orderNumber) {
      filtered = filtered.filter((order) =>
        order.id.toLowerCase().includes(params.orderNumber!.toLowerCase()),
      );
    }

    if (params.status && params.status !== 'all') {
      const statusUpper = params.status.toUpperCase();
      filtered = filtered.filter((order) => order.status === statusUpper);
    }

    if (params.minAmount) {
      const min = Number(params.minAmount);
      if (!isNaN(min)) {
        filtered = filtered.filter((order) => order.amount >= min);
      }
    }

    if (params.maxAmount) {
      const max = Number(params.maxAmount);
      if (!isNaN(max)) {
        filtered = filtered.filter((order) => order.amount <= max);
      }
    }

    if (params.startDate) {
      filtered = filtered.filter((order) => {
        const orderDateOnly = order.orderDate.split('T')[0];
        return orderDateOnly >= params.startDate!;
      });
    }

    if (params.endDate) {
      filtered = filtered.filter((order) => {
        const orderDateOnly = order.orderDate.split('T')[0];
        return orderDateOnly <= params.endDate!;
      });
    }

    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const data = filtered.slice(start, end);

    const response: PaginatedResponse<OrderDTO> = {
      data,
      total,
      page,
      limit,
      totalPages,
    };

    return HttpResponse.json(response);
  }),

  http.get('/api/orders/search', async ({ request }) => {
    await delay(300);

    const url = new URL(request.url);
    const params = extractQueryParams(url);

    if (!params.q && !params.orderNumber) {
      const response: SearchResponse<OrderDTO> = {
        data: [],
        total: 0,
        query: '',
      };
      return HttpResponse.json(response);
    }

    const filtered = filterOrders(mockOrders, params);
    const data = filtered.slice(0, 10);

    const response: SearchResponse<OrderDTO> = {
      data,
      total: filtered.length,
      query: params.q || params.orderNumber || '',
    };

    return HttpResponse.json(response);
  }),

  http.get('/api/orders/:id', async ({ params }) => {
    await delay(400);

    const { id } = params;
    const order = mockOrders.find((o) => o.id === id);

    if (!order) {
      return HttpResponse.json(
        {
          error: 'NOT_FOUND',
          message: '주문을 찾을 수 없습니다.',
          statusCode: 404,
        },
        { status: 404 },
      );
    }

    return HttpResponse.json(order);
  }),

  http.put('/api/orders/:id', async ({ params, request }) => {
    await delay(600);

    const { id } = params;
    const body = (await request.json()) as UpdateOrderDTO;

    const orderIndex = mockOrders.findIndex((o) => o.id === id);

    if (orderIndex === -1) {
      return HttpResponse.json(
        {
          error: 'NOT_FOUND',
          message: '주문을 찾을 수 없습니다.',
          statusCode: 404,
        },
        { status: 404 },
      );
    }

    const order = mockOrders[orderIndex];

    if (order.status === 'REFUNDED' && body.status) {
      return HttpResponse.json(
        {
          error: 'BAD_REQUEST',
          message: '환불된 주문은 상태를 변경할 수 없습니다.',
          statusCode: 400,
        },
        { status: 400 },
      );
    }

    if (
      order.status === 'DELIVERED' &&
      body.status &&
      ['PENDING', 'CONFIRMED', 'SHIPPING'].includes(body.status)
    ) {
      return HttpResponse.json(
        {
          error: 'BAD_REQUEST',
          message: '배송완료된 주문은 이전 상태로 변경할 수 없습니다.',
          statusCode: 400,
        },
        { status: 400 },
      );
    }

    if (body.status) {
      mockOrders[orderIndex] = {
        ...order,
        status: body.status,
      };
    }

    const response: SuccessResponse<OrderDTO> = {
      success: true,
      data: mockOrders[orderIndex],
      message: '주문 상태가 업데이트되었습니다.',
    };

    return HttpResponse.json(response);
  }),

  http.get('/api/orders/daily', async ({ request }) => {
    await delay(500);

    const url = new URL(request.url);
    const date = url.searchParams.get('date');

    if (!date) {
      return HttpResponse.json(
        {
          error: 'BAD_REQUEST',
          message: 'date 파라미터가 필요합니다.',
          statusCode: 400,
        },
        { status: 400 },
      );
    }

    const orders = mockOrders.filter((order) =>
      order.orderDate.startsWith(date),
    );

    return HttpResponse.json(orders);
  }),
];
