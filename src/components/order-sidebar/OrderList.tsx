import { Box, CircularProgress, Typography } from '@mui/material';
import { useOrders } from '@/hooks/queries/useOrders';
import OrderListItem from './OrderListItem';
import { useOrderParams } from '@/hooks/params/useOrderParams';
import InViewTrigger from '../InViewTrigger/InViewTrigger';

export default function OrderList() {
  const { getApiParams } = useOrderParams();

  const {
    data: orders,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useOrders(getApiParams);

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

      {hasNextPage && (
        <InViewTrigger
          onInView={() => fetchNextPage()}
          rootMargin='100px'
          disabled={isFetchingNextPage}
        >
          <Box sx={{ py: 2 }}>
            {isFetchingNextPage ? (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress size={24} />
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant='caption' color='text.secondary'>
                  스크롤하여 더보기
                </Typography>
              </Box>
            )}
          </Box>
        </InViewTrigger>
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
