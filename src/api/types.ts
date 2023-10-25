import type { OrderByDirection } from 'firebase/firestore';

export type QueryOptions = {
  orderBy?: { property: string; direction?: OrderByDirection };
  limit?: number;
};
