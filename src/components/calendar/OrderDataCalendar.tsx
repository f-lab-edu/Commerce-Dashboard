import { useCalendarParams } from '@/hooks/params/useCalendarParams';
import { useModal } from '@/hooks/useModal';
import { useCalendar } from '@frontend-toolkit-js/hooks';
import { useCalendar as useCalendarQuery } from '@/hooks/queries/useCalendar';
import DayDetailModal from './DayDetailModal';
import { Box, Card, CardContent, Typography } from '@mui/material';
import CalendarHeader from './CalendarHeader';
import { formatCurrencyShort } from '@/utils/formatCurrency';
import CalendarDayCell from './CalendarDayCell';
import { useEffect, useMemo } from 'react';
import { formatDate } from '@/utils/formatDate';

export default function OrderDataCalendar() {
  const modal = useModal();

  const { calendarParams, goToNextMonth, goToPreviousMonth, goToToday } =
    useCalendarParams();

  const currentDate = useMemo(
    () => new Date(calendarParams.year, calendarParams.month - 1),
    [calendarParams.year, calendarParams.month],
  );

  const calendar = useCalendar({
    defaultDate: currentDate,
    weekStartsOn: 0,
  });

  useEffect(() => {
    calendar.setDate(currentDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

  const { calendarData } = useCalendarQuery(
    calendarParams.year.toString(),
    calendarParams.month.toString(),
  );

  const handleDayClick = (date: string) => {
    modal.open({
      content: <DayDetailModal date={date} />,
    });
  };

  const dataByDate = useMemo(
    () => new Map(calendarData.map((day) => [day.date, day])),
    [calendarData],
  );

  return (
    <Card>
      <CardContent>
        <CalendarHeader
          currentDate={currentDate}
          onPrev={goToPreviousMonth}
          onNext={goToNextMonth}
          onToday={goToToday}
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 1,
            mb: 1,
          }}
        >
          {calendar.weekdays.map((day, index) => (
            <Typography
              key={day.index}
              variant='body2'
              fontWeight={600}
              textAlign='center'
              color={
                index === 0
                  ? 'error.main'
                  : index === 6
                    ? 'info.main'
                    : 'text.primary'
              }
            >
              {day.label}
            </Typography>
          ))}
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 1,
          }}
        >
          {calendar.days.map((day, index) => {
            const dateStr = formatDate(day.date);
            const data = dataByDate.get(dateStr);
            const hasData = data && data.orderCount > 0;

            return (
              <CalendarDayCell
                key={index}
                day={day}
                hasMemo={!!data?.memo}
                onClick={() => hasData && handleDayClick(dateStr)}
              >
                {hasData && (
                  <Box
                    sx={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 0.5,
                    }}
                  >
                    <Typography variant='caption' color='text.secondary'>
                      매출: {formatCurrencyShort(data.revenue)}
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                      주문: {data.orderCount}건
                    </Typography>
                    {data.refundCount > 0 && (
                      <Typography variant='caption' color='error.main'>
                        환불: {data.refundCount}건
                      </Typography>
                    )}
                  </Box>
                )}
              </CalendarDayCell>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}
