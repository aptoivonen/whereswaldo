import { describe, it } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import {
  wrapper,
  setupDescribe,
  setupHookTest,
  setDbWithoutRule,
} from '@/tests/setupHookTests';
import useLevels from './useLevels';
import mapImgUrl from '@/utils/helpers/mapImgUrl';

setupHookTest('demo-test-id-uselevels');

describe('UseLevels', () => {
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

    const { result } = renderHook(() => useLevels(), { wrapper });

    await waitFor(() =>
      expect(result.current.data).toEqual([
        {
          id: '1',
          thumbnailUrl: mapImgUrl('thumbnail-level-1.jpg'),
          title: 'Level 1',
          characters: new Set().add('Waldo'),
        },
      ])
    );
  });
});
