import { Box, Card, CardContent, Skeleton, Grid } from '@mui/material';

export function CategoryInsightSkeleton() {
  return (
    <Box sx={{ mt: 4 }}>
      <Skeleton variant='text' width='30%' height={32} sx={{ mb: 3 }} />
      <Grid container spacing={3}>
        {[1, 2].map((item) => (
          <Grid key={item} size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: 500 }}>
              <CardContent sx={{ height: '100%' }}>
                <Skeleton
                  variant='text'
                  width='50%'
                  height={28}
                  sx={{ mb: 2 }}
                />
                <Skeleton
                  variant='rectangular'
                  width='100%'
                  height={350}
                  sx={{ mb: 3, borderRadius: 1 }}
                />
                <Skeleton variant='text' width='60%' height={20} />
                <Skeleton variant='text' width='40%' height={20} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
