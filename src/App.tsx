import { HashRouter, Route, Routes } from 'react-router-dom';
import QueryClientProvider from '@/components/state/QueryClientProvider';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export function WrappedApp() {
  return (
    <HashRouter>
      <QueryClientProvider>
        <App />
      </QueryClientProvider>
    </HashRouter>
  );
}
