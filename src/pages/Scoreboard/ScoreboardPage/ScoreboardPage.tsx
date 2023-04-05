import { Link, useSearchParams } from 'react-router-dom';

function ScoreboardPage() {
  const [searchParams] = useSearchParams();
  const playerId = searchParams.get('playerId');

  return (
    <>
      <h1>Scoreboard</h1>
      {!!playerId && <p>Searched playerId: {playerId}</p>}
      <Link to="/">Go Home</Link>
    </>
  );
}

export default ScoreboardPage;
