import { Box, TextField, InputAdornment } from '@mui/material';
import { useOrderParams } from '@/hooks/params/useOrderParams';
import { useDebouncedInput } from '@/hooks/useDebouncedInput';
import { useCallback } from 'react';

export default function AmountFilter() {
  const { orderParams, updateOrderParams } = useOrderParams();

  const [minValue, , setMinValue] = useDebouncedInput({
    initialValue: orderParams.minAmount?.toString() ?? '',
    delay: 300,
    onDebouncedChange: useCallback(
      (value: string) => {
        const num = value === '' ? null : Number(value);
        updateOrderParams({ minAmount: num, page: 1 });
      },
      [updateOrderParams],
    ),
  });

  const [maxValue, , setMaxValue] = useDebouncedInput({
    initialValue: orderParams.maxAmount?.toString() ?? '',
    delay: 500,
    onDebouncedChange: useCallback(
      (value: string) => {
        const num = value === '' ? null : Number(value);
        updateOrderParams({ maxAmount: num, page: 1 });
      },
      [updateOrderParams],
    ),
  });

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <TextField
        type='number'
        label='최소 금액'
        size='small'
        value={minValue}
        onChange={(e) => setMinValue(e.target.value)}
        InputProps={{
          endAdornment: <InputAdornment position='end'>원</InputAdornment>,
        }}
        sx={{ flex: 1 }}
      />
      <TextField
        type='number'
        label='최대 금액'
        size='small'
        value={maxValue}
        onChange={(e) => setMaxValue(e.target.value)}
        InputProps={{
          endAdornment: <InputAdornment position='end'>원</InputAdornment>,
        }}
        sx={{ flex: 1 }}
      />
    </Box>
  );
}
