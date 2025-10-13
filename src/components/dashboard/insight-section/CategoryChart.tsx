import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Paper, Box } from '@mui/material';
import type { CategoryInsight } from '@/types';

interface CategoryChartProps {
  categories: CategoryInsight[];
}

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884D8',
  '#82CA9D',
  '#FFC658',
  '#FF6B6B',
  '#4ECDC4',
  '#95E1D3',
];

export default function CategoryChart({ categories }: CategoryChartProps) {
  const chartData = categories.map((cat) => ({
    name: cat.name,
    value: cat.revenue / 100000000,
    percentage: cat.percentage,
  }));

  return (
    <Paper sx={{ p: 0, height: '100%' }}>
      <Box sx={{ width: '100%', height: '100%', minHeight: 500 }}>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' angle={-45} textAnchor='end' height={80} />
            <YAxis
              label={{
                value: '매출액 (억원)',
                angle: -90,
                position: 'insideLeft',
              }}
            />
            <Tooltip
              formatter={(value: number) => [
                `${value.toFixed(1)}억원`,
                '매출액',
              ]}
            />
            <Bar dataKey='value' radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}
