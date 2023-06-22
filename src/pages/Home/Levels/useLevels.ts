import { useQuery } from '@tanstack/react-query';
import type { LevelInfo } from '@/model/types';
import type { AsyncReturnType } from '@/utils/types/types';
import backendApi from '@/api/backendApi';
import mapImgUrl from '@/utils/helpers/mapImgUrl';

function transformImgUrls(documents: LevelInfo[]): LevelInfo[] {
  return documents.map((doc) => ({
    ...doc,
    thumbnailUrl: mapImgUrl(doc.thumbnailUrl),
  }));
}

async function getLevels() {
  const rawLevels = (await backendApi.getAll('levels')) as LevelInfo[];
  return transformImgUrls(rawLevels);
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
