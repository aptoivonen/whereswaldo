import { useSearchParams } from 'react-router-dom';
import { ErrorBoundary } from '@/components/common';
import Scoreboard from '../Scoreboard/Scoreboard';

function ScoreboardPage() {
  const [searchParams] = useSearchParams();
  const playerId = searchParams.get('playerId');

  return (
    <>
      <h1 className="text-center text-3xl font-bold">Scoreboard</h1>
      {!!playerId && <p>Searched playerId: {playerId}</p>}
      <ErrorBoundary
        fallback={<span className="italic">Error loading levels.</span>}
      >
        <Scoreboard activePlayerId={playerId} />
      </ErrorBoundary>
    </>
  );
}

export default ScoreboardPage;
