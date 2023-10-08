import * as admin from "firebase-admin";

const { serviceAccount, firebaseConfig } = require("../config");

export const fb = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const db = admin.firestore();
