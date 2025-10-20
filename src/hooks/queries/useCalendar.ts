import { fetchCalendar, fetchDailyOrders, fetchMemo } from '@/lib/api';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

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

export function useDailyOrders(date: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ['/orders/daily', date],
    queryFn: () => fetchDailyOrders(date),
    enabled,
  });
}

export function useDailyMemo(date: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ['/calendar/memo', date],
    queryFn: () => fetchMemo(date),
    enabled,
    retry: false,
  });
}
