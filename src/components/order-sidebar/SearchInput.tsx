import {
  TextField,
  Autocomplete,
  CircularProgress,
  Box,
  Typography,
  Chip,
} from '@mui/material';
import { useCallback } from 'react';
import { useOrderSearch } from '@/hooks/queries/useOrders';
import { useOrderParams } from '@/hooks/params/useOrderParams';
import { OrderDTO } from '@/types/dto';
import { formatCurrency } from '@/utils/formatCurrency';
import { ORDER_STATUS_LABEL } from '@/types';
import { useModal } from '@/hooks/useModal';
import OrderDetailModal from './OrderDetailModal';
import { useDebouncedInput } from '@/hooks/useDebouncedInput';

export default function SearchInput() {
  const { orderParams, updateOrderParams } = useOrderParams();
  const modal = useModal();

  const [inputValue, debouncedValue, setInputValue] = useDebouncedInput({
    initialValue: orderParams.search,
    delay: 300,
    onDebouncedChange: useCallback(
      (value: string) => {
        updateOrderParams({ search: value, page: 1 });
      },
      [updateOrderParams],
    ),
  });

  const { data, isLoading } = useOrderSearch({
    query: debouncedValue,
  });

  const orders = data?.data ?? [];

  const handleSelect = (order: OrderDTO | null) => {
    if (order) {
      modal.open({
        title: '주문 상세',
        content: <OrderDetailModal orderId={order.id} />,
        confirmText: '닫기',
      });
      setInputValue('');
    }
  };

  return (
    <Autocomplete
      freeSolo
      options={orders}
      loading={isLoading}
      value={null}
      inputValue={inputValue}
      onInputChange={(_, newValue) => setInputValue(newValue)}
      onChange={(_, newValue) => {
        if (typeof newValue !== 'string') {
          handleSelect(newValue);
        }
      }}
      getOptionLabel={(option) => {
        if (typeof option === 'string') return option;
        return `${option.id} - ${option.productName}`;
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder='주문번호, 상품명, 고객명 검색'
          size='small'
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? <CircularProgress size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <Box component='li' {...props} key={option.id}>
          <Box sx={{ width: '100%' }}>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}
            >
              <Typography variant='body2' fontWeight={600}>
                {option.productName}
              </Typography>
              <Chip
                label={ORDER_STATUS_LABEL[option.status]}
                size='small'
                sx={{ height: 20 }}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant='caption' color='text.secondary'>
                {option.id}
              </Typography>
              <Typography variant='caption' fontWeight={600}>
                {formatCurrency(option.amount)}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
      noOptionsText={
        inputValue ? '검색 결과가 없습니다' : '검색어를 입력하세요'
      }
    />
  );
}
