import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import fs from 'fs';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, beforeEach, afterEach } from 'vitest';
import { type Firestore } from 'firebase/firestore';
import {
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { setDb } from '@/config/firebaseConfig';
import * as firebaseJson from '../../../../firebase.json';
import useLevels from './useLevels';
import mapImgUrl from '@/utils/helpers/mapImgUrl';

const MY_PROJECT_ID = 'demo-test-id-uselevel';
const { port: FIRESTORE_EMULATOR_PORT } = firebaseJson.emulators.firestore;

let testEnv: RulesTestEnvironment;
let unauthedDb: Firestore;
let queryClient: QueryClient;
let wrapper: React.FC<{ children: React.ReactNode }>;

describe('UseLevels', () => {
  beforeAll(async () => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    wrapper = function Wrapper({ children }: { children: React.ReactNode }) {
      return (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );
    };
  });

  afterEach(async () => {
    await testEnv.clearFirestore();
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });

  beforeEach(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: MY_PROJECT_ID,
      firestore: {
        rules: fs.readFileSync('firestore.rules', 'utf8'),
        host: '127.0.0.1',
        port: FIRESTORE_EMULATOR_PORT,
      },
    });

    // Setup initial levels data
    await testEnv.withSecurityRulesDisabled((context) => {
      const firestoreWithoutRule = context.firestore();
      return firestoreWithoutRule
        .collection('levels')
        .doc('1')
        .set({
          imgUrl: 'level-1.jpg',
          thumbnailUrl: 'thumbnail-level-1.jpg',
          title: 'Level 1',
          characterCoordinates: { Waldo: [1, 1] },
          characters: ['Waldo'],
          foundAcceptanceRadius: 3,
        });
    });
    unauthedDb = testEnv
      .unauthenticatedContext()
      .firestore() as unknown as Firestore;
    setDb(unauthedDb);
  });

  it('gets correct data', async () => {
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
