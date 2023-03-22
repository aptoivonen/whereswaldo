import type { OrderByDirection } from 'firebase/firestore';
import db from '@/config/firebaseConfig';

export type DB = typeof db;

export interface BasicDocument {
  id: string;
}

export type QueryOptions = {
  orderBy?: { property: string; direction?: OrderByDirection };
  limit?: number;
};
