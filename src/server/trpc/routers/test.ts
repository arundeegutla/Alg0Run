import { z } from 'zod';
import { createTRPCRouter, authedProcedure, baseProcedure } from '../context';
import { db } from '../util/db';
import { TRPCError } from '@trpc/server';

export const testRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
});
