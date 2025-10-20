import { Box, Card, Typography } from '@mui/material';
import { CalendarDayDTO } from '@/types/dto';
import { formatCurrencyShort } from '@/utils/formatCurrency';

interface CalendarDayProps {
  day: CalendarDayDTO;
  isCurrentMonth: boolean;
  isToday: boolean;
  onClick: (date: string) => void;
}

export default function CalendarDay({
  day,
  isCurrentMonth,
  isToday,
  onClick,
}: CalendarDayProps) {
  const dayNumber = new Date(day.date).getDate();
  const hasData = day.orderCount > 0;

  return (
    <Card
      sx={{
        height: 100,
        cursor: hasData ? 'pointer' : 'default',
        opacity: isCurrentMonth ? 1 : 0.3,
        border: isToday ? 2 : 0,
        borderColor: isToday ? 'primary.main' : 'transparent',
        transition: 'all 0.2s',
        '&:hover': hasData
          ? {
              boxShadow: 3,
              bgcolor: 'action.hover',
            }
          : {},
      }}
      onClick={() => hasData && onClick(day.date)}
    >
      <Box
        sx={{ p: 1, height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <Typography
          variant='body2'
          fontWeight={isToday ? 700 : 500}
          color={isToday ? 'primary.main' : 'text.primary'}
          sx={{ mb: 0.5 }}
        >
          {dayNumber}
        </Typography>

        {hasData && (
          <Box
            sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}
          >
            <Typography variant='caption' color='text.secondary'>
              매출: {formatCurrencyShort(day.revenue)}
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              주문: {day.orderCount}건
            </Typography>
            {day.refundCount > 0 && (
              <Typography variant='caption' color='error.main'>
                환불: {day.refundCount}건
              </Typography>
            )}
          </Box>
        )}

        {day.memo && (
          <Box
            sx={{
              position: 'absolute',
              top: 4,
              right: 4,
              width: 6,
              height: 6,
              borderRadius: '50%',
              bgcolor: 'info.main',
            }}
          />
        )}
      </Box>
    </Card>
  );
}
