'use client';
import React, { useState } from 'react';
import PixelBlast from '@/components/PixelBlast';
import { FcGoogle } from 'react-icons/fc';
import { SiCodeforces } from 'react-icons/si';
import { unifiedSignIn } from '@/lib/unifiedAuthProvider';

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle Codeforces callback (username in query string)
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cfUser = params.get('codeforces_user');
    const err = params.get('error');
    if (cfUser) {
      // You should set session here (e.g., localStorage, cookie, or backend call)
      localStorage.setItem(
        'alg0_user',
        JSON.stringify({ provider: 'codeforces', username: cfUser })
      );
      window.location.href = '/';
    } else if (err) {
      setError(decodeURIComponent(err));
    }
  }, []);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await unifiedSignIn.google();
      window.location.href = '/';
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Google sign-in failed');
      } else {
        setError('Google sign-in failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCodeforcesSignIn = () => {
    setLoading(true);
    setError(null);
    try {
      unifiedSignIn.codeforces();
    } catch {
      setError('Codeforces sign-in failed');
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen w-full flex flex-row bg-[#0a0a12]'>
      {/* Left: PixelBlast visual */}
      <div className='hidden md:flex flex-1 items-center justify-center relative overflow-hidden'>
        <PixelBlast
          variant='square'
          pixelSize={4}
          color='#B19EEF'
          patternScale={2.5}
          patternDensity={1.1}
          className='z-0'
          style={{ opacity: 0.9 }}
        />
        <div className='absolute bottom-10 left-10 z-20'>
          <h2
            className='text-6xl font-extrabold text-cyan-200 coding-glow drop-shadow-lg'
            style={{ fontFamily: 'monospace' }}
          >
            <span className='text-slate-400'>{`{ `}</span>
            <span className='text-slate-300'>alg0run</span>
            <span className='text-slate-400'>{` }`}</span>
          </h2>
          <p className='mt-4 text-md text-slate-300 max-w-xs'>
            Level up your typing and coding skills with algorithmic races.
          </p>
        </div>
      </div>
      {/* Right: Auth container */}
      <div className='flex  w-full md:w-[480px] min-h-screen relative z-20'>
        <div className='flex flex-col items-center justify-center w-full h-full px-8 py-12 bg-[#000000]/40 border-2 border-[#c8c8c8]/10 shadow-2xl'>
          <h1
            className='text-4xl font-bold text-cyan-300 mb-2 tracking-tight coding-glow'
            style={{ fontFamily: 'monospace' }}
          >
            Welcome
          </h1>
          <p className='text-md text-slate-400 mb-8 text-center max-w-xs'>
            Sign in to race, code, and climb the leaderboard.
          </p>

          <button
            disabled={loading}
            onClick={handleGoogleSignIn}
            style={{ fontFamily: 'monospace' }}
            className='group flex items-center gap-3 w-full justify-center py-3 mb-4 rounded-lg bg-[#18182a] border-2 border-cyan-400/40 hover:border-cyan-300/80 hover:bg-[#23234a] shadow-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 font-mono tracking-tight text-lg'
          >
            <FcGoogle size={28} />
            <span className='tracking-widest text-cyan-200 transition-colors'>
              Google
            </span>
          </button>

          <button
            onClick={handleCodeforcesSignIn}
            disabled={loading}
            className='group flex items-center gap-3 w-full justify-center py-3 mb-2 rounded-lg bg-[#18182a] border-2 border-yellow-400/40 hover:border-yellow-300/80 hover:bg-[#23234a] shadow-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#f69c0a]/40 font-mono tracking-tight text-lg'
            style={{ fontFamily: 'monospace' }}
          >
            <SiCodeforces size={26} color='#f69c0a' />
            <span className='tracking-widest text-yellow-200 transition-colors'>
              Codeforces
            </span>
          </button>

          {error && (
            <div className='mt-4 text-red-400 text-sm text-center max-w-xs'>
              {error}
            </div>
          )}
          {loading && (
            <div className='mt-4 text-cyan-300 animate-pulse text-sm'>
              Signing you in...
            </div>
          )}
          <div className='mt-8 text-xs text-slate-500 text-center'>
            By signing in, you agree to our{' '}
            <a
              href='https://github.com/arundeegutla/Alg0Run'
              className='underline hover:text-cyan-300'
            >
              Terms
            </a>{' '}
            and{' '}
            <a
              href='https://github.com/arundeegutla/Alg0Run'
              className='underline hover:text-cyan-300'
            >
              Privacy Policy
            </a>
            .
          </div>
        </div>
      </div>
      <style jsx global>{`
        .coding-glow {
          text-shadow:
            0 0 8px #00eaff88,
            0 0 24px #b19eef44;
        }
      `}</style>
    </div>
  );
}
