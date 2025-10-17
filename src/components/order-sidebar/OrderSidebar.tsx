import { Box, Typography } from '@mui/material';
import OrderList from './OrderList';

export default function OrderSidebar() {
  return (
    <Box
      sx={{
        position: 'fixed',
        right: 0,
        top: 0,
        width: 300,
        height: '100vh',
        bgcolor: 'background.paper',
        borderLeft: 1,
        borderColor: 'divider',
        zIndex: 1000,
        p: 2,
        overflow: 'auto',
      }}
    >
      <Typography variant='h6'>주문 목록</Typography>
      <OrderList />
    </Box>
  );
}
