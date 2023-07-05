import type { ReactNode } from 'react';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
} from '@tanstack/react-query';
import { Toast, toast } from '@/components/common';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      toast.custom(() => (
        <Toast variant="danger">
          Error: {error instanceof Error ? error.message : String(error)}
        </Toast>
      ));
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      toast.custom(() => (
        <Toast variant="danger">
          Error: {error instanceof Error ? error.message : String(error)}
        </Toast>
      ));
    },
  }),
  defaultOptions: {
    queries: {
      useErrorBoundary: (error, query) => query.state.data === undefined,
      retry: false,
    },
    mutations: {
      useErrorBoundary: true,
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
