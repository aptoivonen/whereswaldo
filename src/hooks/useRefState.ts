import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useRef,
  useState,
} from 'react';

function useRefState<S>(
  initialState: S
): readonly [
  state: S,
  refState: MutableRefObject<S>,
  setState: Dispatch<SetStateAction<S>>
] {
  const refState = useRef(initialState);
  const [state, setUseState] = useState(initialState);

  const setState: Dispatch<SetStateAction<S>> = (value: SetStateAction<S>) => {
    setUseState(value);
    refState.current =
      typeof value === 'function'
        ? (value as (prevState: S) => S)(refState.current)
        : value;
  };

  return [state, refState, setState] as const;
}

export default useRefState;
