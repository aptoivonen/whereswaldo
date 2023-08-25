import { useQuery } from '@tanstack/react-query';
import { LevelGameInfoSchema } from '@/model/schemas';
import { AsyncReturnType } from '@/utils/types/types';
import backendApi from '@/api/backendApi';
import schemaParse from '@/utils/helpers/schemaParse';
import Level from '@/domain/Level';

async function getLevel(levelId: string) {
  const levelData = await backendApi.get(`levels/${levelId}`);
  return new Level(schemaParse(LevelGameInfoSchema, levelData));
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
