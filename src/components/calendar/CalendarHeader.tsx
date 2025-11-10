// src/components/calendar/CalendarHeader.tsx
import { Box, Button, IconButton, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TodayIcon from '@mui/icons-material/Today';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

export default function CalendarHeader({
  currentDate,
  onPrev,
  onNext,
  onToday,
}: CalendarHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
      }}
    >
      <Typography variant='h5' component='h2' fontWeight={600}>
        {currentDate.toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
        })}
      </Typography>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          variant='outlined'
          size='small'
          startIcon={<TodayIcon />}
          onClick={onToday}
        >
          오늘
        </Button>

        <IconButton size='small' onClick={onPrev}>
          <ChevronLeftIcon />
        </IconButton>

        <IconButton size='small' onClick={onNext}>
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
