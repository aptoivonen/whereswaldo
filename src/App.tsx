import { HashRouter, Route, Routes } from 'react-router-dom';
import QueryClientProvider from '@/components/state/QueryClientProvider';
import { ErrorBoundary, FallbackRender } from './components/common';
import RootLayout from '@/components/layout/RootLayout';
import PageLayout from '@/components/layout/PageLayout';
import HomePage from '@/pages/Home/HomePage/HomePage';
import ScoreboardPage from '@/pages/Scoreboard/ScoreboardPage/ScoreboardPage';
import LevelPage from '@/pages/Level/LevelPage/LevelPage';
import NotFoundPage from '@/pages/NotFound/NotFoundPage/NotFoundPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route element={<PageLayout />}>
          <Route index element={<HomePage />} />
          <Route path="scoreboard" element={<ScoreboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="level/:levelId" element={<LevelPage />} />
      </Route>
    </Routes>
  );
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
