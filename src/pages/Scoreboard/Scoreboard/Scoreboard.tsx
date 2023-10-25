import { Link } from 'react-router-dom';
import { withErrorBoundary, FallbackRender } from '@/components/common';
import useScores from './useScores';
import formatTime from '@/utils/helpers/formatTime';
import type { Score } from '@/model/schemas';
import { scrollRowIntoView, getRowColor, isActivePlayerRow } from './helpers';

export type ScoreboardProps = {
  activeScoreId: string | null;
};

function Scoreboard({ activeScoreId }: ScoreboardProps) {
  const scores = useScores();

  if (!scores.data) {
    return <div>Loading...</div>;
  }

  function createScoreTable(scoresList: Score[]) {
    return (
      <table className="mt-4 w-full table-auto border-separate border-spacing-0 rounded-xl border-8 border-red text-left">
        <thead className="border-b bg-light text-sm font-medium sm:text-base">
          <tr>
            <th scope="col" className="px-3 py-2 sm:px-6">
              #
            </th>
            <th scope="col" className="px-3 py-2 sm:px-6">
              Username
            </th>
            <th scope="col" className="px-3 py-2 sm:px-6">
              Level
            </th>
            <th scope="col" className="px-3 py-2 sm:px-6">
              Time
            </th>
          </tr>
        </thead>
        <tbody>
          {scoresList.map((score, index) => (
            <tr
              key={score.id}
              className={`border-b text-base ${getRowColor(
                activeScoreId,
                score.id,
                index
              )}`}
              ref={scrollRowIntoView(activeScoreId, score.id)}
              data-cy={
                isActivePlayerRow(activeScoreId, score.id)
                  ? 'active-score-row'
                  : undefined
              }
            >
              <td className="whitespace-nowrap px-6 py-4 font-bold">
                {index + 1}
              </td>
              <td
                className="whitespace-nowrap px-6 py-4 font-bold"
                data-cy={
                  isActivePlayerRow(activeScoreId, score.id)
                    ? 'active-score-name'
                    : undefined
                }
              >
                {score.userName}
              </td>
              <td
                className="whitespace-nowrap px-6 py-4 font-medium"
                data-cy={
                  isActivePlayerRow(activeScoreId, score.id)
                    ? 'active-score-level-id'
                    : undefined
                }
              >
                {score.levelId}
              </td>
              <td
                className="whitespace-nowrap px-6 py-4 font-medium"
                data-cy={
                  isActivePlayerRow(activeScoreId, score.id)
                    ? 'active-score-time'
                    : undefined
                }
              >
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
      <Link
        to="/"
        className="text-red underline hover:text-red-light"
        data-cy="playing-link"
      >
        playing
      </Link>{' '}
      to create one!
    </div>
  );
}

export default withErrorBoundary(Scoreboard, {
  fallbackRender: FallbackRender,
});
