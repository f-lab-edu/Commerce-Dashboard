import { Box, Card, CardContent, Skeleton } from '@mui/material';

export default function CalendarSkeleton() {
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Skeleton variant='text' width={150} height={40} />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Skeleton variant='rectangular' width={80} height={36} />
            <Skeleton variant='rectangular' width={40} height={36} />
            <Skeleton variant='rectangular' width={40} height={36} />
          </Box>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 1,
            mb: 1,
          }}
        >
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton
              key={i}
              variant='text'
              width='100%'
              height={24}
              sx={{ mx: 'auto' }}
            />
          ))}
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 1,
          }}
        >
          {Array.from({ length: 35 }).map((_, i) => (
            <Skeleton
              key={i}
              variant='rectangular'
              sx={{
                height: 100,
                borderRadius: 1,
              }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
