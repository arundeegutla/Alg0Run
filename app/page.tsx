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
    <div className='min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-foreground'>
      {/* Navigation */}
      <nav className='border-b border-slate-700 backdrop-blur-sm sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
          <div className='font-mono text-xl font-bold'>
            <span className='text-slate-400'>{`<`}</span>
            <span className='text-cyan-400'>Alg0Run</span>
            <span className='text-slate-400'>{`/>`}</span>
          </div>
          <div className='flex gap-4'>
            <Link
              href='/leaderboard'
              className='text-slate-300 hover:text-cyan-400 transition font-mono text-sm'
            >
              {`[ leaderboard ]`}
            </Link>
            <Link
              href='/type'
              className='text-slate-300 hover:text-cyan-400 transition font-mono text-sm'
            >
              {`[ type ]`}
            </Link>
            {isLoggedIn ? (
              <button
                onClick={() => {
                  localStorage.removeItem('alg0_user');
                  setIsLoggedIn(false);
                }}
                className='text-slate-300 hover:text-red-400 transition font-mono text-sm'
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
                className='text-slate-300 hover:text-cyan-400 transition font-mono text-sm'
              >
                {`[ login ]`}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="min-h-[calc(100vh-73px)] flex flex-col items-center justify-between px-6 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-8 flex-1 flex flex-col justify-center">
          {/* Title with dev syntax */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-mono font-bold tracking-tight">
              <span className="text-slate-400">{`// `}</span>
              <span className="text-cyan-400">Algorithm</span>
              <br />
              <span className="text-slate-400">{`// `}</span>
              <span className="text-purple-400">Speed</span>
              <span className="text-slate-400">{` Typing`}</span>
            </h1>
            <p className="text-xl text-slate-400 font-mono max-w-2xl mx-auto">
              {`[ Type complex algorithms, race against peers, dominate the leaderboard ]`}
            </p>
          </div>

          {/* CTA Button */}
          <div className="space-y-4">
            <Link
              href="/type"
              className="inline-block px-8 py-4 bg-linear-to-r from-cyan-500 to-blue-500 text-white font-mono font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
            >
              {`$ start typing...`}
            </Link>
            <p className="text-slate-500 font-mono text-sm">
              {`[ master algorithms, build muscle memory, climb the ranks ]`}
            </p>
          </div>
        </div>

        {/* 3D Keyboard - At Bottom */}
        <div className="w-full max-w-7xl mx-auto mt-8" style={{ height: '500px' }}>
          <Keyboard3D />
        </div>
      </main>
    </div>
  );
}
