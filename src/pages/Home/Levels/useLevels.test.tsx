import { describe, it } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import {
  wrapper,
  setupDescribe,
  setupTest,
  setWholeDbWithoutRule,
} from '@/tests/setupTests';
import useLevels from './useLevels';
import mapImgUrl from '@/utils/helpers/mapImgUrl';

setupTest('demo-test-id-uselevels');

describe('UseLevels', () => {
  setupDescribe();

  it('gets empty list when no data', async () => {
    const { result } = renderHook(() => useLevels(), { wrapper });

    await waitFor(() => expect(result.current.data).toHaveLength(0));
  });

  it('gets correct data', async () => {
    // Setup initial level data
    await setWholeDbWithoutRule({
      levels: {
        '1': {
          imgUrl: 'level-1.jpg',
          thumbnailUrl: 'thumbnail-level-1.jpg',
          title: 'Level 1',
          characterCoordinates: { Waldo: [1, 1] },
          characters: ['Waldo'],
          foundAcceptanceRadius: 3,
        },
      },
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
