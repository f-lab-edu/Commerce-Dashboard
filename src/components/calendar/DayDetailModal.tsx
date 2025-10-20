import { Box, Divider, Typography } from '@mui/material';
import DayOrderList from './DayOrderList';
import MemoInput from './MemoInput';
import { formatDateKorean } from '@/utils/formatDate';

interface DayDetailModalProps {
  date: string;
}

export default function DayDetailModal({ date }: DayDetailModalProps) {
  const dateObj = new Date(date);

  return (
    <Box sx={{ minWidth: 500, maxWidth: 600, py: 2 }}>
      <Typography variant='h6' gutterBottom>
        {formatDateKorean(dateObj)}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant='subtitle1' gutterBottom fontWeight={600}>
        주문 목록
      </Typography>

      <Box sx={{ maxHeight: 400, overflowY: 'auto', mb: 3 }}>
        <DayOrderList date={date} />
      </Box>

      <Divider sx={{ my: 2 }} />

      <MemoInput date={date} />
    </Box>
  );
}
