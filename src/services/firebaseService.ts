import app from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';
import '@firebase/storage';

const config = {
  apiKey: 'AIzaSyAu0qhmePKWijgDTEpXD1OBI4_0Neani3U',
  authDomain: 'budge-123bb.firebaseapp.com',
  databaseURL: 'https://budge-123bb.firebaseio.com',
  projectId: 'budge-123bb',
  storageBucket: 'gs://budge-123bb.appspot.com',
  messagingSenderId: '594166468974',
};

app.initializeApp(config);

const firestoreSettings = {
  timestampsInSnapshots: true,
};

if (app.firestore === undefined) {
  throw new Error('Firebase Firestore library was not loaded');
}

export const firestore = app.firestore();
firestore.settings(firestoreSettings);

if (app.storage === undefined) {
  throw new Error('Firebase Storage library was not loaded');
}

export const storage = app.storage();

if (app.auth === undefined) {
  throw new Error('Firebase Auth library was not loaded');
}

export const auth = app.auth();
export const facebookAuthProvider = new app.auth.FacebookAuthProvider();
