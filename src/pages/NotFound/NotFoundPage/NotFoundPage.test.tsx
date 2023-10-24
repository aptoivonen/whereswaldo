import type { PropsWithChildren } from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import {
  QueryClientWrapper,
  setupDescribe,
  setupTest,
} from '@/tests/setupTests';
import NotFoundPage from './NotFoundPage';
import HomePage from '@/pages/Home/HomePage/HomePage';

setupTest();

function wrapper({ children }: PropsWithChildren<unknown>) {
  return (
    <MemoryRouter initialEntries={['/no-such-route']}>
      <QueryClientWrapper>{children}</QueryClientWrapper>
    </MemoryRouter>
  );
}

describe('Not found page', () => {
  setupDescribe();

  it('renders', async () => {
    render(
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>,
      { wrapper }
    );

    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: /not found/i,
      })
    ).toBeInTheDocument();
  });

  it('navigates to home page using home link', async () => {
    render(
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>,
      { wrapper }
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
