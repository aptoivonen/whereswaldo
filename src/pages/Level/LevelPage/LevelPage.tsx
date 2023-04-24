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
    <ErrorBoundary
      fallback={
        <span className="italic">{`Error loading level ${levelId}`}</span>
      }
    >
      <LevelViewer levelId={levelId} />
    </ErrorBoundary>
  );
}

export default LevelPage;
