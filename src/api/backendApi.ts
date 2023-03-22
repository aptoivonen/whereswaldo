import { doc, getDoc, getDocs } from 'firebase/firestore';
import { transformDoc, constructQuery } from './helpers';
import type { BasicDocument, QueryOptions } from './types';
import db from '@/config/firebaseConfig';

/**
 * Gets one document from firestore and returns it (or null if not found) inside a promise.
 * @param collectionPath Path to doc "collectionId/docId"
 * @returns Promise with document
 */
function get(collectionPath: string): Promise<BasicDocument | Error> {
  const [collectionId, docId] = collectionPath.split('/');
  if (!collectionId) {
    return Promise.reject(new Error('CollectionId was empty'));
  }
  if (!docId) {
    return Promise.reject(new Error('DocId was empty'));
  }

  return getDoc(doc(db, collectionId, docId))
    .then(transformDoc)
    .then((docData) =>
      docData === null
        ? Promise.reject(new Error('Document not found'))
        : docData
    );
}

/**
 * Gets documents from firestore and returns them inside a promise.
 * Accepts a few optional queryOptions.
 * @param collectionId id of the collection
 * @param [queryOptions] query, order or limit data
 * @param [queryOptions.limit] number of entries to fetch
 * @param [queryOptions.orderBy] order of entries
 * @param queryOptions.orderBy.property name of property to sort by
 * @param [queryOptions.orderBy.direction] 'asc' or 'desc'
 * @returns Array of documents
 */
function getAll(collectionId: string, queryOptions: QueryOptions = {}) {
  if (!collectionId) {
    return Promise.reject(new Error('CollectionId was empty'));
  }
  const docsQuery = constructQuery(collectionId, db, queryOptions);

  return getDocs(docsQuery).then(
    (snapshot) =>
      snapshot.docs.map(transformDoc).filter(Boolean) as BasicDocument[]
  );
}

/**
 * Wraps around firebase functions providing promise-land functions.
 */
export default {
  get,
  getAll,
};
