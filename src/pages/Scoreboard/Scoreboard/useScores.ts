import { useQuery } from '@tanstack/react-query';
import type { AsyncReturnType } from '@/utils/types/types';
import backendApi from '@/api/backendApi';
import { ScoresSchema } from '@/model/types';
import schemaParse from '@/utils/helpers/schemaParse';

async function getScores() {
  const scoresData = await backendApi.getAll('scores');
  return schemaParse(ScoresSchema, scoresData);
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
