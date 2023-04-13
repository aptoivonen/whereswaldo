import type { ReactNode } from 'react';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) =>
      console.log(error instanceof Error ? error.message : error),
  }),
  defaultOptions: {
    queries: {
      useErrorBoundary: (error, query) => query.state.data === undefined,
    },
  },
});

type Props = {
  children: ReactNode;
};

function QueryClientProvider({ children }: Props) {
  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
    </TanstackQueryClientProvider>
  );
}

export default QueryClientProvider;
