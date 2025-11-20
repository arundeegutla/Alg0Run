import { Algo } from '@/server/trpc/types';
import TypePageClient from './TypePageClient';
import { trpc } from '@/server/trpc/server';

export default async function TypePageServer() {
  let algorithms: Algo[] = [];
  let error = '';
  try {
    const allAlgosData = await trpc.algo.getAllAlgos();
    if (allAlgosData && Array.isArray(allAlgosData.results)) {
      algorithms = allAlgosData.results;
    }
  } catch (e) {
    if (
      typeof e === 'object' &&
      e !== null &&
      'message' in e &&
      typeof (e as { message?: unknown }).message === 'string'
    ) {
      error = (e as { message: string }).message;
    } else {
      error = 'An error occurred while fetching algorithms.';
    }
  }
  if (error) {
    return (
      <div style={{ padding: 32, textAlign: 'center', color: 'red' }}>
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }
  return <TypePageClient algorithms={algorithms} />;
}
