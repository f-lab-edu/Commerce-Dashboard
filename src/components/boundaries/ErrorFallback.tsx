import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { FallbackProps } from 'react-error-boundary';

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Card
      sx={{
        maxWidth: 600,
        mx: 'auto',
        my: 4,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            py: 3,
          }}
        >
          <ErrorOutlineIcon sx={{ fontSize: 60, color: 'error.main' }} />

          <Typography variant='h6' component='h2' gutterBottom>
            데이터를 불러오지 못했습니다
          </Typography>

          <Typography variant='body2' color='text.secondary' textAlign='center'>
            일시적인 오류가 발생했습니다.
            <br />
            다시 시도해주세요.
          </Typography>

          {process.env.NODE_ENV === 'development' && (
            <Box
              sx={{
                mt: 2,
                p: 2,
                bgcolor: 'grey.100',
                borderRadius: 1,
                width: '100%',
              }}
            >
              <Typography variant='caption' component='pre'>
                {error.message}
              </Typography>
            </Box>
          )}

          <Button
            variant='contained'
            onClick={resetErrorBoundary}
            sx={{ mt: 2 }}
          >
            다시 시도
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
