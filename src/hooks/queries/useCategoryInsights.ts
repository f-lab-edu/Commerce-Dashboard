import { fetchCategoryInsights } from '@/lib/api';
import { useSuspenseQuery } from '@tanstack/react-query';

export function useCategoryInsights() {
  const { data: categories, ...rest } = useSuspenseQuery({
    queryKey: ['/insights', '/categories'],
    queryFn: fetchCategoryInsights,
  });

  return {
    categories,
    ...rest,
  };
}
