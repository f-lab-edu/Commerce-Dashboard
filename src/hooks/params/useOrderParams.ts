import { useMemo } from 'react';
import { usePrefixedParams } from './usePrefixedParams';
import { OrderFilter, OrderStatus } from '@/types';

interface OrderUrlParams {
  search: string;
  status: string;
  startDate: string;
  endDate: string;
  minAmount: number | null;
  maxAmount: number | null;
  orderNumber: string;
  page: number;
  limit: number;
}

const DEFAULT_ORDER_PARAMS: OrderUrlParams = {
  search: '',
  status: 'all',
  startDate: '',
  endDate: '',
  minAmount: null,
  maxAmount: null,
  orderNumber: '',
  page: 1,
  limit: 10,
};

export function useOrderParams() {
  const { params, updateParams } = usePrefixedParams<OrderUrlParams>(
    'ord',
    DEFAULT_ORDER_PARAMS,
  );

  const getApiParams = useMemo((): OrderFilter => {
    return {
      query: params.search || undefined,
      status:
        params.status !== 'all' ? (params.status as OrderStatus) : undefined,
      minAmount: params.minAmount !== null ? params.minAmount : undefined,
      maxAmount: params.maxAmount !== null ? params.maxAmount : undefined,
      startDate: params.startDate ? new Date(params.startDate) : undefined,
      endDate: params.endDate ? new Date(params.endDate) : undefined,
      orderNumber: params.orderNumber || undefined,
      page: params.page,
      limit: params.limit,
    };
  }, [params]);

  return {
    orderParams: params,
    updateOrderParams: updateParams,
    getApiParams,
  };
}
