import {
  createMemo,
  fetchCalendar,
  fetchDailyOrders,
  fetchMemo,
  updateMemo,
} from '@/lib/api';
import { UpsertMemoDTO } from '@/types/dto';
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';

export function useCalendar(year: string, month: string) {
  const { data, ...rest } = useSuspenseQuery({
    queryKey: ['/calendar', year, month],
    queryFn: () => fetchCalendar({ year, month }),
  });

  return {
    calendarData: data.data,
    year: data.year,
    month: data.month,
    ...rest,
  };
}

export function useDailyOrders(date: string) {
  const {
    data: orders,
    isLoading,
    ...rest
  } = useQuery({
    queryKey: ['/orders/daily', date],
    queryFn: () => fetchDailyOrders(date),
    staleTime: 3 * 60 * 1000,
  });

  return {
    orders,
    isLoading,
    ...rest,
  };
}

export function useDailyMemo(date: string, enabled: boolean = true) {
  const { data: memo, ...rest } = useQuery({
    queryKey: ['/calendar/memo', date],
    queryFn: () => fetchMemo(date),
    enabled,
    retry: false,
  });

  return {
    memo,
    ...rest,
  };
}

export function useCreateMemo() {
  const queryClient = useQueryClient();

  const { mutate, isPending, ...rest } = useMutation({
    mutationFn: (data: UpsertMemoDTO) => createMemo(data),
    onSuccess: (response, variables) => {
      queryClient.setQueryData(
        ['/calendar/memo', variables.date],
        response.data,
      );
      queryClient.invalidateQueries({ queryKey: ['/calendar'] });
    },
  });

  return {
    createMemo: mutate,
    isCreating: isPending,
    ...rest,
  };
}

export function useUpdateMemo() {
  const queryClient = useQueryClient();

  const { mutate, isPending, ...rest } = useMutation({
    mutationFn: (data: UpsertMemoDTO) => updateMemo(data),
    onSuccess: (response, variables) => {
      queryClient.setQueryData(
        ['/calendar/memo', variables.date],
        response.data,
      );
      queryClient.invalidateQueries({ queryKey: ['/calendar'] });
    },
  });

  return {
    updateMemo: mutate,
    isUpdating: isPending,
    ...rest,
  };
}
