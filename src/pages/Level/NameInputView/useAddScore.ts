import { useMutation } from '@tanstack/react-query';
import type { AsyncReturnType } from '@/utils/types/types';
import type { Score } from '@/model/schemas';
import backendApi from '@/api/backendApi';

type AddScoreProps = Omit<Score, 'id'>;

function addScore(score: AddScoreProps): Promise<string> {
  return backendApi.post('scores', score) as Promise<string>;
}

function useAddScore() {
  const mutationFn = addScore;

  type TError = Error;
  type TData = AsyncReturnType<typeof mutationFn>;
  const { data, error, mutate, isLoading } = useMutation<
    TData,
    TError,
    AddScoreProps,
    TError
  >({
    mutationFn,
  });
  return { data, error, add: mutate, isLoading };
}

export default useAddScore;
