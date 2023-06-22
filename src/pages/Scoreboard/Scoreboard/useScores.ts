import { useQuery } from '@tanstack/react-query';
import type { Score } from '@/model/types';
import type { AsyncReturnType } from '@/utils/types/types';
import backendApi from '@/api/backendApi';

function timeAscending(a: Score, b: Score) {
  return a.time - b.time;
}

async function getScores(): Promise<Score[]> {
  const rawScores = (await backendApi.getAll('scores')) as Score[];
  return rawScores.sort(timeAscending);
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
