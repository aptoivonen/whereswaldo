import { useQuery } from '@tanstack/react-query';
import type { LevelInfo } from '@/model/types';

const levels: LevelInfo[] = [
  {
    id: '1',
    thumbnailUrl: 'https://placehold.co/600x400/orange/white/png?text=Level+1',
    title: 'Fair',
  },
  {
    id: '2',
    thumbnailUrl: 'https://placehold.co/600x400/tomato/white/png?text=Level+2',
    title: 'At the Beach',
  },
  {
    id: '3',
    thumbnailUrl: 'https://placehold.co/600x400/beige/black/png?text=Level+3',
    title: 'At the Beach',
  },
  {
    id: '4',
    thumbnailUrl: 'https://placehold.co/600x400/grey/red/png?text=Level+4',
    title: 'At the Beach',
  },
];

function getLevels(): Promise<LevelInfo[]> {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  }).then(() => levels);
}

function useLevels() {
  return useQuery({ queryKey: ['levels'], queryFn: getLevels });
}

export default useLevels;
