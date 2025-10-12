import { formatCurrency, formatNumber } from '@/utils/formatCurrency';
import { Card, CardContent, Typography } from '@mui/material';

interface KPICardProps {
  title: string;
  value: number;
  format?: 'currency' | 'number';
}

export default function KPICard({
  title,
  value,
  format = 'number',
}: KPICardProps) {
  const formattedValue =
    format === 'currency' ? formatCurrency(value) : formatNumber(value);

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography color='text.secondary' gutterBottom>
          {title}
        </Typography>
        <Typography variant='h6' component='div'>
          {formattedValue}
        </Typography>
      </CardContent>
    </Card>
  );
}
