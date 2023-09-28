import type { PropsWithChildren } from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import {
  QueryClientWrapper,
  setupDescribe,
  setupTest,
  setupTestDb,
} from '@/tests/setupTests';
import LevelPage from './LevelPage';
import HomePage from '@/pages/Home/HomePage/HomePage';

setupTest();

function wrapper({ children }: PropsWithChildren<unknown>) {
  return (
    <MemoryRouter initialEntries={['/level/1']}>
      <QueryClientWrapper>{children}</QueryClientWrapper>
    </MemoryRouter>
  );
}

describe('Level page', () => {
  setupDescribe();

  it('renders', async () => {
    await setupTestDb('levelsDb');

    render(
      <Routes>
        <Route path="/level/:levelId" element={<LevelPage />} />
      </Routes>,
      { wrapper }
    );

    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: /level 1/i,
      })
    ).toBeInTheDocument();
  });

  it('goes to home page using quit link', async () => {
    await setupTestDb('levelsDb');

    render(
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/level/:levelId" element={<LevelPage />} />
      </Routes>,
      { wrapper }
    );

    const user = userEvent.setup();
    const homeLink = await screen.findByRole('link', { name: /quit/i });
    await user.click(homeLink);
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Can you spot the elusive Waldo and top the leaderboard/i,
      })
    );
  });

  // TODO: clicking through all characters and getting input name box

  // TODO: getting input name box and inputting and going to scoreboard page with correct parameter
});
