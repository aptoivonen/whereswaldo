import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  getFirestore,
  connectFirestoreEmulator,
  type Firestore,
  initializeFirestore,
} from 'firebase/firestore';
import * as firebaseJson from '../../firebase.json';

const isProduction = import.meta.env.PROD;
const isDevelopment = import.meta.env.DEV;
const isTest = import.meta.env.MODE === 'test';

const { port } = firebaseJson.emulators.firestore;
let app: FirebaseApp;
let db: Firestore;

if (isProduction) {
  app = initializeApp({
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  });
  db = getFirestore(app);
}

if (isDevelopment) {
  app = initializeApp({
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  });
  // For Cypress
  db = initializeFirestore(app, {
    experimentalAutoDetectLongPolling: true,
  });
  connectFirestoreEmulator(db, 'localhost', port);
}

// In testing, the firestore instance will be set by tests, just setting it here for types
if (isTest) {
  app = initializeApp({
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  });
  db = getFirestore(app);
}

export function getDb(): Firestore {
  return db;
}

// Used for testing
export function setDb(newDb: Firestore): void {
  db = newDb;
}
