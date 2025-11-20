import { z } from 'zod';
import { createTRPCRouter, authedProcedure } from '../context';
import { TRPCError } from '@trpc/server';
import { db } from '../util/db';
import { ProfileBasicSchema, PlayBasicSchema } from '../types';

export const leaderboardRouter = createTRPCRouter({
  getUserLeaderboard: authedProcedure.query(async () => {
    try {
      const querySnapshot = await db
        .collection('Profiles')
        .select('username', 'totalScore', 'photoURL')
        .get();
      const results = querySnapshot.docs.map((doc) => {
        const res = { ...doc.data(), id: doc.id };
        try {
          return ProfileBasicSchema.parse(res);
        } catch (err) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to parse profile data',
            cause: err,
          });
        }
      });
      return { results };
    } catch (err) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch user leaderboard',
        cause: err,
      });
    }
  }),

  getAlgoLeaderboard: authedProcedure
    .input(z.object({ algoId: z.string() }))
    .query(async ({ input }) => {
      try {
        // Check if algo exists
        const algoDoc = await db.collection('Algos').doc(input.algoId).get();
        if (!algoDoc.exists) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: "Algo doesn't exist",
          });
        }

        // Get all plays for this algo
        let playsSnapshot;
        try {
          playsSnapshot = await db
            .collection('Plays')
            .where('algoId', '==', input.algoId)
            .select('profileId', 'username', 'playDetails')
            .get();
        } catch (err) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to fetch plays for algo',
            cause: err,
          });
        }

        const plays = playsSnapshot.docs.map((doc) => {
          try {
            return PlayBasicSchema.parse(doc.data());
          } catch (err) {
            throw new TRPCError({
              code: 'INTERNAL_SERVER_ERROR',
              message: 'Failed to parse play data',
              cause: err,
            });
          }
        });

        // Find top play per profile
        const topScores = new Map();
        plays.forEach((p) => {
          if (
            !topScores.has(p.profileId) ||
            (topScores.get(p.profileId)?.playDetails.score || 0) <
              p.playDetails.score
          ) {
            topScores.set(p.profileId, p);
          }
        });

        return {
          results: Array.from(topScores.values()),
        };
      } catch (err) {
        if (err instanceof TRPCError) throw err;
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch algo leaderboard',
          cause: err,
        });
      }
    }),
});
