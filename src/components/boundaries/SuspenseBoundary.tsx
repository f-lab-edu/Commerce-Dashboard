import { ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './ErrorFallback';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

interface SuspenseBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  errorFallback?: ReactNode;
  resetKeys?: unknown[];
}

export function SuspenseBoundary({
  children,
  fallback = <div>Loading...</div>,
  errorFallback,
  resetKeys,
}: SuspenseBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          resetKeys={resetKeys}
          fallbackRender={(props) =>
            errorFallback ? <>{errorFallback}</> : <ErrorFallback {...props} />
          }
        >
          <Suspense fallback={fallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
