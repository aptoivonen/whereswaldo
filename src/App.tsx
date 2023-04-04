import { HashRouter, Route, Routes } from 'react-router-dom';
import QueryClientProvider from '@/components/state/QueryClientProvider';
import RootLayout from '@/components/layout/RootLayout';
import PageLayout from '@/components/layout/PageLayout';
import HomePage from '@/pages/HomePage';
import ScoreboardPage from '@/pages/ScoreboardPage';
import LevelPage from '@/pages/LevelPage';
import NotFoundPage from '@/pages/NotFoundPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route element={<PageLayout />}>
          <Route index element={<HomePage />} />
          <Route path="scoreboard" element={<ScoreboardPage />} />
        </Route>
        <Route path="level/:levelId" element={<LevelPage />} />
        <Route path="*" element={<NotFoundPage />} />
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
