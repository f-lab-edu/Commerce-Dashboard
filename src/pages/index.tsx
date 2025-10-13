import { SuspenseBoundary } from '@/components/boundaries/SuspenseBoundary';
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

export default function Home() {
  return (
    <Container maxWidth='lg'>
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
    </Container>
  );
}
