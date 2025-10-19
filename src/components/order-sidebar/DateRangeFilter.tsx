import { useOrderParams } from '@/hooks/params/useOrderParams';
import { Box, TextField } from '@mui/material';

export default function DateRangeFilter() {
  const { orderParams, updateOrderParams } = useOrderParams();

  const handleStartDateChange = (value: string) => {
    updateOrderParams({ startDate: value, page: 1 });
  };

  const handleEndDateChange = (value: string) => {
    updateOrderParams({ endDate: value, page: 1 });
  };

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <TextField
        type='date'
        label='시작일'
        size='small'
        value={orderParams.startDate}
        onChange={(e) => handleStartDateChange(e.target.value)}
        InputLabelProps={{ shrink: true }}
        sx={{ flex: 1 }}
      />
      <TextField
        type='date'
        label='종료일'
        size='small'
        value={orderParams.endDate}
        onChange={(e) => handleEndDateChange(e.target.value)}
        InputLabelProps={{ shrink: true }}
        sx={{ flex: 1 }}
      />
    </Box>
  );
}
