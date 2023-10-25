import { useSearchParams } from 'react-router-dom';
import Scoreboard from '../Scoreboard/Scoreboard';

function ScoreboardPage() {
  const [searchParams] = useSearchParams();
  const scoreId = searchParams.get('scoreId');

  return (
    <>
      <h1 className="text-center text-3xl font-bold">Scoreboard</h1>
      <Scoreboard activeScoreId={scoreId} />
    </>
  );
}

export default ScoreboardPage;
