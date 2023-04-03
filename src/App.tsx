import { HashRouter, Route, Routes } from 'react-router-dom';
import QueryClientProvider from '@/components/state/QueryClientProvider';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import RootLayout from '@/components/layout/RootLayout';
import PageLayout from '@/components/layout/PageLayout';
import Scoreboard from '@/pages/Scoreboard';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route element={<PageLayout />}>
          <Route index element={<Home />} />
          <Route path="scoreboard" element={<Scoreboard />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
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
