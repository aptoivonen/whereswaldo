import { useEffect, useRef, useState } from 'react';

function useTimer() {
  const [counter, setCounter] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | undefined>();

  useEffect(() => {
    const intervalId = setInterval(() => setCounter((c) => c + 1), 1000);
    intervalRef.current = intervalId;

    return () => clearInterval(intervalId);
  }, []);

  const stop = () => {
    clearInterval(intervalRef.current);
  };

  return { counter, stop };
}

export default useTimer;
