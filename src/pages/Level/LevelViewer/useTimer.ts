import { useEffect, useState } from 'react';

function useTimer() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => setCounter((c) => c + 1), 1000);

    return () => clearInterval(intervalId);
  }, []);

  return counter;
}

export default useTimer;
