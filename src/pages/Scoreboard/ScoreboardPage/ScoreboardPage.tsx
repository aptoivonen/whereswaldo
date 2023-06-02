import { useSearchParams } from 'react-router-dom';
import Scoreboard from '../Scoreboard/Scoreboard';

function ScoreboardPage() {
  const [searchParams] = useSearchParams();
  const playerId = searchParams.get('playerId');

  return (
    <>
      <h1 className="text-center text-3xl font-bold">Scoreboard</h1>
      <Scoreboard activePlayerId={playerId} />
    </>
  );
}

export default ScoreboardPage;
