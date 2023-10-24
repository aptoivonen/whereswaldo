/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'cypress';
import fetch from 'node-fetch';

const SCORES_COLLECTION_URL = `http://localhost:8080/emulator/v1/projects/dev-project-id/databases/(default)/documents/scores`;

export default defineConfig({
  e2e: {
    baseUrl: 'http://127.0.0.1:5173',
    setupNodeEvents(on) {
      on('task', {
        'empty:db': () => {
          return fetch(SCORES_COLLECTION_URL, { method: 'DELETE' });
        },
      });
    },
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
});
