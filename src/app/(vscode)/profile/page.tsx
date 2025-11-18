'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Loading from '@/components/Loading';
import Image from 'next/image';
export default function ProfilePage() {
  const router = useRouter();
  const {
    codeforcesLoggedIn: isLoggedIn,
    codeforcesUserInfo: user,
    codeforcesLoading: loading,
    logoutCodeforces,
  } = useAuth();

  useEffect(() => {
    if (!isLoggedIn && !loading) {
      router.push('/auth');
    }
  }, [isLoggedIn, loading, router]);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Loading />;
  }

  const handle = user.handle;
  const avatar = user.avatar;
  const rating = user.rating;

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
      <h1 className='text-2xl font-bold mb-2'>
        Hello {handle ? handle : 'User'}
      </h1>
      {typeof rating === 'number' && (
        <div className='text-gray-400'>
          Rating: <span className='font-semibold'>{rating}</span>
        </div>
      )}
      <button
        onClick={logoutCodeforces}
        className='mt-6 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded shadow font-semibold transition-colors duration-150'
      >
        Logout
      </button>
    </div>
  );
}
