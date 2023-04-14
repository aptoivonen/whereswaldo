import { Link } from 'react-router-dom';
import useScores from './useScores';
import formatTime from '@/utils/helpers/formatTime';
import type { Score } from '@/model/types';

function isActivePlayerRow(activePlayerId: string | null, rowPlayerId: string) {
  return activePlayerId && activePlayerId === rowPlayerId;
}

function scrollRowIntoView(activePlayerId: string | null, rowPlayerId: string) {
  return isActivePlayerRow(activePlayerId, rowPlayerId)
    ? (element: HTMLTableRowElement | null): void => element?.scrollIntoView()
    : undefined;
}

function isEven(index: number) {
  return index % 2 === 0;
}

function getRowColor(
  activePlayerId: string | null,
  rowPlayerId: string,
  rowIndex: number
) {
  if (isActivePlayerRow(activePlayerId, rowPlayerId)) {
    return 'bg-gold';
  }
  return isEven(rowIndex) ? 'bg-transparent' : 'bg-light';
}

export type ScoreboardProps = {
  activePlayerId: string | null;
};

function Scoreboard({ activePlayerId }: ScoreboardProps) {
  const scores = useScores();

  if (!scores.data) {
    return <div>Loading...</div>;
  }

  function createScoreTable(scoresList: Score[]) {
    return (
      <table className="mt-4 w-full table-auto text-left">
        <thead className="border-b bg-light font-medium">
          <tr>
            <th scope="col" className="px-6 py-4">
              #
            </th>
            <th scope="col" className="px-6 py-4">
              Username
            </th>
            <th scope="col" className="px-6 py-4">
              Level
            </th>
            <th scope="col" className="px-6 py-4">
              Time
            </th>
          </tr>
        </thead>
        <tbody>
          {scoresList.map((score, index) => (
            <tr
              key={score.id}
              className={`border-b ${getRowColor(
                activePlayerId,
                score.id,
                index
              )}`}
              ref={scrollRowIntoView(activePlayerId, score.id)}
            >
              <td className="whitespace-nowrap px-6 py-4 text-xl font-bold">
                {index + 1}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-xl font-bold">
                {score.id}
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                {score.levelId}
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                {formatTime(score.time)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return scores.data.length > 0 ? (
    createScoreTable(scores.data)
  ) : (
    <div>
      No scores yet. Start{' '}
      <Link to="/" className="text-red underline hover:text-red-light">
        playing
      </Link>{' '}
      to create one!
    </div>
  );
}

export default Scoreboard;
