import { Box, Card, Chip, Typography } from '@mui/material';
import { OrderDTO } from '@/types/dto';
import { ORDER_STATUS_LABEL } from '@/types';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatOrderDate } from '@/utils/formatDate';
import { useModal } from '@/hooks/useModal';
import Link from 'next/link';
import OrderDetailModal from './OrderDetailModal';

interface OrderListItemProps {
  order: OrderDTO;
}

export default function OrderListItem({ order }: OrderListItemProps) {
  const modal = useModal();

  const handleClick = () => {
    modal.open({
      title: '주문 상세',
      content: <OrderDetailModal orderId={order.id} />,
      confirmText: '닫기',
    });
  };

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
    <Card
      sx={{
        p: 2,
        my: 1,
        cursor: 'pointer',
        transition: 'all 0.2s',
        '&:hover': {
          boxShadow: 3,
          bgcolor: 'action.hover',
        },
      }}
      onClick={handleClick}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant='caption' color='text.secondary'>
          {order.id}
        </Typography>
        <Chip
          label={ORDER_STATUS_LABEL[order.status]}
          color={getStatusColor()}
          size='small'
        />
      </Box>

      <Link
        href={`/products/${order.productId}`}
        onClick={(e) => e.stopPropagation()}
        style={{ textDecoration: 'none' }}
      >
        <Typography
          variant='body2'
          sx={{
            fontWeight: 600,
            mb: 0.5,
            '&:hover': { color: 'primary.main' },
          }}
        >
          {order.productName}
        </Typography>
      </Link>

      <Typography variant='caption' color='text.secondary' sx={{ mb: 1 }}>
        {order.category}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
        <Typography variant='body2' fontWeight={600}>
          {formatCurrency(order.amount)}
        </Typography>
        <Typography variant='caption' color='text.secondary'>
          {formatOrderDate(new Date(order.orderDate))}
        </Typography>
      </Box>

      <Typography variant='caption' color='text.secondary'>
        {order.customerName}
      </Typography>
    </Card>
  );
}
