import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { CATEGORIES } from '@/types';
import { useProductParams } from '@/hooks/params/useProductParams';

export default function CategoryFilter() {
  const { productParams, updateProductParams } = useProductParams();

  const handleChange = (value: string) => {
    updateProductParams({ category: value, page: 1 });
  };

  return (
    <FormControl size='small' sx={{ minWidth: 200 }}>
      <InputLabel>카테고리</InputLabel>
      <Select
        value={productParams.category}
        label='카테고리'
        onChange={(e) => handleChange(e.target.value)}
      >
        <MenuItem value=''>전체</MenuItem>
        {CATEGORIES.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
