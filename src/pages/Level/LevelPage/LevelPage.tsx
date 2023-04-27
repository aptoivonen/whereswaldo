import { Link, useParams } from 'react-router-dom';
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

  return <LevelLoader levelId={levelId} />;
}

export default LevelPage;
