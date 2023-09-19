/* eslint-disable import/no-extraneous-dependencies */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type Firestore } from 'firebase/firestore';
import {
  initializeTestEnvironment,
  RulesTestContext,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { beforeAll, beforeEach, afterEach, afterAll } from 'vitest';
import fs from 'fs';
import * as firebaseJson from '../../firebase.json';
import { setDb } from '@/config/firebaseConfig';

let testProjectId: string;
const { port: FIRESTORE_EMULATOR_PORT } = firebaseJson.emulators.firestore;

let testEnv: RulesTestEnvironment;
let unauthedDb: Firestore;
const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
export const wrapper: React.FC<{ children: React.ReactNode }> =
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

// Call this at the beginnig of the test file
export function setupHookTest(projectId: string): void {
  testProjectId = projectId;
}

// Call this at the beginnig of describe block
export function setupDescribe(): void {
  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: testProjectId,
      firestore: {
        rules: fs.readFileSync('firestore.rules', 'utf8'),
        host: '127.0.0.1',
        port: FIRESTORE_EMULATOR_PORT,
      },
    });
  });

  afterEach(async () => {
    await testEnv.clearFirestore();
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });

  beforeEach(async () => {
    unauthedDb = testEnv
      .unauthenticatedContext()
      .firestore() as unknown as Firestore;
    setDb(unauthedDb);
  });
}

// Call this to set up test db for each test
export function setDbWithoutRule(
  callback: (context: RulesTestContext) => Promise<void>
): Promise<void> {
  return testEnv.withSecurityRulesDisabled(callback);
}
