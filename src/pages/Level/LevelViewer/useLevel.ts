import { useQuery } from '@tanstack/react-query';
import type { LevelGameInfo } from '@/model/types';
import { AsyncReturnType } from '@/utils/types/types';

const levelGameInfo: LevelGameInfo = {
  id: '1',
  imgUrl: 'https://placehold.co/2000x1000',
  title: 'Fair',
  characters: ['Waldo', 'Wizard', 'Odlaw'],
};

function getLevel(): Promise<LevelGameInfo> {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  }).then(() => levelGameInfo);
}

function useLevel(levelId: string) {
  const queryFn = getLevel;
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
