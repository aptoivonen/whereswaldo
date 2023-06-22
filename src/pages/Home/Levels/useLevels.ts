import { useQuery } from '@tanstack/react-query';
import type { LevelInfo } from '@/model/types';
import type { AsyncReturnType } from '@/utils/types/types';
import backendApi from '@/api/backendApi';

function getLevels() {
  return backendApi.getAll('levels') as Promise<LevelInfo[]>;
}

function useLevels() {
  const queryFn = getLevels;
  const queryKey = ['levels'];

  type TError = Error;
  type TData = AsyncReturnType<typeof queryFn>;
  const { data, error } = useQuery<TData, TError, TData>({
    queryKey,
    queryFn,
  });
  return { data, error };
}

export default useLevels;
