import { describe, it } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import {
  wrapper,
  setupDescribe,
  setupHookTest,
  setDbWithoutRule,
  getUnauthedDb,
} from '@/tests/setupTests';
import useAddScore from './useAddScore';

setupHookTest('demo-test-id-useaddscore');

describe('UseAddScore', () => {
  setupDescribe();

  it('adds score correctly and returns its id', async () => {
    await setDbWithoutRule(async (context) => {
      const firestoreWithoutRule = context.firestore();
      const collection = firestoreWithoutRule.collection('scores');
      await Promise.all([
        collection.doc('score-1').set({
          userName: 'John Doe1',
          time: 10,
          levelId: '1',
        }),
        collection.doc('score-2').set({
          userName: 'John Doe2',
          time: 11,
          levelId: '1',
        }),
      ]);
      return Promise.resolve();
    });

    const { result } = renderHook(() => useAddScore(), { wrapper });

    act(() => {
      result.current.add({
        userName: 'Dave',
        time: 20,
        levelId: '1',
      });
    });

    // there exists an id
    await waitFor(() => expect(result.current.data).toBeTruthy());
    // get doc for previous id from the db
    const doc = await getUnauthedDb()
      .collection('scores')
      .doc(result.current.data)
      .get();
    const foundDoc = { id: doc.id, ...doc.data() };
    expect(foundDoc).toEqual({
      id: result.current.data,
      userName: 'Dave',
      time: 20,
      levelId: '1',
    });
  });
});
