// src/components/dashboard/KPISection.tsx
import { Box } from '@mui/material';
import { useKPI } from '@/hooks/queries/useKPI';
import KPICard from './KPICard';

export default function KPISection() {
  const { kpi } = useKPI();

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 3,
        flexWrap: 'wrap',
      }}
    >
      <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
        <KPICard title='연매출' value={kpi.annualRevenue} format='currency' />
      </Box>

      <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
        <KPICard title='주문수' value={kpi.totalOrders} format='number' />
      </Box>

      <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
        <KPICard
          title='평균 주문금액'
          value={kpi.averageOrderAmount}
          format='currency'
        />
      </Box>

      <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
        <KPICard title='환불 건수' value={kpi.refundCount} format='number' />
      </Box>

      <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
        <KPICard title='환불액' value={kpi.refundAmount} format='currency' />
      </Box>
    </Box>
  );
}
