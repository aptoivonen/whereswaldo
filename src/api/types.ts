import type { OrderByDirection } from 'firebase/firestore';
import db from '@/config/firebaseConfig';

export type DB = typeof db;

export interface BasicDocument {
  id: string;
  [key: string]: string | number | boolean | null | undefined | Date;
}

export type QueryOptions = {
  orderBy?: { property: string; direction?: OrderByDirection };
  limit?: number;
};
