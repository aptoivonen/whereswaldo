import { Character } from '@/model/types';

export type CharactersFound = {
  [K in Character]?: boolean;
};
