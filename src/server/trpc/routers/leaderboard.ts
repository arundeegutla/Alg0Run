import { z } from 'zod';
import { createTRPCRouter, authedProcedure } from '../context';
import { db } from '../util/db';
import { TRPCError } from '@trpc/server';

export const leaderboardRouter = createTRPCRouter({
  getUserLeaderboard: authedProcedure.query(async () => {
    const querySnapshot = await db
      .collection('Profiles')
      .select('username', 'totalScore', 'photoURL')
      .get();
    const results = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), ...{ id: doc.id } };
    });
    return { results, error: '' };
  }),

  getAlgoLeaderboard: authedProcedure
    .input(z.object({ algoId: z.string() }))
    .query(async ({ input }) => {
      // Check if algo exists
      const algoDoc = await db.collection('Algos').doc(input.algoId).get();
      if (!algoDoc.exists) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: "Algo doesn't exist",
        });
      }

      // Get all plays for this algo
      const playsSnapshot = await db
        .collection('Plays')
        .where('algoId', '==', input.algoId)
        .select('profileId', 'username', 'playDetails')
        .get();
      const plays = playsSnapshot.docs.map(
        (doc) =>
          doc.data() as { profileId: string; playDetails: { score: number } }
      );

      // Find top score per profile
      const topScores = new Map<
        string,
        { profileId: string; playDetails: { score: number }; username?: string }
      >();
      plays.forEach((p) => {
        if (
          !topScores.has(p.profileId) ||
          (topScores.get(p.profileId)?.playDetails.score || 0) <
            p.playDetails.score
        ) {
          topScores.set(p.profileId, p);
        }
      });

      return { results: Array.from(topScores.values()), error: '' };
    }),
});
