import {
  Box,
  Typography,
  Divider,
  Chip,
  CircularProgress,
} from '@mui/material';
import { useOrder } from '@/hooks/queries/useOrders';
import { ORDER_STATUS_LABEL } from '@/types';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDateTimeKorean } from '@/utils/formatDate';
import Link from 'next/link';

interface OrderDetailModalContentProps {
  orderId: string;
}

export default function OrderDetailModal({
  orderId,
}: OrderDetailModalContentProps) {
  const { data: order, isLoading } = useOrder(orderId);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!order) {
    return (
      <Box sx={{ py: 3 }}>
        <Typography color='error'>주문을 찾을 수 없습니다</Typography>
      </Box>
    );
  }

  const getStatusColor = () => {
    switch (order.status) {
      case 'PENDING':
        return 'warning';
      case 'CONFIRMED':
        return 'info';
      case 'SHIPPING':
        return 'primary';
      case 'DELIVERED':
        return 'success';
      case 'REFUNDED':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ minWidth: 400, py: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant='h6'>{order.id}</Typography>
        <Chip
          label={ORDER_STATUS_LABEL[order.status]}
          color={getStatusColor()}
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 2 }}>
        <Typography variant='caption' color='text.secondary' gutterBottom>
          상품 정보
        </Typography>
        <Link
          href={`/products/${order.productId}`}
          style={{ textDecoration: 'none' }}
        >
          <Typography
            variant='body1'
            sx={{
              fontWeight: 600,
              '&:hover': { color: 'primary.main' },
            }}
          >
            {order.productName}
          </Typography>
        </Link>
        <Typography variant='body2' color='text.secondary'>
          {order.category}
        </Typography>
        <Typography variant='caption' color='text.secondary'>
          상품번호: {order.productId}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 2 }}>
        <Typography variant='caption' color='text.secondary' gutterBottom>
          주문 정보
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant='body2'>주문 금액</Typography>
          <Typography variant='body1' fontWeight={600}>
            {formatCurrency(order.amount)}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant='body2'>주문 일시</Typography>
          <Typography variant='body2'>
            {formatDateTimeKorean(new Date(order.orderDate))}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant='body2'>고객명</Typography>
          <Typography variant='body2'>{order.customerName}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
