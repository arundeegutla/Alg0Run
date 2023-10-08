import { firestore } from "firebase-admin";
import { fb, db } from "../util/db";

import { PlayBasic, ProfileBasic } from "../util/models";

export async function getUsers() {
  return db.collection("Users")
    .select("username", "totalScore")
    .get()
    .then(querySnapshot => querySnapshot.docs.map(doc => {
      let res = doc.data();

      if (res === undefined) return undefined;
      
      res.id = doc.id;

      return res as ProfileBasic
    }));
}

export async function getAlgo(algoId: string) {
  return db.collection("Plays")
    .where("algoId", "==", algoId)
    .select("profileId", "username", "playDetails")
    .get()
    .then(querySnapshot => querySnapshot.docs.map(doc => doc.data() as PlayBasic));
}