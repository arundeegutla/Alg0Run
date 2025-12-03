import { z } from 'zod';
import { createTRPCRouter, authedProcedure } from '../context';
import { TRPCError } from '@trpc/server';
import { db } from '../util/db';
import { PlayBasicSchema, ProfileSchema } from '../types';

export const leaderboardRouter = createTRPCRouter({
  getAlgoLeaderboard: authedProcedure
    .input(z.object({ algoId: z.string(), language: z.string().optional() }))
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

        let plays = playsSnapshot.docs.map((doc) => {
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

        // Filter by language if provided
        if (input.language && input.language !== 'all') {
          plays = plays.filter(
            (p) => p.playDetails.language === input.language
          );
        }

        // Find top play per profile (after filtering)
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
  getLeaderboard: authedProcedure.query(async () => {
    try {
      const profilesSnapshot = await db
        .collection('Profiles')
        .select(
          'userId',
          'username',
          'totalScore',
          'photoURL',
          'provider',
          'friends'
        )
        .get();

      // Parse, filter, and sort profiles by totalScore descending, then take top 20
      const profiles = profilesSnapshot.docs
        .map((doc) => {
          const data = doc.data() || {};
          const profile = {
            id: doc.id,
            userId: data.userId ?? doc.id,
            username: data.username ?? '',
            photoURL: data.photoURL ?? '',
            totalScore: data.totalScore ?? 0,
            provider: data.provider ?? 'codeforces',
            friends: Array.isArray(data.friends) ? data.friends : [],
          };
          return ProfileSchema.parse(profile);
        })
        .filter((profile) => profile.totalScore !== 0)
        .sort((a, b) => b.totalScore - a.totalScore)
        .slice(0, 10);

      return {
        results: profiles,
      };
    } catch (err) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch leaderboard',
        cause: err,
      });
    }
  }),
});
