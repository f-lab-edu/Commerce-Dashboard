import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { OrderStatus, ORDER_STATUS_LABEL } from '@/types';

interface OrderStatusSelectProps {
  value: OrderStatus;
  onChange: (status: OrderStatus) => void;
  disabled?: boolean;
}

export default function OrderStatusSelect({
  value,
  onChange,
  disabled = false,
}: OrderStatusSelectProps) {
  return (
    <FormControl size='small' fullWidth disabled={disabled}>
      <InputLabel>주문 상태</InputLabel>
      <Select
        value={value}
        label='주문 상태'
        onChange={(e) => onChange(e.target.value as OrderStatus)}
      >
        <MenuItem value='PENDING'>{ORDER_STATUS_LABEL.PENDING}</MenuItem>
        <MenuItem value='CONFIRMED'>{ORDER_STATUS_LABEL.CONFIRMED}</MenuItem>
        <MenuItem value='SHIPPING'>{ORDER_STATUS_LABEL.SHIPPING}</MenuItem>
        <MenuItem value='DELIVERED'>{ORDER_STATUS_LABEL.DELIVERED}</MenuItem>
        <MenuItem value='REFUNDED'>{ORDER_STATUS_LABEL.REFUNDED}</MenuItem>
      </Select>
    </FormControl>
  );
}
