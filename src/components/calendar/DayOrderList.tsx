import { Box, Typography } from '@mui/material';
import DayOrderItem from './DayOrderItem';
import { useDailyOrders } from '@/hooks/queries/useCalendar';
import OrderListFallback from './OrderListFallback';

interface DayOrderListProps {
  date: string;
}

export default function DayOrderList({ date }: DayOrderListProps) {
  const { orders, isLoading } = useDailyOrders(date);

  if (isLoading) {
    return <OrderListFallback />;
  }

  if (!orders || orders.length === 0) {
    return (
      <Box sx={{ py: 2 }}>
        <Typography color='text.secondary' textAlign='center'>
          주문이 없습니다
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {orders.map((order) => (
        <DayOrderItem key={order.id} order={order} />
      ))}
    </Box>
  );
}
