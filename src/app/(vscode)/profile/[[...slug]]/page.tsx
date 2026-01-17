'use client';

import React, { use, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Loading from '@/components/Loading';
import Image from 'next/image';
import { signOut } from 'firebase/auth';
import { auth } from '@/server/firebase/clientApp';
import { trpc } from '@/server/trpc/client';
import { useAlgos } from '@/hooks/useAlgos';
import Keyboard3D from '@/components/Keyboard3D';
import PythonOriginal from 'devicons-react/icons/PythonOriginal';
import Cpp from 'devicons-react/icons/CplusplusOriginal';
import Java from 'devicons-react/icons/JavaOriginal';

import {
  VscSignOut,
  VscTerminal,
  VscGraphLine,
  VscCode,
} from 'react-icons/vsc';
import { FaKeyboard } from 'react-icons/fa';

import { SiCodeforces } from 'react-icons/si';

interface ProfilePageProps {
  params: Promise<{
    slug?: string;
  }>;
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { slug: rawSlug } = use(params);
  // Ensure rawSlug is always an array, then decode
  const slugArr = rawSlug
    ? Array.isArray(rawSlug)
      ? rawSlug
      : [rawSlug]
    : undefined;
  const slug = slugArr
    ? slugArr.map((s: string) => decodeURIComponent(s))
    : undefined;
  const router = useRouter();
  const { googleUser, googleLoading } = useAuth();

  const [idToken, setIdToken] = React.useState<string | null>(null);
  React.useEffect(() => {
    if (googleUser) {
      googleUser.getIdToken().then(setIdToken);
    }
  }, [googleUser]);

  useEffect(() => {
    if (!googleUser && !googleLoading) {
      router.push('/auth');
    }
  }, [googleUser, googleLoading, router]);

  // Determine if we're viewing current user or another user
  const isViewingCurrentUser = !slug || slug[0] === googleUser?.uid;

  // Query for current user's profile (by token)
  const {
    data: currentUserData,
    isLoading: currentUserLoading,
    error: currentUserError,
  } = trpc.profile.getProfileByToken.useQuery(
    { idToken: idToken ?? '' },
    { enabled: !!idToken && isViewingCurrentUser }
  );

  // Query for other user's profile (by ID)
  const {
    data: otherUserData,
    isLoading: otherUserLoading,
    error: otherUserError,
  } = trpc.profile.getProfileByUserId.useQuery(
    { userId: slug?.[0] ?? '' },
    { enabled: !isViewingCurrentUser && !!slug?.[0] }
  );

  // Use appropriate data based on which profile we're viewing
  const data = isViewingCurrentUser ? currentUserData : otherUserData;
  const isLoading = isViewingCurrentUser
    ? currentUserLoading
    : otherUserLoading;
  const error = isViewingCurrentUser ? currentUserError : otherUserError;

  const plays = data?.plays;

  const last6Plays = React.useMemo(() => {
    if (!plays) return [];
    return plays
      .slice()
      .sort(
        (a, b) => b.playDetails.date_completed - a.playDetails.date_completed
      )
      .slice(0, 6);
  }, [plays]);

  const algoIds = React.useMemo(
    () => last6Plays.map((play) => play.algoId),
    [last6Plays]
  );
  const algosMap = useAlgos(algoIds);

  const stats = React.useMemo(() => {
    if (!plays) return null;
    if (plays.length === 0) return null;
    const total = plays.length;
    const sum = plays.reduce(
      (acc, p) => {
        acc.score += p.playDetails.score;
        acc.wpm += p.playDetails.wpm;
        acc.accuracy += p.playDetails.accuracy;
        return acc;
      },
      { score: 0, wpm: 0, accuracy: 0 }
    );
    return {
      avgWpm: sum.wpm / total,
      avgAccuracy: (sum.accuracy / total) * 100,
      totalPlays: total,
    };
  }, [plays]);

  if (googleLoading || !googleUser || isLoading) {
    return <Loading />;
  }

  if (error || !data?.profile) {
    return (
      <div className='flex flex-col items-center justify-center h-full w-full text-[#cccccc] font-mono'>
        <div className='text-3xl mb-4'>😕</div>
        <div>Failed to load profile.</div>
      </div>
    );
  }

  const { profile } = data;

  const avatar = profile.photoURL;
  const displayName = profile.username;
  const totalScore = profile.totalScore;

  // Helper for Codeforces icon with link
  const getProviderIcon = (profile: typeof data.profile) => {
    if (profile.provider === 'codeforces' && profile.username) {
      return (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.open(
              `https://codeforces.com/profile/${profile.username}`,
              '_blank',
              'noopener,noreferrer'
            );
          }}
          title='View Codeforces profile'
          className='ml-2 text-[#1f8acb] hover:text-[#005fa3] flex items-center cursor-pointer codeforces-icon-btn'
        >
          <SiCodeforces size={22} />
        </button>
      );
    }
    return null;
  };

  const getLanguageIcon = (language: string) => {
    switch (language) {
      case 'python':
        return <PythonOriginal size={20} />;
      case 'cpp':
        return <Cpp className='text-[#00599c]' size={20} />;
      case 'java':
        return <Java className='text-[#007396]' size={20} />;
      default:
        return null;
    }
  };

  return (
    <div className='min-h-screen w-full bg-[#1e1e1e] text-[#cccccc] font-mono py-8 px-4 overflow-auto'>
      {/* Terminal Header */}
      <div className='max-w-7xl mx-auto mb-6'>
        <div className='bg-[#232323] border border-[#3e3e42] rounded-lg overflow-hidden'>
          <div className='bg-[#2d2d30] px-4 py-2 flex items-center gap-2 border-b border-[#3e3e42]'>
            <div className='flex gap-1.5'>
              <div className='w-3 h-3 rounded-full bg-[#3e3e42]'></div>
              <div className='w-3 h-3 rounded-full bg-[#3e3e42]'></div>
              <div className='w-3 h-3 rounded-full bg-[#3e3e42]'></div>
            </div>
            <div className='ml-4 text-xs text-[#858585] flex items-center gap-2'>
              <VscTerminal size={14} />
              <span>user@alg0run ~ profile</span>
            </div>
          </div>
          <div className='p-6'>
            <div className='flex flex-col md:flex-row items-center md:items-start gap-6'>
              {avatar && (
                <Image
                  src={avatar}
                  alt='Avatar'
                  className='w-28 h-28 rounded-full object-center bg-[#232323]'
                  width={112}
                  height={112}
                  priority
                />
              )}
              <div className='flex-1 text-center md:text-left'>
                <div className='text-sm text-[#858585] mb-1 flex items-center justify-center md:justify-start gap-2'>
                  <span className='text-[#4ec9b0]'>$</span>
                  <span>whoami</span>
                </div>
                <div className='flex items-center justify-center md:justify-start gap-2 mb-3'>
                  <h1 className='text-4xl font-bold text-[#4ec9b0]'>
                    {displayName}
                  </h1>
                  {getProviderIcon(profile)}
                </div>
                <div className='flex flex-wrap gap-3 justify-center md:justify-start items-center'>
                  {isViewingCurrentUser && (
                    <>
                      <Link
                        href='/settings/keyboard'
                        className='flex items-center gap-2 px-4 py-1.5 bg-[#3e3e42] hover:bg-[#4e4e52] text-white rounded text-sm font-semibold transition-all duration-200'
                      >
                        <FaKeyboard size={16} /> keyboard settings
                      </Link>
                      <button
                        onClick={async () => {
                          await signOut(auth);
                        }}
                        className='flex items-center gap-2 px-4 py-1.5 bg-[#f44747] hover:bg-[#ff6b6b] text-white rounded text-sm font-semibold transition-all duration-200'
                      >
                        <VscSignOut size={16} /> logout
                      </button>
                    </>
                  )}
                </div>
              </div>

              {profile.keyboardSettings && (
                <div className='w-[800px] h-40 relative cursor-move'>
                  <Keyboard3D keyboardOptions={profile.keyboardSettings} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Stats Section */}
        <div className='lg:col-span-1 space-y-4'>
          <div className='bg-[#232323] border border-[#3e3e42] rounded-lg overflow-hidden'>
            <div className='bg-[#2d2d30] px-4 py-2 border-b border-[#3e3e42] flex items-center gap-2'>
              <VscGraphLine className='text-[#569cd6]' size={16} />
              <span className='text-sm font-semibold text-[#cccccc]'>
                performance.metrics
              </span>
            </div>
            <div className='p-4'>
              {stats ? (
                <div className='space-y-3'>
                  <div className='bg-[#1e1e1e] rounded p-4 border border-[#3e3e42] transition-colors'>
                    <div className='flex items-center justify-between mb-2'>
                      <span className='text-xs text-[#858585] uppercase tracking-wider'>
                        avg_wpm
                      </span>
                    </div>
                    <div className='text-3xl font-bold text-[#4ec9b0]'>
                      {stats.avgWpm.toFixed(1)}
                    </div>
                  </div>

                  <div className='bg-[#1e1e1e] rounded p-4 border border-[#3e3e42] transition-colors'>
                    <div className='flex items-center justify-between mb-2'>
                      <span className='text-xs text-[#858585] uppercase tracking-wider'>
                        accuracy
                      </span>
                    </div>
                    <div className='text-3xl font-bold text-[#569cd6]'>
                      {stats.avgAccuracy.toFixed(1)}%
                    </div>
                  </div>

                  <div className='bg-[#1e1e1e] rounded p-4 border border-[#3e3e42] transition-colors'>
                    <div className='flex items-center justify-between mb-2'>
                      <span className='text-xs text-[#858585] uppercase tracking-wider'>
                        total_plays
                      </span>
                    </div>
                    <div className='text-3xl font-bold text-[#c586c0]'>
                      {stats.totalPlays}
                    </div>
                  </div>

                  <div className='bg-[#1e1e1e] rounded p-4 border border-[#3e3e42] transition-colors'>
                    <div className='flex items-center justify-between mb-2'>
                      <span className='text-xs text-[#858585] uppercase tracking-wider'>
                        total_score
                      </span>
                    </div>
                    <div className='text-3xl font-bold text-[#dcdcaa]'>
                      {totalScore}
                    </div>
                  </div>
                </div>
              ) : (
                <div className='text-[#858585] text-center py-8'>
                  <VscCode size={32} className='mx-auto mb-2 opacity-50' />
                  <p className='text-sm'>No data available</p>
                  <p className='text-xs mt-1'>Start coding to track stats</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Plays Section */}
        <div className='lg:col-span-2'>
          <div className='bg-[#232323] border border-[#3e3e42] rounded-lg overflow-hidden'>
            <div className='bg-[#2d2d30] px-4 py-2 border-b border-[#3e3e42] flex items-center gap-2'>
              <VscTerminal className='text-[#569cd6]' size={16} />
              <span className='text-sm font-semibold text-[#cccccc]'>
                --recent-plays
              </span>
            </div>
            <div className='p-4'>
              {last6Plays.length > 0 ? (
                <div className='flex flex-row flex-wrap gap-4 items-center justify-center'>
                  {last6Plays.map((play, idx) => {
                    const algo = algosMap.get(play.algoId);
                    return (
                      <div
                        key={
                          play.algoId +
                          '-' +
                          play.playDetails.date_completed +
                          '-' +
                          idx
                        }
                        className='bg-[#1e1e1e] border border-[#3e3e42] rounded-lg p-4 transition-all duration-200 group'
                      >
                        <div className='flex items-start gap-3'>
                          <div className='flex-1'>
                            <div className='flex items-center gap-2 mb-2'>
                              {getLanguageIcon(play.playDetails.language)}
                              <span className='font-semibold'>
                                {algo ? algo.name || algo.id : play.algoId}
                              </span>
                              {algo?.category && (
                                <span className='text-xs text-[#858585] bg-[#232323] px-2 py-0.5 rounded border border-[#3e3e42]'>
                                  {algo.category}
                                </span>
                              )}
                            </div>
                            <div className='grid grid-cols-3 gap-3 text-sm'>
                              <div className='bg-[#232323] rounded px-3 py-1.5 flex flex-col items-center justify-center '>
                                <div className='text-[#dcdcaa] font-bold'>
                                  {play.playDetails.score}
                                </div>
                                <div className='text-[#858585] text-xs mb-0.5'>
                                  score
                                </div>
                              </div>
                              <div className='bg-[#232323] rounded px-3 py-1.5 flex flex-col items-center justify-center '>
                                <div className='text-[#4ec9b0] font-bold'>
                                  {play.playDetails.wpm}
                                </div>
                                <div className='text-[#858585] text-xs mb-0.5'>
                                  wpm
                                </div>
                              </div>
                              <div className='bg-[#232323] rounded px-3 py-1.5 flex flex-col items-center justify-center '>
                                <div className='text-[#569cd6] font-bold'>
                                  {(play.playDetails.accuracy * 100).toFixed(1)}
                                  %
                                </div>
                                <div className='text-[#858585] text-xs mb-0.5'>
                                  accuracy
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className='text-[#858585] text-center py-12'>
                  <VscTerminal size={40} className='mx-auto mb-3 opacity-30' />
                  <p className='text-sm'>No commits in history</p>
                  <p className='text-xs mt-1'>./start-coding.sh to begin</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
