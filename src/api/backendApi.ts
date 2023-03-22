import { doc, getDoc } from 'firebase/firestore';
import { transformDoc } from './helpers';
import db from '@/config/firebaseConfig';

/**
 * Gets one document from firestore and returns it inside a promise.
 * @param collectionPath Path to doc "collectionId/docId"
 * @returns Promise with document
 */
function get(collectionPath: string) {
  const [collectionId, docId] = collectionPath.split('/');

  return getDoc(doc(db, collectionId, docId)).then(transformDoc);
}

/**
 * Wraps around firebase functions providing promise-land functions.
 */
export default {
  get,
};
