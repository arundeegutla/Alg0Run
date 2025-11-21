'use client';
import React, { createContext, useContext, ReactNode } from 'react';
import { Algo } from '@/server/trpc/types';
import { trpc } from '@/server/trpc/client';
import Loading from '@/components/Loading';

interface AlgoContextType {
  algorithms: Algo[];
}

const AlgoContext = createContext<AlgoContextType | undefined>(undefined);

export function AlgoProvider({ children }: { children: ReactNode }) {
  const { data: algos, isLoading, error } = useAllAlgos();

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <AlgoContext.Provider
      value={{
        algorithms: algos?.results || [],
      }}
    >
      {children}
    </AlgoContext.Provider>
  );
}

export function useAlgo() {
  const context = useContext(AlgoContext);
  if (!context) {
    throw new Error('useAlgo must be used within an AlgoProvider');
  }
  return context;
}

function useAllAlgos() {
  return trpc.algo.getAllAlgos.useQuery();
}
