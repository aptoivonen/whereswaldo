import { doc, getDoc } from 'firebase/firestore';
import { transformDoc } from './helpers';
import type { BasicDocument } from './types';
import db from '@/config/firebaseConfig';

/**
 * Gets one document from firestore and returns it (or null if not found) inside a promise.
 * @param collectionPath Path to doc "collectionId/docId"
 * @returns Promise with document
 */
function get(collectionPath: string): Promise<BasicDocument | null> {
  const [collectionId, docId] = collectionPath.split('/');
  if (!collectionId || !docId) {
    return Promise.resolve(null);
  }

  return getDoc(doc(db, collectionId, docId)).then(transformDoc);
}

/**
 * Wraps around firebase functions providing promise-land functions.
 */
export default {
  get,
};
