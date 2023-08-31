import { useCallback } from 'react';
import { useRefState } from '@/hooks';
import type { Character } from '@/model/schemas';
import type { CharactersFound } from '../types/types';

function useCharactersFound(charactersInLevel: Character[]) {
  const [charactersFound, charactersFoundRef, setCharactersFound] = useRefState(
    Object.fromEntries(
      charactersInLevel.map((key) => [key, false])
    ) as CharactersFound
  );

  const setFoundCharacter: (character: Character) => void = useCallback(
    (character: Character) => {
      setCharactersFound((charsFound) => ({
        ...charsFound,
        [character]: true,
      }));
    },
    [setCharactersFound]
  );

  return [charactersFound, charactersFoundRef, setFoundCharacter] as const;
}

export default useCharactersFound;
