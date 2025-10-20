import { Card, CardContent } from '@mui/material';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import { useCalendarParams } from '@/hooks/params/useCalendarParams';
import { useCalendar } from '@/hooks/queries/useCalendar';
import { useModal } from '@/hooks/useModal';
import DayDetailModal from './DayDetailModal';
import { useQueryClient } from '@tanstack/react-query';
import { fetchDailyOrders } from '@/lib/api';

export default function Calendar() {
  const queryClient = useQueryClient();
  const { getApiParams } = useCalendarParams();
  const { calendarData } = useCalendar(getApiParams.year, getApiParams.month);
  const modal = useModal();

  const handleDayClick = async (date: string) => {
    await queryClient.prefetchQuery({
      queryKey: ['/orders/daily', date],
      queryFn: () => fetchDailyOrders(date),
    });
    modal.open({
      content: <DayDetailModal date={date} />,
    });
  };

  return (
    <Card>
      <CardContent>
        <CalendarHeader />
        <CalendarGrid calendarData={calendarData} onDayClick={handleDayClick} />
      </CardContent>
    </Card>
  );
}
