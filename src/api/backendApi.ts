import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { transformDoc, constructQuery, transformData } from './helpers';
import type { QueryOptions } from './types';
import type { BasicDocument } from '@/model/schemas';
import { getDb } from '@/config/firebaseConfig';

/**
 * Gets one document from firestore and returns it (or null if not found) inside a promise.
 * @param collectionPath Path to doc "collectionId/docId"
 * @throws If collectionId or docId is missing
 * @returns Promise with document, null if not found, or error
 */
function get(collectionPath: string): Promise<BasicDocument | null> {
  const [collectionId, docId] = collectionPath.split('/');
  if (!collectionId) {
    return Promise.reject(new Error('CollectionId was empty'));
  }
  if (!docId) {
    return Promise.reject(new Error('DocId was empty'));
  }
  const db = getDb();

  return getDoc(doc(db, collectionId, docId)).then(transformDoc);
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
 * @throws If collectionId is missing
 * @returns Array of documents or error
 */
function getAll(
  collectionId: string,
  queryOptions: QueryOptions = {}
): Promise<BasicDocument[]> {
  if (!collectionId) {
    return Promise.reject(new Error('CollectionId was empty'));
  }
  const db = getDb();
  const docsQuery = constructQuery(collectionId, db, queryOptions);

  return getDocs(docsQuery).then(
    (snapshot) =>
      snapshot.docs.map(transformDoc).filter(Boolean) as BasicDocument[]
  );
}

/**
 * Creates a new firestore document under a collection and returns its id.
 * @param collectionId id of the collection
 * @param data Data to create a new document from
 * @throws If collectionId is missing
 * @returns Id of the newly created document or error
 */
function post(collectionId: string, data: object): Promise<string> {
  if (!collectionId) {
    return Promise.reject(new Error('CollectionId was empty'));
  }
  const db = getDb();
  const collectionRef = collection(db, collectionId);
  const transformedData = transformData(data);
  return addDoc(collectionRef, transformedData).then((docRef) => docRef.id);
}

/**
 * Updates some fields of an existing document.
 * @param collectionPath Path to doc "collectionId/docId"
 * @param data Fields to update
 * @throws If collectionId or docId is missing
 * @returns Promise that resolves once update is successful
 */
function patch(collectionPath: string, data: object): Promise<void> {
  const [collectionId, docId] = collectionPath.split('/');
  if (!collectionId) {
    return Promise.reject(new Error('CollectionId was empty'));
  }
  if (!docId) {
    return Promise.reject(new Error('DocId was empty'));
  }

  const transformedData = transformData(data);
  const db = getDb();
  return updateDoc(doc(db, collectionId, docId), transformedData);
}

/**
 * Creates a new firestore document if it doesn't exist or updates an existing one.
 * @param collectionPath Path to doc "collectionId/docId"
 * @param data Fields to put in the document
 * @throws If collectionId or docId is missing
 * @returns Promise that resolves once updata is successful
 */
function put(collectionPath: string, data: object): Promise<void> {
  const [collectionId, docId] = collectionPath.split('/');
  if (!collectionId) {
    return Promise.reject(new Error('CollectionId was empty'));
  }
  if (!docId) {
    return Promise.reject(new Error('DocId was empty'));
  }

  const transformedData = transformData(data);
  const db = getDb();
  return setDoc(doc(db, collectionId, docId), transformedData);
}

/**
 * Deletes a firestore document.
 * @param collectionPath Path to doc "collectionId/docId"
 * @throws If collectionId or docId is missing
 * @returns Promise that resolves once deleting is successful
 */
function remove(collectionPath: string): Promise<void> {
  const [collectionId, docId] = collectionPath.split('/');
  if (!collectionId) {
    return Promise.reject(new Error('CollectionId was empty'));
  }
  if (!docId) {
    return Promise.reject(new Error('DocId was empty'));
  }

  const db = getDb();
  return deleteDoc(doc(db, collectionId, docId));
}

/**
 * Wraps around firebase functions providing promise-land functions.
 */
export default {
  get,
  getAll,
  post,
  patch,
  put,
  remove,
};
