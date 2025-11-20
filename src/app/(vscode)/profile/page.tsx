'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Loading from '@/components/Loading';
import Image from 'next/image';
import { signOut } from 'firebase/auth';
import { auth } from '@/server/firebase/clientApp';

export default function ProfilePage() {
  const router = useRouter();
  const { googleUser, googleLoading } = useAuth();

  useEffect(() => {
    if (!googleUser && !googleLoading) {
      router.push('/auth');
    }
  }, [googleUser, googleLoading, router]);

  if (googleLoading || !googleUser) {
    return <Loading />;
  }

  const displayName = googleUser.displayName || googleUser.email || 'User';
  const avatar = googleUser.photoURL;

  return (
    <div className='flex flex-col items-center justify-center h-full w-full'>
      {avatar && (
        <Image
          src={avatar}
          alt='Avatar'
          className='w-24 h-24 rounded-full border-4 border-[#007acc] mb-4'
          width={96}
          height={96}
        />
      )}
      <h1 className='text-2xl font-bold mb-2'>Hello {displayName}</h1>
      <button
        onClick={async () => {
          await signOut(auth);
        }}
        className='mt-6 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded shadow font-semibold transition-colors duration-150'
      >
        Logout
      </button>
    </div>
  );
}
