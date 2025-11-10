import { SuspenseBoundary } from '@/components/boundaries/SuspenseBoundary';
import CalendarSkeleton from '@/components/calendar/CalendarSkeleton';
import { CategoryInsightSkeleton } from '@/components/dashboard/insight-section/CategoryInsightSkeleton';
import { KPISkeleton } from '@/components/dashboard/KPISkeleton';
import { Box, Container } from '@mui/material';
import dynamic from 'next/dynamic';

const KPISection = dynamic(() => import('@/components/dashboard/KPISection'), {
  ssr: false,
});

const CategoryInsightSection = dynamic(
  () => import('@/components/dashboard/insight-section/CategoryInsightSection'),
  {
    ssr: false,
  },
);

const OrderSidebar = dynamic(
  () => import('@/components/order-sidebar/OrderSidebar'),
  { ssr: false },
);

const OrderDataCalendar = dynamic(
  () => import('@/components/calendar/OrderDataCalendar'),
  {
    ssr: false,
  },
);

export default function Home() {
  return (
    <Box sx={{ position: 'relative' }}>
      <Container maxWidth='lg' sx={{ mr: '400px' }}>
        <Box sx={{ py: 4 }}>
          <SuspenseBoundary fallback={<KPISkeleton />}>
            <KPISection />
          </SuspenseBoundary>
        </Box>

        <Box sx={{ mt: 6 }}>
          <SuspenseBoundary fallback={<CategoryInsightSkeleton />}>
            <CategoryInsightSection />
          </SuspenseBoundary>
        </Box>

        <Box sx={{ mt: 6 }}>
          <SuspenseBoundary fallback={<CalendarSkeleton />}>
            {/* <Calendar /> */}
            <OrderDataCalendar />
          </SuspenseBoundary>
        </Box>
      </Container>

      <OrderSidebar />
    </Box>
  );
}
