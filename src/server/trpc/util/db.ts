import * as admin from 'firebase-admin';

import { serviceAccount } from './config';

let fb;

if (!admin.apps.length) {
  fb = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
} else {
  fb = admin.app();
}

export const auth = fb.auth();
export const db = admin.firestore();
