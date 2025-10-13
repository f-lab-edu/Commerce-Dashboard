import { CategoryInsight } from '@/types';
import { formatCurrency, formatPercentage } from '@/utils/formatCurrency';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

interface CategoryTableProps {
  categories: CategoryInsight[];
}

export default function CategoryTable({ categories }: CategoryTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>카테고리</TableCell>
            <TableCell align='right'>매출액</TableCell>
            <TableCell align='right'>비중</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell component='th' scope='row'>
                {category.name}
              </TableCell>
              <TableCell align='right'>
                {formatCurrency(category.revenue)}
              </TableCell>
              <TableCell align='right'>
                {formatPercentage(category.percentage)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
