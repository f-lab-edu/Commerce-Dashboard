import { TextField } from '@mui/material';
import { useProductParams } from '@/hooks/params/useProductParams';
import { useDebouncedInput } from '@/hooks/useDebouncedInput';
import { useCallback } from 'react';

export default function ProductSearchBar() {
  const { productParams, updateProductParams } = useProductParams();

  const [inputValue, , setInputValue] = useDebouncedInput({
    initialValue: productParams.search,
    delay: 300,
    onDebouncedChange: useCallback(
      (value: string) => {
        updateProductParams({ search: value, page: 1 });
      },
      [updateProductParams],
    ),
  });

  return (
    <TextField
      fullWidth
      size='small'
      placeholder='상품명 또는 상품번호 검색'
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
}
