import { z } from 'zod';
import { createTRPCRouter, authedProcedure } from '../context';
import { db, auth } from '../util/db';
import { ProfileSchema, PlaySchema } from '../types';
import { firestore } from 'firebase-admin';
import { TRPCError } from '@trpc/server';

export const profileRouter = createTRPCRouter({
  verifyToken: authedProcedure
    .input(z.object({ idToken: z.string() }))
    .query(async ({ input }) => {
      try {
        const decodedToken = await auth.verifyIdToken(input.idToken);
        return { decodedToken };
      } catch {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid token' });
      }
    }),

  getProfileByUserId: authedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const doc = await db.collection('Profiles').doc(input.userId).get();
      if (!doc.exists) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Profile not found',
        });
      }
      const res = doc.data() || {};
      res.id = doc.id;
      return { profile: ProfileSchema.parse(res) };
    }),

  getProfileByToken: authedProcedure
    .input(z.object({ idToken: z.string() }))
    .query(async ({ input }) => {
      if (!input.idToken) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'No token provided',
        });
      }
      try {
        const decodedToken = await auth.verifyIdToken(input.idToken);
        const userId = decodedToken.uid;
        const doc = await db.collection('Profiles').doc(userId).get();
        if (!doc.exists) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Profile does not exist for this user.',
          });
        }
        const profile = doc.data() || {};
        profile.id = doc.id;
        const playsSnapshot = await db
          .collection('Plays')
          .where('profileId', '==', profile.id)
          .get();
        const plays = playsSnapshot.docs.map((doc) =>
          PlaySchema.parse(doc.data())
        );
        return { profile: ProfileSchema.parse(profile), plays };
      } catch (err) {
        console.log(err);
        throw err;
      }
    }),

  getProfile: authedProcedure.query(async ({ ctx }) => {
    const doc = await db.collection('Profiles').doc(ctx.user.uid).get();
    if (!doc.exists) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Profile not found' });
    }
    const res = doc.data() || {};
    res.id = doc.id;
    return { profile: ProfileSchema.parse(res) };
  }),

  getPlays: authedProcedure.query(async ({ ctx }) => {
    const querySnapshot = await db
      .collection('Plays')
      .where('profileId', '==', ctx.user.uid)
      .get();
    const plays = querySnapshot.docs.map((doc) => PlaySchema.parse(doc.data()));
    return { plays };
  }),

  createProfile: authedProcedure.mutation(async ({ ctx }) => {
    try {
      console.log(ctx.user.uid, 'Creating profile for user:', ctx.user.name);
      await db.collection('Profiles').doc(ctx.user.uid).set({
        username: ctx.user.name,
        totalScore: 0,
        userId: ctx.user.uid,
        photoURL: ctx.user.picture,
        friends: [],
      });
      return {};
    } catch (err) {
      console.error('Error creating profile:', err);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to create profile',
      });
    }
  }),

  addFriend: authedProcedure
    .input(z.object({ friendId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await db
          .collection('Profiles')
          .doc(ctx.user.uid)
          .update({
            friends: firestore.FieldValue.arrayUnion(input.friendId),
          });
        return {};
      } catch {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to add friend',
        });
      }
    }),

  removeFriend: authedProcedure
    .input(z.object({ friendId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await db
          .collection('Profiles')
          .doc(ctx.user.uid)
          .update({
            friends: firestore.FieldValue.arrayRemove(input.friendId),
          });
        return {};
      } catch {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to remove friend',
        });
      }
    }),

  setScore: authedProcedure
    .input(z.object({ newTotalScore: z.number() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await db
          .collection('Profiles')
          .doc(ctx.user.uid)
          .update({ totalScore: input.newTotalScore });
        return {};
      } catch {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to set score',
        });
      }
    }),
});
