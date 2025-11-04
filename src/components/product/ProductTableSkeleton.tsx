import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

export default function ProductTableSkeleton() {
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
          {Array.from({ length: 10 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton variant='text' width='80%' />
              </TableCell>
              <TableCell>
                <Skeleton variant='text' width='90%' />
              </TableCell>
              <TableCell>
                <Skeleton variant='text' width='60%' />
              </TableCell>
              <TableCell align='right'>
                <Skeleton variant='text' width='70%' sx={{ ml: 'auto' }} />
              </TableCell>
              <TableCell align='right'>
                <Skeleton variant='text' width='40%' sx={{ ml: 'auto' }} />
              </TableCell>
              <TableCell align='right'>
                <Skeleton variant='text' width='80%' sx={{ ml: 'auto' }} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
