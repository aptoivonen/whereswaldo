import {
  query,
  orderBy,
  limit,
  collection,
  Timestamp,
  serverTimestamp,
  FieldValue,
} from 'firebase/firestore';
import type {
  QueryConstraint,
  DocumentSnapshot,
  QueryDocumentSnapshot,
  Firestore,
} from 'firebase/firestore';
import type { QueryOptions } from './types';
import type { BasicDocument } from '@/model/schemas';

export function constructQuery(
  collectionId: string,
  database: Firestore,
  queryOptions: QueryOptions = {}
) {
  const docsRef = collection(database, collectionId);

  const queryConstraints: QueryConstraint[] = [];
  if (typeof queryOptions.limit === 'number') {
    queryConstraints.push(limit(queryOptions.limit));
  }

  if (queryOptions.orderBy) {
    const { property, direction } = queryOptions.orderBy;
    queryConstraints.push(orderBy(property, direction));
  }

  return query(docsRef, ...queryConstraints);
}

/**
 * Transforms a Firestore QuerySnapshot or DocumentSnapshot to a BasicDocument with
 * Firestore dates as JS Date objects.
 * @param docData Firestore document data
 * @returns BasicDocument object with JS dates
 */
export function transformDoc(
  docData: DocumentSnapshot | QueryDocumentSnapshot
): BasicDocument | null {
  if (!docData.exists || !docData.data()) {
    return null;
  }

  const data = Object.fromEntries(
    Object.entries({ ...docData.data() }).map(([key, value]) => [
      key,
      value instanceof Timestamp ? value.toDate() : value,
    ])
  );
  return { id: docData.id, ...data };
}

/**
 * Converts a JS Date object to a Firestore timestamp or server timestamp, if it is immediate.
 * @param date JS Date object
 * @returns Firestore Timestamp or server timestamp
 */
function jsDateToFirestoreDate(date: Date): Timestamp | FieldValue {
  const isNow =
    Timestamp.fromDate(date).toMillis() === Timestamp.now().toMillis();

  return isNow ? serverTimestamp() : Timestamp.fromDate(date);
}

/**
 * Transforms a JS object to an object with Firestore-compatible timestamps.
 * @param data Data to transform for sending to Firestore
 * @returns Transform data object
 */
export function transformData(data: object): object {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      value instanceof Date ? jsDateToFirestoreDate(value) : value,
    ])
  );
}
