import { createCallerFactory, createTRPCRouter } from '~/server/trpc/context';
import { algoRouter } from '~/server/trpc/routers/algo';
import { leaderboardRouter } from '~/server/trpc/routers/leaderboard';
import { profileRouter } from '~/server/trpc/routers/profile';
import { testRouter } from '~/server/trpc/routers/test';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  algo: algoRouter,
  leaderboard: leaderboardRouter,
  profile: profileRouter,
  test: testRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
