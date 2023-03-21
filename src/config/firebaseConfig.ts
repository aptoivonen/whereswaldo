import { FirebaseApp, initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import * as firebaseJson from '../../firebase.json';

let app: FirebaseApp;

if (import.meta.env.PROD) {
  app = initializeApp({
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  });
} else {
  app = initializeApp({ projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID });
}

const db = getFirestore(app);

if (import.meta.env.DEV) {
  const { port } = firebaseJson.emulators.firestore;
  connectFirestoreEmulator(db, 'localhost', port);
}

export default db;
