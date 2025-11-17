import { z } from 'zod';
import { createTRPCRouter, authedProcedure } from '../context';
import { db, auth } from '../util/db';
import { ProfileSchema, PlaySchema } from '../types';
import { firestore } from 'firebase-admin';

export const profileRouter = createTRPCRouter({
  verifyToken: authedProcedure
    .input(z.object({ idToken: z.string() }))
    .query(async ({ input }) => {
      try {
        const decodedToken = await auth.verifyIdToken(input.idToken);
        return { decodedToken, error: '' };
      } catch {
        return { decodedToken: undefined, error: 'Invalid token' };
      }
    }),

  getProfileByUserId: authedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const querySnapshot = await db
        .collection('Profiles')
        .where('userId', '==', input.userId)
        .get();
      if (querySnapshot.empty) {
        return { profile: undefined, error: 'Profile not found' };
      }
      const res = querySnapshot.docs[0].data();
      res.id = querySnapshot.docs[0].id;
      return { profile: ProfileSchema.parse(res), error: '' };
    }),

  getProfileByToken: authedProcedure
    .input(z.object({ idToken: z.string() }))
    .query(async ({ input }) => {
      try {
        const decodedToken = await auth.verifyIdToken(input.idToken);
        const userId = decodedToken.uid;
        const querySnapshot = await db
          .collection('Profiles')
          .where('userId', '==', userId)
          .get();
        if (querySnapshot.empty) {
          return { error: 'Profile does not exist for this user.' };
        }
        const profileDoc = querySnapshot.docs[0];
        const profile = profileDoc.data() || {};
        profile.id = profileDoc.id;
        const playsSnapshot = await db
          .collection('Plays')
          .where('profileId', '==', profile.id)
          .get();
        const plays = playsSnapshot.docs.map((doc) =>
          PlaySchema.parse(doc.data())
        );
        return { profile: ProfileSchema.parse(profile), plays, error: '' };
      } catch {
        return { error: 'Invalid token' };
      }
    }),

  getProfile: authedProcedure
    .input(z.object({ profileId: z.string() }))
    .query(async ({ input }) => {
      const doc = await db.collection('Profiles').doc(input.profileId).get();
      if (!doc.exists) {
        return { profile: undefined, error: 'Profile not found' };
      }
      const res = doc.data() || {};
      res.id = doc.id;
      return { profile: ProfileSchema.parse(res), error: '' };
    }),

  getPlays: authedProcedure
    .input(z.object({ profileId: z.string() }))
    .query(async ({ input }) => {
      const querySnapshot = await db
        .collection('Plays')
        .where('profileId', '==', input.profileId)
        .get();
      const plays = querySnapshot.docs.map((doc) =>
        PlaySchema.parse(doc.data())
      );
      return { plays, error: '' };
    }),

  createProfile: authedProcedure
    .input(
      z.object({
        userId: z.string(),
        username: z.string(),
        photoURL: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const profileId = db.collection('Profiles').doc().id;
      try {
        await db.collection('Profiles').doc(profileId).set({
          username: input.username,
          totalScore: 0,
          userId: input.userId,
          photoURL: input.photoURL,
          friends: [],
        });
        return { profileId, error: '' };
      } catch {
        return { profileId: undefined, error: 'Failed to create profile' };
      }
    }),

  addFriend: authedProcedure
    .input(z.object({ profileId: z.string(), friendId: z.string() }))
    .mutation(async ({ input }) => {
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

  setScore: authedProcedure
    .input(z.object({ profileId: z.string(), newTotalScore: z.number() }))
    .mutation(async ({ input }) => {
      try {
        await db
          .collection('Profiles')
          .doc(input.profileId)
          .update({ totalScore: input.newTotalScore });
        return { error: '' };
      } catch {
        return { error: 'Failed to set score' };
      }
    }),
});
