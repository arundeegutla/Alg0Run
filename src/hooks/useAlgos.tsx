import { useMemo } from 'react';
import { trpc } from '@/server/trpc/client';
import { useQueries } from '@tanstack/react-query';
import { Algo } from '@/server/trpc/types';

// You may want to define a type for Algo if available
// import { Algo } from '@/server/trpc/types';

export const algoCache = new Map<string, Algo>();

/**
 * useAlgos - fetches algos by their IDs, caches results, and returns a Map of algoId -> algo
 * @param algoIds string[]
 */
export function useAlgos(algoIds: string[]) {
  const trpcContext = trpc.useContext();

  const queries = useQueries({
    queries: algoIds.map((id) => ({
      queryKey: ['algo', id],
      queryFn: async () => {
        if (algoCache.has(id)) {
          // Optionally log cache hit
          return algoCache.get(id);
        }
        const result = await trpcContext.algo.getAlgo.fetch({ algoId: id });
        if (result?.algo) {
          algoCache.set(id, result.algo);
          return result.algo;
        }
        return undefined;
      },
      enabled: !!id,
      staleTime: Infinity,
      cacheTime: Infinity,
    })),
  });

  const algos = useMemo(() => {
    const map = new Map<string, Algo>();
    queries.forEach((q, idx) => {
      if (q.data) {
        map.set(algoIds[idx], q.data);
      }
    });
    return map;
  }, [queries, algoIds]);

  return algos;
}
