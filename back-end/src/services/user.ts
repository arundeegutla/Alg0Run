import { firestore } from "firebase-admin";
import { fb, db } from "../util/db";

import { Profile, Play } from "../util/models";

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
        return res as Profile;
      }
    });
}

export async function getProfile(profileId: string) {
  return await db.collection("Profiles")
    .doc(profileId)
    .get()
    .then(doc => {
      let res = doc.data();

      if (res === undefined) return undefined;

      res.id = profileId;

      return res as Profile;
    });
}

export async function getPlays(profileId: string) {
  return await db.collection("Plays")
    .where("profileId", "==", profileId)
    .get()
    .then(querySnapshot => {
      return querySnapshot.docs.map(doc => doc.data() as Play);
    });
}

export async function createProfile(userId: string, username: string) {
  const profileId = db.collection("Profiles").doc().id;

  try {
    await db.collection("Profiles").doc(profileId).set({
      username: username,
      totalScore: 0,
      userId: userId,
      friends: []
    });
    return profileId;
  } 
  catch (error) {
    return undefined;
  }
}

export async function addFriend(profileId: string, friendId: string) {
  return db.collection("Profiles").doc(profileId).update({
    friends: firestore.FieldValue.arrayUnion(friendId)
  });
}

export async function removeFriend(profileId: string, friendId: string) {
  return db.collection("Profiles").doc(profileId).update({
    friends: firestore.FieldValue.arrayRemove(friendId)
  });
}
