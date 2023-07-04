import { useQuery } from '@tanstack/react-query';
import backendApi from '@/api/backendApi';
import type { AsyncReturnType } from '@/utils/types/types';
import { LevelInfoArraySchema } from '@/model/schemas';
import schemaParse from '@/utils/helpers/schemaParse';

async function getLevels() {
  const levelsData = await backendApi.getAll('levels');
  return schemaParse(LevelInfoArraySchema, levelsData);
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
