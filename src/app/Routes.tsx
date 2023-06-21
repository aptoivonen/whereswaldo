import { Route, Routes as RRDRoutes } from 'react-router-dom';
import loadable from '@loadable/component';
import RootLayout from '@/components/layout/RootLayout';
import PageLayout from '@/components/layout/PageLayout';

const HomePage = loadable(() => import('@/pages/Home/HomePage/HomePage'));
const ScoreboardPage = loadable(
  () => import('@/pages/Scoreboard/ScoreboardPage/ScoreboardPage')
);
const LevelPage = loadable(() => import('@/pages/Level/LevelPage/LevelPage'));
const NotFoundPage = loadable(
  () => import('@/pages/NotFound/NotFoundPage/NotFoundPage')
);

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
