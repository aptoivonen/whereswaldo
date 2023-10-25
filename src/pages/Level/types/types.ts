import { Character } from '@/model/schemas';

export type CharactersFound = {
  [K in Character]?: boolean;
};
