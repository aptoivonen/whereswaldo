import fs from 'fs';
import { describe, it, beforeEach, afterEach } from 'vitest';
import {
  initializeTestEnvironment,
  RulesTestEnvironment,
  RulesTestContext,
  assertSucceeds,
  assertFails,
} from '@firebase/rules-unit-testing';
import * as firebaseJson from '../../firebase.json';

const MY_PROJECT_ID = 'demo-test-id-1';
const { port: FIRESTORE_EMULATOR_PORT } = firebaseJson.emulators.firestore;

let testEnv: RulesTestEnvironment;
let unauthenticatedUser: RulesTestContext;

describe('Firestore rules', () => {
  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: MY_PROJECT_ID,
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

  describe('Scores', () => {
    const testScoreId = 'testScoreId';

    beforeEach(async () => {
      // Setup initial score data
      await testEnv.withSecurityRulesDisabled((context) => {
        const firestoreWithoutRule = context.firestore();
        return firestoreWithoutRule
          .collection('scores')
          .doc(testScoreId)
          .set({ levelId: '1', time: 5, userName: 'Abc' });
      });

      // Create unauthenticated user for testing
      unauthenticatedUser = testEnv.unauthenticatedContext();
    });

    // - GET: Allowed for all users
    it('Anyone can GET.', async () => {
      const readScore = unauthenticatedUser
        .firestore()
        .collection('scores')
        .doc(testScoreId)
        .get();

      await assertSucceeds(readScore);
    });

    // - LIST: Allowed for all users
    it('Anyone can LIST.', async () => {
      const readScore = unauthenticatedUser
        .firestore()
        .collection('scores')
        .get();

      await assertSucceeds(readScore);
    });

    // - CREATE: allowed for all users
    it('Anyone can CREATE.', async () => {
      const readScore = unauthenticatedUser
        .firestore()
        .collection('scores')
        .add({ levelId: '1', time: 5, userName: 'unAuthUser' });

      await assertSucceeds(readScore);
    });

    // - UPDATE: Not allowed for any users
    it('No one can UPDATE.', async () => {
      const updateByUnauthenticatedUser = unauthenticatedUser
        .firestore()
        .collection('scores')
        .doc(testScoreId)
        .update({ userName: 'Abc' });

      await assertFails(updateByUnauthenticatedUser);
    });

    // - DELETE: Not allowed
    it('No one can DELETE.', async () => {
      const deleteByUnauthenticatedUser = unauthenticatedUser
        .firestore()
        .collection('scores')
        .doc(testScoreId)
        .delete();

      await assertFails(deleteByUnauthenticatedUser);
    });
  });

  describe('Levels', () => {
    const testLevelId = 'testLevelId';

    beforeEach(async () => {
      // Setup initial levels data
      await testEnv.withSecurityRulesDisabled((context) => {
        const firestoreWithoutRule = context.firestore();
        return firestoreWithoutRule
          .collection('levels')
          .doc(testLevelId)
          .set({
            characterCoordinates: { Waldo: [22, 33], Odlaw: [1, 99] },
            characters: ['Waldo', 'Odlaw'],
            foundAcceptanceRadius: 3,
            imgUrl: 'level-1.jpg',
            thumbnailUrl: 'thumbnail-level-1.jpg',
          });
      });

      // Create unauthenticated user for testing
      unauthenticatedUser = testEnv.unauthenticatedContext();
    });

    it('Anyone can READ.', async () => {
      const readLevel = unauthenticatedUser
        .firestore()
        .collection('levels')
        .doc(testLevelId)
        .get();

      await assertSucceeds(readLevel);
    });

    it('No one can CREATE.', async () => {
      const readLevel = unauthenticatedUser
        .firestore()
        .collection('levels')
        .add({
          characterCoordinates: { Waldo: [22, 33], Odlaw: [1, 99] },
          characters: ['Waldo', 'Odlaw'],
          foundAcceptanceRadius: 3,
          imgUrl: 'level-1.jpg',
          thumbnailUrl: 'thumbnail-level-1.jpg',
        });

      await assertFails(readLevel);
    });

    it('No one can UPDATE.', async () => {
      const updateByUnauthenticatedUser = unauthenticatedUser
        .firestore()
        .collection('levels')
        .doc(testLevelId)
        .update({ foundAcceptanceRadius: 100 });

      await assertFails(updateByUnauthenticatedUser);
    });

    it('No one can DELETE.', async () => {
      const updateByUnauthenticatedUser = unauthenticatedUser
        .firestore()
        .collection('levels')
        .doc(testLevelId)
        .delete();

      await assertFails(updateByUnauthenticatedUser);
    });
  });
});
