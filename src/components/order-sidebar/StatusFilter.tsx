import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { ORDER_STATUS_LABEL } from '@/types';
import { useOrderParams } from '@/hooks/params/useOrderParams';

export default function StatusFilter() {
  const { orderParams, updateOrderParams } = useOrderParams();

  const handleChange = (value: string) => {
    updateOrderParams({ status: value, page: 1 });
  };

  return (
    <FormControl size='small' fullWidth>
      <InputLabel>주문 상태</InputLabel>
      <Select
        value={orderParams.status}
        label='주문 상태'
        onChange={(e) => handleChange(e.target.value)}
      >
        <MenuItem value='all'>전체</MenuItem>
        <MenuItem value='PENDING'>{ORDER_STATUS_LABEL.PENDING}</MenuItem>
        <MenuItem value='CONFIRMED'>{ORDER_STATUS_LABEL.CONFIRMED}</MenuItem>
        <MenuItem value='SHIPPING'>{ORDER_STATUS_LABEL.SHIPPING}</MenuItem>
        <MenuItem value='DELIVERED'>{ORDER_STATUS_LABEL.DELIVERED}</MenuItem>
        <MenuItem value='REFUNDED'>{ORDER_STATUS_LABEL.REFUNDED}</MenuItem>
      </Select>
    </FormControl>
  );
}
