import { HashRouter } from 'react-router-dom';
import QueryClientProvider from '@/components/state/QueryClientProvider';
import { ErrorBoundary, FallbackRender } from '@/components/common';
import Routes from './Routes';

export function App() {
  return <Routes />;
}

export function WrappedApp() {
  return (
    <HashRouter>
      <QueryClientProvider>
        <ErrorBoundary fallbackRender={FallbackRender}>
          <App />
        </ErrorBoundary>
      </QueryClientProvider>
    </HashRouter>
  );
}
