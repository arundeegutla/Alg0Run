import { firestore } from "firebase-admin";
import { fb, db } from "../util/db";

import { PlayBasic, ProfileBasic } from "../util/models";

export async function getProfiles() {
  return db.collection("Profiles")
    .select("username", "totalScore", "photoURL")
    .get()
    .then(querySnapshot => querySnapshot.docs.map(doc => {return {...(doc.data()), ...{id: doc.id}} as ProfileBasic}));
}

export async function getAlgo(algoId: string) {
  return db.collection("Plays")
    .where("algoId", "==", algoId)
    .select("profileId", "username", "playDetails")
    .get()
    .then(querySnapshot => querySnapshot.docs.map(doc => doc.data() as PlayBasic));
}