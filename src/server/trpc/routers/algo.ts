import { z } from 'zod';
import { createTRPCRouter, authedProcedure } from '../context';
import { db } from '../util/db';
import { TRPCError } from '@trpc/server';

export const algosRouter = createTRPCRouter({
  getAlgo: authedProcedure
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
      return { algo: res, error: '' };
    }),

  getAllAlgos: authedProcedure.query(async () => {
    const querySnapshot = await db.collection('Algos').get();
    const results = querySnapshot.docs.map((doc) => {
      const res = doc.data();
      res.id = doc.id;
      return res;
    });
    return { results, error: '' };
  }),

  createPlay: authedProcedure
    .input(
      z.object({
        algoId: z.string(),
        profileId: z.string(),
        playDetails: z.any(), // Should match PlayDetails type
      })
    )
    .mutation(async ({ input }) => {
      // Get Algo
      const algoDoc = await db.collection('Algos').doc(input.algoId).get();
      if (!algoDoc.exists) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Algo does not exist',
        });
      }

      // Get Profile
      const profileDoc = await db
        .collection('Profiles')
        .doc(input.profileId)
        .get();
      if (!profileDoc.exists) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Profile does not exist',
        });
      }
      const profile = profileDoc.data();
      if (!profile) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Profile does not exist',
        });
      }

      // Get Plays
      const playsSnapshot = await db
        .collection('Plays')
        .where('profileId', '==', input.profileId)
        .get();
      const plays = playsSnapshot.docs.map(
        (doc) =>
          doc.data() as { algoId: string; playDetails: { score: number } }
      );

      // Create Play
      const playId = db.collection('Plays').doc().id;
      try {
        await db.collection('Plays').doc(playId).set({
          algoId: input.algoId,
          profileId: input.profileId,
          username: profile.username,
          playDetails: input.playDetails,
        });
      } catch {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create play',
        });
      }

      // Update score if needed
      const currentAlgoScores = plays
        .filter((p) => p.algoId === input.algoId)
        .map((p) => p.playDetails.score);
      const highestCurrentScore = Math.max(...currentAlgoScores, 0);
      if (input.playDetails.score > highestCurrentScore) {
        const newTotalScore =
          (profile.totalScore ?? 0) -
          highestCurrentScore +
          input.playDetails.score;
        await db
          .collection('Profiles')
          .doc(input.profileId)
          .update({
            totalScore: Math.round(newTotalScore * 10) / 10.0,
          });
      }
      return { playId, error: '' };
    }),
});
