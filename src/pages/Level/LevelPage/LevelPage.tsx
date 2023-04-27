import { Link, useParams } from 'react-router-dom';
import { ErrorBoundary, FallbackRender } from '@/components/common';
import LevelLoader from '../LevelLoader.tsx/LevelLoader';

function LevelPage() {
  const { levelId } = useParams();

  if (!levelId) {
    return (
      <p>
        No level id provided. Select a level from the{' '}
        <Link to="/">home page</Link>
      </p>
    );
  }

  return (
    <ErrorBoundary fallbackRender={FallbackRender}>
      <LevelLoader levelId={levelId} />
    </ErrorBoundary>
  );
}

export default LevelPage;
