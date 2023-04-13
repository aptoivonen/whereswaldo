import { useQuery } from '@tanstack/react-query';
import type { Score } from '@/model/types';
import { AsyncReturnType } from '@/utils/types/types';

const scoresList: Score[] = [
  {
    id: '1111',
    playerId: 'Aleksi',
    levelId: '1',
    time: 62,
  },
  {
    id: '2222',
    playerId: 'Ilkka',
    levelId: '2',
    time: 23,
  },
  {
    id: '3333',
    playerId: 'Lauri',
    levelId: '1',
    time: 12,
  },
];

function getScores(): Promise<Score[]> {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  }).then(() => scoresList);
}

function useScores() {
  const queryFn = getScores;
  const queryKey = ['scores'];

  type TError = Error;
  type TData = AsyncReturnType<typeof queryFn>;
  const { data, error } = useQuery<TData, TError, TData>({
    queryKey,
    queryFn,
  });
  return { data, error };
}

export default useScores;
