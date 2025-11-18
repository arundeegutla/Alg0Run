import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';

export const createTRPCContext = async (opts: {
  headers: Headers;
  session_token: string | null;
}) => {
  return {
    ...opts,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createCallerFactory = t.createCallerFactory;
export const createTRPCRouter = t.router;

const authedMiddleware = t.middleware(async ({ ctx, next }) => {
  const supabase = createServiceRoleClient();
  if (!ctx.session_token) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  const { data, error } = await supabase.auth.getUser(ctx.session_token);

  if (!data.user || error) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return await next({
    ctx: { ...ctx, session_token: ctx.session_token, user: data.user },
  });
});

export const authedProcedure = t.procedure.use(authedMiddleware);
export const baseProcedure = t.procedure;
