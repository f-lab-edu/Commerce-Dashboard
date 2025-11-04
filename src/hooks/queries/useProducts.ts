import { fetchProductById, fetchProductOrders, fetchProducts } from '@/lib/api';
import { ProductFilter } from '@/types';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export function useProducts(filter: ProductFilter) {
  const query = useInfiniteQuery({
    queryKey: ['/products', filter],
    queryFn: ({ pageParam }) =>
      fetchProducts({
        page: pageParam,
        limit: filter.limit || 20,
        search: filter.search,
        category: filter.category,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.totalPages
        ? lastPage.page + 1
        : undefined;
    },
    initialPageParam: 1,
    staleTime: 30 * 1000,
  });

  const products = useMemo(() => {
    return query.data?.pages.flatMap((page) => page.data) || [];
  }, [query.data]);

  return {
    data: products,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}

export function useProduct(id: string) {
  const { data: product, ...rest } = useQuery({
    queryKey: ['/products', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  return {
    product,
    ...rest,
  };
}

export function useProductOrders(id: string) {
  const { data: productOrders, ...rest } = useQuery({
    queryKey: ['/products', id, 'orders'],
    queryFn: () => fetchProductOrders(id),
    enabled: !!id,
    staleTime: 3 * 60 * 1000,
  });

  return {
    productOrders,
    ...rest,
  };
}
