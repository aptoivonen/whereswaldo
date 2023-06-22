import { useQuery } from '@tanstack/react-query';
import type { LevelGameInfo } from '@/model/types';
import { AsyncReturnType } from '@/utils/types/types';
import backendApi from '@/api/backendApi';
import mapImgUrl from '@/utils/helpers/mapImgUrl';

async function getLevel(levelId: string) {
  const rawLevel = (await backendApi.get(
    `levels/${levelId}`
  )) as LevelGameInfo | null;
  return rawLevel
    ? { ...rawLevel, imgUrl: mapImgUrl(rawLevel.imgUrl) }
    : rawLevel;
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
