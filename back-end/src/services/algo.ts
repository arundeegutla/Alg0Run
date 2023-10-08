import { firestore } from "firebase-admin";
import { db } from "../util/db";

import { PlayDetails, Algo } from "../util/models";

export async function getAlgo(id: string) {
  return await db.collection("Algos")
    .doc(id)
    .get()
    .then(doc => doc.data() as Algo);
}

export async function getAllAlgos() {
  return db.collection("Algos")
    .get()
    .then(querySnapshot => querySnapshot.docs.map(doc => doc.data() as Algo));
}

export async function createPlay(algoId: string, profileId: string, username: string, playDetails: PlayDetails) {
  const playId = db.collection("Plays").doc().id;

  try {
    await db.collection("Plays").doc(playId).set({
      algoId: algoId,
      profileId: profileId,
      username: username,
      playDetails: playDetails
    })
    return playId;
  }
  catch (error) {
    return undefined;
  }
}