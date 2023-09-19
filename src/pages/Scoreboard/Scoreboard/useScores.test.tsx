import { describe, it } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import {
  wrapper,
  setupDescribe,
  setupHookTest,
  setDbWithoutRule,
} from '@/tests/setupHookTests';
import useScores from './useScores';

setupHookTest('demo-test-id-usescores');

describe('UseLevels', () => {
  setupDescribe();

  it('has correct number of scores', async () => {
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

    const { result } = renderHook(() => useScores(), { wrapper });

    await waitFor(() => expect(result.current.data?.length).toBe(2));
  });

  it('gets correct data', async () => {
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

    const { result } = renderHook(() => useScores(), { wrapper });

    await waitFor(() =>
      expect(result.current.data).toEqual([
        {
          id: 'score-1',
          userName: 'John Doe1',
          time: 10,
          levelId: '1',
        },
        {
          id: 'score-2',
          userName: 'John Doe2',
          time: 11,
          levelId: '1',
        },
      ])
    );
  });

  it('returns error for malformed data', async () => {
    await setDbWithoutRule(async (context) => {
      const firestoreWithoutRule = context.firestore();
      const collection = firestoreWithoutRule.collection('scores');
      // wrong data - userName is not at least 1 character
      await Promise.all([
        collection.doc('score-1').set({
          userName: '',
          time: 10,
          levelId: '1',
        }),
      ]);
      return Promise.resolve();
    });

    const { result } = renderHook(() => useScores(), { wrapper });

    await waitFor(() => expect(result.current.error).not.toBeNull());
  });
});
