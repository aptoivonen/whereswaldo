import { Link, useParams } from 'react-router-dom';
import LevelViewer from '../LevelViewer/LevelViewer';
import { ErrorBoundary } from '@/components/common';

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
    <>
      <h1 className="absolute top-4 left-4 z-20 bg-red px-2 py-1 text-white">
        Level: {levelId}
      </h1>
      <ErrorBoundary
        fallback={
          <span className="italic">{`Error loading level ${levelId}`}</span>
        }
      >
        <LevelViewer levelId={levelId} />
      </ErrorBoundary>
    </>
  );
}

export default LevelPage;
