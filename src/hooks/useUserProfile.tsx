import { ProfileBasic } from '@/server/trpc/types';
import { useMemo } from 'react';
import { trpc } from '@/server/trpc/client';
import { useQueries } from '@tanstack/react-query';

export const userProfileCache = new Map<string, ProfileBasic>();

export function useUserProfiles(profileIds: string[]) {
  const trpcContext = trpc.useContext();

  const queries = useQueries({
    queries: profileIds.map((id) => ({
      queryKey: ['profile', id],
      queryFn: async () => {
        if (userProfileCache.has(id)) {
          console.log('returning cached profile', id);
          return userProfileCache.get(id);
        }
        const result = await trpcContext.profile.getBasicProfileByUserId.fetch({
          userId: id,
        });

        if (result?.profile) {
          userProfileCache.set(id, result.profile);
          return result.profile;
        }
        return undefined;
      },
      enabled: !!id,
      staleTime: Infinity,
      cacheTime: Infinity,
    })),
  });

  const profiles = useMemo(() => {
    const map = new Map<string, ProfileBasic>();
    queries.forEach((q, idx) => {
      if (q.data) {
        map.set(profileIds[idx], q.data);
      }
    });
    return map;
  }, [queries, profileIds]);

  return profiles;
}
