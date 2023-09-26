import { describe, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { App } from './App';
import {
  Wrapper,
  setupDescribe,
  setupTest,
  setWholeDbWithoutRule,
} from '@/tests/setupTests';

describe('App', () => {
  it('renders HOME page for / path', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(
        screen.getByRole('heading', {
          level: 1,
          name: /can you spot the elusive waldo and top the leaderboard\?/i,
        })
      ).toBeInTheDocument()
    );
  });

  it('renders SCOREBOARD page for /scoreboard path', async () => {
    render(
      <MemoryRouter initialEntries={['/scoreboard']}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(
        screen.getByRole('heading', {
          level: 1,
          name: /scoreboard/i,
        })
      ).toBeInTheDocument()
    );
  });

  describe('renders a LEVEL page', () => {
    setupTest('demo-test-id-render-level-page');
    setupDescribe();
    it('for /level/:levelId path', async () => {
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

      render(
        <MemoryRouter initialEntries={['/level/1']}>
          <Wrapper>
            <App />
          </Wrapper>
        </MemoryRouter>
      );

      await waitFor(() =>
        expect(
          screen.getByRole('heading', { name: /level 1/i })
        ).toBeInTheDocument()
      );
    });
  });

  it('renders NOT FOUND page if invalid path', async () => {
    render(
      <MemoryRouter initialEntries={['/no-such-page']}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(
        screen.getByRole('heading', {
          level: 1,
          name: /not found/i,
        })
      ).toBeInTheDocument()
    );
  });
});
