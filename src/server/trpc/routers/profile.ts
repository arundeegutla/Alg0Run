import { z } from 'zod';
import { createTRPCRouter, authedProcedure } from '../context';
import { db, auth } from '../util/db';
import { firestore } from 'firebase-admin';

export const profileRouter = createTRPCRouter({
  isFirstTimeUser: authedProcedure
    .input(z.object({ idToken: z.string() }))
    .query(async ({ input }) => {
      let tokenResult;
      try {
        tokenResult = await auth.verifyIdToken(input.idToken);
      } catch {
        return { result: true };
      }
      const userId = tokenResult.uid;
      const profileSnapshot = await db
        .collection('Profiles')
        .where('userId', '==', userId)
        .get();
      if (profileSnapshot.empty) {
        return { result: true, userId };
      }
      return { result: false };
    }),

  createProfile: authedProcedure
    .input(
      z.object({
        idToken: z.string(),
        username: z.string(),
        photoURL: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      // Check if first time user
      let tokenResult;
      try {
        tokenResult = await auth.verifyIdToken(input.idToken);
      } catch {
        return { error: 'Invalid token' };
      }
      const userId = tokenResult.uid;
      const profileSnapshot = await db
        .collection('Profiles')
        .where('userId', '==', userId)
        .get();
      if (!profileSnapshot.empty) {
        return { error: 'Profile already exists for user' };
      }
      const profileId = db.collection('Profiles').doc().id;
      try {
        await db.collection('Profiles').doc(profileId).set({
          username: input.username,
          totalScore: 0,
          userId,
          photoURL: input.photoURL,
          friends: [],
        });
        return { profileId, error: '' };
      } catch {
        return { error: 'Failed to create profile' };
      }
    }),

  getProfileByToken: authedProcedure
    .input(z.object({ idToken: z.string() }))
    .query(async ({ input }) => {
      let tokenResult;
      try {
        tokenResult = await auth.verifyIdToken(input.idToken);
      } catch {
        return { error: 'Invalid token' };
      }
      const userId = tokenResult.uid;
      const profileSnapshot = await db
        .collection('Profiles')
        .where('userId', '==', userId)
        .get();
      if (profileSnapshot.empty) {
        return { error: 'Profile does not exist for this user.' };
      }
      const profile = profileSnapshot.docs[0].data();
      const profileId = profileSnapshot.docs[0].id;
      const playsSnapshot = await db
        .collection('Plays')
        .where('profileId', '==', profileId)
        .get();
      const plays = playsSnapshot.docs.map((doc) => doc.data());
      return { profile: { ...profile, id: profileId }, plays, error: '' };
    }),

  getProfile: authedProcedure
    .input(z.object({ profileId: z.string() }))
    .query(async ({ input }) => {
      const doc = await db.collection('Profiles').doc(input.profileId).get();
      if (!doc.exists) {
        return { error: 'Profile with this ID does not exist.' };
      }
      const profile = doc.data();
      const playsSnapshot = await db
        .collection('Plays')
        .where('profileId', '==', input.profileId)
        .get();
      const plays = playsSnapshot.docs.map((doc) => doc.data());
      return { profile: { ...profile, id: doc.id }, plays, error: '' };
    }),

  addFriend: authedProcedure
    .input(z.object({ profileId: z.string(), friendId: z.string() }))
    .mutation(async ({ input }) => {
      const profileDoc = await db
        .collection('Profiles')
        .doc(input.profileId)
        .get();
      if (!profileDoc.exists) {
        return { error: 'Profile does not exist' };
      }
      const friendDoc = await db
        .collection('Profiles')
        .doc(input.friendId)
        .get();
      if (!friendDoc.exists) {
        return { error: 'Friend does not exist' };
      }
      try {
        await db
          .collection('Profiles')
          .doc(input.profileId)
          .update({
            friends: firestore.FieldValue.arrayUnion(input.friendId),
          });
        return { error: '' };
      } catch {
        return { error: 'Failed to add friend' };
      }
    }),

  removeFriend: authedProcedure
    .input(z.object({ profileId: z.string(), friendId: z.string() }))
    .mutation(async ({ input }) => {
      const profileDoc = await db
        .collection('Profiles')
        .doc(input.profileId)
        .get();
      if (!profileDoc.exists) {
        return { error: 'Profile does not exist' };
      }
      const friendDoc = await db
        .collection('Profiles')
        .doc(input.friendId)
        .get();
      if (!friendDoc.exists) {
        return { error: 'Friend does not exist' };
      }
      try {
        await db
          .collection('Profiles')
          .doc(input.profileId)
          .update({
            friends: firestore.FieldValue.arrayRemove(input.friendId),
          });
        return { error: '' };
      } catch {
        return { error: 'Failed to remove friend' };
      }
    }),
});
