import { useMutation } from '@tanstack/react-query';
import { AsyncReturnType } from '@/utils/types/types';
import { Score } from '@/model/types';

type AddScoreProps = Omit<Score, 'id'>;

function addScore(score: AddScoreProps): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  }).then(() => '2222');
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
