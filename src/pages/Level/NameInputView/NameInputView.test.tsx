import type { PropsWithChildren } from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import {
  QueryClientWrapper,
  setupDescribe,
  setupTest,
  setupTestDb,
} from '@/tests/setupTests';
import { ErrorBoundary, FallbackRender } from '@/components/common';
import NameInputView from './NameInputView';
import ScoreboardPage from '@/pages/Scoreboard/ScoreboardPage/ScoreboardPage';

setupTest();

function wrapper({ children }: PropsWithChildren<unknown>) {
  return (
    <ErrorBoundary fallbackRender={FallbackRender}>
      <MemoryRouter initialEntries={['/level/1']}>
        <QueryClientWrapper>{children}</QueryClientWrapper>
      </MemoryRouter>
    </ErrorBoundary>
  );
}

function LocationDisplay() {
  const location = useLocation();

  return <div data-testid="location-display">{location.search}</div>;
}

describe('NameInputView', () => {
  setupDescribe();

  it('renders', async () => {
    await setupTestDb('levelsAndScoresDb');

    render(<NameInputView levelId="1" counter={10} />, { wrapper });

    expect(
      await screen.findByRole('heading', { name: /you found 'em!/i })
    ).toBeInTheDocument();
  });

  it('goes to scoreboard page after typing a proper name', async () => {
    await setupTestDb('levelsAndScoresDb');

    // element.scrollIntoView is not implemented id jsdom
    window.HTMLElement.prototype.scrollIntoView = function scrollIntoView() {};

    render(
      <Routes>
        <Route
          path="/level/:levelId"
          element={<NameInputView levelId="1" counter={10} />}
        />
        <Route
          path="scoreboard"
          element={
            <>
              <ScoreboardPage />
              <LocationDisplay />
            </>
          }
        />
      </Routes>,
      { wrapper }
    );

    const user = userEvent.setup();

    expect(
      screen.getByRole('heading', { name: /you found 'em!/i })
    ).toBeInTheDocument();
    const nameInput = screen.getByRole('textbox', { name: /name:/i });
    await user.type(nameInput, 'Bill');
    await user.keyboard('{Enter}');
    // Goes to scoreboard page with query paramater
    expect(
      await screen.findByRole('heading', { level: 1, name: /scoreboard/i })
    );
    // Has url search parameter starting with '?scoreId='
    expect(await screen.findByTestId('location-display')).toHaveTextContent(
      /\?scoreId=/i
    );
    expect(await screen.findByRole('cell', { name: /bill/i }));
  });
});
