import { firestore } from "firebase-admin";
import { fb, db } from "../util/db";

export async function verifyToken(idToken: string) {
  try {
    const decodedToken = await fb.auth().verifyIdToken(idToken);
    return decodedToken;
  } catch (error) {
    return undefined;
  }
}

export async function getProfileByUserId(userId: string) {
  return await db.collection("Profiles")
    .where("userId", "==", userId)
    .get()
    .then(querySnapshot => {
      if (!querySnapshot.empty) {
        let res = querySnapshot.docs[0].data();
        res.id = querySnapshot.docs[0].id;
        return res;
      }
    });
}

export async function getProfile(id: string) {
  return await db.collection("Profiles")
    .doc(id)
    .get()
    .then(doc => {
      return doc.data();
    });
}

export async function getPlays(profileId: string) {
  return await db.collection("Plays")
    .where("profileId", "==", profileId)
    .get()
    .then(querySnapshot => {
      return querySnapshot.docs.map(doc => doc.data());
    });
}

export async function createProfile(userId: string, username: string) {
  const profileId = db.collection("Profiles").doc().id;
  let friends: string[] = []; 

  try {
    await db.collection("Profiles").doc(profileId).set({
      username: username,
      userId: userId,
      friends: friends
    });

    return profileId;
  }
  catch {
    return undefined;
  }
}