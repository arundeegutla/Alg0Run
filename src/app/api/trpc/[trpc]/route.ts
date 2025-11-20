import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { type NextRequest } from 'next/server';

import { appRouter } from '@/server/trpc/root';
import { env } from 'process';
import { createTRPCContext } from '@/server/trpc/context';

const getFirebaseTokenFromHeader = (headers: Headers): string | null => {
  const authHeader =
    headers.get('authorization') || headers.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring('Bearer '.length);
  }
  return null;
};

const createContext = async (req: NextRequest) => {
  const session_token = getFirebaseTokenFromHeader(req.headers);
  return createTRPCContext({
    headers: req.headers,
    session_token,
  });
};

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError:
      env.NODE_ENV === 'development'
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`
            );
          }
        : undefined,
  });

export { handler as GET, handler as POST };
