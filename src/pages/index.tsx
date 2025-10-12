import { SuspenseBoundary } from '@/components/boundaries/SuspenseBoundary';
import { KPISkeleton } from '@/components/dashboard/KPISkeleton';
import { Box, Container } from '@mui/material';
import dynamic from 'next/dynamic';

const KPISection = dynamic(() => import('@/components/dashboard/KPISection'), {
  ssr: false,
});

export default function Home() {
  return (
    <Container maxWidth='lg'>
      <Box sx={{ py: 4 }}>
        <SuspenseBoundary fallback={<KPISkeleton />}>
          <KPISection />
        </SuspenseBoundary>
      </Box>
    </Container>
  );
}
