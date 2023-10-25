import type { PropsWithChildren } from 'react';
import { describe, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import {
  QueryClientWrapper,
  setupDescribe,
  setupTest,
  setupTestDb,
} from '@/tests/setupTests';
import ScoreboardPage from './ScoreboardPage';
import HomePage from '@/pages/Home/HomePage/HomePage';

setupTest();

function wrapper({ children }: PropsWithChildren<unknown>) {
  return (
    <MemoryRouter initialEntries={['/scoreboard']}>
      <QueryClientWrapper>{children}</QueryClientWrapper>
    </MemoryRouter>
  );
}

describe('Scoreboard page', () => {
  setupDescribe();

  it('renders', async () => {
    render(
      <Routes>
        <Route path="/scoreboard" element={<ScoreboardPage />} />
      </Routes>,
      { wrapper }
    );

    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: /scoreboard/i,
      })
    ).toBeInTheDocument();
  });

  it('shows no scores yet text if there are no scores', async () => {
    render(
      <Routes>
        <Route path="/scoreboard" element={<ScoreboardPage />} />
      </Routes>,
      { wrapper }
    );

    expect(await screen.findByText(/No scores yet/i)).toBeInTheDocument();

    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('shows table of scores', async () => {
    await setupTestDb('levelsAndScoresDb');

    render(<ScoreboardPage />, { wrapper });

    const table = await screen.findByRole('table');
    expect(table).toBeInTheDocument();

    // Has correct number of result rows
    const tableBody = document.querySelector('tbody');
    expect(tableBody).not.toBeNull();
    if (!tableBody) return;
    expect(await within(tableBody).findAllByRole('row')).toHaveLength(3);
  });

  it('shows scores sorted by time ascending', async () => {
    await setupTestDb('levelsAndScoresDb');

    render(<ScoreboardPage />, { wrapper });

    const table = await screen.findByRole('table');
    expect(table).toBeInTheDocument();

    expect(
      await screen.findByRole('row', { name: /1 jack 1 00:11/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('row', { name: /2 anna 2 00:12/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('row', { name: /3 mikko 1 00:16/i })
    ).toBeInTheDocument();
  });

  it('from scoreboardpage to home page using start playing link when no scores', async () => {
    await setupTestDb('levelsDb');

    render(
      <Routes>
        <Route path="/scoreboard" element={<ScoreboardPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>,
      { wrapper }
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
});
