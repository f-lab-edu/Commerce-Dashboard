import type { AppProps } from 'next/app';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { GlobalErrorBoundary } from '@/components/boundaries/GlobalErrorBoundary';

if (process.env.NODE_ENV === 'development') {
  if (typeof window !== 'undefined') {
    import('@/mocks/browser').then(({ worker }) => {
      worker.start({
        onUnhandledRequest: 'bypass',
      });
    });
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalErrorBoundary>
      <Component {...pageProps} />;
    </GlobalErrorBoundary>
  );
}
