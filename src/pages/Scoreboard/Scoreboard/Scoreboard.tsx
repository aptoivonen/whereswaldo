import useScores from './useScores';

function Scoreboard() {
  const scores = useScores();

  if (!scores.data) {
    return <div>Loading...</div>;
  }

  return (
    <table className="w-full table-auto text-left">
      <thead>
        <tr>
          <th>Username</th>
          <th>Level</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
          <td>Malcolm Lockyer</td>
          <td>1961</td>
        </tr>
        <tr>
          <td>Witchy Woman</td>
          <td>The Eagles</td>
          <td>1972</td>
        </tr>
        <tr>
          <td>Shining Star</td>
          <td>Earth, Wind, and Fire</td>
          <td>1975</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Scoreboard;
