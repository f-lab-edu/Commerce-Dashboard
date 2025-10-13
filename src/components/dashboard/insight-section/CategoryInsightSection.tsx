import { useCategoryInsights } from '@/hooks/queries/useCategoryInsights';
import { Box, Typography } from '@mui/material';
import CategoryTable from './CategoryTable';
import CategoryChart from './CategoryChart';

export default function CategoryInsightSection() {
  const { categories } = useCategoryInsights();

  return (
    <Box>
      <Typography variant='h5' component='h2' gutterBottom sx={{ mb: 3 }}>
        카테고리별 매출 인사이트
      </Typography>

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        <Box sx={{ flex: '1 1 450px', minWidth: 0, height: 500 }}>
          <CategoryTable categories={categories} />
        </Box>

        <Box sx={{ flex: '1 1 450px', minWidth: 0, height: 500 }}>
          <CategoryChart categories={categories} />
        </Box>
      </Box>
    </Box>
  );
}
