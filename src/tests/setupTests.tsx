/* eslint-disable no-console */
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

type Db = ReturnType<RulesTestContext['firestore']>;

const isTest = import.meta.env.MODE === 'test';
let testProjectId: string;
const { port: FIRESTORE_EMULATOR_PORT } = firebaseJson.emulators.firestore;

let testEnv: RulesTestEnvironment;
let unauthedDb: Firestore;
const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    // Turn off retries - the library defaults to three retries with exponential backoff,
    // which means that your tests are likely to timeout if you want to test an erroneous query
    queries: {
      retry: false,
    },
  },
  // When testing we want to suppress network errors being logged to the console
  logger: {
    log: console.log,
    warn: console.warn,
    // ✅ no more errors on the console for tests
    error: isTest ? () => {} : console.error,
  },
});

// Wrapper export for component tests
export function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

// wrapper export for hook tests
export const wrapper: React.FC<{ children: React.ReactNode }> = Wrapper;

// Call this at the beginning of the test file
export function setupTest(projectId: string): void {
  testProjectId = projectId;
}

// Call this at the beginning of describe block
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

// Call this to set up test db for each test using a context callback
export function setDbWithoutRule(
  callback: (context: RulesTestContext) => Promise<void>
): Promise<void> {
  return testEnv.withSecurityRulesDisabled(callback);
}

function makeDbTuples(
  collectionsObj: Record<string, Record<string, object>>
): Array<[collectionId: string, docId: string, docObj: object]> {
  return Object.entries(collectionsObj)
    .map(([collId, collObj]) =>
      Object.entries(collObj).map(([docId, docObj]) => [collId, docId, docObj])
    )
    .flat() as Array<[collectionId: string, docId: string, docObj: object]>;
}

function setDbDoc(
  db: Db,
  {
    collectionId,
    docId,
    docObj,
  }: { collectionId: string; docId: string; docObj: object }
) {
  return db.collection(collectionId).doc(docId).set(docObj);
}

// Call this to set entire test db in one go
export function setWholeDbWithoutRule(
  collectionsObj: Record<string, Record<string, object>>
): Promise<void> {
  return testEnv.withSecurityRulesDisabled(async (context) => {
    const firestoreWithoutRule = context.firestore();
    const dbTuples = makeDbTuples(collectionsObj);
    await Promise.all(
      dbTuples.map(([collectionId, docId, docObj]) =>
        setDbDoc(firestoreWithoutRule, { collectionId, docId, docObj })
      )
    );
    return Promise.resolve();
  });
}

export function getUnauthedDb() {
  return testEnv.unauthenticatedContext().firestore();
}
