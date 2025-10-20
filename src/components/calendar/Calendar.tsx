import { Card, CardContent } from '@mui/material';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import { useCalendarParams } from '@/hooks/params/useCalendarParams';
import { useCalendar } from '@/hooks/queries/useCalendar';
import { useModal } from '@/hooks/useModal';

export default function Calendar() {
  const { getApiParams } = useCalendarParams();
  const { calendarData } = useCalendar(getApiParams.year, getApiParams.month);
  const modal = useModal();

  const handleDayClick = (date: string) => {
    // TODO: DayDetailModal을 만들 예정
    modal.alert({
      title: date,
      description: '날짜 상세 모달은 Issue #2에서 구현됩니다.',
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
