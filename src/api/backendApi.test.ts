import { describe, it, beforeEach, afterEach } from 'vitest';
import {
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import {
  setDoc,
  getDoc,
  doc,
  serverTimestamp,
  Firestore,
  Timestamp,
} from 'firebase/firestore';
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
      allow read, write: if true;
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

  describe('Get', () => {
    it('resolves if there is an existing document', async () => {
      const ref = doc(unauthedDb, 'messages', 'newDocId');
      await setDoc(ref, { text: 'new text' });
      const resultPromise = backendApi.get('messages/newDocId');
      await expect(resultPromise).resolves.toBeTruthy();
    });

    it('can get an existing document', async () => {
      const ref = doc(unauthedDb, 'messages', 'newDocId');
      await setDoc(ref, { text: 'new text' });
      const result = await backendApi.get('messages/newDocId');
      expect(result).toEqual({ id: 'newDocId', text: 'new text' });
    });

    it('can get a document with correct date object', async () => {
      const ref = doc(unauthedDb, 'messages', 'newDocId');
      const timestamp = serverTimestamp();
      await setDoc(ref, { createdAt: timestamp });
      const result = await backendApi.get('messages/newDocId');

      let createdAt;
      if (result && 'id' in result) {
        ({ createdAt } = result);
      }
      expect(createdAt instanceof Date).toBe(true);
    });

    it('receives null for a non-existing document', async () => {
      // Don't setup document
      const result = await backendApi.get('messages/newDocId');
      expect(result).toBeNull();
    });
  });

  describe('GetAll', () => {
    it('resolves if there are existing documents', async () => {
      const ref1 = doc(unauthedDb, 'messages', 'docId_1');
      await setDoc(ref1, { text: 'text 1' });
      const ref2 = doc(unauthedDb, 'messages', 'docId_2');
      await setDoc(ref2, { text: 'text 2' });

      const resultPromise = backendApi.getAll('messages');
      await expect(resultPromise).resolves.toBeTruthy();
    });

    it('gets correct number of documents', async () => {
      const ref1 = doc(unauthedDb, 'messages', 'docId_1');
      await setDoc(ref1, { text: 'text 1' });
      const ref2 = doc(unauthedDb, 'messages', 'docId_2');
      await setDoc(ref2, { text: 'text 2' });

      const result = await backendApi.getAll('messages');
      await expect(result).toHaveLength(2);
    });

    it('gets correct documents', async () => {
      const ref1 = doc(unauthedDb, 'messages', 'docId_1');
      await setDoc(ref1, { text: 'text 1' });
      const ref2 = doc(unauthedDb, 'messages', 'docId_2');
      await setDoc(ref2, { text: 'text 2' });

      const result = await backendApi.getAll('messages');
      expect(result).toEqual([
        { id: 'docId_1', text: 'text 1' },
        { id: 'docId_2', text: 'text 2' },
      ]);
    });

    it('rejects for a non-existing collection', async () => {
      // Don't setup document
      const resultPromise = backendApi.getAll('no-such-collection');
      await expect(resultPromise).rejects.toThrowError();
    });

    it('gets empty array for empty collection', async () => {
      const result = await backendApi.getAll('messages');
      expect(result).toHaveLength(0);
    });
  });

  describe('Remove', () => {
    it('resolves after deleting an existing document', async () => {
      const ref = doc(unauthedDb, 'messages', 'newDocId');
      await setDoc(ref, { text: 'new text' });

      const resultPromise = backendApi.remove('messages/newDocId');
      await expect(resultPromise).resolves.toBeUndefined();
    });

    it('resolves after trying to delete a non-existing document', async () => {
      const resultPromise = backendApi.remove('messages/newDocId');
      await expect(resultPromise).resolves.toBeUndefined();
    });

    it('deleted an existing document', async () => {
      const ref = doc(unauthedDb, 'messages', 'newDocId');
      await setDoc(ref, { text: 'new text' });

      await backendApi.remove('messages/newDocId');
      const result = await getDoc(doc(unauthedDb, 'messages', 'newDocId'));
      expect(result.data()).toBeUndefined();
    });
  });

  describe('Post', () => {
    it('resolves after creating a new document', async () => {
      const data = { text: 'new text' };
      const resultPromise = backendApi.post('messages', data);
      await expect(resultPromise).resolves.toBeTruthy();
    });

    it('returns an id after creating a new document', async () => {
      const data = { text: 'new text' };
      const result = await backendApi.post('messages', data);
      expect(typeof result === 'string').toBe(true);
    });

    it('returns an object with Timestamp field for JS date', async () => {
      const data = { text: 'new text', createdAt: new Date() };
      const docId = await backendApi.post('messages', data);

      const result = (
        await getDoc(doc(unauthedDb, 'messages', docId as string))
      ).data();

      let createdAt;
      if (result && 'createdAt' in result) {
        ({ createdAt } = result);
      }

      expect(createdAt instanceof Timestamp).toBe(true);
    });

    it('returns an object with correct timestamp', async () => {
      const data = {
        text: 'new text',
        createdAt: new Date(2023, 2, 23, 19, 5),
      };
      const docId = await backendApi.post('messages', data);

      const result = (
        await getDoc(doc(unauthedDb, 'messages', docId as string))
      ).data();

      let createdAt;
      if (result && 'createdAt' in result) {
        ({ createdAt } = result);
      }

      expect(createdAt.toMillis()).toBe(data.createdAt.getTime());
    });
  });

  describe('Patch', () => {
    it('resolves after updating an existing document', async () => {
      const ref = doc(unauthedDb, 'messages', 'newDocId');
      await setDoc(ref, { text: 'new text' });

      const data = { text: 'Newer text' };
      const resultPromise = backendApi.patch('messages/newDocId', data);
      await expect(resultPromise).resolves.toBeUndefined();
    });

    it('correctly updates an existing document with JS primitives', async () => {
      const ref = doc(unauthedDb, 'messages', 'newDocId');
      await setDoc(ref, {
        text: 'new text',
        author: 'Author Doe',
        isPublished: true,
        luckyNumber: 42,
        noSuchObject: null,
      });

      const data = {
        author: 'Author Doe 2',
        isPublished: false,
        luckyNumber: 41,
        noSuchObject: null,
      };

      await backendApi.patch('messages/newDocId', data);
      const result = await getDoc(doc(unauthedDb, 'messages', 'newDocId'));
      expect(result.data()).toEqual({
        text: 'new text',
        author: 'Author Doe 2',
        isPublished: false,
        luckyNumber: 41,
        noSuchObject: null,
      });
    });

    it('correctly updates an existing document with dates', async () => {
      const JSDateOld = new Date('2023-03-17T03:24:00');
      const JSDateNew = new Date('2023-03-18T09:13:00');

      const ref = doc(unauthedDb, 'messages', 'newDocId');
      await setDoc(ref, {
        text: 'new text',
        updatedAt: Timestamp.fromDate(JSDateOld),
      });

      const data = {
        updatedAt: JSDateNew,
      };

      await backendApi.patch('messages/newDocId', data);

      const result = await getDoc(doc(unauthedDb, 'messages', 'newDocId'));
      expect(result.data()?.updatedAt?.toMillis()).toEqual(JSDateNew.getTime());
    });
  });
});
