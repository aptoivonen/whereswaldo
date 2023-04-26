import { Link, useParams } from 'react-router-dom';
import LevelViewer from '../LevelViewer/LevelViewer';
import { ErrorBoundary } from '@/components/common';

function FallbackRender({ error }: { error: Error }) {
  return <span className="italic">{`Error in level; ${error.message}`}</span>;
}

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
      <LevelViewer levelId={levelId} />
    </ErrorBoundary>
  );
}

export default LevelPage;
