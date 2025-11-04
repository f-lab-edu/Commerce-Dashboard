import { useMemo } from 'react';
import { usePrefixedParams } from './usePrefixedParams';
import { ProductFilter } from '@/types';

interface ProductUrlParams {
  search: string;
  category: string;
  page: number;
  limit: number;
}

const DEFAULT_PRODUCT_PARAMS: ProductUrlParams = {
  search: '',
  category: '',
  page: 1,
  limit: 20,
};

export function useProductParams() {
  const { params, updateParams } = usePrefixedParams<ProductUrlParams>(
    'prd',
    DEFAULT_PRODUCT_PARAMS,
  );

  const getApiParams = useMemo((): ProductFilter => {
    return {
      search: params.search || undefined,
      category: params.category || undefined,
      page: params.page,
      limit: params.limit,
    };
  }, [params]);

  return {
    productParams: params,
    updateProductParams: updateParams,
    getApiParams,
  };
}
