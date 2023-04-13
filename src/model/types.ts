import { BasicDocument } from '@/api/types';

export interface LevelInfo extends BasicDocument {
  thumbnailUrl: string;
  title: string;
}
export interface Score extends BasicDocument {
  userName: string;
  playerId: string;
  levelId: string;
  time: number;
}
