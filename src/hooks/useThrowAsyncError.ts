import { useState } from 'react';

function useThrowAsyncError() {
  const [, setState] = useState();

  return (error: Error) => {
    setState(() => {
      throw error;
    });
  };
}

export default useThrowAsyncError;
