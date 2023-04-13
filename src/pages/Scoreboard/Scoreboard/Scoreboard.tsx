import useScores from './useScores';
import formatTime from '@/utils/helpers/formatTime';

function isEven(index: number) {
  return index % 2 === 0;
}

function isActivePlayerRow(activePlayerId: string | null, rowPlayerId: string) {
  return activePlayerId && activePlayerId === rowPlayerId;
}

function scrollRowIntoView(activePlayerId: string | null, rowPlayerId: string) {
  return isActivePlayerRow(activePlayerId, rowPlayerId)
    ? (element: HTMLTableRowElement | null): void => element?.scrollIntoView()
    : undefined;
}

export type ScoreboardProps = {
  activePlayerId: string | null;
};

function Scoreboard({ activePlayerId }: ScoreboardProps) {
  const scores = useScores();

  if (!scores.data) {
    return <div>Loading...</div>;
  }

  return (
    <table className="mt-4 w-full table-auto text-left">
      <thead className="border-b bg-light font-medium">
        <tr>
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
        {scores.data.map((score, index) => (
          <tr
            key={score.id}
            className={`border-b 
            ${
              isActivePlayerRow(activePlayerId, score.id)
                ? 'scroll-mt-32 bg-gold sm:scroll-mt-40'
                : ''
            }
            ${
              !isActivePlayerRow(activePlayerId, score.id) && isEven(index)
                ? 'bg-transparent'
                : 'bg-light'
            }`}
            ref={scrollRowIntoView(activePlayerId, score.id)}
          >
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

export default Scoreboard;
