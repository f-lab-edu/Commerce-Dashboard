import { useCategoryInsights } from '@/hooks/queries/useCategoryInsights';
import { Box, Grid, Typography } from '@mui/material';
import CategoryTable from './CategoryTable';

export default function CategoryInsightSection() {
  const { categories } = useCategoryInsights();

  return (
    <Box>
      <Typography variant='h5' component='h2' gutterBottom sx={{ mb: 3 }}>
        카테고리별 매출 인사이트
      </Typography>

      <Grid container spacing={3}>
        <Grid>
          <CategoryTable categories={categories} />
        </Grid>

        <Grid>{/* <CategoryChart categories={categories} /> */}</Grid>
      </Grid>
    </Box>
  );
}
