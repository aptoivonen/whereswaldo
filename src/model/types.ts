import { BasicDocument } from '@/api/types';

type Character = 'Waldo' | 'Wizard' | 'Odlaw';

export interface LevelInfo extends BasicDocument {
  thumbnailUrl: string;
  title: string;
  characters: Character[];
}
export interface Score extends BasicDocument {
  userName: string;
  levelId: string;
  time: number;
}

export interface LevelGameInfo extends BasicDocument {
  imgUrl: string;
  title: string;
  characters: Character[];
}
