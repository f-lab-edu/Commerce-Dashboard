import {
  Box,
  Typography,
  Divider,
  Chip,
  CircularProgress,
  Button,
} from '@mui/material';
import { useOrder, useUpdateOrderStatus } from '@/hooks/queries/useOrders';
import { ORDER_STATUS_LABEL, OrderStatus } from '@/types';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDateTimeKorean } from '@/utils/formatDate';
import Link from 'next/link';
import { useModal } from '@/hooks/useModal';
import { useState } from 'react';
import OrderStatusSelect from './OrderStatusSelect';

interface OrderDetailModalContentProps {
  orderId: string;
}

export default function OrderDetailModal({
  orderId,
}: OrderDetailModalContentProps) {
  const { data: order, isLoading } = useOrder(orderId);
  const { mutate: updateStatus, isPending } = useUpdateOrderStatus();
  const modal = useModal();

  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | null>(
    null,
  );

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

  const currentStatus = selectedStatus || order.status;

  const handleStatusChange = (newStatus: OrderStatus) => {
    setSelectedStatus(newStatus);
  };

  const handleSave = async () => {
    if (!selectedStatus || selectedStatus === order.status) {
      modal.alert({
        title: '알림',
        description: '변경된 내용이 없습니다',
      });
      return;
    }

    const confirmed = await modal.confirm({
      title: '주문 상태 변경',
      description: `주문 상태를 "${ORDER_STATUS_LABEL[order.status]}"에서 "${ORDER_STATUS_LABEL[selectedStatus]}"로 변경하시겠습니까?`,
      confirmText: '변경',
      cancelText: '취소',
    });

    if (!confirmed) return;

    updateStatus(
      {
        id: orderId,
        data: { status: selectedStatus },
      },
      {
        onSuccess: () => {
          modal.success({
            title: '성공',
            description: '주문 상태가 변경되었습니다',
          });
        },
        onError: (error: Error) => {
          modal.error({
            title: '실패',
            description: error.message || '주문 상태 변경에 실패했습니다',
          });
          setSelectedStatus(order.status);
        },
      },
    );
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

  const hasChanges = selectedStatus && selectedStatus !== order.status;

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

      <Box sx={{ mb: 2 }}>
        <Typography variant='caption' color='text.secondary' gutterBottom>
          주문 상태 변경
        </Typography>
        <Box sx={{ mt: 1 }}>
          <OrderStatusSelect
            value={currentStatus}
            onChange={handleStatusChange}
            disabled={isPending}
          />
        </Box>
      </Box>

      {hasChanges && (
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Button
            variant='outlined'
            fullWidth
            onClick={() => setSelectedStatus(order.status)}
            disabled={isPending}
          >
            취소
          </Button>
          <Button
            variant='contained'
            fullWidth
            onClick={handleSave}
            disabled={isPending}
          >
            {isPending ? '저장 중...' : '저장'}
          </Button>
        </Box>
      )}
    </Box>
  );
}
