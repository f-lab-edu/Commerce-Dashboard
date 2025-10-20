import { Box, Card, Chip, Typography } from '@mui/material';
import Link from 'next/link';
import { OrderDTO } from '@/types/dto';
import { ORDER_STATUS_LABEL } from '@/types';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatTime } from '@/utils/formatDate';

interface DayOrderItemProps {
  order: OrderDTO;
}

export default function DayOrderItem({ order }: DayOrderItemProps) {
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
        transition: 'all 0.2s',
        '&:hover': {
          boxShadow: 2,
        },
      }}
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
        style={{ textDecoration: 'none' }}
        onClick={(e) => e.stopPropagation()}
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

      <Typography variant='caption' color='text.secondary' display='block'>
        {order.category}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 1,
        }}
      >
        <Typography variant='body2' fontWeight={600}>
          {formatCurrency(order.amount)}
        </Typography>
        <Typography variant='caption' color='text.secondary'>
          {formatTime(new Date(order.orderDate))}
        </Typography>
      </Box>

      <Typography variant='caption' color='text.secondary' display='block'>
        고객: {order.customerName}
      </Typography>

      <Typography
        variant='caption'
        color='text.secondary'
        display='block'
        sx={{ mt: 0.5 }}
      >
        상품번호: {order.productId}
      </Typography>
    </Card>
  );
}
