/* eslint-disable import/prefer-default-export */
import { query, orderBy, limit, collection } from 'firebase/firestore';
import type { QueryConstraint } from 'firebase/firestore';
import type { DB, QueryOptions } from './types';

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
