import InViewTrigger from '@/components/InViewTrigger/InViewTrigger';
import CategoryFilter from '@/components/product/CategoryFilter';
import ProductSearchBar from '@/components/product/ProductSearchBar';
import ProductTable from '@/components/product/ProductTable';
import { useProductParams } from '@/hooks/params/useProductParams';
import { useProducts } from '@/hooks/queries/useProducts';
import { Box, Container, Typography } from '@mui/material';

export default function ProductsPage() {
  const { getApiParams } = useProductParams();
  const { fetchNextPage, hasNextPage, isFetchingNextPage } =
    useProducts(getApiParams);

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant='h4' component='h1' gutterBottom fontWeight={600}>
          상품 관리
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          등록된 상품을 조회하고 관리할 수 있습니다
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          mb: 3,
          flexWrap: 'wrap',
        }}
      >
        <Box sx={{ flex: '1 1 300px' }}>
          <ProductSearchBar />
        </Box>
        <CategoryFilter />
      </Box>

      <ProductTable />

      {hasNextPage && (
        <InViewTrigger
          onInView={() => fetchNextPage()}
          rootMargin='100px'
          disabled={isFetchingNextPage}
        >
          <Box sx={{ py: 2, textAlign: 'center' }}>
            <Typography variant='body2' color='text.secondary'>
              스크롤하여 더보기
            </Typography>
          </Box>
        </InViewTrigger>
      )}

      {!hasNextPage && (
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Typography variant='caption' color='text.secondary'>
            모든 상품을 불러왔습니다
          </Typography>
        </Box>
      )}
    </Container>
  );
}
