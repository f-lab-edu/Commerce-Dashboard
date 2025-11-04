import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useProducts } from '@/hooks/queries/useProducts';
import { useProductParams } from '@/hooks/params/useProductParams';
import { formatCurrency, formatNumber } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';
import { useRouter } from 'next/router';
import ProductTableSkeleton from './ProductTableSkeleton';

export default function ProductTable() {
  const router = useRouter();
  const { getApiParams } = useProductParams();

  const { products, isLoading, isFetchingNextPage } = useProducts(getApiParams);

  if (isLoading) {
    return <ProductTableSkeleton />;
  }

  if (products.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography color='text.secondary'>상품이 없습니다</Typography>
      </Box>
    );
  }

  const handleRowClick = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>상품번호</TableCell>
            <TableCell>상품명</TableCell>
            <TableCell>카테고리</TableCell>
            <TableCell align='right'>가격</TableCell>
            <TableCell align='right'>재고</TableCell>
            <TableCell align='right'>등록일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              onClick={() => handleRowClick(product.id)}
              sx={{
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <TableCell>{product.id}</TableCell>
              <TableCell>
                <Typography variant='body2' fontWeight={600}>
                  {product.name}
                </Typography>
              </TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell align='right'>
                {formatCurrency(product.price)}
              </TableCell>
              <TableCell align='right'>{formatNumber(product.stock)}</TableCell>
              <TableCell align='right'>
                {formatDate(new Date(product.createdAt))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {isFetchingNextPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <ProductTableSkeleton />;
        </Box>
      )}
    </TableContainer>
  );
}
