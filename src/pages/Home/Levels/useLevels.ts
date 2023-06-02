import { useQuery } from '@tanstack/react-query';
import type { LevelInfo } from '@/model/types';
import { AsyncReturnType } from '@/utils/types/types';

const levelInfoList: LevelInfo[] = [
  {
    id: '1',
    thumbnailUrl: 'https://placehold.co/600x400/orange/white/png?text=Level+1',
    title: 'Fair',
    characters: ['Waldo', 'Wizard', 'Odlaw'],
  },
  {
    id: '2',
    thumbnailUrl: 'https://placehold.co/600x400/tomato/white/png?text=Level+2',
    title: 'At the Beach',
    characters: ['Waldo', 'Wizard', 'Odlaw'],
  },
  {
    id: '3',
    thumbnailUrl: 'https://placehold.co/600x400/beige/black/png?text=Level+3',
    title: 'At the Beach',
    characters: ['Waldo', 'Wizard', 'Odlaw'],
  },
  {
    id: '4',
    thumbnailUrl: 'https://placehold.co/600x400/grey/red/png?text=Level+4',
    title: 'At the Beach',
    characters: ['Waldo', 'Wizard', 'Odlaw'],
  },
];

function getLevels(): Promise<LevelInfo[]> {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  }).then(() => levelInfoList);
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
