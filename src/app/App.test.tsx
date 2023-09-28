import { describe, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import {
  QueryClientWrapper,
  setupDescribe,
  setupTest,
  setWholeDbWithoutRule,
} from '@/tests/setupTests';
import { App } from './App';

// tests require 'waitFor' because pages are lazy loaded
describe('App', () => {
  setupTest('demo-test-id-app');

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

    await waitFor(() =>
      expect(
        screen.getByRole('navigation', { name: /main/i })
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

    await waitFor(() =>
      expect(
        screen.getByRole('navigation', { name: /main/i })
      ).toBeInTheDocument()
    );
  });

  describe('renders a LEVEL page', () => {
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
          <QueryClientWrapper>
            <App />
          </QueryClientWrapper>
        </MemoryRouter>
      );

      await waitFor(() =>
        expect(
          screen.getByRole('heading', { name: /level 1/i })
        ).toBeInTheDocument()
      );

      await waitFor(() =>
        expect(
          screen.queryByRole('navigation', { name: /main/i })
        ).not.toBeInTheDocument()
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

  describe('navbar navigates', () => {
    setupDescribe();

    it('from homepage to scoreboard page', async () => {
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
        <MemoryRouter initialEntries={['/']}>
          <QueryClientWrapper>
            <App />
          </QueryClientWrapper>
        </MemoryRouter>
      );
      const user = userEvent.setup();
      const scoreboardLink = screen.getByRole('link', {
        name: /scoreboard/i,
      });
      await user.click(scoreboardLink);
      expect(screen.getByRole('heading', { level: 1, name: /scoreboard/i }));
    });

    it('from homepage to level game page from level card', async () => {
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
        <MemoryRouter initialEntries={['/']}>
          <QueryClientWrapper>
            <App />
          </QueryClientWrapper>
        </MemoryRouter>
      );
      const user = userEvent.setup();
      const level1Link = await screen.findByRole('link', {
        name: /level 1/i,
      });
      await user.click(level1Link);
      const level1Heading = await screen.findByRole('heading', {
        name: /level 1/i,
      });
      expect(level1Heading);
    });

    it('from scoreboardpage to home page using home link', async () => {
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
        <MemoryRouter initialEntries={['/scoreboard']}>
          <QueryClientWrapper>
            <App />
          </QueryClientWrapper>
        </MemoryRouter>
      );
      const user = userEvent.setup();
      const homeLink = screen.getByRole('link', {
        name: /home/i,
      });
      await user.click(homeLink);
      expect(
        screen.getByRole('heading', {
          level: 1,
          name: /Can you spot the elusive Waldo and top the leaderboard/i,
        })
      );
    });

    it('from scoreboardpage to home page using logo link', async () => {
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
        <MemoryRouter initialEntries={['/scoreboard']}>
          <QueryClientWrapper>
            <App />
          </QueryClientWrapper>
        </MemoryRouter>
      );
      const user = userEvent.setup();
      const homeLink = screen.getByRole('link', {
        name: /where's waldo logo where's waldo\?/i,
      });
      await user.click(homeLink);
      expect(
        screen.getByRole('heading', {
          level: 1,
          name: /Can you spot the elusive Waldo and top the leaderboard/i,
        })
      );
    });

    it('from scoreboardpage to home page using start playing link when no scores', async () => {
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
        <MemoryRouter initialEntries={['/scoreboard']}>
          <QueryClientWrapper>
            <App />
          </QueryClientWrapper>
        </MemoryRouter>
      );
      const user = userEvent.setup();
      const homeLink = await screen.findByRole('link', { name: /playing/i });
      await user.click(homeLink);
      expect(
        screen.getByRole('heading', {
          level: 1,
          name: /Can you spot the elusive Waldo and top the leaderboard/i,
        })
      );
    });

    it('from not-found-page to home page using home link', async () => {
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
        <MemoryRouter initialEntries={['/no-such-page']}>
          <QueryClientWrapper>
            <App />
          </QueryClientWrapper>
        </MemoryRouter>
      );
      const user = userEvent.setup();
      const homeLink = await screen.findByRole('link', { name: /go home/i });
      await user.click(homeLink);
      expect(
        screen.getByRole('heading', {
          level: 1,
          name: /Can you spot the elusive Waldo and top the leaderboard/i,
        })
      );
    });
  });
});
