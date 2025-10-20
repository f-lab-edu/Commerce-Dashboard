import { Box, Button, IconButton, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TodayIcon from '@mui/icons-material/Today';
import { useCalendarParams } from '@/hooks/params/useCalendarParams';

export default function CalendarHeader() {
  const { calendarParams, goToNextMonth, goToPreviousMonth, goToToday } =
    useCalendarParams();

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
        {calendarParams.year}년 {calendarParams.month}월
      </Typography>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          variant='outlined'
          size='small'
          startIcon={<TodayIcon />}
          onClick={goToToday}
        >
          오늘
        </Button>

        <IconButton size='small' onClick={goToPreviousMonth}>
          <ChevronLeftIcon />
        </IconButton>

        <IconButton size='small' onClick={goToNextMonth}>
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
