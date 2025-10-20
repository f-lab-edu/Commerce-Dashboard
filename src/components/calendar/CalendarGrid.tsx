import { Box, Typography } from '@mui/material';
import CalendarDay from './CalendarDay';
import { CalendarDayDTO } from '@/types/dto';
import { useCalendarParams } from '@/hooks/params/useCalendarParams';
import { isTodayDate, fromDateString } from '@/utils/formatDate';

interface CalendarGridProps {
  calendarData: CalendarDayDTO[];
  onDayClick: (date: string) => void;
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

export default function CalendarGrid({
  calendarData,
  onDayClick,
}: CalendarGridProps) {
  const { calendarParams } = useCalendarParams();

  const firstDay = new Date(
    calendarParams.year,
    calendarParams.month - 1,
    1,
  ).getDay();

  const prevMonthDays = new Date(
    calendarParams.year,
    calendarParams.month - 1,
    0,
  ).getDate();

  const nextMonthStart = 1;

  const gridDays: CalendarDayDTO[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    const prevMonth =
      calendarParams.month === 1 ? 12 : calendarParams.month - 1;
    const prevYear =
      calendarParams.month === 1
        ? calendarParams.year - 1
        : calendarParams.year;
    const day = prevMonthDays - i;
    const dateStr = `${prevYear}-${String(prevMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    gridDays.push({
      date: dateStr,
      revenue: 0,
      orderCount: 0,
      refundCount: 0,
      memo: null,
    });
  }

  gridDays.push(...calendarData);

  const totalCells = gridDays.length <= 35 ? 35 : 42;
  const remainingCells = totalCells - gridDays.length;

  for (let i = 0; i < remainingCells; i++) {
    const nextMonth =
      calendarParams.month === 12 ? 1 : calendarParams.month + 1;
    const nextYear =
      calendarParams.month === 12
        ? calendarParams.year + 1
        : calendarParams.year;
    const day = nextMonthStart + i;
    const dateStr = `${nextYear}-${String(nextMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    gridDays.push({
      date: dateStr,
      revenue: 0,
      orderCount: 0,
      refundCount: 0,
      memo: null,
    });
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 1,
          mb: 1,
        }}
      >
        {WEEKDAYS.map((day, index) => (
          <Typography
            key={day}
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
            {day}
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
        {gridDays.map((day, index) => {
          const date = fromDateString(day.date);
          const isCurrentMonth =
            date.getMonth() + 1 === calendarParams.month &&
            date.getFullYear() === calendarParams.year;
          const isToday = isTodayDate(date);

          return (
            <CalendarDay
              key={`${day.date}-${index}`}
              day={day}
              isCurrentMonth={isCurrentMonth}
              isToday={isToday}
              onClick={onDayClick}
            />
          );
        })}
      </Box>
    </Box>
  );
}
