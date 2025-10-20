import { Box, CircularProgress } from '@mui/material';

export default function OrderListFallback() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 4,
      }}
    >
      <CircularProgress />
    </Box>
  );
}
