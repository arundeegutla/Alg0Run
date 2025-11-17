import { z } from 'zod';
import { createTRPCRouter, authedProcedure } from '../context';
import { db } from '../util/db';
import { ProfileBasicSchema, PlayBasicSchema } from '../types';

export const leaderboardRouter = createTRPCRouter({
  getUserLeaderboard: authedProcedure.query(async () => {
    const querySnapshot = await db
      .collection('Profiles')
      .select('username', 'totalScore', 'photoURL')
      .get();
    const results = querySnapshot.docs.map((doc) => {
      const res = { ...doc.data(), id: doc.id };
      return ProfileBasicSchema.parse(res);
    });
    return { results, error: '' };
  }),

  getAlgoLeaderboard: authedProcedure
    .input(z.object({ algoId: z.string() }))
    .query(async ({ input }) => {
      // Check if algo exists
      const algoDoc = await db.collection('Algos').doc(input.algoId).get();
      if (!algoDoc.exists) {
        return { error: "Algo doesn't exist" };
      }

      // Get all plays for this algo
      const playsSnapshot = await db
        .collection('Plays')
        .where('algoId', '==', input.algoId)
        .select('profileId', 'username', 'playDetails')
        .get();
      const plays = playsSnapshot.docs.map((doc) =>
        PlayBasicSchema.parse(doc.data())
      );

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
        error: '',
      };
    }),
});
