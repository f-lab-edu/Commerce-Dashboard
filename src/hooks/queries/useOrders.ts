import {
  useInfiniteQuery,
  useQuery,
  useMutation,
  useQueryClient,
  InfiniteData,
} from '@tanstack/react-query';
import {
  fetchOrders,
  searchOrders,
  fetchOrderById,
  updateOrder,
} from '@/lib/api';
import { OrderFilter } from '@/types';
import { OrderDTO, UpdateOrderDTO } from '@/types/dto';
import { PaginatedResponse } from '@/types/api';
import { useMemo } from 'react';

export function useOrders(filter: OrderFilter) {
  const query = useInfiniteQuery({
    queryKey: ['/orders', filter],
    queryFn: ({ pageParam }) =>
      fetchOrders({
        page: pageParam,
        limit: filter.limit || 20,
        startDate: filter.startDate?.toISOString().split('T')[0],
        endDate: filter.endDate?.toISOString().split('T')[0],
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.totalPages
        ? lastPage.page + 1
        : undefined;
    },
    initialPageParam: 1,
    staleTime: 30 * 1000,
  });

  const orders = useMemo(() => {
    return query.data?.pages.flatMap((page) => page.data) || [];
  }, [query.data]);

  return {
    data: orders,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}

export function useOrderSearch(filter: OrderFilter) {
  return useQuery({
    queryKey: ['/orders/search', filter],
    queryFn: () =>
      searchOrders({
        q: filter.query,
        status: filter.status,
        minAmount: filter.minAmount,
        maxAmount: filter.maxAmount,
        startDate: filter.startDate?.toISOString().split('T')[0],
        endDate: filter.endDate?.toISOString().split('T')[0],
        orderNumber: filter.orderNumber,
      }),
    enabled: !!(filter.query || filter.orderNumber),
    staleTime: 60 * 1000,
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: ['/orders', id],
    queryFn: () => fetchOrderById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateOrderDTO }) =>
      updateOrder(id, data),

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ['/orders', id] });

      const previousOrder = queryClient.getQueryData<OrderDTO>(['/orders', id]);

      if (previousOrder) {
        queryClient.setQueryData<OrderDTO>(['/orders', id], {
          ...previousOrder,
          ...data,
        });
      }

      queryClient.setQueriesData<InfiniteData<PaginatedResponse<OrderDTO>>>(
        { queryKey: ['/orders'] },
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: page.data.map((order) =>
                order.id === id ? { ...order, ...data } : order,
              ),
            })),
          };
        },
      );

      return { previousOrder };
    },
    onError: (error, { id }, context) => {
      console.error('주문 업데이트 실패:', error);

      if (context?.previousOrder) {
        queryClient.setQueryData(['/orders', id], context.previousOrder);
      }
    },
    onSuccess: (response) => {
      if (response.data) {
        queryClient.setQueryData(['/orders', response.data.id], response.data);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['/orders'] });
      queryClient.invalidateQueries({ queryKey: ['/calendar'] });
      queryClient.invalidateQueries({ queryKey: ['/kpi'] });
    },
  });
}
