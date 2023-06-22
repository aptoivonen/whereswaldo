import { useQuery } from '@tanstack/react-query';
import type { LevelGameInfo } from '@/model/types';
import { AsyncReturnType } from '@/utils/types/types';
import backendApi from '@/api/backendApi';

function getLevel(levelId: string) {
  return backendApi.get(`levels/${levelId}`) as Promise<LevelGameInfo | null>;
}

function useLevel(levelId: string) {
  const queryFn = () => getLevel(levelId);
  const queryKey = ['level', levelId];

  type TError = Error;
  type TData = AsyncReturnType<typeof queryFn>;
  const { data, error } = useQuery<TData, TError, TData>({
    queryKey,
    queryFn,
  });
  return { data, error };
}

export default useLevel;
