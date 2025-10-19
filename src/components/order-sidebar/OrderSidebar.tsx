import { Box, Typography, Divider } from '@mui/material';
import OrderList from './OrderList';
import SearchInput from './SearchInput';
import DateRangeFilter from './DateRangeFilter';
import StatusFilter from './StatusFilter';
import AmountFilter from './AmountFilter';

export default function OrderSidebar() {
  return (
    <Box
      sx={{
        position: 'fixed',
        right: 0,
        top: 0,
        width: 400,
        height: '100vh',
        bgcolor: 'background.paper',
        borderLeft: 1,
        borderColor: 'divider',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant='h6' gutterBottom>
          주문 목록
        </Typography>

        <SearchInput />

        <Divider sx={{ my: 2 }} />

        <Typography variant='caption' color='text.secondary' gutterBottom>
          필터
        </Typography>

        <Box sx={{ mt: 1 }}>
          <StatusFilter />
        </Box>

        <Box sx={{ mt: 2 }}>
          <DateRangeFilter />
        </Box>

        <Box sx={{ mt: 2 }}>
          <AmountFilter />
        </Box>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <OrderList />
      </Box>
    </Box>
  );
}
