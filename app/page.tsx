/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Keyboard3D = dynamic(() => import('@/src/components/Keyboard3D'), {
  ssr: false,
});

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const user = localStorage.getItem('alg0_user');
    setIsLoggedIn(!!user);
  }, []);

  if (!isClient) return null;

  return (
    <div className='flex flex-col h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-foreground'>
      {/* Navigation */}
      <nav className='border-b border-slate-700 backdrop-blur-sm z-50 shrink-0'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-3 flex items-center justify-between'>
          <div className='font-mono text-lg sm:text-xl font-bold'>
            <span className='text-slate-400'>{`<`}</span>
            <span className='text-cyan-400'>Alg0Run</span>
            <span className='text-slate-400'>{`/>`}</span>
          </div>
          <div className='flex gap-2 sm:gap-4'>
            <Link
              href='/leaderboard'
              className='text-slate-300 hover:text-cyan-400 transition font-mono text-xs sm:text-sm'
            >
              {`[ leaderboard ]`}
            </Link>
            <Link
              href='/type'
              className='text-slate-300 hover:text-cyan-400 transition font-mono text-xs sm:text-sm'
            >
              {`[ type ]`}
            </Link>
            {isLoggedIn ? (
              <button
                onClick={() => {
                  localStorage.removeItem('alg0_user');
                  setIsLoggedIn(false);
                }}
                className='text-slate-300 hover:text-red-400 transition font-mono text-xs sm:text-sm'
              >
                {`[ logout ]`}
              </button>
            ) : (
              <button
                onClick={() => {
                  const username = prompt('Enter username:');
                  if (username) {
                    localStorage.setItem('alg0_user', username);
                    setIsLoggedIn(true);
                  }
                }}
                className='text-slate-300 hover:text-cyan-400 transition font-mono text-xs sm:text-sm'
              >
                {`[ login ]`}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className='flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-2 sm:py-3 z-10 min-h-0 overflow-hidden'>
        <div className='max-w-4xl mx-auto text-center space-y-2 sm:space-y-3'>
          {/* Title with dev syntax */}
          <div className='space-y-1 sm:space-y-2'>
            <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-mono font-bold tracking-tight leading-tight'>
              <span className='text-slate-400'>{`// `}</span>
              <span className='text-cyan-400'>Algorithm</span>
              <br />
              <span className='text-slate-400'>{`// `}</span>
              <span className='text-purple-400'>Speed</span>
              <span className='text-slate-400'>{` Typing`}</span>
            </h1>
            <p className='text-[10px] sm:text-xs md:text-sm lg:text-base text-slate-400 font-mono max-w-2xl mx-auto px-2'>
              {`[ Type complex algorithms, race against peers, dominate the leaderboard ]`}
            </p>
          </div>

          {/* CTA Button */}
          <div className='space-y-1 sm:space-y-2'>
            <Link
              href='/type'
              className='inline-block px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 bg-linear-to-r from-cyan-500 to-blue-500 text-white font-mono font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 text-[10px] sm:text-xs'
            >
              {`$ start typing...`}
            </Link>
            <p className='text-slate-500 font-mono text-[8px] sm:text-[10px] px-2'>
              {`[ master algorithms, build muscle memory, climb the ranks ]`}
            </p>
          </div>
        </div>
      </main>

      {/* 3D Keyboard - Fixed to Bottom */}
      <div className='shrink-0 w-full h-[45vh] min-h-[300px] max-h-[550px]'>
        <Keyboard3D />
      </div>
    </div>
  );
}
