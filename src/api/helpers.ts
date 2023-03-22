import {
  query,
  orderBy,
  limit,
  collection,
  Timestamp,
} from 'firebase/firestore';
import type {
  QueryConstraint,
  DocumentSnapshot,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import type { BasicDocument, DB, QueryOptions } from './types';

export function constructQuery(
  collectionId: string,
  database: DB,
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
