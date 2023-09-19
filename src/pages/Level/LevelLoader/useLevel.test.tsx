import { describe, it } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import {
  wrapper,
  setupDescribe,
  setupHookTest,
  setDbWithoutRule,
} from '@/tests/setupHookTests';
import useLevel from './useLevel';
import Level from '@/model/Level';
import mapImgUrl from '@/utils/helpers/mapImgUrl';

setupHookTest('demo-test-id-uselevel');

describe('UseLevel', () => {
  setupDescribe();

  it('gets correct data', async () => {
    // Setup initial level data
    await setDbWithoutRule((context) => {
      const firestoreWithoutRule = context.firestore();
      return firestoreWithoutRule
        .collection('levels')
        .doc('1')
        .set({
          imgUrl: 'level-1.jpg',
          thumbnailUrl: 'thumbnail-level-1.jpg',
          title: 'Level 1',
          characterCoordinates: { Waldo: [1, 1] },
          characters: ['Waldo'],
          foundAcceptanceRadius: 3,
        });
    });

    const { result } = renderHook(() => useLevel('1'), { wrapper });

    await waitFor(() =>
      expect(result.current.data).toEqual(
        new Level({
          id: '1',
          imgUrl: mapImgUrl('level-1.jpg'),
          title: 'Level 1',
          characterCoordinates: { Waldo: [1, 1] },
          foundAcceptanceRadius: 3,
        })
      )
    );
  });
});
