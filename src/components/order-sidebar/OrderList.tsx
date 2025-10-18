import { Box, CircularProgress, Typography } from '@mui/material';
import { useOrders } from '@/hooks/queries/useOrders';
import useInView from '@/hooks/useInView';
import OrderListItem from './OrderListItem';

export default function OrderList() {
  const {
    data: orders,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useOrders({
    page: 1,
    limit: 20,
  });

  const { ref } = useInView({
    threshold: 0.1,
    rootMargin: '100px',
    skip: !hasNextPage || isFetchingNextPage,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 200,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color='error'>주문을 불러오지 못했습니다</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant='caption' color='text.secondary'>
        총 {orders.length}개
      </Typography>

      {orders.map((order) => (
        <OrderListItem key={order.id} order={order} />
      ))}

      <Box ref={ref} sx={{ height: 1 }} />

      {isFetchingNextPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <CircularProgress size={24} />
        </Box>
      )}

      {!hasNextPage && (
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Typography variant='caption' color='text.secondary'>
            모든 주문을 불러왔습니다
          </Typography>
        </Box>
      )}
    </Box>
  );
}
