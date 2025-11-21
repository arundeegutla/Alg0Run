import { z } from 'zod';
import { createTRPCRouter, authedProcedure, publicProcedure } from '../context';
import { TRPCError } from '@trpc/server';
import { db } from '../util/db';
import { AlgoSchema, PlayDetailsSchema } from '../types';

export const algoRouter = createTRPCRouter({
  getAlgo: publicProcedure
    .input(z.object({ algoId: z.string() }))
    .query(async ({ input }) => {
      const doc = await db.collection('Algos').doc(input.algoId).get();
      if (!doc.exists) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: "Algo doesn't exist",
        });
      }
      const res = doc.data() || {};
      res.id = doc.id;
      return { algo: AlgoSchema.parse(res) };
    }),

  getAllAlgos: publicProcedure.query(async () => {
    const querySnapshot = await db.collection('Algos').get();
    const results = querySnapshot.docs.map((doc) => {
      const res = doc.data() || {};
      res.id = doc.id;
      return AlgoSchema.parse(res);
    });
    return { results };
  }),

  createPlay: authedProcedure
    .input(
      z.object({
        algoId: z.string(),
        playDetails: PlayDetailsSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const algoDoc = await db.collection('Algos').doc(input.algoId).get();
      if (!algoDoc.exists) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Algo does not exist',
        });
      }

      const profileDoc = await db
        .collection('Profiles')
        .doc(ctx.user.uid)
        .get();
      if (!profileDoc.exists) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Profile does not exist',
        });
      }
      const profile = profileDoc.data() || {};
      profile.id = profileDoc.id;

      const playsSnapshot = await db
        .collection('Plays')
        .where('profileId', '==', ctx.user.uid)
        .get();
      const plays = playsSnapshot.docs.map((doc) => doc.data());

      const playId = db.collection('Plays').doc().id;
      try {
        await db.collection('Plays').doc(playId).set({
          algoId: input.algoId,
          profileId: ctx.user.uid,
          username: profile.username,
          playDetails: input.playDetails,
        });
      } catch {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create play',
        });
      }

      const currentAlgoScores = plays
        .filter((p) => p.algoId === input.algoId)
        .map((p) => p.playDetails?.score ?? 0);
      const highestCurrentScore = Math.max(...currentAlgoScores, 0);

      if (input.playDetails.score > highestCurrentScore) {
        const newTotalScore =
          (profile.totalScore || 0) -
          highestCurrentScore +
          input.playDetails.score;
        await db
          .collection('Profiles')
          .doc(ctx.user.uid)
          .update({ totalScore: Math.round(newTotalScore * 10) / 10.0 });
      }
      return { playId };
    }),
});
