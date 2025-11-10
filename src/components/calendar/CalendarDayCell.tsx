import { ReactNode } from 'react';
import { Box, Card, Typography } from '@mui/material';

export interface CalendarDay {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
}

interface CalendarDayCellProps {
  day: CalendarDay;
  children?: ReactNode;
  hasMemo?: boolean;
  onClick?: () => void;
}

export default function CalendarDayCell({
  day,
  children,
  hasMemo = false,
  onClick,
}: CalendarDayCellProps) {
  const hasContent = !!children;

  return (
    <Card
      sx={{
        height: 100,
        cursor: hasContent ? 'pointer' : 'default',
        opacity: day.isCurrentMonth ? 1 : 0.3,
        border: day.isToday ? 2 : 0,
        borderColor: day.isToday ? 'primary.main' : 'transparent',
        transition: 'all 0.2s',
        position: 'relative',
        '&:hover': hasContent
          ? {
              boxShadow: 3,
              bgcolor: 'action.hover',
            }
          : {},
      }}
      onClick={onClick}
    >
      <Box
        sx={{ p: 1, height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <Typography
          variant='body2'
          fontWeight={day.isToday ? 700 : 500}
          color={
            day.isToday
              ? 'primary.main'
              : day.isWeekend
                ? 'error.main'
                : 'text.primary'
          }
          sx={{ mb: 0.5 }}
        >
          {day.day}
        </Typography>

        {children}

        {hasMemo && (
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
