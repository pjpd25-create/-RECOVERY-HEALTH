/// <reference types="vite/client" />
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, signInAnonymously } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import firebaseConfig from '../firebase-applet-config.json';

import { OperationType, FirestoreErrorInfo } from './types';

// Use environment variables if available (for Vercel/Production)
const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || firebaseConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || firebaseConfig.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || firebaseConfig.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || firebaseConfig.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || firebaseConfig.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || firebaseConfig.appId,
  firestoreDatabaseId: import.meta.env.VITE_FIREBASE_DATABASE_ID || firebaseConfig.firestoreDatabaseId
};

const isConfigValid = config.apiKey && !config.apiKey.includes('remixed') && config.apiKey !== 'dummy';

let app;
if (!getApps().length) {
  if (isConfigValid) {
    app = initializeApp(config);
  } else {
    // Fallback or dummy app to prevent crash
    app = initializeApp({
      apiKey: "dummy",
      authDomain: "dummy",
      projectId: "dummy",
      storageBucket: "dummy",
      messagingSenderId: "dummy",
      appId: "dummy"
    });
    console.warn("Firebase config is missing or invalid. Using dummy config.");
  }
} else {
  app = getApp();
}

export const auth = getAuth(app);
export const db = getFirestore(app, isConfigValid ? config.firestoreDatabaseId : undefined);
export const storage = isConfigValid ? getStorage(app) : null;

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
