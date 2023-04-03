import { Link, useParams } from 'react-router-dom';

function LevelPage() {
  const { levelId } = useParams();

  return (
    <>
      <h1>Level: {levelId}</h1>
      <Link to="/">Go Home</Link>
    </>
  );
}

export default LevelPage;
