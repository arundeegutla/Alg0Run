import { Algo } from '@/server/trpc/types';
import TypePageClient from './TypePageClient';
import { trpc } from '@/server/trpc/server';

export default async function TypePageServer() {
  let algorithms: Algo[] = [];
  const allAlgosData = await trpc.algo.getAllAlgos();
  if (allAlgosData && allAlgosData.error === '') {
    algorithms = allAlgosData.results;
  }
  return <TypePageClient algorithms={algorithms} />;
}
