import type { ReactNode } from 'react';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
} from '@tanstack/react-query';
import { toast } from '@/components/common';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      toast.custom(() => (
        <div className="rounded-md bg-red px-6 py-4 text-white shadow-md">
          Error: {error instanceof Error ? error.message : String(error)}
        </div>
      ));
    },
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
