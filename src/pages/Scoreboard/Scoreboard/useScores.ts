import { useQuery } from '@tanstack/react-query';
import type { Score } from '@/model/types';
import { AsyncReturnType } from '@/utils/types/types';

const scoresList: Score[] = [
  {
    id: '1111',
    userName: 'Aleksi',
    levelId: '1',
    time: 62,
  },
  {
    id: '2222',
    userName: 'Ilkka',
    levelId: '2',
    time: 23,
  },
  {
    id: '3333',
    userName: 'Lauri',
    levelId: '1',
    time: 12,
  },
  {
    id: '4444',
    userName: 'Lauri',
    levelId: '1',
    time: 12,
  },
  {
    id: '5555',
    userName: 'Lauri',
    levelId: '1',
    time: 12,
  },
  {
    id: '6666',
    userName: 'Lauri',
    levelId: '1',
    time: 12,
  },
  {
    id: '7777',
    userName: 'Lauri',
    levelId: '1',
    time: 12,
  },
  {
    id: '8',
    userName: 'Lauri',
    levelId: '1',
    time: 12,
  },
  {
    id: '9',
    userName: 'Lauri',
    levelId: '1',
    time: 12,
  },
  {
    id: '10',
    userName: 'Lauri',
    levelId: '1',
    time: 12,
  },
  {
    id: '11',
    userName: 'Lauri',
    levelId: '1',
    time: 12,
  },
  {
    id: '12',
    userName: 'Lauri',
    levelId: '1',
    time: 12,
  },
  {
    id: '13',
    userName: 'Lauri',
    levelId: '1',
    time: 12,
  },
  {
    id: '14',
    userName: 'Eero',
    levelId: '1',
    time: 33,
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
