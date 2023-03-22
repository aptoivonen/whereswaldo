import { describe, it, beforeEach, afterEach } from 'vitest';
import {
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { setDoc, doc, serverTimestamp, Firestore } from 'firebase/firestore';
import * as firebaseJson from '../../firebase.json';
import backendApi from './backendApi';

const MY_PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const { port: FIRESTORE_EMULATOR_PORT } = firebaseJson.emulators.firestore;

let testEnv: RulesTestEnvironment;
let unauthedDb: Firestore;

const readWriteMessagesRule = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /messages/{messageId} {
      allow read: if true;
      allow write: if true;
    }
  }
}`;

describe('BackendApi', () => {
  beforeEach(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: MY_PROJECT_ID,
      firestore: {
        rules: readWriteMessagesRule,
        host: '127.0.0.1',
        port: FIRESTORE_EMULATOR_PORT,
      },
    });
    unauthedDb = {
      ...testEnv.unauthenticatedContext().firestore(),
      type: 'firestore',
      toJSON: () => ({}),
    };
  });

  afterEach(async () => {
    await testEnv.clearFirestore();
    await testEnv.cleanup();
  });

  it('can gets non-null for an existing document', async () => {
    // setup
    const ref = doc(unauthedDb, 'messages', 'newDocId');
    await setDoc(ref, { text: 'new text' });
    // read
    const result = await backendApi.get('messages/newDocId');
    // assert
    expect(result).not.toBeNull();
  });

  it('can get an existing document', async () => {
    // setup
    const ref = doc(unauthedDb, 'messages', 'newDocId');
    await setDoc(ref, { text: 'new text' });
    // read
    const result = await backendApi.get('messages/newDocId');
    // assert
    expect(result).toEqual({ id: 'newDocId', text: 'new text' });
  });

  it('can get a document with correct date object', async () => {
    const ref = doc(unauthedDb, 'messages', 'newDocId');
    const timestamp = serverTimestamp();
    await setDoc(ref, { createdAt: timestamp });
    const result = await backendApi.get('messages/newDocId');
    if (!result) {
      return;
    }

    const { createdAt } = result;
    expect(createdAt instanceof Date).toBe(true);
  });

  it('gets null for a non-existing document', async () => {
    // Don't setup document
    const result = await backendApi.get('messages/newDocId');
    expect(result).toBeNull();
  });
});
