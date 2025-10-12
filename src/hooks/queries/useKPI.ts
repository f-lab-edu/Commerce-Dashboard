import { fetchKPI } from '@/lib/api';
import { useSuspenseQuery } from '@tanstack/react-query';

export function useKPI() {
  const { data: kpi, ...rest } = useSuspenseQuery({
    queryKey: ['/kpi'],
    queryFn: fetchKPI,
  });

  return {
    kpi,
    ...rest,
  };
}
