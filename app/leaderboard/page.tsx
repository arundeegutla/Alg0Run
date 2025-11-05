'use client';

import ListGroup from '@/components/ListGroup';
import NavBar from '@/components/NavBar';
import Image from 'next/image';

import { auth } from '@/firebase/clientApp'
import { useRouter } from 'next/navigation';
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from '@/components/Loading';
import RootLayout from '../layout';
import { useEffect, useState } from 'react';

export default function Leaderboard() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  // Show loading only during initial auth check
  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <RootLayout>
      <div className="flex items-center justify-center flex-col w-full px-[20%] h-full">
        <h1 className='text-4xl'>Leaderboard</h1>
        <div className="flex flex-col rounded-2xl bg-white/[0.6] text-green p-4 max-h-[90%] w-[60%] overflow-y-auto scrollbar-hide">
          <ListGroup />
        </div>
      </div>
    </RootLayout>
  );
}
