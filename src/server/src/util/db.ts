import * as admin from 'firebase-admin';

const { serviceAccount, firebaseConfig } = require('../config');

let fb;

if (!admin.apps.length) {
  fb = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  fb = admin.app();
}

export const auth = fb.auth();
export const db = admin.firestore();
