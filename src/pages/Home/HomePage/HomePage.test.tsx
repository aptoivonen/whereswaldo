import { describe, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  QueryClientWrapper,
  setupDescribe,
  setupTest,
  setWholeDbWithoutRule,
} from '@/tests/setupTests';
import HomePage from './HomePage';

setupTest();

describe('HomePage', () => {
  setupDescribe();

  it('renders', () => {
    render(
      <QueryClientWrapper>
        <HomePage />
      </QueryClientWrapper>
    );

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /can you spot the elusive waldo and top the leaderboard\?/i,
      })
    ).toBeInTheDocument();
  });

  it('renders correct number of levels', async () => {
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
        '2': {
          imgUrl: 'level-2.jpg',
          thumbnailUrl: 'thumbnail-level-2.jpg',
          title: 'Level 2',
          characterCoordinates: { Waldo: [1, 1], Odlaw: [22, 22] },
          characters: ['Waldo', 'Odlaw'],
          foundAcceptanceRadius: 5,
        },
      },
    });

    render(
      <QueryClientWrapper>
        <MemoryRouter initialEntries={['/']}>
          <HomePage />
        </MemoryRouter>
      </QueryClientWrapper>
    );

    const region = screen.getByRole('region', {
      name: /levels/i,
    });
    const levelLinks = await within(region).findAllByRole('link');

    expect(levelLinks).toHaveLength(2);
  });

  it('renders correct number of loading skeletons of 2', async () => {
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
        '2': {
          imgUrl: 'level-2.jpg',
          thumbnailUrl: 'thumbnail-level-2.jpg',
          title: 'Level 2',
          characterCoordinates: { Waldo: [1, 1], Odlaw: [22, 22] },
          characters: ['Waldo', 'Odlaw'],
          foundAcceptanceRadius: 5,
        },
      },
    });

    render(
      <QueryClientWrapper>
        <MemoryRouter initialEntries={['/']}>
          <HomePage />
        </MemoryRouter>
      </QueryClientWrapper>
    );

    const region = screen.getByRole('region', {
      name: /levels/i,
    });
    const levelLinks = await within(region).findAllByTestId(
      'loading-level-skeleton'
    );

    expect(levelLinks).toHaveLength(2);
  });

  it('renders no levels found when there are no levels', async () => {
    render(
      <QueryClientWrapper>
        <MemoryRouter initialEntries={['/']}>
          <HomePage />
        </MemoryRouter>
      </QueryClientWrapper>
    );

    const noLevelsFoundTextEl = await screen.findByText(/no levels found/i);
    expect(noLevelsFoundTextEl).toBeInTheDocument();
  });
});
