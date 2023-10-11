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

  if (user) {
    console.log(user.displayName);
  } else if (loading) {
    return (
      <Loading />
    );
  } else {
    router.push('/auth');
    return;
  }

  return (
    <RootLayout>
      <div className="flex items-center justify-center flex-col w-full px-[20%] h-full">
        <h1 className='text-4xl'>Leaderboard</h1>
        <div style={{ overflowY: "auto" }}  className="flex flex-col rounded-2xl bg-white/[0.6] text-black p-4 max-h-[90%] w-[60%]">
          <ListGroup />
        </div>
      </div>
    </RootLayout>
  );
}
