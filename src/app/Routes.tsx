import { Route, Routes as RRDRoutes } from 'react-router-dom';
import RootLayout from '@/components/layout/RootLayout';
import PageLayout from '@/components/layout/PageLayout';
import HomePage from '@/pages/Home/HomePage/HomePage';
import ScoreboardPage from '@/pages/Scoreboard/ScoreboardPage/ScoreboardPage';
import LevelPage from '@/pages/Level/LevelPage/LevelPage';
import NotFoundPage from '@/pages/NotFound/NotFoundPage/NotFoundPage';

function Routes() {
  return (
    <RRDRoutes>
      <Route path="/" element={<RootLayout />}>
        <Route element={<PageLayout />}>
          <Route index element={<HomePage />} />
          <Route path="scoreboard" element={<ScoreboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="level/:levelId" element={<LevelPage />} />
      </Route>
    </RRDRoutes>
  );
}

export default Routes;
