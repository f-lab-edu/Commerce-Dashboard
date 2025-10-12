import { ReactNode } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { ErrorBoundary } from 'react-error-boundary';

interface GlobalErrorBoundaryProps {
  children: ReactNode;
}

function GlobalErrorFallback({ error }: { error: Error }) {
  return (
    <Container maxWidth='sm'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          gap: 3,
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 80, color: 'error.main' }} />
        <Typography variant='h4' component='h1' gutterBottom>
          문제가 발생했습니다
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          예상치 못한 오류가 발생했습니다.
          <br />
          페이지를 새로고침하거나 홈으로 돌아가주세요.
        </Typography>

        {process.env.NODE_ENV === 'development' && (
          <Box
            sx={{
              mt: 2,
              p: 2,
              bgcolor: 'grey.100',
              borderRadius: 1,
              width: '100%',
              textAlign: 'left',
            }}
          >
            <Typography
              variant='caption'
              component='pre'
              sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
            >
              {error.message}
            </Typography>
          </Box>
        )}
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant='outlined' onClick={() => window.location.reload()}>
          새로고침
        </Button>
        <Button
          variant='contained'
          onClick={() => (window.location.href = '/')}
        >
          홈으로 이동
        </Button>
      </Box>
    </Container>
  );
}

export function GlobalErrorBoundary({ children }: GlobalErrorBoundaryProps) {
  return (
    <ErrorBoundary
      FallbackComponent={GlobalErrorFallback}
      onError={(error, errorInfo) => {
        console.error('Global Error:', error, errorInfo);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
