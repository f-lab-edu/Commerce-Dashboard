import { Box, Card, CardContent, Skeleton } from '@mui/material';

export function KPISkeleton() {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 3,
        flexWrap: 'wrap',
      }}
    >
      {[1, 2, 3, 4, 5].map((item) => (
        <Box key={item} sx={{ flex: '1 1 200px', minWidth: 200 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Skeleton variant='text' width='60%' height={24} sx={{ mb: 1 }} />
              <Skeleton variant='text' width='80%' height={40} />
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
}
