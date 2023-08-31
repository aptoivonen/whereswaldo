import { describe, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { App } from './App';

describe('App', () => {
  it('Renders not found if invalid path', async () => {
    render(
      <MemoryRouter initialEntries={['/no-such-page']}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(
        screen.getByRole('heading', {
          level: 1,
        })
      ).toHaveTextContent(/not found/i)
    );
  });
});
